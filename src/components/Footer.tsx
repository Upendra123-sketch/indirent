
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">IR</span>
              </div>
              <span className="text-xl font-bold">IndiRent</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              India's largest platform for rental agreements and property services. 
              Trusted by 50+ lakh customers across India.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Rental Agreement</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Tenant Verification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Property Registration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Legal Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Home Loans</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-gray-400">+91-9999999999</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-gray-400">support@indirent.in</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-blue-600 mt-1" />
                <span className="text-gray-400">
                  123 Business Park,<br />
                  Bangalore, Karnataka<br />
                  560001
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 IndiRent Technologies. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
