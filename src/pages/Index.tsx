
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  Clock, 
  Phone, 
  Star, 
  CheckCircle,
  Users,
  MapPin,
  IndianRupee,
  ArrowRight,
  Play
} from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const services = [
    {
      title: "Rental Agreement",
      description: "Get legally binding rental agreements delivered in 24 hours",
      price: "₹99",
      originalPrice: "₹500",
      icon: FileText,
      badge: "Most Popular",
      features: ["Legal Expert Verified", "24hr Delivery", "Doorstep Service"]
    },
    {
      title: "Tenant Verification", 
      description: "Complete background verification of tenants",
      price: "₹199",
      originalPrice: "₹999",
      icon: Shield,
      features: ["Police Verification", "Employment Check", "Credit Score"]
    },
    {
      title: "Property Registration",
      description: "Register your property and find verified tenants",
      price: "Free",
      originalPrice: "",
      icon: MapPin,
      features: ["Zero Brokerage", "Verified Tenants", "24/7 Support"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "Got my rental agreement in just 12 hours! Excellent service and very professional.",
      avatar: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Priya Sharma",
      location: "Bangalore", 
      rating: 5,
      comment: "NoBroker saved me thousands in brokerage. The rental agreement process was smooth.",
      avatar: "photo-1494790108755-2616b78b6c6c"
    },
    {
      name: "Amit Patel",
      location: "Delhi",
      rating: 5,
      comment: "Best platform for rental services. Quick, reliable and affordable.",
      avatar: "photo-1507003211169-0a1dd7228f2d"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">NB</span>
              </div>
              <span className="text-xl font-bold text-gray-800">NoBroker</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Buy</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Rent</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Sell</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Home Loans</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Legal Services</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-red-600"
                onClick={() => handleAuthClick('login')}
              >
                Login
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleAuthClick('signup')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                India's Largest Platform for
                <span className="block text-yellow-300">Rental Agreements</span>
              </h1>
              <p className="text-xl mb-6 text-red-100">
                Get legally binding rental agreements delivered to your doorstep in 24 hours. 
                Trusted by 50+ lakh customers across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-100"
                  onClick={() => handleAuthClick('signup')}
                >
                  Get Rental Agreement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                  <span>Legal Expert Verified</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-300" />
                  <span>24hr Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop" 
                alt="Modern apartment"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-2 font-semibold">4.9/5 Rating</span>
                </div>
                <p className="text-sm text-gray-600">50+ Lakh Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Everything you need for rental properties</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose NoBroker?</h2>
            <p className="text-xl text-gray-600">Trusted by millions across India</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50+ Lakh Customers</h3>
              <p className="text-gray-600">Trusted by millions of users across India</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Legal</h3>
              <p className="text-gray-600">All documents verified by legal experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Get your documents in 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IndianRupee className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Brokerage</h3>
              <p className="text-gray-600">Save lakhs in brokerage fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-red-100">
            Join 50+ lakh customers who trust NoBroker for their rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => handleAuthClick('signup')}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91-9999999999
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;
