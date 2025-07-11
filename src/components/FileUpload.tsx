
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  label?: string;
}

const FileUpload = ({ 
  onFileUpload, 
  acceptedTypes = ".pdf,.jpg,.jpeg,.png", 
  maxFiles = 5,
  label = "Upload Documents"
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.slice(0, maxFiles - uploadedFiles.length);
    
    if (files.length > maxFiles - uploadedFiles.length) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
    }

    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
    
    toast({
      title: "Files uploaded",
      description: `${validFiles.length} file(s) uploaded successfully`,
    });
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      
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
              or click to browse ({acceptedTypes})
            </p>
            <Button 
              type="button"
              variant="outline" 
              onClick={onButtonClick}
              className="hover-lift"
            >
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={handleChange}
        className="hidden"
      />

      {uploadedFiles.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <h4 className="text-sm font-medium text-foreground">
            Uploaded Files ({uploadedFiles.length}/{maxFiles})
          </h4>
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
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Button
                  type="button"
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
      )}
    </div>
  );
};

export default FileUpload;
