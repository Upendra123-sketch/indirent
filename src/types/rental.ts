
export interface RentalFormData {
  // Contract details
  propertyCity?: string;
  refundableDeposit?: string;
  agreementDuration?: string;
  monthlyRent?: string;
  rentNotFixed?: boolean;
  nonRefundableDeposit?: string;
  agreementStartDate?: string;
  userType?: string;
  lockinPeriod?: string;

  // Property details
  propertyType?: string;
  floorNumber?: string;
  houseNumber?: string;
  buildingName?: string;
  locality?: string;
  roadStreet?: string;
  societyName?: string;
  pincode?: string;
  district?: string;
  taluka?: string;

  // Landlord details
  landlordEntityType?: string;
  landlordName?: string;
  landlordPhone?: string;
  landlordAadhar?: string;
  landlordPan?: string;
  landlordEmail?: string;

  // Tenant details
  tenantEntityType?: string;
  tenantName?: string;
  tenantPhone?: string;
  tenantAadhar?: string;
  tenantPan?: string;
  tenantEmail?: string;

  // Witness details
  witness1Name?: string;
  witness1Aadhar?: string;
  witness1Phone?: string;
  witness1Age?: string;
  witness2Name?: string;
  witness2Aadhar?: string;
  witness2Phone?: string;
  witness2Age?: string;

  // Computed fields
  propertyAddress?: string;
  rentAmount?: string;
  securityDeposit?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  agreementTerms?: string;
  agreementId?: string;
}
