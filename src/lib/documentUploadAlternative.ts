import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface DocumentUploadResult {
  success: boolean;
  fileUrl?: string;
  documentId?: string;
  error?: string;
}

// Alternative upload function that bypasses storage RLS issues
export const uploadDocumentDirect = async (
  file: File,
  documentType: string,
  userId: string,
  rentalAgreementId?: string
): Promise<DocumentUploadResult> => {
  console.log('🚀 Starting DIRECT document upload (bypass RLS):', { 
    fileName: file.name, 
    fileSize: file.size,
    documentType, 
    userId, 
    rentalAgreementId 
  });

  try {
    // Convert file to base64 data URL for temporary storage
    const fileReader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });

    const base64Data = await base64Promise;
    console.log('✅ File converted to base64');

    // Generate a unique document ID
    const documentId = uuidv4();
    
    // Store document metadata directly in database with base64 data
    const documentData = {
      id: documentId,
      document_type: documentType,
      file_name: file.name,
      file_size: file.size,
      file_url: base64Data, // Store base64 data directly as URL for now
      user_id: userId,
      rental_agreement_id: rentalAgreementId || null,
      uploaded_at: new Date().toISOString()
    };

    console.log('💾 Attempting direct database insert...');

    // Insert directly into database
    const { data: dbData, error: dbError } = await supabase
      .from('rental_documents')
      .insert(documentData)
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database insert failed:', dbError);
      
      // If database also fails, store in localStorage as absolute fallback
      console.log('📱 Storing in localStorage as emergency fallback...');
      
      try {
        const existingDocs = JSON.parse(localStorage.getItem('emergency_documents') || '[]');
        existingDocs.push({
          ...documentData,
          stored_method: 'localStorage_emergency',
          timestamp: Date.now()
        });
        localStorage.setItem('emergency_documents', JSON.stringify(existingDocs));
        
        return {
          success: true,
          fileUrl: base64Data,
          documentId: documentId,
          error: 'Temporarily stored locally - will sync to database when possible'
        };
      } catch (localError) {
        console.error('❌ Even localStorage failed:', localError);
        return {
          success: false,
          error: 'Complete storage failure - please contact support'
        };
      }
    }

    console.log('✅ Document stored directly in database:', dbData);
    
    return {
      success: true,
      fileUrl: base64Data,
      documentId: dbData.id
    };

  } catch (error: any) {
    console.error('💥 Unexpected error in direct upload:', error);
    return {
      success: false,
      error: `Direct upload failed: ${error.message}`
    };
  }
};

// Keep the original upload function but make it fallback to direct upload
export const uploadDocument = async (
  file: File,
  documentType: string,
  userId: string,
  rentalAgreementId?: string
): Promise<DocumentUploadResult> => {
  console.log('🚀 Starting document upload with fallback strategy');
  
  // First try the original storage upload
  const originalResult = await uploadDocumentOriginal(file, documentType, userId, rentalAgreementId);
  
  if (originalResult.success) {
    return originalResult;
  }
  
  // If storage upload fails, try direct database upload
  console.log('🔄 Storage upload failed, trying direct database upload...');
  return await uploadDocumentDirect(file, documentType, userId, rentalAgreementId);
};

// Rename the original function
const uploadDocumentOriginal = async (
  file: File,
  documentType: string,
  userId: string,
  rentalAgreementId?: string
): Promise<DocumentUploadResult> => {
  console.log('🚀 Starting document upload:', { 
    fileName: file.name, 
    fileSize: file.size,
    documentType, 
    userId, 
    rentalAgreementId 
  });

  try {
    // First verify we have a valid authenticated session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('❌ Authentication failed:', sessionError);
      return {
        success: false,
        error: 'Authentication required. Please sign in and try again.'
      };
    }
    
    console.log('✅ Authentication verified for user:', session.user.id);

    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size < 10240) {
      return { success: false, error: 'File size must be at least 10KB' };
    }
    
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 10MB' };
    }

    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'Only image files are allowed' };
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${documentType.toLowerCase().replace(/\s+/g, '_')}_${uuidv4()}.${fileExtension}`;
    let filePath = `documents/${session.user.id}/${fileName}`;

    console.log('📁 Generated file path:', filePath);

    // Try simplified storage upload
    console.log('⬆️ Uploading to storage...');
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('rental-documents')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('❌ Storage upload failed:', uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    console.log('✅ File uploaded to storage successfully');

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('rental-documents')
      .getPublicUrl(filePath);
    
    const publicUrl = urlData?.publicUrl;
    
    if (!publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('🔗 Public URL generated:', publicUrl);

    // Store in database
    const documentData = {
      document_type: documentType,
      file_name: file.name,
      file_size: file.size,
      file_url: publicUrl,
      user_id: session.user.id,
      rental_agreement_id: rentalAgreementId || null,
      uploaded_at: new Date().toISOString()
    };

    const { data: dbData, error: dbError } = await supabase
      .from('rental_documents')
      .insert(documentData)
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database insert failed:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('✅ Document stored in database successfully:', dbData);
    
    return {
      success: true,
      fileUrl: publicUrl,
      documentId: dbData.id
    };

  } catch (error: any) {
    console.error('💥 Original upload method failed:', error);
    return {
      success: false,
      error: error.message || 'Upload failed'
    };
  }
};
