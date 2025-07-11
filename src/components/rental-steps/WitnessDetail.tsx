
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { RentalFormData } from "@/types/rental";
import DocumentUploadStep from "@/components/DocumentUploadStep";

interface WitnessDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const WitnessDetail = ({ formData, onInputChange, onNext, onBack }: WitnessDetailProps) => {
  const [showDocumentUpload, setShowDocumentUpload] = React.useState(false);

  const handleContinue = () => {
    setShowDocumentUpload(true);
  };

  const handleDocumentUploadNext = () => {
    setShowDocumentUpload(false);
    onNext();
  };

  const handleDocumentUploadBack = () => {
    setShowDocumentUpload(false);
  };

  const validateAadhar = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Limit to 12 digits
    return digits.slice(0, 12);
  };

  const handleWitness1AadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateAadhar(e.target.value);
    onInputChange('witness1Aadhar', validatedValue);
  };

  const handleWitness2AadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateAadhar(e.target.value);
    onInputChange('witness2Aadhar', validatedValue);
  };

  if (showDocumentUpload) {
    return (
      <DocumentUploadStep
        onNext={handleDocumentUploadNext}
        onBack={handleDocumentUploadBack}
        rentalAgreementId={formData.agreementId}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Witness Details</h2>
        <p className="text-muted-foreground">Provide information for two witnesses (optional but recommended)</p>
      </div>

      <div className="grid gap-6">
        {/* Witness 1 */}
        <Card className="hover-lift animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">1</span>
              Witness 1 Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="witness1Name">Full Name</Label>
                <Input
                  id="witness1Name"
                  value={formData.witness1Name || ''}
                  onChange={(e) => onInputChange('witness1Name', e.target.value)}
                  placeholder="Enter witness full name"
                  className="transition-all duration-300"
                />
              </div>
              <div>
                <Label htmlFor="witness1Phone">Phone Number</Label>
                <Input
                  id="witness1Phone"
                  value={formData.witness1Phone || ''}
                  onChange={(e) => onInputChange('witness1Phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="transition-all duration-300"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="witness1Aadhar">Aadhaar Number (12 Digits)</Label>
                <Input
                  id="witness1Aadhar"
                  value={formData.witness1Aadhar || ''}
                  onChange={handleWitness1AadharChange}
                  placeholder="Enter Aadhaar number"
                  maxLength={12}
                  pattern="[0-9]{12}"
                  className="transition-all duration-300"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.witness1Aadhar?.length || 0}/12 digits
                </p>
              </div>
              <div>
                <Label htmlFor="witness1Age">Age</Label>
                <Input
                  id="witness1Age"
                  value={formData.witness1Age || ''}
                  onChange={(e) => onInputChange('witness1Age', e.target.value)}
                  placeholder="Enter age"
                  type="number"
                  className="transition-all duration-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Witness 2 */}
        <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold text-sm">2</span>
              Witness 2 Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="witness2Name">Full Name</Label>
                <Input
                  id="witness2Name"
                  value={formData.witness2Name || ''}
                  onChange={(e) => onInputChange('witness2Name', e.target.value)}
                  placeholder="Enter witness full name"
                  className="transition-all duration-300"
                />
              </div>
              <div>
                <Label htmlFor="witness2Phone">Phone Number</Label>
                <Input
                  id="witness2Phone"
                  value={formData.witness2Phone || ''}
                  onChange={(e) => onInputChange('witness2Phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="transition-all duration-300"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="witness2Aadhar">Aadhaar Number (12 Digits)</Label>
                <Input
                  id="witness2Aadhar"
                  value={formData.witness2Aadhar || ''}
                  onChange={handleWitness2AadharChange}
                  placeholder="Enter Aadhaar number"
                  maxLength={12}
                  pattern="[0-9]{12}"
                  className="transition-all duration-300"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.witness2Aadhar?.length || 0}/12 digits
                </p>
              </div>
              <div>
                <Label htmlFor="witness2Age">Age</Label>
                <Input
                  id="witness2Age"
                  value={formData.witness2Age || ''}
                  onChange={(e) => onInputChange('witness2Age', e.target.value)}
                  placeholder="Enter age"
                  type="number"
                  className="transition-all duration-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/30 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">About Witnesses</p>
                <p className="text-muted-foreground">
                  Witnesses are not mandatory but recommended for legal agreements. They should be present during 
                  the signing process and provide valid identification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 animate-fade-in">
        <Button variant="outline" onClick={onBack} className="hover-lift group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
          Back
        </Button>
        <Button onClick={handleContinue} className="hover-lift group">
          Continue to Upload Documents
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WitnessDetail;
