
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ArrowLeft, Shield, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "@/components/rental-steps/StepIndicator";
import ContractDetail from "@/components/rental-steps/ContractDetail";
import PropertyDetail from "@/components/rental-steps/PropertyDetail";
import LandlordDetail from "@/components/rental-steps/LandlordDetail";
import TenantDetail from "@/components/rental-steps/TenantDetail";
import WitnessDetail from "@/components/rental-steps/WitnessDetail";
import Summary from "@/components/rental-steps/Summary";
import { RentalFormData } from "@/types/rental";
import AuthModal from "@/components/AuthModal";

const RentalAgreement = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RentalFormData>({});
  const [saving, setSaving] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const stepNames = [
    "Contract Detail",
    "Property Detail", 
    "Landlord Detail",
    "Tenant Detail",
    "Witness Detail",
    "Summary"
  ];

  // Check authentication on component mount
  useEffect(() => {
    if (!loading && !user) {
      setShowAuth(true);
    }
  }, [user, loading]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    // If we're on the final step (step 5), save to database
    if (currentStep === 5) {
      await saveRentalAgreement();
    }
    
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const saveRentalAgreement = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your rental agreement",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    
    try {
      // Create property address from form data
      const propertyAddress = [
        formData.houseNumber,
        formData.buildingName,
        formData.locality,
        formData.roadStreet,
        formData.societyName,
        formData.pincode
      ].filter(Boolean).join(', ');

      const agreementData = {
        landlord_name: formData.landlordName || '',
        landlord_email: formData.landlordEmail || '',
        landlord_phone: formData.landlordPhone || '',
        tenant_name: formData.tenantName || '',
        tenant_email: formData.tenantEmail || '',
        tenant_phone: formData.tenantPhone || '',
        property_address: propertyAddress,
        property_type: formData.propertyType || '',
        rent_amount: parseFloat(formData.monthlyRent || '0') || 0,
        security_deposit: formData.refundableDeposit ? parseFloat(formData.refundableDeposit) : null,
        lease_start_date: formData.agreementStartDate || null,
        lease_end_date: null, // Will be calculated based on duration
        agreement_terms: `Duration: ${formData.agreementDuration}, Lock-in: ${formData.lockinPeriod} months`,
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('rental_agreements')
        .insert([agreementData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your rental agreement has been saved successfully.",
      });

      // Store the agreement ID and update computed fields for reference
      setFormData(prev => ({ 
        ...prev, 
        agreementId: data.id,
        propertyAddress,
        rentAmount: formData.monthlyRent,
        securityDeposit: formData.refundableDeposit,
        leaseStartDate: formData.agreementStartDate
      }));
      
    } catch (error) {
      console.error('Error saving rental agreement:', error);
      toast({
        title: "Error",
        description: "Failed to save rental agreement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContractDetail
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PropertyDetail
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <LandlordDetail
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <TenantDetail
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <WitnessDetail
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Summary
            formData={formData}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show auth modal
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">RA</span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">Rental Agreement</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to create your rental agreement. Your data will be securely saved to your account.
            </p>
            <Button 
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Sign In to Continue
            </Button>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuth} 
          onClose={() => setShowAuth(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    );
  }

  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">RA</span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">Rental Agreement</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Summary formData={formData} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">RA</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Rental Agreement</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>100% Legal & Secure</span>
            </div>
          </div>
        </div>
      </header>

      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={6} 
        stepNames={stepNames} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {stepNames[currentStep - 1]}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500"
                    onClick={() => navigate('/')}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {renderCurrentStep()}
              </CardContent>
            </Card>
          </div>

          {/* Tips Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Fill all required fields marked with *</p>
                  <p>• Keep your documents ready for upload</p>
                  <p>• Double-check all information before proceeding</p>
                  <p>• Your data is automatically saved</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreement;
