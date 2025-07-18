import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { IndianRupee, Calculator } from 'lucide-react';
import { RentalFormData } from '@/types/rental';

interface PaymentSummaryProps {
  formData: RentalFormData;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ formData }) => {
  const rentAmount = parseFloat(formData.monthlyRent || '0') || 0;
  const securityDeposit = parseFloat(formData.refundableDeposit || '0') || 0;
  
  // Platform charges and other fees
  const stampDuty = 504;
  const registrationFee = 1000;
  const platformFee = 999;
  
  const total = stampDuty + registrationFee + platformFee;

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calculator className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-900">Payment Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Rental Details */}
          {rentAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly Rent</span>
              <div className="flex items-center text-sm font-medium text-gray-900">
                <IndianRupee className="w-3 h-3 mr-1" />
                {rentAmount.toLocaleString('en-IN')}
              </div>
            </div>
          )}
          
          {securityDeposit > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Security Deposit</span>
              <div className="flex items-center text-sm font-medium text-gray-900">
                <IndianRupee className="w-3 h-3 mr-1" />
                {securityDeposit.toLocaleString('en-IN')}
              </div>
            </div>
          )}

          {/* Agreement Charges */}
          <div className="border-t pt-4">
            <div className="text-sm font-medium text-gray-900 mb-3">Agreement Charges</div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Stamp Duty</span>
              <div className="flex items-center text-sm text-gray-900">
                <IndianRupee className="w-3 h-3 mr-1" />
                {stampDuty}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Registration Fee</span>
              <div className="flex items-center text-sm text-gray-900">
                <IndianRupee className="w-3 h-3 mr-1" />
                {registrationFee.toLocaleString('en-IN')}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-blue-600 font-medium">IndiRent Service Fee</span>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <IndianRupee className="w-3 h-3 mr-1" />
                {platformFee}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t">
              <span className="text-sm font-semibold text-gray-900">Total Amount</span>
              <div className="flex items-center text-lg font-bold text-blue-600">
                <IndianRupee className="w-4 h-4 mr-1" />
                {total.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> This is an estimated cost. Final charges may vary based on agreement terms and state regulations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
