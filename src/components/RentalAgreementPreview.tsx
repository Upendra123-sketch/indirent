import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from 'lucide-react';
import { RentalFormData } from "@/types/rental";
import RentalAgreementPDF from './RentalAgreementPDF';

interface RentalAgreementPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  formData: RentalFormData;
  onDownload?: () => void;
}

const RentalAgreementPreview = ({ isOpen, onClose, formData, onDownload }: RentalAgreementPreviewProps) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Rental Agreement Preview</DialogTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Print/Save as PDF
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-100 p-4">
          <div className="bg-white shadow-lg">
            <RentalAgreementPDF formData={formData} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalAgreementPreview;
