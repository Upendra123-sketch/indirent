import React from 'react';
import { RentalFormData } from "@/types/rental";

interface RentalAgreementPDFProps {
  formData: RentalFormData;
}

const RentalAgreementPDF = ({ formData }: RentalAgreementPDFProps) => {
  const currentDate = new Date().toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
  const propertyAddress = formData.propertyAddress || 
    `${formData.houseNumber || ''} ${formData.buildingName || ''} ${formData.locality || ''} ${formData.propertyCity || ''}`.trim();

  return (
    <div className="bg-white p-12 max-w-4xl mx-auto text-sm leading-relaxed" style={{ fontFamily: 'Times, serif' }}>
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-4 tracking-wide">RENTAL AGREEMENT</h1>
        <p className="text-lg font-semibold">DEED OF LEASE</p>
        <p className="text-base mt-2">This Agreement is executed on {currentDate}</p>
      </div>

      {/* Parties */}
      <div className="mb-8">
        <p className="text-justify leading-7 mb-4">
          This <strong>RENTAL AGREEMENT</strong> is made and entered into on <strong>{currentDate}</strong> between:
        </p>

        <div className="ml-8 mb-6">
          <p className="mb-4">
            <strong>LESSOR/LANDLORD:</strong> <span className="underline">{formData.landlordName}</span>, 
            {formData.landlordPhone && ` residing at contact number ${formData.landlordPhone},`}
            {formData.landlordEmail && ` email: ${formData.landlordEmail},`}
            {formData.landlordPan && ` PAN: ${formData.landlordPan},`}
            {formData.landlordAadhar && ` Aadhar: ${formData.landlordAadhar},`}
            (hereinafter referred to as the "LANDLORD" which expression shall unless the context otherwise requires include his/her heirs, successors, administrators and assigns)
          </p>

          <p className="text-center my-4 font-bold">AND</p>

          <p className="mb-4">
            <strong>LESSEE/TENANT:</strong> <span className="underline">{formData.tenantName}</span>, 
            {formData.tenantPhone && ` residing at contact number ${formData.tenantPhone},`}
            {formData.tenantEmail && ` email: ${formData.tenantEmail},`}
            {formData.tenantPan && ` PAN: ${formData.tenantPan},`}
            {formData.tenantAadhar && ` Aadhar: ${formData.tenantAadhar},`}
            (hereinafter referred to as the "TENANT" which expression shall unless the context otherwise requires include his/her heirs, successors, administrators and assigns)
          </p>
        </div>
      </div>

      {/* Whereas Clauses */}
      <div className="mb-8">
        <p className="font-bold mb-3">WHEREAS:</p>
        <div className="space-y-3 ml-4">
          <p><strong>A.</strong> The LANDLORD is the absolute owner of the property situated at <strong>{propertyAddress}</strong> (hereinafter referred to as the "DEMISED PREMISES").</p>
          
          <p><strong>B.</strong> The TENANT has approached the LANDLORD for taking the said premises on rent for residential purposes and the LANDLORD has agreed to let out the same to the TENANT.</p>
          
          <p><strong>C.</strong> Both parties have agreed to enter into this Agreement on the terms and conditions mentioned hereinafter.</p>
        </div>
      </div>

      {/* Now Therefore */}
      <div className="mb-8">
        <p className="font-bold mb-4">NOW THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:</p>

        <div className="space-y-4">
          <div>
            <p><strong>1. DEMISED PREMISES:</strong></p>
            <p className="ml-4">The LANDLORD hereby grants to the TENANT and the TENANT hereby takes from the LANDLORD, the {formData.propertyType || 'residential'} premises situated at <strong>{propertyAddress}</strong> for a period of {formData.agreementDuration || '11 months'} commencing from {formData.agreementStartDate ? new Date(formData.agreementStartDate).toLocaleDateString('en-IN') : '____________'}.</p>
          </div>

          <div>
            <p><strong>2. RENT:</strong></p>
            <p className="ml-4">The TENANT agrees to pay to the LANDLORD a monthly rent of <strong>Rs. {formData.monthlyRent ? Number(formData.monthlyRent).toLocaleString('en-IN') : '____________'}/-</strong> per calendar month. The rent shall be paid on or before the 5th day of each English calendar month.</p>
          </div>

          {formData.refundableDeposit && (
            <div>
              <p><strong>3. SECURITY DEPOSIT:</strong></p>
              <p className="ml-4">The TENANT has paid an amount of <strong>Rs. {Number(formData.refundableDeposit).toLocaleString('en-IN')}/-</strong> as security deposit which shall be refunded to the TENANT at the time of vacating the premises after adjusting any dues, if any.</p>
            </div>
          )}

          <div>
            <p><strong>4. USE OF PREMISES:</strong></p>
            <p className="ml-4">The TENANT shall use the demised premises only for residential purposes and shall not use the same for any commercial purpose or any purpose other than residence.</p>
          </div>

          <div>
            <p><strong>5. MAINTENANCE:</strong></p>
            <p className="ml-4">The TENANT shall maintain the demised premises in good and tenantable condition and shall not make any structural changes or alterations to the premises without the written consent of the LANDLORD.</p>
          </div>

          <div>
            <p><strong>6. UTILITIES:</strong></p>
            <p className="ml-4">The TENANT shall be responsible for payment of electricity, water, gas, telephone, internet and other utility charges during the period of tenancy.</p>
          </div>

          {formData.lockinPeriod && (
            <div>
              <p><strong>7. LOCK-IN PERIOD:</strong></p>
              <p className="ml-4">This Agreement shall have a lock-in period of {formData.lockinPeriod} months during which neither party can terminate this Agreement.</p>
            </div>
          )}

          <div>
            <p><strong>8. TERMINATION:</strong></p>
            <p className="ml-4">Either party may terminate this Agreement by giving 30 days written notice to the other party after the expiry of the lock-in period, if any.</p>
          </div>

          <div>
            <p><strong>9. GOVERNING LAW:</strong></p>
            <p className="ml-4">This Agreement shall be governed by the laws of India and any dispute arising out of this Agreement shall be subject to the jurisdiction of courts in {formData.propertyCity || 'the local jurisdiction'}.</p>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-16">
        <p className="mb-8 text-center font-bold">IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.</p>
        
        <div className="grid grid-cols-2 gap-16 mt-12">
          <div>
            <div className="border-t border-black pt-3 mt-20">
              <p className="font-bold text-center">LANDLORD</p>
              <p className="text-center mt-2">{formData.landlordName}</p>
              <p className="text-center text-xs mt-1">Date: {currentDate}</p>
            </div>
          </div>
          
          <div>
            <div className="border-t border-black pt-3 mt-20">
              <p className="font-bold text-center">TENANT</p>
              <p className="text-center mt-2">{formData.tenantName}</p>
              <p className="text-center text-xs mt-1">Date: {currentDate}</p>
            </div>
          </div>
        </div>

        {/* Witnesses */}
        <div className="mt-16">
          <p className="font-bold mb-6">WITNESSES:</p>
          <div className="grid grid-cols-2 gap-16">
            {formData.witness1Name && (
              <div>
                <div className="border-t border-black pt-3 mt-12">
                  <p className="font-bold">1. {formData.witness1Name}</p>
                  {formData.witness1Phone && <p className="text-sm">Phone: {formData.witness1Phone}</p>}
                  {formData.witness1Aadhar && <p className="text-sm">Aadhar: {formData.witness1Aadhar}</p>}
                  <p className="text-xs mt-2">Signature: ________________</p>
                </div>
              </div>
            )}
            
            {formData.witness2Name && (
              <div>
                <div className="border-t border-black pt-3 mt-12">
                  <p className="font-bold">2. {formData.witness2Name}</p>
                  {formData.witness2Phone && <p className="text-sm">Phone: {formData.witness2Phone}</p>}
                  {formData.witness2Aadhar && <p className="text-sm">Aadhar: {formData.witness2Aadhar}</p>}
                  <p className="text-xs mt-2">Signature: ________________</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-300 text-center text-xs text-gray-600">
        <p>This agreement has been prepared electronically and is valid without physical signature as per IT Act 2000</p>
        <p className="mt-1">Generated on: {new Date().toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

export default RentalAgreementPDF;
