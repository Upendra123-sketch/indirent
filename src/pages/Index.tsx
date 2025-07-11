import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Shield, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  User,
  Navigation,
  MessageCircle,
  CheckSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import DemoVideoModal from "@/components/DemoVideoModal";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const services = [
    {
      title: "Rental Agreement",
      description: "Create legally binding rental agreements with government approval",
      icon: FileText,
      price: "₹1,499",
      features: ["Government Approved", "Legal Templates", "Quick Processing", "Digital Copy"]
    },
    {
      title: "Document Verification", 
      description: "Verify documents with biometric authentication",
      icon: Shield,
      price: "₹299",
      features: ["Biometric Scan", "Aadhaar Verification", "Secure Process", "Home Service"]
    },
    {
      title: "Registration Service",
      description: "Complete registration with doorstep service",
      icon: Award,
      price: "₹999",
      features: ["Doorstep Service", "Expert Assistance", "Quick Turnaround", "Official Registration"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Property Owner",
      content: "Excellent service! Got my rental agreement registered within 3 days with doorstep biometric verification.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Tenant", 
      content: "Very convenient process. The online form was easy to fill and the team was very professional.",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Real Estate Agent",
      content: "I recommend this service to all my clients. Government approved and hassle-free process.",
      rating: 5
    }
  ];

  const addOns = [
    {
      title: "Extra Visit for Biometric",
      description: "Get you biometric done from anywhere anytime",
      icon: Navigation,
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Tech Assistance",
      description: "Get technical assistance for distant registration",
      icon: MessageCircle,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Tenant Verification",
      description: "Verify your tenant's identity instantly.",
      icon: CheckSquare,
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Hardcopy Delivery",
      description: "Hardcopy delivery at your Doorstep",
      icon: FileText,
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Power Of Attorney",
      description: "Drafting of Power Of Attorney.",
      icon: Award,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ];

  const handleGetStarted = () => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
    } else {
      navigate('/rental-agreement');
    }
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  const handleCloseUserProfile = () => {
    setShowUserProfile(false);
  };

  if (showUserProfile) {
    return <UserProfile />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 animate-slide-up">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">RA</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Rental Agreement
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors story-link">Services</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors story-link">About</a>
              <a href="#addons" className="text-muted-foreground hover:text-primary transition-colors story-link">Add Ons</a>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUserProfileClick}
                    className="hover-lift"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/admin')}
                      className="hover-lift"
                    >
                      Admin Panel
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleSignIn}
                  className="hover-lift"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge variant="secondary" className="mb-6 animate-float">
              <Shield className="mr-2 h-4 w-4" />
              Government Approved & Secure
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Create Legal{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Rental Agreements
              </span>{" "}
              in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              Get your rental agreement registered with government approval, biometric verification, 
              and doorstep service. Fast, secure, and legally binding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg hover-lift group"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-6 text-lg hover-lift group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                How it Work
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.6s'}}>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" 
                  alt="Legal rental agreement document" 
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive rental agreement solutions with government approval and legal compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.title} 
                  className="hover-lift animate-slide-up transition-all duration-300 hover:shadow-xl"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                    <div className="text-2xl font-bold text-primary mt-2">{service.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 hover-lift" onClick={handleGetStarted}>
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Our Service
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We provide government-approved rental agreement services with biometric verification 
                and doorstep registration. Our platform ensures legal compliance and hassle-free 
                documentation for landlords and tenants across Maharashtra.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-foreground">Government of Maharashtra Approved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-foreground">Biometric & Aadhaar Verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-foreground">Doorstep Service Available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-foreground">3-4 Days Processing Time</span>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80" 
                  alt="Professional service team" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by thousands of landlords and tenants across Maharashtra
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="hover-lift animate-slide-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add Ons Section */}
      <section id="addons" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Available Add ons</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => {
              const IconComponent = addon.icon;
              return (
                <Card 
                  key={addon.title} 
                  className={`hover-lift animate-slide-up transition-all duration-300 hover:shadow-lg ${addon.bgColor}`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${addon.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`h-6 w-6 ${addon.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{addon.title}</h3>
                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Create Your Rental Agreement?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of satisfied customers who trust our government-approved service
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleGetStarted}
              className="px-8 py-6 text-lg hover-lift group"
            >
              Start Your Agreement
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-slide-up">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">RA</span>
                </div>
                <span className="text-xl font-bold">Rental Agreement</span>
              </div>
              <p className="text-gray-400">
                Government approved rental agreement services with biometric verification and doorstep registration.
              </p>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Rental Agreement</li>
                <li>Document Verification</li>
                <li>Registration Service</li>
                <li>Legal Consultation</li>
              </ul>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@rentalagreement.com
                </p>
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Mon-Sat 9AM-7PM
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Rental Agreement. All rights reserved. | Government of Maharashtra Approved</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode}
        onModeChange={setAuthMode}
      />
      <DemoVideoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  );
};

export default Index;
