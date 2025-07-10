
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TenantDetailProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const TenantDetail = ({ formData, onInputChange, onNext, onBack }: TenantDetailProps) => {
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
          onChange={(e) => onInputChange('tenantAadhar', e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Aadhar Front (image/pdf only)</Label>
        <Button variant="outline" className="w-full mt-2">
          Select Document
        </Button>
      </div>

      <div>
        <Label>Aadhar Back (image/pdf only)</Label>
        <Button variant="outline" className="w-full mt-2">
          Select Document
        </Button>
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
        <Label>PAN Card Front (image/pdf only)</Label>
        <Button variant="outline" className="w-full mt-2">
          Select Document
        </Button>
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
