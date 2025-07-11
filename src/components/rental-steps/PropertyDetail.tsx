
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RentalFormData } from "@/types/rental";

interface PropertyDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PropertyDetail = ({ formData, onInputChange, onNext, onBack }: PropertyDetailProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="propertyType">Type of Property*</Label>
        <Select onValueChange={(value) => onInputChange('propertyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Property" />
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
        <Label>Floor Number*</Label>
        <div className="flex gap-4 mt-2">
          <Button
            type="button"
            variant={formData.floorNumber === '0' ? 'default' : 'outline'}
            onClick={() => onInputChange('floorNumber', '0')}
          >
            0
          </Button>
          <Button
            type="button"
            variant={formData.floorNumber === '1' ? 'default' : 'outline'}
            onClick={() => onInputChange('floorNumber', '1')}
          >
            1
          </Button>
          <Button
            type="button"
            variant={formData.floorNumber === '2' ? 'default' : 'outline'}
            onClick={() => onInputChange('floorNumber', '2')}
          >
            2
          </Button>
          <Select onValueChange={(value) => onInputChange('floorNumber', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Other" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10+">10+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="houseNumber">House Number*</Label>
        <Input
          id="houseNumber"
          placeholder="Enter Number"
          value={formData.houseNumber || ''}
          onChange={(e) => onInputChange('houseNumber', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="buildingName">Building Name*</Label>
        <Input
          id="buildingName"
          placeholder="Building Name"
          value={formData.buildingName || ''}
          onChange={(e) => onInputChange('buildingName', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="locality">Enter Locality*</Label>
        <Input
          id="locality"
          placeholder="Enter Locality"
          value={formData.locality || ''}
          onChange={(e) => onInputChange('locality', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="roadStreet">Road / Street*</Label>
        <Input
          id="roadStreet"
          placeholder="Road / Street"
          value={formData.roadStreet || ''}
          onChange={(e) => onInputChange('roadStreet', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="societyName">Society name</Label>
        <Input
          id="societyName"
          placeholder="Society name"
          value={formData.societyName || ''}
          onChange={(e) => onInputChange('societyName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="pincode">Enter pincode*</Label>
        <Input
          id="pincode"
          placeholder="Enter pincode"
          value={formData.pincode || ''}
          onChange={(e) => onInputChange('pincode', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="district">District</Label>
        <Select onValueChange={(value) => onInputChange('district', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="thane">Thane</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="taluka">Taluka</Label>
        <Select onValueChange={(value) => onInputChange('taluka', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Taluka" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mumbai-city">Mumbai City</SelectItem>
            <SelectItem value="mumbai-suburban">Mumbai Suburban</SelectItem>
          </SelectContent>
        </Select>
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

export default PropertyDetail;
