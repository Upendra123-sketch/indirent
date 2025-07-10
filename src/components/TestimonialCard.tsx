
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

const TestimonialCard = ({ name, location, rating, comment, avatar }: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={`https://images.unsplash.com/${avatar}?w=50&h=50&fit=crop&crop=face`}
            alt={name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
          ))}
        </div>
        
        <p className="text-gray-700 text-sm leading-relaxed">"{comment}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
