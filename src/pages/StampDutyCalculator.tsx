import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calculator, FileText, Info, Home, Building, MapPin, IndianRupee, AlertCircle, CheckCircle, Calendar, Clock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

// State-wise rental agreement stamp duty rates
const stateRentalStampDutyRates = {
  'maharashtra': {
    name: 'Maharashtra',
    stampDutyRate: 0.25, // 0.25% of annual rent
    nonRefundableDepositRate: 0.25, // 0.25% of non-refundable deposit
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300,
    minimumStampDuty: 100 // Minimum stamp duty amount
  },
  'delhi': {
    name: 'Delhi',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'karnataka': {
    name: 'Karnataka',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'gujarat': {
    name: 'Gujarat',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'rajasthan': {
    name: 'Rajasthan',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'uttar-pradesh': {
    name: 'Uttar Pradesh',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'west-bengal': {
    name: 'West Bengal',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'tamil-nadu': {
    name: 'Tamil Nadu',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'andhra-pradesh': {
    name: 'Andhra Pradesh',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'telangana': {
    name: 'Telangana',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'haryana': {
    name: 'Haryana',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  },
  'punjab': {
    name: 'Punjab',
    stampDutyRate: 0.25,
    nonRefundableDepositRate: 0.25,
    registrationFee: { urban: 1000, rural: 500 },
    additionalCharges: 300
  }
};

const StampDutyCalculator = () => {
  const navigate = useNavigate();
  const [monthlyRent, setMonthlyRent] = useState('');
  const [licensePeriod, setLicensePeriod] = useState('');
  const [refundableDeposit, setRefundableDeposit] = useState('');
  const [nonRefundableDeposit, setNonRefundableDeposit] = useState('');
  const [propertyArea, setPropertyArea] = useState('urban');
  const [rentType, setRentType] = useState('fixed');
  const [selectedState, setSelectedState] = useState('maharashtra');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [calculatedStampDuty, setCalculatedStampDuty] = useState(null);
  const [registrationFee, setRegistrationFee] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  // Set document title and meta tags for SEO
  useEffect(() => {
    document.title = "Rental Agreement Stamp Duty Calculator India 2025 - Calculate Leave & License Fees | IndiRent";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free rental agreement stamp duty calculator for India. Calculate leave & license stamp duty, registration fees for all states. Get accurate rental agreement fees instantly.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free rental agreement stamp duty calculator for India. Calculate leave & license stamp duty, registration fees for all states. Get accurate rental agreement fees instantly.';
      document.head.appendChild(meta);
    }

    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'stamp duty calculator, property registration fees, stamp duty rates India, online stamp duty calculator, property stamp duty, registration fee calculator');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'rental agreement stamp duty calculator, leave and license stamp duty, rental agreement registration fees, stamp duty calculator India, rental agreement fees, tenancy agreement stamp duty';
      document.head.appendChild(meta);
    }

    // Add JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Rental Agreement Stamp Duty Calculator India",
      "description": "Free online rental agreement stamp duty calculator for India. Calculate leave & license stamp duty, registration fees for all states.",
      "url": "https://indirent.com/stamp-duty-calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "publisher": {
        "@type": "Organization",
        "name": "IndiRent",
        "url": "https://indirent.com"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Auto-calculate when values change
  useEffect(() => {
    if (monthlyRent && licensePeriod && selectedState) {
      calculateStampDuty();
    }
  }, [monthlyRent, licensePeriod, refundableDeposit, nonRefundableDeposit, selectedState, propertyArea]);

  const getMinimumStampDuty = (periodInMonths) => {
    // Ensure period doesn't exceed 60 months
    const limitedPeriod = Math.min(Math.abs(periodInMonths) || 0, 60);
    
    if (limitedPeriod <= 24) return 100;
    if (limitedPeriod <= 36) return 113;
    if (limitedPeriod <= 48) return 150;
    if (limitedPeriod <= 60) return 188;
    return 188; // Max minimum for 60 months
  };

  const getRefundableDepositMultiplier = (periodInMonths) => {
    // Ensure period doesn't exceed 60 months
    const limitedPeriod = Math.min(Math.abs(periodInMonths) || 0, 60);
    
    if (limitedPeriod <= 12) return 1;
    if (limitedPeriod <= 24) return 2;
    if (limitedPeriod <= 36) return 3;
    if (limitedPeriod <= 48) return 4;
    if (limitedPeriod <= 60) return 5;
    return 5; // Max multiplier for 60 months
  };

  const calculateStampDuty = () => {
    if (!monthlyRent || !licensePeriod || !selectedState) return;

    // Ensure all values are positive and valid
    const monthlyRentValue = Math.abs(parseFloat(monthlyRent)) || 0;
    const periodInMonths = Math.min(Math.abs(parseFloat(licensePeriod)) || 0, 60);
    const refundableDepositValue = Math.abs(parseFloat(refundableDeposit)) || 0;
    const nonRefundableDepositValue = Math.abs(parseFloat(nonRefundableDeposit)) || 0;
    
    // Return early if required values are zero
    if (monthlyRentValue === 0 || periodInMonths === 0) return;
    
    const stateData = stateRentalStampDutyRates[selectedState];
    
    if (!stateData) return;

    // Calculate total rent for the period
    const totalRent = monthlyRentValue * periodInMonths;
    
    // Maharashtra specific calculation
    // 1. Stamp duty on rent: 0.25% of total rent
    const stampDutyOnRent = (totalRent * 0.25) / 100;
    
    // 2. Stamp duty on non-refundable deposit: 0.25% of non-refundable deposit
    const stampDutyOnNonRefundableDeposit = (nonRefundableDepositValue * 0.25) / 100;
    
    // 3. Stamp duty on refundable deposit: 0.025% of refundable deposit with multiplier based on period
    const refundableDepositMultiplier = getRefundableDepositMultiplier(periodInMonths);
    const stampDutyOnRefundableDeposit = (refundableDepositValue * 0.025 * refundableDepositMultiplier) / 100;
    
    // Calculate total stamp duty
    const calculatedStampDuty = stampDutyOnRent + stampDutyOnNonRefundableDeposit + stampDutyOnRefundableDeposit;
    
    // Apply minimum stamp duty based on license period
    const minimumStampDuty = getMinimumStampDuty(periodInMonths);
    const finalStampDuty = Math.max(calculatedStampDuty, minimumStampDuty);
    
    // Debug calculation
    console.log('Maharashtra calculation:', {
      monthlyRent: monthlyRentValue,
      periodInMonths,
      totalRent,
      stampDutyOnRent,
      refundableDepositValue,
      refundableDepositMultiplier,
      stampDutyOnRefundableDeposit,
      nonRefundableDepositValue,
      stampDutyOnNonRefundableDeposit,
      calculatedStampDuty,
      minimumStampDuty,
      finalStampDuty
    });
    
    // Registration fee based on property area
    const regFee = propertyArea === 'urban' ? stateData.registrationFee.urban : stateData.registrationFee.rural;
    
    // Total amount
    const total = finalStampDuty + regFee + stateData.additionalCharges;

    setCalculatedStampDuty(finalStampDuty);
    setRegistrationFee(regFee);
    setTotalAmount(total);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Auto-calculate "To date" when "From date" or license period changes
  const calculateToDate = () => {
    if (fromDate && licensePeriod) {
      const fromDateTime = new Date(fromDate);
      const toDateTime = new Date(fromDateTime);
      toDateTime.setMonth(toDateTime.getMonth() + parseInt(licensePeriod));
      // Subtract 1 day to get the end date of the license period
      toDateTime.setDate(toDateTime.getDate() - 1);
      const toDateString = toDateTime.toISOString().split('T')[0];
      setToDate(toDateString);
    }
  };

  // Effect to auto-calculate "To date" when dependencies change
  useEffect(() => {
    calculateToDate();
  }, [fromDate, licensePeriod]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* SEO Structured Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <img 
                src="/uploads/349dcba6-1db7-46e0-aef0-f5835990f926.png" 
                alt="IndiRent Stamp Duty Calculator" 
                className="h-12 w-auto"
              />
              <h1 className="text-xl font-bold text-blue-600">Stamp Duty Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with SEO Content */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
            Stamp Duty Calculator for Rental Agreement India 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Calculate stamp duty and registration fees for rental agreements and leave & license agreements instantly. 
            Get accurate rates for all Indian states and save money on documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Free Online Calculator
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              All States Covered
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Updated Rates 2025
            </span>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Rental Agreement Stamp Duty Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="license-period" className="text-sm font-medium">
                    License Period (months) *
                  </Label>
                  <Input
                    id="license-period"
                    type="number"
                    placeholder="Enter license period in months"
                    value={licensePeriod}
                    onChange={(e) => {
                      const value = Math.abs(parseFloat(e.target.value)) || 0;
                      const limitedValue = Math.min(value, 60);
                      setLicensePeriod(limitedValue.toString());
                    }}
                    className="mt-1"
                    min="0"
                    max="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 60 months allowed</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="refundable-deposit" className="text-sm font-medium">
                      Refundable (Deposit) Rs
                    </Label>                      <Input
                        id="refundable-deposit"
                        type="number"
                        placeholder="Enter refundable deposit"
                        value={refundableDeposit}
                        onChange={(e) => {
                          const value = Math.abs(parseFloat(e.target.value)) || 0;
                          setRefundableDeposit(value.toString());
                        }}
                        className="mt-1"
                        min="0"
                      />
                  </div>
                  <div>
                    <Label htmlFor="non-refundable-deposit" className="text-sm font-medium">
                      Non Refundable (Deposit) Rs
                    </Label>                      <Input
                        id="non-refundable-deposit"
                        type="number"
                        placeholder="Enter non-refundable deposit"
                        value={nonRefundableDeposit}
                        onChange={(e) => {
                          const value = Math.abs(parseFloat(e.target.value)) || 0;
                          setNonRefundableDeposit(value.toString());
                        }}
                        className="mt-1"
                        min="0"
                      />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Select Rent Type
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rentType"
                        value="fixed"
                        checked={rentType === 'fixed'}
                        onChange={(e) => setRentType(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Fixed Rent</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rentType"
                        value="varying"
                        checked={rentType === 'varying'}
                        onChange={(e) => setRentType(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Varying Rent</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Property in Area *
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="propertyArea"
                        value="urban"
                        checked={propertyArea === 'urban'}
                        onChange={(e) => setPropertyArea(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Urban</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="propertyArea"
                        value="rural"
                        checked={propertyArea === 'rural'}
                        onChange={(e) => setPropertyArea(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Rural</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from-date" className="text-sm font-medium">
                      From date
                    </Label>
                    <Input
                      id="from-date"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="to-date" className="text-sm font-medium">
                      To date (Auto-calculated)
                    </Label>
                    <Input
                      id="to-date"
                      type="date"
                      value={toDate}
                      readOnly
                      className="mt-1 bg-gray-50 cursor-not-allowed"
                      title="This date is automatically calculated based on the From date and License period"
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>The "To date" will be automatically calculated based on the "From date" and license period.</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="monthly-rent" className="text-sm font-medium">
                    Average Monthly Rent *
                  </Label>
                  <Input
                    id="monthly-rent"
                    type="number"
                    placeholder="Enter monthly rent amount"
                    value={monthlyRent}
                    onChange={(e) => {
                      const value = Math.abs(parseFloat(e.target.value)) || 0;
                      setMonthlyRent(value.toString());
                    }}
                    className="mt-1"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="text-sm font-medium">
                    Select State *
                  </Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Maharashtra" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      {Object.entries(stateRentalStampDutyRates)
                        .filter(([key]) => key !== 'maharashtra')
                        .map(([key, state]) => (
                          <SelectItem key={key} value={key}>
                            {state.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-lg">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Stamp Duty Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {calculatedStampDuty ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-600 mb-2">Calculation Summary</h3>
                    <p className="text-sm text-gray-600">
                      Monthly Rent: {formatCurrency(parseFloat(monthlyRent))}
                    </p>
                    <p className="text-sm text-gray-600">
                      License Period: {licensePeriod} months
                    </p>
                    <p className="text-sm text-gray-600">
                      State: {stateRentalStampDutyRates[selectedState]?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Property Area: {propertyArea.charAt(0).toUpperCase() + propertyArea.slice(1)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Rent: {formatCurrency(parseFloat(monthlyRent) * parseFloat(licensePeriod))}
                    </p>
                    {nonRefundableDeposit && (
                      <p className="text-sm text-gray-600">
                        Non-Refundable Deposit: {formatCurrency(parseFloat(nonRefundableDeposit))}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stamp Duty on Rent (0.25%):</span>
                      <span className="font-semibold">{formatCurrency((parseFloat(monthlyRent) * parseFloat(licensePeriod) * 0.25) / 100)}</span>
                    </div>
                    {refundableDeposit && parseFloat(refundableDeposit) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Stamp Duty on Refundable Deposit (0.025% × {getRefundableDepositMultiplier(parseFloat(licensePeriod))}):
                        </span>
                        <span className="font-semibold">{formatCurrency((parseFloat(refundableDeposit) * 0.025 * getRefundableDepositMultiplier(parseFloat(licensePeriod))) / 100)}</span>
                      </div>
                    )}
                    {nonRefundableDeposit && parseFloat(nonRefundableDeposit) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stamp Duty on Non-Refundable Deposit (0.25%):</span>
                        <span className="font-semibold">{formatCurrency((parseFloat(nonRefundableDeposit) * 0.25) / 100)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calculated Stamp Duty:</span>
                      <span className="font-medium">{formatCurrency(((parseFloat(monthlyRent) * parseFloat(licensePeriod) * 0.25) / 100) + ((parseFloat(refundableDeposit) || 0) * 0.025 * getRefundableDepositMultiplier(parseFloat(licensePeriod))) / 100 + ((parseFloat(nonRefundableDeposit) || 0) * 0.25) / 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Stamp Duty ({licensePeriod} months):</span>
                      <span className="font-medium">{formatCurrency(getMinimumStampDuty(parseFloat(licensePeriod)))}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-blue-600">
                      <span>Final Stamp Duty (Higher of above):</span>
                      <span>{formatCurrency(calculatedStampDuty)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Fee:</span>
                      <span className="font-semibold">{formatCurrency(registrationFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">DHC:</span>
                      <span className="font-semibold">{formatCurrency(stateRentalStampDutyRates[selectedState]?.additionalCharges)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-blue-600">
                      <span>Total Amount:</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Important Note:</p>
                        <p className="text-sm text-yellow-700">
                          These calculations are estimates. Actual rates may vary based on specific property details and local regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Enter Rental Agreement Details
                  </h3>
                  <p className="text-gray-500">
                    Fill in the rental agreement information to calculate stamp duty and registration fees.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <section className="mt-16 max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                About Rental Agreement Stamp Duty Calculator
              </h2>
              <div className="prose max-w-none">
                <p className="mb-4">
                  A <strong>rental agreement stamp duty calculator</strong> is an essential tool for landlords and tenants in India to determine 
                  the exact amount of stamp duty and registration fees payable during rental agreement registration. 
                  Stamp duty for rental agreements is calculated based on the total rent amount and varies across different states.
                </p>
                
                <h3 className="text-xl font-semibold mb-3 text-blue-600">
                  What is Stamp Duty for Rental Agreements?
                </h3>
                <p className="mb-4">
                  Stamp duty for rental agreements is a legal tax imposed by state governments on leave and license agreements. 
                  It's typically calculated as 0.25% of the total rent amount for the license period. The rates are generally 
                  uniform across states, but registration fees may vary between urban and rural areas.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-blue-600">
                  How to Use This Rental Agreement Stamp Duty Calculator?
                </h3>
                <ol className="list-decimal list-inside mb-4 space-y-2">
                  <li>Enter the license period in months</li>
                  <li>Fill in refundable and non-refundable deposits</li>
                  <li>Select rent type (Fixed/Varying)</li>
                  <li>Choose property area (Urban/Rural)</li>
                  <li>Enter the average monthly rent</li>
                  <li>Select your state from the dropdown</li>
                  <li>Click "Calculate" to get results</li>
                </ol>

                <h3 className="text-xl font-semibold mb-3 text-blue-600">
                  Stamp Duty Rates for Rental Agreements
                </h3>
                <p className="mb-4">
                  For rental agreements in Maharashtra, the stamp duty is calculated as:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li><strong>Stamp Duty on Rent:</strong> 0.25% of total rent amount</li>
                  <li><strong>Stamp Duty on Non-Refundable Deposit:</strong> 0.25% of non-refundable deposit</li>
                  <li><strong>Stamp Duty on Refundable Deposit:</strong> 0.025% of refundable deposit (with multiplier based on period)</li>
                  <li><strong>Registration Fee:</strong> ₹1,000 (Urban), ₹500 (Rural)</li>
                  <li><strong>DHC (Documentation Handling Charges):</strong> ₹300</li>
                </ul>

                <h4 className="text-lg font-semibold mb-2 text-blue-600">
                  Refundable Deposit Multiplier Rules
                </h4>
                <p className="mb-3">
                  The stamp duty on refundable deposit is multiplied based on the license period:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li><strong>Up to 12 months:</strong> 1× (0.025%)</li>
                  <li><strong>13-24 months:</strong> 2× (0.05%)</li>
                  <li><strong>25-36 months:</strong> 3× (0.075%)</li>
                  <li><strong>37-48 months:</strong> 4× (0.1%)</li>
                  <li><strong>49-60 months:</strong> 5× (0.125%)</li>
                  <li><strong>Maximum period:</strong> 60 months (5× multiplier)</li>
                </ul>

                <h4 className="text-lg font-semibold mb-2 text-blue-600">
                  Minimum Stamp Duty Requirements
                </h4>
                <p className="mb-3">
                  The stamp duty amount cannot be less than the minimum prescribed limits based on the license period:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li><strong>Up to 24 months:</strong> Minimum ₹100</li>
                  <li><strong>Up to 36 months:</strong> Minimum ₹113</li>
                  <li><strong>Up to 48 months:</strong> Minimum ₹150</li>
                  <li><strong>Up to 60 months:</strong> Minimum ₹188</li>
                  <li><strong>Maximum period:</strong> 60 months (₹188 minimum)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-blue-600">
                  Benefits of Using Online Rental Agreement Stamp Duty Calculator
                </h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Quick and accurate calculations</li>
                  <li>Free to use</li>
                  <li>Updated with latest rates</li>
                  <li>Helps in rental budget planning</li>
                  <li>Saves time and effort</li>
                  <li>Separate calculation for refundable vs non-refundable deposits</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h4 className="font-semibold text-blue-600 mb-2">Need Help with Rental Agreement Registration?</h4>
                  <p className="text-sm text-blue-700">
                    IndiRent provides comprehensive rental agreement services including legal documentation, 
                    registration assistance, and stamp duty payment support.
                  </p>
                  <Button 
                    onClick={() => navigate('/rental-agreement')}
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                  >
                    Create Rental Agreement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StampDutyCalculator;
