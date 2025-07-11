
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, Shield, Award } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoVideoModal = ({ isOpen, onClose }: DemoVideoModalProps) => {
  const steps = [
    {
      id: 1,
      title: "Fill Details Online",
      description: "Prepare your agreement approved by the Government of Maharashtra and submit the draft.",
      icon: FileText,
      color: "text-primary"
    },
    {
      id: 2,
      title: "Biometric at Your Doorstep",
      description: "Get the registration of the agreement done through Biometric and Aadhaar validation at your home or any location of your choice.",
      icon: Shield,
      color: "text-secondary"
    },
    {
      id: 3,
      title: "Agreement is Registered",
      description: "After successfully collecting biometric data, we get your agreement registered and send you a soft copy within 3-4 working days.",
      icon: Award,
      color: "text-accent"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            How It Works
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Process Steps */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center mb-6">Our 3-Step Process</h3>
            <div className="grid gap-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card 
                    key={step.id} 
                    className="hover-lift animate-slide-up transition-all duration-300"
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center`}>
                            <IconComponent className={`h-6 w-6 ${step.color}`} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl font-bold text-primary">
                              {step.id}
                            </span>
                            <h4 className="text-lg font-semibold text-foreground">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 animate-fade-in">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Why Choose Our Service?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Government Approved</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Doorstep Service</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>3-4 Days Delivery</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>🏠 Making rental agreements simple and secure for everyone</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoVideoModal;
