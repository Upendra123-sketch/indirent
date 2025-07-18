import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RentalFormData } from "@/types/rental";

interface PropertyDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PropertyDetail = ({ formData, onInputChange, onNext, onBack }: PropertyDetailProps) => {
  const isFormValid = () => {
    return (
      formData.propertyType &&
      formData.floorNumber !== undefined &&
      formData.houseNumber &&
      formData.buildingName &&
      formData.locality &&
      formData.roadStreet &&
      formData.pincode
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Type of Property <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.propertyType || ''} onValueChange={(value) => onInputChange('propertyType', value)}>
            <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">Independent House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="studio">Studio Apartment</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Floor Number <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={formData.floorNumber === '0' ? 'default' : 'outline'}
              onClick={() => onInputChange('floorNumber', '0')}
              className="flex-1 h-11"
            >
              0
            </Button>
            <Button
              type="button"
              variant={formData.floorNumber === '1' ? 'default' : 'outline'}
              onClick={() => onInputChange('floorNumber', '1')}
              className="flex-1 h-11"
            >
              1
            </Button>
            <Button
              type="button"
              variant={formData.floorNumber === '2' ? 'default' : 'outline'}
              onClick={() => onInputChange('floorNumber', '2')}
              className="flex-1 h-11"
            >
              2
            </Button>
            <Select 
              value={formData.floorNumber && !['0', '1', '2'].includes(formData.floorNumber) ? formData.floorNumber : ''}
              onValueChange={(value) => onInputChange('floorNumber', value)}
            >
              <SelectTrigger className="flex-1 h-11">
                <SelectValue placeholder="Other" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10+">10+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="houseNumber" className="text-sm font-medium text-gray-700">
            House Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="houseNumber"
            value={formData.houseNumber || ''}
            onChange={(e) => onInputChange('houseNumber', e.target.value)}
            placeholder="Enter house number"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buildingName" className="text-sm font-medium text-gray-700">
            Building Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="buildingName"
            value={formData.buildingName || ''}
            onChange={(e) => onInputChange('buildingName', e.target.value)}
            placeholder="Enter building name"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="locality" className="text-sm font-medium text-gray-700">
            Enter Locality <span className="text-red-500">*</span>
          </Label>
          <Input
            id="locality"
            value={formData.locality || ''}
            onChange={(e) => onInputChange('locality', e.target.value)}
            placeholder="Enter locality name"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roadStreet" className="text-sm font-medium text-gray-700">
            Road / Street <span className="text-red-500">*</span>
          </Label>
          <Input
            id="roadStreet"
            value={formData.roadStreet || ''}
            onChange={(e) => onInputChange('roadStreet', e.target.value)}
            placeholder="Road / Street name"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="societyName" className="text-sm font-medium text-gray-700">
            Society Name
          </Label>
          <Input
            id="societyName"
            value={formData.societyName || ''}
            onChange={(e) => onInputChange('societyName', e.target.value)}
            placeholder="Enter society name (optional)"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
            Pincode <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pincode"
            value={formData.pincode || ''}
            onChange={(e) => onInputChange('pincode', e.target.value)}
            placeholder="Enter pincode"
            maxLength={6}
            pattern="[0-9]{6}"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="district" className="text-sm font-medium text-gray-700">
            District
          </Label>
          <Input
            id="district"
            value={formData.district || ''}
            onChange={(e) => onInputChange('district', e.target.value)}
            placeholder="Enter district"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taluka" className="text-sm font-medium text-gray-700">
            Taluka
          </Label>
          <Input
            id="taluka"
            value={formData.taluka || ''}
            onChange={(e) => onInputChange('taluka', e.target.value)}
            placeholder="Enter taluka"
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={onBack} 
          variant="outline"
          className="px-8 py-3"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isFormValid()}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save and Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetail;
