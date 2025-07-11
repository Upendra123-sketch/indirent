
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
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    navigate('/rental-agreement');
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
      title: "Document Support",
      description: "Get help with all rental documentation",
      price: "₹149",
      originalPrice: "₹299",
      icon: MapPin,
      features: ["Legal Consultation", "Document Review", "24/7 Support"]
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
      comment: "RentalAgreement saved me thousands in brokerage. The rental agreement process was smooth.",
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center animate-float">
                <span className="text-primary-foreground font-bold text-sm">RA</span>
              </div>
              <span className="text-xl font-bold text-foreground">RentalAgreement</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary transition-all duration-300"
                onClick={() => handleAuthClick('login')}
              >
                Login
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
                onClick={() => handleAuthClick('signup')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/20 text-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                🏆 India's #1 Rental Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                India's Largest Platform for
                <span className="block text-primary animate-fade-in" style={{animationDelay: '0.5s'}}>Rental Agreements</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get legally binding rental agreements delivered to your doorstep in 24 hours. 
                Trusted by 50+ lakh customers across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover-lift animate-scale-in group"
                  onClick={handleGetStarted}
                >
                  Get Rental Agreement
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-lift animate-scale-in"
                  style={{animationDelay: '0.2s'}}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm pt-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  <span>Legal Expert Verified</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>24hr Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative animate-float">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=500&fit=crop" 
                alt="Legal rental agreement document"
                className="rounded-2xl shadow-2xl hover-lift"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl animate-scale-in" style={{animationDelay: '1s'}}>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-2 font-semibold">4.9/5 Rating</span>
                </div>
                <p className="text-sm text-muted-foreground">50+ Lakh Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Everything you need for rental properties</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-slide-up card-hover" style={{animationDelay: `${index * 0.2}s`}}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose RentalAgreement?</h2>
            <p className="text-xl text-muted-foreground">Trusted by millions across India</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "50+ Lakh Customers", desc: "Trusted by millions of users across India", color: "bg-blue-100 text-blue-600" },
              { icon: Shield, title: "100% Legal", desc: "All documents verified by legal experts", color: "bg-green-100 text-green-600" },
              { icon: Clock, title: "Quick Delivery", desc: "Get your documents in 24 hours", color: "bg-orange-100 text-orange-600" },
              { icon: IndianRupee, title: "Zero Brokerage", desc: "Save lakhs in brokerage fees", color: "bg-purple-100 text-purple-600" }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-slide-up hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Real reviews from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-slide-up card-hover" style={{animationDelay: `${index * 0.2}s`}}>
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50+ lakh customers who trust us for their rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 hover-lift"
              onClick={handleGetStarted}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary hover-lift"
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
