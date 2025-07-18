import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { File, Eye, Download, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UploadedDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_url: string;
  user_id: string;
  uploaded_at: string;
}

interface UploadedFilesDisplayProps {
  documentTypes: string[];
  title?: string;
}

const UploadedFilesDisplay = ({ documentTypes, title = "Uploaded Documents" }: UploadedFilesDisplayProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocument[]>([]);
  const { toast } = useToast();

  const loadUploadedFiles = () => {
    const stored = localStorage.getItem('rental_documents');
    if (stored) {
      try {
        const allDocs: UploadedDocument[] = JSON.parse(stored);
        // Filter documents for the specified types
        const relevantDocs = allDocs.filter(doc => 
          documentTypes.some(type => 
            doc.document_type.toLowerCase().includes(type.toLowerCase()) ||
            type.toLowerCase().includes(doc.document_type.toLowerCase())
          )
        );
        setUploadedFiles(relevantDocs);
      } catch (error) {
        console.error('Error parsing stored documents:', error);
        setUploadedFiles([]);
      }
    }
  };

  const deleteFile = (id: string) => {
    const stored = localStorage.getItem('rental_documents');
    if (stored) {
      try {
        const allDocs: UploadedDocument[] = JSON.parse(stored);
        const updatedDocs = allDocs.filter(doc => doc.id !== id);
        localStorage.setItem('rental_documents', JSON.stringify(updatedDocs));
        loadUploadedFiles();
        toast({
          title: "File Deleted",
          description: "File has been removed successfully",
        });
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const viewFile = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const downloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    loadUploadedFiles();
    
    // Set up an interval to refresh the files every 2 seconds
    const interval = setInterval(loadUploadedFiles, 2000);
    
    return () => clearInterval(interval);
  }, [documentTypes]);

  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            {title} ({uploadedFiles.length})
          </h4>
          <Badge variant="secondary" className="text-xs">
            Successfully Uploaded
          </Badge>
        </div>
        
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div 
              key={file.id} 
              className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:shadow-sm transition-all animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center space-x-3 flex-1">
                <File className="h-5 w-5 text-green-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.file_name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{file.document_type}</span>
                    <span>•</span>
                    <span>{formatFileSize(file.file_size)}</span>
                    <span>•</span>
                    <span>{new Date(file.uploaded_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => viewFile(file.file_url)}
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                  title="View file"
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadFile(file.file_url, file.file_name)}
                  className="h-8 w-8 p-0 hover:bg-green-100"
                  title="Download file"
                >
                  <Download className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteFile(file.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                  title="Delete file"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadedFilesDisplay;
