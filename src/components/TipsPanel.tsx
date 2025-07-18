import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lightbulb, Shield, Clock, FileText, Upload, CheckCircle } from 'lucide-react';

interface TipsPanelProps {
  currentStep: number;
}

const TipsPanel: React.FC<TipsPanelProps> = ({ currentStep }) => {
  const tips = {
    1: [
      { icon: Clock, text: "Agreement duration of 11 months is most common and avoids complex registration." },
      { icon: Shield, text: "Security deposit is typically 2-3 months of rent amount." },
      { icon: FileText, text: "Keep all amount details handy - monthly rent, deposit, etc." }
    ],
    2: [
      { icon: FileText, text: "Provide complete property address for accurate documentation." },
      { icon: Shield, text: "Verify property ownership documents before proceeding." },
      { icon: Clock, text: "Double-check pincode and locality spelling." }
    ],
    3: [
      { icon: FileText, text: "Ensure all landlord documents are clear and readable." },
      { icon: Shield, text: "Verify Aadhar and PAN details match exactly with documents." },
      { icon: Clock, text: "Contact details should be active and accessible." }
    ],
    4: [
      { icon: FileText, text: "Tenant details should match with ID proof documents." },
      { icon: Shield, text: "Ensure phone number is linked with Aadhar card." },
      { icon: Clock, text: "Email should be active for receiving agreement copies." }
    ],
    5: [
      { icon: FileText, text: "Witnesses should be adults with valid ID proof." },
      { icon: Shield, text: "Both witnesses must be present during agreement signing." },
      { icon: Clock, text: "Collect witness details in advance to save time." }
    ],
    6: [
      { icon: Upload, text: "Upload clear, readable scans of all required documents." },
      { icon: FileText, text: "Accepted formats: PDF, JPG, PNG (max 5MB each)." },
      { icon: Shield, text: "Keep original documents ready for verification." }
    ],
    7: [
      { icon: CheckCircle, text: "Review all details carefully before finalizing." },
      { icon: FileText, text: "Download and keep copies of the signed agreement." },
      { icon: Shield, text: "Agreement will be legally binding once signed." }
    ]
  };

  const currentTips = tips[currentStep as keyof typeof tips] || tips[1];

  return (
    <Card className="bg-yellow-50 border border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
          <span className="text-yellow-800">Helpful Tips</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <tip.icon className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsPanel;
