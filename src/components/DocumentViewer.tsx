import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, RefreshCw } from "lucide-react";

interface StoredDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_url: string;
  user_id: string;
  rental_agreement_id?: string;
  uploaded_at: string;
}

const DocumentViewer = () => {
  const [documents, setDocuments] = useState<StoredDocument[]>([]);

  const loadDocuments = () => {
    const stored = localStorage.getItem('rental_documents');
    if (stored) {
      try {
        const docs = JSON.parse(stored);
        setDocuments(docs);
      } catch (error) {
        console.error('Error parsing stored documents:', error);
        setDocuments([]);
      }
    }
  };

  const clearDocuments = () => {
    localStorage.removeItem('rental_documents');
    setDocuments([]);
  };

  const deleteDocument = (id: string) => {
    const updated = documents.filter(doc => doc.id !== id);
    localStorage.setItem('rental_documents', JSON.stringify(updated));
    setDocuments(updated);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Uploaded Documents (LocalStorage)</h2>
        <div className="space-x-2">
          <Button onClick={loadDocuments} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={clearDocuments} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-center">No documents uploaded yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{doc.document_type}</CardTitle>
                    <p className="text-sm text-gray-500">{doc.file_name}</p>
                  </div>
                  <Badge variant="secondary">
                    {formatFileSize(doc.file_size)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Uploaded:</strong> {new Date(doc.uploaded_at).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <strong>User ID:</strong> {doc.user_id}
                  </p>
                  {doc.rental_agreement_id && (
                    <p className="text-sm">
                      <strong>Agreement ID:</strong> {doc.rental_agreement_id}
                    </p>
                  )}
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => window.open(doc.file_url, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      View/Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteDocument(doc.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
