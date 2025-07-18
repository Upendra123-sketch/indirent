
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Loader2, CreditCard, Shield, CheckCircle, IndianRupee, Banknote } from 'lucide-react';
import { RentalFormData } from "@/types/rental";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import RentalAgreementPreview from '@/components/RentalAgreementPreview';

interface SummaryProps {
  formData: RentalFormData;
  onBack: () => void;
}

const Summary = ({ formData, onBack }: SummaryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'review' | 'payment' | 'processing'>('review');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'online' | 'cash' | null>(null);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculate payment breakdown
  const agreementFee = 299; // Base fee for agreement creation
  const stampDutyFee = 100; // Stamp duty processing
  const processingFee = 50; // Processing fee
  const totalAmount = agreementFee + stampDutyFee + processingFee;

  const handlePaymentProcess = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }
    setPaymentStep('payment');
  };

  const handleMakePayment = async () => {
    setPaymentStep('processing');
    setIsSubmitting(true);
    
    if (selectedPaymentMethod === 'online') {
      // Integrate Razorpay here
      await handleRazorpayPayment();
    } else {
      // Handle cash payment
      await handleCashPayment();
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const options = {
        key: "rzp_test_9WaeLLXnifW2vg", // Replace with your Razorpay key
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        name: "IndiRent",
        description: "Rental Agreement Processing Fee",
        image: "/src/assets/indirent-logo.jpg",
        handler: async function (response: any) {
          console.log('Payment successful:', response);
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          await handleSubmit();
        },
        prefill: {
          name: user?.user_metadata?.full_name || formData.tenantName || '',
          email: user?.email || formData.tenantEmail || '',
          contact: formData.tenantPhone || ''
        },
        notes: {
          rental_agreement_id: formData.agreementId || 'new'
        },
        theme: {
          color: "#4F46E5"
        },
        modal: {
          ondismiss: function() {
            setPaymentStep('payment');
            setIsSubmitting(false);
            toast({
              title: "Payment Cancelled",
              description: "Payment was cancelled by user.",
              variant: "destructive",
            });
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay payment error:', error);
      setPaymentStep('payment');
      setIsSubmitting(false);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCashPayment = async () => {
    // Simulate cash payment processing
    setTimeout(async () => {
      toast({
        title: "Cash Payment Recorded",
        description: "Your cash payment preference has been recorded.",
      });
      await handleSubmit();
    }, 2000);
  };

  const handleSubmit = async () => {
    console.log('Starting form submission with user:', user);
    
    if (!user) {
      console.error('No user found for submission');
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit the rental agreement.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting rental agreement:', formData);
      
      // Validate required fields
      if (!formData.landlordName || !formData.tenantName || !formData.monthlyRent) {
        throw new Error('Missing required fields: landlord name, tenant name, and monthly rent are required');
      }

      const agreementData = {
        landlord_name: formData.landlordName,
        landlord_email: formData.landlordEmail || null,
        landlord_phone: formData.landlordPhone || null,
        tenant_name: formData.tenantName,
        tenant_email: formData.tenantEmail || null,
        tenant_phone: formData.tenantPhone || null,
        property_address: formData.propertyAddress || `${formData.houseNumber || ''} ${formData.buildingName || ''} ${formData.locality || ''} ${formData.propertyCity || ''}`.trim(),
        property_type: formData.propertyType || null,
        rent_amount: parseFloat(formData.monthlyRent),
        security_deposit: formData.refundableDeposit ? parseFloat(formData.refundableDeposit) : null,
        lease_start_date: formData.agreementStartDate || null,
        lease_end_date: null,
        agreement_terms: `Duration: ${formData.agreementDuration || 'Not specified'}, Lock-in Period: ${formData.lockinPeriod || 'Not specified'}`,
        status: 'pending'
      };

      console.log('Inserting agreement data:', agreementData);

      const { data, error } = await supabase
        .from('rental_agreements')
        .insert(agreementData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Rental agreement created successfully:', data);

      toast({
        title: "Success!",
        description: "Rental agreement submitted successfully and payment completed. Redirecting to your agreements...",
      });

      // Navigate to profile to show the new agreement
      setTimeout(() => {
        navigate('/profile');
      }, 1500); // Small delay to show the success message
      
    } catch (error: any) {
      console.error('Error submitting rental agreement:', error);
      
      let errorMessage = "Failed to submit rental agreement. Please try again.";
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.code === '23505') {
        errorMessage = "This agreement may already exist.";
      } else if (error?.code === '42501') {
        errorMessage = "Permission denied. Please check your authentication.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadAgreement = () => {
    // Create a comprehensive agreement document
    const agreementData = `
RENTAL AGREEMENT SUMMARY
========================

PROPERTY DETAILS:
- Type: ${formData.propertyType || 'Not specified'}
- Address: ${formData.propertyAddress || `${formData.houseNumber || ''} ${formData.buildingName || ''} ${formData.locality || ''} ${formData.propertyCity || ''}`.trim()}
- Floor: ${formData.floorNumber || 'Not specified'}
- Pincode: ${formData.pincode || 'Not specified'}

LANDLORD DETAILS:
- Name: ${formData.landlordName || 'Not specified'}
- Email: ${formData.landlordEmail || 'Not specified'}
- Phone: ${formData.landlordPhone || 'Not specified'}
- Aadhar: ${formData.landlordAadhar || 'Not specified'}
- PAN: ${formData.landlordPan || 'Not specified'}

TENANT DETAILS:
- Name: ${formData.tenantName || 'Not specified'}
- Email: ${formData.tenantEmail || 'Not specified'}
- Phone: ${formData.tenantPhone || 'Not specified'}
- Aadhar: ${formData.tenantAadhar || 'Not specified'}
- PAN: ${formData.tenantPan || 'Not specified'}

FINANCIAL DETAILS:
- Monthly Rent: ₹${formData.monthlyRent || '0'}
- Security Deposit: ₹${formData.refundableDeposit || '0'}
- Non-refundable Deposit: ₹${formData.nonRefundableDeposit || '0'}

AGREEMENT TERMS:
- Duration: ${formData.agreementDuration || 'Not specified'}
- Start Date: ${formData.agreementStartDate || 'Not specified'}
- Lock-in Period: ${formData.lockinPeriod || 'Not specified'}

WITNESS 1:
- Name: ${formData.witness1Name || 'Not specified'}
- Phone: ${formData.witness1Phone || 'Not specified'}
- Age: ${formData.witness1Age || 'Not specified'}
- Aadhar: ${formData.witness1Aadhar || 'Not specified'}

WITNESS 2:
- Name: ${formData.witness2Name || 'Not specified'}
- Phone: ${formData.witness2Phone || 'Not specified'}
- Age: ${formData.witness2Age || 'Not specified'}
- Aadhar: ${formData.witness2Aadhar || 'Not specified'}

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([agreementData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rental-agreement-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Payment Processing Step */}
      {paymentStep === 'processing' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Processing Payment...</h3>
                <p className="text-green-600">Please wait while we process your payment and create your rental agreement.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Step */}
      {paymentStep === 'payment' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <CreditCard className="h-5 w-5" />
              Complete Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">Payment Details</h4>
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedPaymentMethod === 'online' ? (
                    <>
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Online Payment via Razorpay</span>
                    </>
                  ) : (
                    <>
                      <Banknote className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Cash Payment</span>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Agreement Creation Fee</span>
                  <span>₹{agreementFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stamp Duty Processing</span>
                  <span>₹{stampDutyFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>₹{processingFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Shield className="h-4 w-4" />
              <span>100% Secure Payment • SSL Encrypted</span>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setPaymentStep('review')}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Review
              </Button>
              <Button 
                onClick={handleMakePayment}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : selectedPaymentMethod === 'online' ? (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay ₹{totalAmount} Online
                  </>
                ) : (
                  <>
                    <Banknote className="mr-2 h-4 w-4" />
                    Record Cash Payment
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Step */}
      {paymentStep === 'review' && (
        <>
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Rental Agreement Preview
                <Badge variant="secondary" className="ml-2">Ready for Payment</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PDF Preview Button */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Preview Your Agreement</h4>
                    <p className="text-blue-600 text-sm">Review the complete rental agreement before payment</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowPDFPreview(true)}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Agreement PDF
                  </Button>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Type:</span> {formData.propertyType}</div>
                  <div><span className="font-medium">Floor:</span> {formData.floorNumber}</div>
                  <div className="md:col-span-2"><span className="font-medium">Address:</span> {formData.houseNumber} {formData.buildingName}, {formData.locality}, {formData.propertyCity} - {formData.pincode}</div>
                </div>
              </div>

              <Separator />

              {/* Payment Method Selection */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Select Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Online Payment */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === 'online' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod('online')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedPaymentMethod === 'online' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === 'online' && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Online Payment</h4>
                        <p className="text-sm text-gray-600">Pay securely with Razorpay</p>
                      </div>
                    </div>
                  </div>

                  {/* Cash Payment */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === 'cash' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod('cash')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedPaymentMethod === 'cash' 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === 'cash' && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <Banknote className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-semibold">Cash Payment</h4>
                        <p className="text-sm text-gray-600">Pay in person to agent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Landlord Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Landlord Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Name:</span> {formData.landlordName}</div>
                  <div><span className="font-medium">Email:</span> {formData.landlordEmail}</div>
                  <div><span className="font-medium">Phone:</span> {formData.landlordPhone}</div>
                  <div><span className="font-medium">Aadhar:</span> {formData.landlordAadhar}</div>
                </div>
              </div>

              <Separator />

              {/* Tenant Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Tenant Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Name:</span> {formData.tenantName}</div>
                  <div><span className="font-medium">Email:</span> {formData.tenantEmail}</div>
                  <div><span className="font-medium">Phone:</span> {formData.tenantPhone}</div>
                  <div><span className="font-medium">Aadhar:</span> {formData.tenantAadhar}</div>
                </div>
              </div>

              <Separator />

              {/* Financial Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Financial Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><span className="font-medium">Monthly Rent:</span> ₹{formData.monthlyRent}</div>
                  <div><span className="font-medium">Security Deposit:</span> ₹{formData.refundableDeposit}</div>
                  <div><span className="font-medium">Duration:</span> {formData.agreementDuration}</div>
                </div>
              </div>

              <Separator />

              {/* Agreement Terms */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Agreement Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Start Date:</span> {formData.agreementStartDate}</div>
                  <div><span className="font-medium">Lock-in Period:</span> {formData.lockinPeriod}</div>
                </div>
              </div>

              {/* Witnesses */}
              {(formData.witness1Name || formData.witness2Name) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-primary">Witnesses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formData.witness1Name && (
                        <div>
                          <h4 className="font-medium mb-2">Witness 1</h4>
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Name:</span> {formData.witness1Name}</div>
                            <div><span className="font-medium">Phone:</span> {formData.witness1Phone}</div>
                            <div><span className="font-medium">Age:</span> {formData.witness1Age}</div>
                          </div>
                        </div>
                      )}
                      {formData.witness2Name && (
                        <div>
                          <h4 className="font-medium mb-2">Witness 2</h4>
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Name:</span> {formData.witness2Name}</div>
                            <div><span className="font-medium">Phone:</span> {formData.witness2Phone}</div>
                            <div><span className="font-medium">Age:</span> {formData.witness2Age}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Summary Card */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <IndianRupee className="h-5 w-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Agreement Creation & Legal Processing</span>
                    <span>₹{agreementFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stamp Duty Processing</span>
                    <span>₹{stampDutyFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform & Processing Fee</span>
                    <span>₹{processingFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Payable Amount</span>
                    <span className="text-green-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Includes GST • One-time payment • No hidden charges</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" onClick={onBack} className="hover-lift group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
              Back to Edit
            </Button>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={downloadAgreement} className="hover-lift group">
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
                Download Preview
              </Button>
              
              <Button 
                onClick={handlePaymentProcess} 
                className="hover-lift group bg-gradient-to-r from-green-600 to-green-700"
              >
                <CreditCard className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Proceed to Payment (₹{totalAmount})
              </Button>
            </div>
          </div>
        </>
      )}

      {/* PDF Preview Modal */}
      <RentalAgreementPreview
        isOpen={showPDFPreview}
        onClose={() => setShowPDFPreview(false)}
        formData={formData}
      />
    </div>
  );
};

// Add Razorpay types to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default Summary;
