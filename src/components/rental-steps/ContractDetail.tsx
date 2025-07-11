
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RentalFormData } from "@/types/rental";

interface ContractDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string | boolean) => void;
  onNext: () => void;
}

const ContractDetail = ({ formData, onInputChange, onNext }: ContractDetailProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="propertyCity">City of the Property*</Label>
        <Input
          id="propertyCity"
          placeholder="Mumbai"
          value={formData.propertyCity || ''}
          onChange={(e) => onInputChange('propertyCity', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="refundableDeposit">Refundable Deposit Amount*</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <Input
            id="refundableDeposit"
            type="number"
            className="pl-8"
            placeholder="Enter amount"
            value={formData.refundableDeposit || ''}
            onChange={(e) => onInputChange('refundableDeposit', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label>Agreement Duration*</Label>
        <div className="flex gap-4 mt-2">
          <Button
            type="button"
            variant={formData.agreementDuration === '6months' ? 'default' : 'outline'}
            onClick={() => onInputChange('agreementDuration', '6months')}
          >
            6 Months
          </Button>
          <Button
            type="button"
            variant={formData.agreementDuration === '11months' ? 'default' : 'outline'}
            onClick={() => onInputChange('agreementDuration', '11months')}
          >
            11 Months
          </Button>
          <Select onValueChange={(value) => onInputChange('agreementDuration', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Other" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
              <SelectItem value="3years">3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="monthlyRent">Monthly Rent Amount*</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <Input
            id="monthlyRent"
            type="number"
            className="pl-8"
            placeholder="Enter monthly rent"
            value={formData.monthlyRent || ''}
            onChange={(e) => onInputChange('monthlyRent', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="rentNotFixed"
          checked={formData.rentNotFixed || false}
          onCheckedChange={(checked) => onInputChange('rentNotFixed', checked === true)}
        />
        <Label htmlFor="rentNotFixed">Rent is not fixed</Label>
      </div>

      <div>
        <Label htmlFor="nonRefundableDeposit">Non Refundable Deposit</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <Input
            id="nonRefundableDeposit"
            type="number"
            className="pl-8"
            placeholder="Enter amount"
            value={formData.nonRefundableDeposit || ''}
            onChange={(e) => onInputChange('nonRefundableDeposit', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="agreementStartDate">Agreement Start Date*</Label>
        <Input
          id="agreementStartDate"
          type="date"
          value={formData.agreementStartDate || ''}
          onChange={(e) => onInputChange('agreementStartDate', e.target.value)}
          required
        />
      </div>

      <div>
        <Label>I am:</Label>
        <RadioGroup
          value={formData.userType || ''}
          onValueChange={(value) => onInputChange('userType', value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tenant" id="tenant" />
            <Label htmlFor="tenant">Tenant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" />
            <Label htmlFor="owner">Owner</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Minimum Lockin Period (In months)*</Label>
        <div className="flex gap-4 mt-2">
          <Button
            type="button"
            variant={formData.lockinPeriod === '0' ? 'default' : 'outline'}
            onClick={() => onInputChange('lockinPeriod', '0')}
          >
            0
          </Button>
          <Button
            type="button"
            variant={formData.lockinPeriod === '1' ? 'default' : 'outline'}
            onClick={() => onInputChange('lockinPeriod', '1')}
          >
            1
          </Button>
          <Select onValueChange={(value) => onInputChange('lockinPeriod', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Other" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={onNext} className="w-full bg-teal-600 hover:bg-teal-700">
        Save and Continue
      </Button>
    </div>
  );
};

export default ContractDetail;
