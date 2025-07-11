
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Home, Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RentalFormData } from "@/types/rental";

interface SummaryProps {
  formData: RentalFormData;
  onBack: () => void;
}

const Summary = ({ formData, onBack }: SummaryProps) => {
  const navigate = useNavigate();
  const completionPercentage = 100;
  const rentAmount = parseFloat(formData.rentAmount || formData.monthlyRent || '0') || 0;
  const securityDeposit = parseFloat(formData.securityDeposit || formData.refundableDeposit || '0') || 0;
  const totalAmount = rentAmount + securityDeposit;

  const handleGoHome = () => {
    navigate('/');
  };

  const handleDownloadAgreement = () => {
    // Generate and download agreement
    const agreementData = {
      'Agreement ID': formData.agreementId || 'N/A',
      'Property Address': formData.propertyAddress || 'Not specified',
      'Property Type': formData.propertyType || 'Not specified',
      'Landlord Name': formData.landlordName || 'Not specified',
      'Landlord Email': formData.landlordEmail || 'Not specified',
      'Landlord Phone': formData.landlordPhone || 'Not specified',
      'Tenant Name': formData.tenantName || 'Not specified',
      'Tenant Email': formData.tenantEmail || 'Not specified',
      'Tenant Phone': formData.tenantPhone || 'Not specified',
      'Monthly Rent': `₹${rentAmount.toLocaleString()}`,
      'Security Deposit': securityDeposit > 0 ? `₹${securityDeposit.toLocaleString()}` : 'N/A',
      'Agreement Duration': formData.agreementDuration || 'Not specified',
      'Start Date': formData.agreementStartDate || 'Not specified',
      'Lock-in Period': formData.lockinPeriod ? `${formData.lockinPeriod} months` : 'Not specified'
    };

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      Object.entries(agreementData).map(([key, value]) => `${key},${value}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rental-agreement-${formData.agreementId || 'summary'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2 hover-lift">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Agreement Complete!</h2>
      </div>

      {/* Success Message */}
      <div className="text-center mb-8 animate-scale-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-3">
          🎉 Rental Agreement Created Successfully!
        </h3>
        <p className="text-lg text-muted-foreground mb-4">
          Your rental agreement has been saved and is ready for processing.
        </p>
        {formData.agreementId && (
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary">
              Agreement ID: {formData.agreementId}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button 
          onClick={handleGoHome}
          className="bg-primary hover:bg-primary/90 text-primary-foreground hover-lift group"
          size="lg"
        >
          <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Go to Home
        </Button>
        <Button 
          variant="outline"
          onClick={handleDownloadAgreement}
          className="hover-lift group"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
          Download Summary
        </Button>
        <Button 
          variant="outline"
          className="hover-lift group"
          size="lg"
        >
          <Share2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Share Agreement
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agreement Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="hover-lift animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  📋 Rental Agreement Summary
                </span>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Details */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  🏠 Property Details
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <p className="font-medium">{formData.propertyAddress || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">{formData.propertyType || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Rental Terms */}
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  💰 Rental Terms
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monthly Rent:</span>
                    <p className="font-medium text-lg text-primary">₹{rentAmount.toLocaleString()}</p>
                  </div>
                  {securityDeposit > 0 && (
                    <div>
                      <span className="text-muted-foreground">Security Deposit:</span>
                      <p className="font-medium">₹{securityDeposit.toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{formData.agreementDuration || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lock-in Period:</span>
                    <p className="font-medium">{formData.lockinPeriod ? `${formData.lockinPeriod} months` : 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Party Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    🏢 Landlord Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.landlordName || 'Not specified'}</span></p>
                    <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{formData.landlordEmail || 'Not specified'}</span></p>
                    <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{formData.landlordPhone || 'Not specified'}</span></p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    👤 Tenant Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.tenantName || 'Not specified'}</span></p>
                    <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{formData.tenantEmail || 'Not specified'}</span></p>
                    <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{formData.tenantPhone || 'Not specified'}</span></p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Agreement Status</span>
                  <span className="text-sm font-medium text-green-600">Completed ✓</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💸 Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span className="font-medium">₹{rentAmount.toLocaleString()}</span>
                  </div>
                  {securityDeposit > 0 && (
                    <div className="flex justify-between">
                      <span>Security Deposit</span>
                      <span className="font-medium">₹{securityDeposit.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    🎉 Agreement Successfully Created!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your rental agreement is now saved in the system and ready for processing.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Legally binding document
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Expert verified
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Ready for signature
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Summary;
