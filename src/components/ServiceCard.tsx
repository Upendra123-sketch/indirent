
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  icon: LucideIcon;
  badge?: string;
  features: string[];
}

const ServiceCard = ({ 
  title, 
  description, 
  price, 
  originalPrice, 
  icon: Icon, 
  badge, 
  features 
}: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (title === "Rental Agreement") {
      navigate('/rental-agreement');
    }
  };

  return (
    <Card className="relative h-full hover:shadow-lg transition-shadow border border-gray-200">
      {badge && (
        <div className="absolute -top-3 left-4">
          <Badge className="bg-red-600 text-white">{badge}</Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-red-600">{price}</span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
          {originalPrice && price !== "Free" && (
            <div className="text-sm text-green-600 font-medium">
              Save {Math.round(((parseInt(originalPrice.replace('₹', '')) - parseInt(price.replace('₹', '') || '0')) / parseInt(originalPrice.replace('₹', ''))) * 100)}%
            </div>
          )}
        </div>
        
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
