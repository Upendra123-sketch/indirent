
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, Download, Loader2 } from 'lucide-react';
import { RentalFormData } from "@/types/rental";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SummaryProps {
  formData: RentalFormData;
  onBack: () => void;
}

const Summary = ({ formData, onBack }: SummaryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
        description: "Rental agreement submitted successfully. You can view it in your profile.",
      });

      // Navigate to profile to show the new agreement
      navigate('/profile');
      
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
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Rental Agreement Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button variant="outline" onClick={onBack} className="hover-lift group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
          Back to Edit
        </Button>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={downloadAgreement} className="hover-lift group">
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
            Download Summary
          </Button>
          
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="hover-lift group bg-gradient-to-r from-primary to-secondary"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Submit Agreement
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
