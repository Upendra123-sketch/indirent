import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Users, FileText, Download, Star, CheckCircle, Mail, Phone, User, Fingerprint, Smartphone, Stamp, MapPin, Headphones, BadgeCheck, Package, FileUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import DemoVideoModal from "@/components/DemoVideoModal";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import documentVerificationImg from "@/assets/document-verification.jpg";
import hourResolutionImg from "@/assets/48-hour-resolution.jpg";
import supportTeamImg from "@/assets/support-team.jpg";
import indirentLogoImg from "@/assets/indirent-logo.jpg";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    navigate('/rental-agreement');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai", 
      comment: "Created my rental agreement in just 10 minutes. The process was so smooth and professional. Highly recommend!",
      rating: 5,
      avatar: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      comment: "Finally, a platform that makes legal documents simple. No more lawyer fees for basic agreements!",
      rating: 5,
      avatar: "photo-1494790108755-2616b612b786"
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      comment: "The document quality is excellent and legally compliant. Saved me time and money.",
      rating: 5,
      avatar: "photo-1472099645785-5658abf4ff4e"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/349dcba6-1db7-46e0-aef0-f5835990f926.png" 
                alt="IndiRent Logo" 
                className="h-10 w-auto"
              />
            </div>
            <nav className="flex items-center space-x-4">
              {user ? (
                <Button variant="outline" onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setShowAuth(true)}>
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight magnetic-hover">
              Create Legal{' '}
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent animate-pulse-glow">
                Rental
              </span>
              <br />
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent animate-pulse-glow">
                Agreements
              </span>{' '}
              <span className="text-blue-600 animate-bounce-in">with IndiRent</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional, legally compliant rental agreements crafted in minutes. 
              No legal expertise required. Save time, money, and hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow magnetic-hover"
              >
                Create Agreement Now
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce-in" />
              </Button>
              <Button 
                onClick={() => setShowDemo(true)}
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 magnetic-hover"
              >
                <Play className="mr-2 h-5 w-5 animate-rotate-in" />
                How it Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>100% Legal Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>5-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span>10,000+ Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
              Select A Rent Agreement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the rental agreement type that suits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="animate-fade-in hover-lift shadow-lg rounded-2xl bg-white p-2">
              <ServiceCard
                icon={FileText}
                title="Rental Agreement with Biometric + Police Intimation"
                description="Complete rental agreement with biometric verification and police intimation for maximum security."
                price=""
                originalPrice=""
                badge=""
                features={["Biometric verification", "Police intimation", "Legal compliance", "Digital signatures"]}
              />
            </div>
            <div className="animate-fade-in hover-lift shadow-lg rounded-2xl bg-white p-2" style={{animationDelay: '0.2s'}}>
              <ServiceCard
                icon={Fingerprint}
                title="Rental Agreement with Biometric"
                description="Secure rental agreement with biometric authentication for verified identity confirmation."
                price=""
                originalPrice=""
                badge=""
                features={["Biometric authentication", "Identity verification", "Digital security", "Quick processing"]}
              />
            </div>
            <div className="animate-fade-in hover-lift shadow-lg rounded-2xl bg-white p-2" style={{animationDelay: '0.4s'}}>
              <ServiceCard
                icon={Stamp}
                title="Rental Agreement with E-Stamp & Notary"
                description="Traditional rental agreement with e-stamp paper and notary verification for legal validity."
                price=""
                originalPrice=""
                badge=""
                features={["E-stamp paper", "Notary verification", "Legal validity", "Government approved"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to create your rental agreement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-slide-up bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Fill Details</h3>
              <p className="text-gray-600">
                Enter property and party information through our guided form
              </p>
            </div>
            <div className="text-center animate-slide-up bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Review & Customize</h3>
              <p className="text-gray-600">
                Review your agreement and make any necessary customizations
              </p>
            </div>
            <div className="text-center animate-slide-up bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Download & Sign</h3>
              <p className="text-gray-600">
                Get your legal document ready for signatures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Post Agreement Assurances Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Post Agreement Assurances
            </h2>
            <p className="text-xl text-gray-600">
              Your peace of mind is our priority even after agreement completion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Document Verification */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 text-center card-hover animate-fade-in">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                <img 
                  src={documentVerificationImg} 
                  alt="Document verification process"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Document Verification
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Legal compliance check</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">No document errors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">All clauses included</span>
                </div>
              </div>
            </div>

            {/* 48-hour Resolution */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 text-center card-hover animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                <img 
                  src={hourResolutionImg} 
                  alt="Fast 48-hour resolution service"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                48-hour Resolution
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Quick service</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Expert assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Guaranteed help</span>
                </div>
              </div>
            </div>

            {/* Dedicated Support */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center card-hover animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                <img 
                  src={supportTeamImg} 
                  alt="Dedicated support team"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Dedicated Support
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Legal guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Personal advisor</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Ongoing support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar like in the reference image */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied landlords and tenants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                <TestimonialCard
                  {...testimonial}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">
              About Our Platform
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                  Simplifying Legal Documentation
                </h3>
                <p className="text-gray-600 mb-6">
                  We believe that creating legal documents shouldn't be complicated or expensive. 
                  Our platform combines legal expertise with modern technology to deliver 
                  professional-grade rental agreements that anyone can create.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Legally compliant templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Regular updates with law changes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Trusted by 10,000+ users</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-600 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 mt-0.5 text-yellow-400" />
                    <span>Expert-crafted legal templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5 text-blue-300" />
                    <span>Save 90% of time compared to traditional methods</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 mt-0.5 text-green-400" />
                    <span>100% secure and confidential</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 mt-0.5 text-purple-300" />
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Add Ons Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
              Available Add Ons
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Extra Visit for Biometric */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 text-center card-hover animate-slide-up">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <MapPin className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Extra Visit for Biometric
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get your biometric done from anywhere anytime
                </p>
              </div>

              {/* Tech Assistance */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center card-hover animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '1s'}}>
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Tech Assistance
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get technical assistance for distant registration
                </p>
              </div>

              {/* Tenant Verification */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 text-center card-hover animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '2s'}}>
                  <BadgeCheck className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Tenant Verification
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Verify your tenant's identity instantly.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Hardcopy Delivery */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 text-center card-hover animate-scale-in">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <Package className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Hardcopy Delivery
                </h3>
                <p className="text-gray-600 mb-6">
                  Hardcopy delivery at your Doorstep
                </p>
              </div>

              {/* Power Of Attorney */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center card-hover animate-scale-in" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{animationDelay: '1s'}}>
                  <FileUser className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Power Of Attorney
                </h3>
                <p className="text-gray-600 mb-6">
                  Drafting of Power Of Attorney.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Rental Agreement with IndiRent?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust IndiRent for their rental agreements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => setShowAuth(true)}
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
      
      <DemoVideoModal 
        isOpen={showDemo} 
        onClose={() => setShowDemo(false)} 
      />
    </div>
  );
};

export default Index;
