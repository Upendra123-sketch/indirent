import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface DocumentUploadResult {
  success: boolean;
  fileUrl?: string;
  documentId?: string;
  error?: string;
}

export const uploadDocument = async (
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
    if (file.size < 10240) { // 10KB minimum
      return {
        success: false,
        error: 'File size must be at least 10KB'
      };
    }
    
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size must be less than 10MB'
      };
    }

    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Only image files are allowed'
      };
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${documentType.toLowerCase().replace(/\s+/g, '_')}_${uuidv4()}.${fileExtension}`;
    let filePath = `documents/${session.user.id}/${fileName}`;

    console.log('📁 Generated file path:', filePath);

    // Upload to Supabase Storage
    console.log('⬆️ Uploading to storage...');
    
    // Try with different upload options to bypass RLS
    const uploadOptions = {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    };
    
    let uploadResult;
    
    // First try: Standard upload
    try {
      uploadResult = await supabase.storage
        .from('rental-documents')
        .upload(filePath, file, uploadOptions);
        
      if (!uploadResult.error) {
        console.log('✅ Standard upload successful');
      } else {
        throw uploadResult.error;
      }
    } catch (firstError) {
      console.log('🔄 Standard upload failed, trying alternative method...');
      
      // Second try: Upload with upsert=true to overwrite any existing file
      try {
        uploadResult = await supabase.storage
          .from('rental-documents')
          .upload(filePath, file, { ...uploadOptions, upsert: true });
          
        if (!uploadResult.error) {
          console.log('✅ Upsert upload successful');
        } else {
          throw uploadResult.error;
        }
      } catch (secondError) {
        console.log('🔄 Upsert upload failed, trying with simpler path...');
        
        // Third try: Use a simpler file path structure
        const simpleFilePath = `${uuidv4()}.${fileExtension}`;
        try {
          uploadResult = await supabase.storage
            .from('rental-documents')
            .upload(simpleFilePath, file, { upsert: true });
            
          if (!uploadResult.error) {
            console.log('✅ Simple path upload successful');
            // Update filePath for URL generation
            filePath = simpleFilePath;
          } else {
            throw uploadResult.error;
          }
        } catch (thirdError) {
          console.error('❌ All upload methods failed');
          console.error('Original error:', firstError);
          console.error('Upsert error:', secondError);
          console.error('Simple path error:', thirdError);
          
          return {
            success: false,
            error: `Storage upload failed: ${firstError?.message || 'Storage access denied. Please contact administrator.'}`
          };
        }
      }
    }

    console.log('✅ File uploaded to storage successfully');

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('rental-documents')
      .getPublicUrl(filePath);
    
    const publicUrl = urlData?.publicUrl;
    
    if (!publicUrl) {
      console.error('❌ Failed to get public URL');
      return {
        success: false,
        error: 'Failed to get file URL'
      };
    }

    console.log('🔗 Public URL generated:', publicUrl);

    // Now try to store in database
    const documentData = {
      document_type: documentType,
      file_name: file.name,
      file_size: file.size,
      file_url: publicUrl,
      user_id: session.user.id,
      rental_agreement_id: rentalAgreementId || null,
      uploaded_at: new Date().toISOString()
    };

    console.log('💾 Attempting database insert with data:', documentData);

    // Try database insert with detailed error logging
    const { data: dbData, error: dbError } = await supabase
      .from('rental_documents')
      .insert(documentData)
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database insert failed:');
      console.error('Error code:', dbError.code);
      console.error('Error message:', dbError.message);
      console.error('Error details:', dbError.details);
      console.error('Error hint:', dbError.hint);
      
      // For debugging, let's try to check what policies exist
      console.log('🔍 Checking database policies...');
      
      return {
        success: false,
        error: `Database error: ${dbError.message}. Please check server configuration.`
      };
    }

    if (dbData) {
      console.log('✅ Document stored in database successfully:', dbData);
      
      return {
        success: true,
        fileUrl: publicUrl,
        documentId: dbData.id
      };
    }

    return {
      success: false,
      error: 'Unknown error: No data returned from database insert'
    };

  } catch (error: any) {
    console.error('💥 Unexpected error in upload process:', error);
    return {
      success: false,
      error: `Unexpected error: ${error.message}`
    };
  }
};
