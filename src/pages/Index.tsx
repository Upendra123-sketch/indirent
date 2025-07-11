import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Users, FileText, Download, Star, CheckCircle, Mail, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import DemoVideoModal from "@/components/DemoVideoModal";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    navigate('/rental-agreement');
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
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
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Rental Agreement</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/admin')}>Admin</Button>
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
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Create Legal{' '}
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Rental
              </span>
              <br />
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Agreements
              </span>{' '}
              <span className="text-blue-600">in Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional, legally compliant rental agreements crafted in minutes. 
              No legal expertise required. Save time, money, and hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Create Agreement Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setShowDemo(true)}
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
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
              Everything You Need for Rental Agreements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From creation to signing, we've got you covered with professional-grade tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={FileText}
              title="Smart Document Creation"
              description="AI-powered forms that guide you through every step, ensuring no important detail is missed."
              price="Free"
              originalPrice=""
              features={["Step-by-step guidance", "Legal compliance check", "Custom templates"]}
            />
            <ServiceCard
              icon={Shield}
              title="Legal Compliance"
              description="Every document is crafted to meet current legal standards and local regulations."
              price="Free"
              originalPrice=""
              features={["Updated legal templates", "Jurisdiction-specific", "Lawyer approved"]}
            />
            <ServiceCard
              icon={Clock}
              title="Instant Generation"
              description="Get your professional rental agreement ready in minutes, not days."
              price="Free"
              originalPrice=""
              features={["5-minute setup", "Instant download", "Multiple formats"]}
            />
            <ServiceCard
              icon={Users}
              title="Multi-Party Signing"
              description="Secure digital signing for landlords, tenants, and witnesses."
              price="Free"
              originalPrice=""
              features={["Digital signatures", "Email notifications", "Audit trail"]}
            />
            <ServiceCard
              icon={Download}
              title="Secure Storage"
              description="Your documents are safely stored and accessible anytime, anywhere."
              price="Free"
              originalPrice=""
              features={["Cloud storage", "24/7 access", "Backup & sync"]}
            />
            <ServiceCard
              icon={Star}
              title="Premium Support"
              description="Get help when you need it with our dedicated customer support team."
              price="Free"
              originalPrice=""
              features={["Live chat support", "Video tutorials", "FAQ resources"]}
            />
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
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Fill Details</h3>
              <p className="text-gray-600">
                Enter property and party information through our guided form
              </p>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Review & Customize</h3>
              <p className="text-gray-600">
                Review your agreement and make any necessary customizations
              </p>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
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
              <TestimonialCard
                key={index}
                {...testimonial}
              />
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

      {/* Add Ons Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">
              Add Ons
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  Premium Document Review
                </h3>
                <p className="text-gray-600 mb-6">
                  Get your rental agreement reviewed by our legal experts to ensure 
                  complete compliance and protection for both parties.
                </p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Expert legal review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Custom clause suggestions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Risk assessment report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">48-hour turnaround</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Expert Review - ₹999
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  Legal Consultation Call
                </h3>
                <p className="text-gray-600 mb-6">
                  Schedule a one-on-one consultation with our legal experts to discuss 
                  your specific requirements and get personalized advice.
                </p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">30-minute consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Personalized legal advice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Document customization help</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Follow-up email summary</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Book Consultation - ₹1,499
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Rental Agreement?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of landlords and tenants who trust our platform for their legal documentation needs.
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
