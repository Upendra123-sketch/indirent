
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RentalFormData } from "@/types/rental";
import FileUpload from "@/components/FileUpload";

interface TenantDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const TenantDetail = ({ formData, onInputChange, onNext, onBack }: TenantDetailProps) => {
  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Handle file upload logic here
  };

  const validateAadhar = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Limit to 12 digits
    return digits.slice(0, 12);
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateAadhar(e.target.value);
    onInputChange('tenantAadhar', validatedValue);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-700 font-medium">Don't know your Tenant details?</p>
            <p className="text-blue-600 text-sm">Share form with them for a quick and easy completion!</p>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-600" />
        </div>
      </Card>

      <div>
        <Label htmlFor="tenantEntityType">Party Entity Type*</Label>
        <Select onValueChange={(value) => onInputChange('tenantEntityType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Party Entity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tenantName">Name*</Label>
        <Input
          id="tenantName"
          placeholder="Enter Name"
          value={formData.tenantName || ''}
          onChange={(e) => onInputChange('tenantName', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="tenantPhone">Phone (Linked with aadhar)*</Label>
        <Input
          id="tenantPhone"
          placeholder="Enter Phone Number"
          value={formData.tenantPhone || ''}
          onChange={(e) => onInputChange('tenantPhone', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="tenantAadhar">Aadhar Number (12 Digits)*</Label>
        <Input
          id="tenantAadhar"
          placeholder="Enter Aadhar Number"
          value={formData.tenantAadhar || ''}
          onChange={handleAadharChange}
          maxLength={12}
          pattern="[0-9]{12}"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.tenantAadhar?.length || 0}/12 digits
        </p>
      </div>

      <div>
        <FileUpload
          onFileUpload={handleFileUpload}
          acceptedTypes=".jpg,.jpeg,.png"
          maxFiles={1}
          label="Aadhar Front (JPG/PNG only)"
        />
      </div>

      <div>
        <FileUpload
          onFileUpload={handleFileUpload}
          acceptedTypes=".jpg,.jpeg,.png"
          maxFiles={1}
          label="Aadhar Back (JPG/PNG only)"
        />
      </div>

      <div>
        <Label htmlFor="tenantPan">PAN Number (ABCDE1234F)*</Label>
        <Input
          id="tenantPan"
          placeholder="PAN Number (ABCDE1234F)"
          value={formData.tenantPan || ''}
          onChange={(e) => onInputChange('tenantPan', e.target.value)}
          required
        />
      </div>

      <div>
        <FileUpload
          onFileUpload={handleFileUpload}
          acceptedTypes=".jpg,.jpeg,.png"
          maxFiles={1}
          label="PAN Card Front (JPG/PNG only)"
        />
      </div>

      <div>
        <Label htmlFor="tenantEmail">Email Address*</Label>
        <Input
          id="tenantEmail"
          type="email"
          placeholder="Email Address"
          value={formData.tenantEmail || ''}
          onChange={(e) => onInputChange('tenantEmail', e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1 bg-teal-600 hover:bg-teal-700">
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default TenantDetail;
