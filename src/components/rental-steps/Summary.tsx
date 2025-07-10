
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface SummaryProps {
  formData: any;
  onBack: () => void;
}

const Summary = ({ formData, onBack }: SummaryProps) => {
  const completionPercentage = 85; // This would be calculated based on filled fields

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Summary</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Rental Agreement With Biometric</span>
                <img src="/placeholder.svg" alt="Stamp" className="h-12 w-12" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 font-medium">FORM COMPLETION DETAIL</div>
              <div className="text-lg font-semibold">Rental Agreement</div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      17%
                    </div>
                    <span>Contract detail</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      0%
                    </div>
                    <span>Property Detail</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      0%
                    </div>
                    <span>Landlord Detail</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      0%
                    </div>
                    <span>Tenant Detail</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      0%
                    </div>
                    <span>Witness Detail</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Total completion</span>
                  <Button variant="outline" size="sm">Preview</Button>
                </div>
                <div className="text-lg font-semibold text-green-600 mb-2">3.4%</div>
                <Progress value={3.4} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Address</h3>
                <Button variant="outline" className="w-full text-teal-600 border-teal-600">
                  ADD ADDRESS +
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="font-semibold">₹ 0</span>
                </div>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  Make payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Summary;
