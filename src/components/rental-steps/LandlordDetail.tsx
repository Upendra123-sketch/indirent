
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RentalFormData } from "@/types/rental";

interface LandlordDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const LandlordDetail = ({ formData, onInputChange, onNext, onBack }: LandlordDetailProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-700 font-medium">Don't know your Landlord details?</p>
            <p className="text-blue-600 text-sm">Share form with them for a quick and easy completion!</p>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-600" />
        </div>
      </Card>

      <div>
        <Label htmlFor="landlordEntityType">Party Entity Type*</Label>
        <Select onValueChange={(value) => onInputChange('landlordEntityType', value)}>
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
        <Label htmlFor="landlordName">Name*</Label>
        <Input
          id="landlordName"
          placeholder="Enter Name"
          value={formData.landlordName || ''}
          onChange={(e) => onInputChange('landlordName', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="landlordPhone">Phone (Linked with aadhar)*</Label>
        <Input
          id="landlordPhone"
          placeholder="Enter Phone Number"
          value={formData.landlordPhone || ''}
          onChange={(e) => onInputChange('landlordPhone', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="landlordAadhar">Aadhar Number (12 Digits)*</Label>
        <Input
          id="landlordAadhar"
          placeholder="Enter Aadhar Number"
          value={formData.landlordAadhar || ''}
          onChange={(e) => onInputChange('landlordAadhar', e.target.value)}
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
        <Label htmlFor="landlordPan">PAN Number*</Label>
        <Input
          id="landlordPan"
          placeholder="PAN Number (ABCDE1234F)"
          value={formData.landlordPan || ''}
          onChange={(e) => onInputChange('landlordPan', e.target.value)}
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
        <Label htmlFor="landlordEmail">Email Address*</Label>
        <Input
          id="landlordEmail"
          type="email"
          placeholder="Email Address"
          value={formData.landlordEmail || ''}
          onChange={(e) => onInputChange('landlordEmail', e.target.value)}
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

export default LandlordDetail;
