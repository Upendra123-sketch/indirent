
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { ArrowLeft, FileText, Shield, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RentalAgreement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Property Details
    propertyType: '',
    propertyAddress: '',
    city: '',
    state: '',
    pincode: '',
    
    // Landlord Details
    landlordName: '',
    landlordEmail: '',
    landlordPhone: '',
    landlordAddress: '',
    
    // Tenant Details
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    tenantAddress: '',
    
    // Agreement Details
    rentAmount: '',
    securityDeposit: '',
    agreementDuration: '',
    startDate: '',
    
    // Additional Services
    doorstepDelivery: false,
    tenantVerification: false,
    legalConsultation: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rental Agreement Form:', formData);
    // Handle form submission
  };

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
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NB</span>
                </div>
                <span className="text-xl font-bold text-gray-800">NoBroker</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>100% Legal & Secure</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <FileText className="h-6 w-6 mr-2 text-red-600" />
                  Rental Agreement Form
                </CardTitle>
                <p className="text-gray-600">Fill in the details to generate your rental agreement</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Property Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Property Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Independent House/Villa</SelectItem>
                            <SelectItem value="studio">Studio Apartment</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Select onValueChange={(value) => handleInputChange('city', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="pune">Pune</SelectItem>
                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                            <SelectItem value="chennai">Chennai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Textarea
                        id="propertyAddress"
                        placeholder="Enter complete property address"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="Enter state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          placeholder="Enter pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Landlord Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Landlord Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="landlordName">Full Name</Label>
                        <Input
                          id="landlordName"
                          placeholder="Enter landlord's full name"
                          value={formData.landlordName}
                          onChange={(e) => handleInputChange('landlordName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="landlordPhone">Phone Number</Label>
                        <Input
                          id="landlordPhone"
                          placeholder="Enter phone number"
                          value={formData.landlordPhone}
                          onChange={(e) => handleInputChange('landlordPhone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="landlordEmail">Email Address</Label>
                      <Input
                        id="landlordEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.landlordEmail}
                        onChange={(e) => handleInputChange('landlordEmail', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="landlordAddress">Address</Label>
                      <Textarea
                        id="landlordAddress"
                        placeholder="Enter landlord's address"
                        value={formData.landlordAddress}
                        onChange={(e) => handleInputChange('landlordAddress', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Tenant Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Tenant Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tenantName">Full Name</Label>
                        <Input
                          id="tenantName"
                          placeholder="Enter tenant's full name"
                          value={formData.tenantName}
                          onChange={(e) => handleInputChange('tenantName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="tenantPhone">Phone Number</Label>
                        <Input
                          id="tenantPhone"
                          placeholder="Enter phone number"
                          value={formData.tenantPhone}
                          onChange={(e) => handleInputChange('tenantPhone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="tenantEmail">Email Address</Label>
                      <Input
                        id="tenantEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.tenantEmail}
                        onChange={(e) => handleInputChange('tenantEmail', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tenantAddress">Address</Label>
                      <Textarea
                        id="tenantAddress"
                        placeholder="Enter tenant's address"
                        value={formData.tenantAddress}
                        onChange={(e) => handleInputChange('tenantAddress', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Agreement Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Agreement Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rentAmount">Monthly Rent (₹)</Label>
                        <Input
                          id="rentAmount"
                          type="number"
                          placeholder="Enter monthly rent amount"
                          value={formData.rentAmount}
                          onChange={(e) => handleInputChange('rentAmount', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                        <Input
                          id="securityDeposit"
                          type="number"
                          placeholder="Enter security deposit"
                          value={formData.securityDeposit}
                          onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="agreementDuration">Agreement Duration</Label>
                        <Select onValueChange={(value) => handleInputChange('agreementDuration', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="11months">11 Months</SelectItem>
                            <SelectItem value="1year">1 Year</SelectItem>
                            <SelectItem value="2years">2 Years</SelectItem>
                            <SelectItem value="3years">3 Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="startDate">Agreement Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Services</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="doorstepDelivery"
                          checked={formData.doorstepDelivery}
                          onCheckedChange={(checked) => handleInputChange('doorstepDelivery', checked === true)}
                        />
                        <Label htmlFor="doorstepDelivery" className="flex-1">
                          Doorstep Delivery (+₹199)
                          <span className="block text-sm text-gray-500">Get your agreement delivered to your doorstep</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tenantVerification"
                          checked={formData.tenantVerification}
                          onCheckedChange={(checked) => handleInputChange('tenantVerification', checked === true)}
                        />
                        <Label htmlFor="tenantVerification" className="flex-1">
                          Tenant Verification (+₹499)
                          <span className="block text-sm text-gray-500">Complete background verification of tenant</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="legalConsultation"
                          checked={formData.legalConsultation}
                          onCheckedChange={(checked) => handleInputChange('legalConsultation', checked === true)}
                        />
                        <Label htmlFor="legalConsultation" className="flex-1">
                          Legal Consultation (+₹299)
                          <span className="block text-sm text-gray-500">30-minute consultation with legal expert</span>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-lg py-6">
                    Generate Rental Agreement
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Rental Agreement</span>
                    <span className="font-semibold">₹99</span>
                  </div>
                  
                  {formData.doorstepDelivery && (
                    <div className="flex justify-between text-sm">
                      <span>Doorstep Delivery</span>
                      <span>₹199</span>
                    </div>
                  )}
                  
                  {formData.tenantVerification && (
                    <div className="flex justify-between text-sm">
                      <span>Tenant Verification</span>
                      <span>₹499</span>
                    </div>
                  )}
                  
                  {formData.legalConsultation && (
                    <div className="flex justify-between text-sm">
                      <span>Legal Consultation</span>
                      <span>₹299</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-red-600">
                        ₹{99 + 
                          (formData.doorstepDelivery ? 199 : 0) + 
                          (formData.tenantVerification ? 499 : 0) + 
                          (formData.legalConsultation ? 299 : 0)
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span>Legal expert verified</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-green-600 mr-2" />
                      <span>24-hour delivery</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-green-600 mr-2" />
                      <span>100% legally binding</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreement;
