
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RentalFormData } from "@/types/rental";

interface WitnessDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const WitnessDetail = ({ formData, onInputChange, onNext, onBack }: WitnessDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Witness 1</h3>
        
        <div>
          <Label htmlFor="witness1Name">Name (As per Aadhar)*</Label>
          <Input
            id="witness1Name"
            placeholder="Enter Name as per Aadhar"
            value={formData.witness1Name || ''}
            onChange={(e) => onInputChange('witness1Name', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="witness1Aadhar">Aadhar Card Number*</Label>
          <Input
            id="witness1Aadhar"
            placeholder="Enter 12-digit Aadhar Number"
            value={formData.witness1Aadhar || ''}
            onChange={(e) => onInputChange('witness1Aadhar', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="witness1Phone">Phone Number (Linked with Aadhar)*</Label>
          <Input
            id="witness1Phone"
            placeholder="Enter 10-digit Phone Number"
            value={formData.witness1Phone || ''}
            onChange={(e) => onInputChange('witness1Phone', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="witness1Age">Age*</Label>
          <Input
            id="witness1Age"
            placeholder="Enter Age"
            value={formData.witness1Age || ''}
            onChange={(e) => onInputChange('witness1Age', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Witness 2</h3>
        
        <div>
          <Label htmlFor="witness2Name">Name (As per Aadhar)*</Label>
          <Input
            id="witness2Name"
            placeholder="Enter Name as per Aadhar"
            value={formData.witness2Name || ''}
            onChange={(e) => onInputChange('witness2Name', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="witness2Aadhar">Aadhar Card Number*</Label>
          <Input
            id="witness2Aadhar"
            placeholder="Enter 12-digit Aadhar Number"
            value={formData.witness2Aadhar || ''}
            onChange={(e) => onInputChange('witness2Aadhar', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="witness2Phone">Phone Number (Linked with Aadhar)*</Label>
          <Input
            id="witness2Phone"
            placeholder="Enter 10-digit Phone Number"
            value={formData.witness2Phone || ''}
            onChange={(e) => onInputChange('witness2Phone', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="witness2Age">Age*</Label>
          <Input
            id="witness2Age"
            placeholder="Enter Age"
            value={formData.witness2Age || ''}
            onChange={(e) => onInputChange('witness2Age', e.target.value)}
            required
          />
        </div>
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

export default WitnessDetail;
