
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
  rentalAgreementId?: string;
}

const DocumentUploadStep = ({ onNext, onBack, rentalAgreementId }: DocumentUploadStepProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const documentTypes = [
    'Aadhaar Card',
    'PAN Card',
    'Income Certificate',
    'Property Documents',
    'Previous Rent Agreement',
    'Other'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type (only PNG and JPG)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only PNG and JPG files are allowed';
    }

    // Check minimum file size (10KB)
    const minSize = 10 * 1024; // 10KB in bytes
    if (file.size < minSize) {
      return 'File size must be at least 10KB';
    }

    // Check maximum file size (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const handleFiles = (files: File[]) => {
    if (!selectedDocumentType) {
      toast({
        title: "Document Type Required",
        description: "Please select a document type before uploading files.",
        variant: "destructive",
      });
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      toast({
        title: "File Validation Error",
        description: errors.join('\n'),
        variant: "destructive",
      });
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast({
        title: "Files Added",
        description: `${validFiles.length} file(s) added successfully`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (!user || uploadedFiles.length === 0) {
      console.log('Upload failed: missing user or files', { user: !!user, fileCount: uploadedFiles.length });
      return;
    }

    console.log('Starting upload for user:', user.id);
    setUploading(true);
    
    try {
      const uploadPromises = uploadedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        console.log('Uploading file to storage:', fileName);
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('rental-documents')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('rental-documents')
          .getPublicUrl(fileName);

        console.log('File uploaded to storage, saving to database...');

        // Save to database - ensure we have the correct user_id
        const documentData = {
          rental_agreement_id: rentalAgreementId || null,
          user_id: user.id,
          document_type: selectedDocumentType,
          file_name: file.name,
          file_size: file.size,
          file_url: publicUrl,
        };

        console.log('Saving document data:', documentData);

        const { error: dbError } = await supabase
          .from('rental_documents')
          .insert(documentData);

        if (dbError) {
          console.error('Database insert error:', dbError);
          throw dbError;
        }

        console.log('Document saved successfully');
        return fileName;
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Upload Successful",
        description: `${uploadedFiles.length} document(s) uploaded successfully`,
      });

      setUploadedFiles([]);
      onNext();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed", 
        description: error instanceof Error ? error.message : "Failed to upload documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Upload Documents</h2>
        <p className="text-muted-foreground">Upload required documents (PNG/JPG only, minimum 10KB)</p>
      </div>

      {/* Document Type Selection */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="text-lg">Select Document Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* File Upload Area */}
      <Card 
        className={`relative border-2 border-dashed transition-all duration-300 hover-lift ${
          dragActive 
            ? 'border-primary bg-primary/10' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <div className={`transition-all duration-300 ${dragActive ? 'scale-110' : ''}`}>
            <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors ${
              dragActive ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <p className="text-lg font-medium mb-2">
              {dragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse (PNG/JPG only, min 10KB)
            </p>
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button variant="outline" className="hover-lift" asChild>
                <span>Choose Files</span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* File Requirements */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">File Requirements:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Only PNG and JPG files are accepted</li>
                <li>• Minimum file size: 10KB</li>
                <li>• Maximum file size: 5MB</li>
                <li>• Select document type before uploading</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">
              Uploaded Files ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {selectedDocumentType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between animate-fade-in">
        <Button variant="outline" onClick={onBack} className="hover-lift">
          Back
        </Button>
        <Button 
          onClick={uploadFiles} 
          disabled={uploadedFiles.length === 0 || !selectedDocumentType || uploading}
          className="hover-lift"
        >
          {uploading ? 'Uploading...' : `Upload ${uploadedFiles.length} File(s) & Continue`}
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
