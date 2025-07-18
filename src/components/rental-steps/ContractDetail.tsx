
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowRight, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RentalFormData } from "@/types/rental";

interface ContractDetailProps {
  formData: RentalFormData;
  onInputChange: (field: string, value: string | boolean) => void;
  onNext: () => void;
}

const ContractDetail = ({ formData, onInputChange, onNext }: ContractDetailProps) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onInputChange('agreementStartDate', format(date, 'yyyy-MM-dd'));
    }
  };

  const isFormValid = () => {
    return (
      formData.propertyCity &&
      formData.refundableDeposit &&
      formData.agreementDuration &&
      formData.monthlyRent &&
      formData.agreementStartDate &&
      formData.userType &&
      formData.lockinPeriod !== undefined
    );
  };

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Important Information</p>
          <p>Please ensure all details are accurate as they will be used in your legal rental agreement document.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="propertyCity" className="text-sm font-medium text-gray-700">
            City of the Property <span className="text-red-500">*</span>
          </Label>
          <Input
            id="propertyCity"
            value={formData.propertyCity || ''}
            onChange={(e) => onInputChange('propertyCity', e.target.value)}
            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter city name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="refundableDeposit" className="text-sm font-medium text-gray-700">
            Refundable Deposit Amount <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
            <Input
              id="refundableDeposit"
              type="number"
              className="pl-8 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter amount"
              value={formData.refundableDeposit || ''}
              onChange={(e) => onInputChange('refundableDeposit', e.target.value)}
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Agreement Duration <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={formData.agreementDuration === '6months' ? 'default' : 'outline'}
              onClick={() => onInputChange('agreementDuration', '6months')}
              className="flex-1 h-11"
            >
              6 Months
            </Button>
            <Button
              type="button"
              variant={formData.agreementDuration === '11months' ? 'default' : 'outline'}
              onClick={() => onInputChange('agreementDuration', '11months')}
              className="flex-1 h-11"
            >
              11 Months
            </Button>
            <Select onValueChange={(value) => onInputChange('agreementDuration', value)}>
              <SelectTrigger className="flex-1 h-11">
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

        <div className="space-y-2">
          <Label htmlFor="monthlyRent" className="text-sm font-medium text-gray-700">
            Monthly Rent Amount <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
            <Input
              id="monthlyRent"
              type="number"
              className="pl-8 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter monthly rent"
              value={formData.monthlyRent || ''}
              onChange={(e) => onInputChange('monthlyRent', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nonRefundableDeposit" className="text-sm font-medium text-gray-700">
            Non Refundable Deposit
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
            <Input
              id="nonRefundableDeposit"
              type="number"
              className="pl-8 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter amount (optional)"
              value={formData.nonRefundableDeposit || ''}
              onChange={(e) => onInputChange('nonRefundableDeposit', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Agreement Start Date <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-11 justify-start text-left font-normal border-gray-300",
                  !formData.agreementStartDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.agreementStartDate ? format(new Date(formData.agreementStartDate), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.agreementStartDate ? new Date(formData.agreementStartDate) : undefined}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            I am <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.userType || ''}
            onValueChange={(value) => onInputChange('userType', value)}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tenant" id="tenant" />
              <Label htmlFor="tenant" className="text-sm">Tenant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="owner" id="owner" />
              <Label htmlFor="owner" className="text-sm">Owner</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Minimum Lock-in Period (In months) <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={formData.lockinPeriod === '0' ? 'default' : 'outline'}
              onClick={() => onInputChange('lockinPeriod', '0')}
              className="flex-1 h-11"
            >
              0
            </Button>
            <Button
              type="button"
              variant={formData.lockinPeriod === '1' ? 'default' : 'outline'}
              onClick={() => onInputChange('lockinPeriod', '1')}
              className="flex-1 h-11"
            >
              1
            </Button>
            <Select onValueChange={(value) => onInputChange('lockinPeriod', value)}>
              <SelectTrigger className="flex-1 h-11">
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

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rentNotFixed"
              checked={formData.rentNotFixed || false}
              onCheckedChange={(checked) => onInputChange('rentNotFixed', checked === true)}
            />
            <Label htmlFor="rentNotFixed" className="text-sm text-gray-700">
              Rent is not fixed (will be negotiated)
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
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

export default ContractDetail;
