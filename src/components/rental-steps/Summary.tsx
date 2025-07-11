
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ArrowLeft, CheckCircle } from "lucide-react";
import { RentalFormData } from "@/types/rental";

interface SummaryProps {
  formData: RentalFormData;
  onBack: () => void;
}

const Summary = ({ formData, onBack }: SummaryProps) => {
  const completionPercentage = 100; // Agreement is completed when reaching this step
  const rentAmount = parseFloat(formData.rentAmount || formData.monthlyRent || '0') || 0;
  const securityDeposit = parseFloat(formData.securityDeposit || formData.refundableDeposit || '0') || 0;
  const totalAmount = rentAmount + securityDeposit;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Agreement Complete!</h2>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Rental Agreement Created Successfully!</h3>
        <p className="text-gray-600">Your rental agreement has been saved and is ready for processing.</p>
        {formData.agreementId && (
          <p className="text-sm text-gray-500 mt-2">Agreement ID: {formData.agreementId}</p>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Rental Agreement Summary</span>
                <img src="/placeholder.svg" alt="Stamp" className="h-12 w-12" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Property Details</h4>
                  <p className="text-sm text-gray-600">{formData.propertyAddress || 'Not specified'}</p>
                  <p className="text-sm text-gray-600">{formData.propertyType || 'Type not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Rental Terms</h4>
                  <p className="text-sm text-gray-600">Rent: ₹{rentAmount.toLocaleString()}/month</p>
                  {securityDeposit > 0 && (
                    <p className="text-sm text-gray-600">Security Deposit: ₹{securityDeposit.toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Landlord</h4>
                  <p className="text-sm text-gray-600">{formData.landlordName || 'Not specified'}</p>
                  <p className="text-sm text-gray-600">{formData.landlordEmail || ''}</p>
                  <p className="text-sm text-gray-600">{formData.landlordPhone || ''}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tenant</h4>
                  <p className="text-sm text-gray-600">{formData.tenantName || 'Not specified'}</p>
                  <p className="text-sm text-gray-600">{formData.tenantEmail || ''}</p>
                  <p className="text-sm text-gray-600">{formData.tenantPhone || ''}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Agreement Status</span>
                  <span className="text-sm font-medium text-green-600">Completed</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span>₹{rentAmount.toLocaleString()}</span>
                  </div>
                  {securityDeposit > 0 && (
                    <div className="flex justify-between">
                      <span>Security Deposit</span>
                      <span>₹{securityDeposit.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-green-600 font-medium mb-2">Agreement Successfully Created!</p>
                  <p className="text-xs text-gray-500">
                    Your rental agreement is now saved in the system and ready for processing.
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
