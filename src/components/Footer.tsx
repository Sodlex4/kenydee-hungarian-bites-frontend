import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-indigo-900 to-black text-white py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                HUNGARIAN BITES
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Bringing authentic Hungarian street food to Kenya/Murang'a with premium quality, traditional recipes, and modern excellence.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: 'https://facebook.com/hungarianbites', label: 'Facebook', color: 'hover:text-blue-400' },
                { icon: Instagram, href: 'https://www.instagram.com/vdj_kenydee/?next=%2F', label: 'Instagram', color: 'hover:text-pink-400' },
                { icon: Twitter, href: 'https://twitter.com/hungarianbites', label: 'Twitter', color: 'hover:text-blue-300' },
                { icon: MessageCircle, href: 'https://wa.me/254700123456', label: 'WhatsApp', color: 'hover:text-green-400' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-pink-500/60 ${social.color}`}
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-4">
              {[
                { icon: Phone, text: '+254 (0) 759233065', color: 'text-green-400' },
                { icon: Mail, text: 'Kennedygikonyo3gmail.com', color: 'text-blue-400' },
                { icon: MapPin, text: 'Murang\'a, Kenya', color: 'text-red-400' }
              ].map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className={`w-10 h-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <contact.icon className={`w-5 h-5 ${contact.color}`} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {contact.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Products', id: 'products' },
                { label: 'About Us', href: '/legal/about' },
                { label: 'Privacy Policy', href: '/legal/privacy' },
                { label: 'Terms of Service', href: '/legal/terms' }
              ].map((link, index) => (
                link.href ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 text-left hover:translate-x-2 transform transition-transform"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 text-left hover:translate-x-2 transform transition-transform"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-4">Business Hours</h4>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-4">
                <div className="space-y-2 text-gray-400">
                  <p className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span className="text-white">02:00 pM - 10:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sat:</span>
                    <span className="text-white">1:00 PM - 9:00 PM</span>
                  </p>
                  <div className="border-t border-pink-500/20 pt-2 mt-3">
                    <p className="text-center font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Online Orders: 24/7
                      <br />
                      call us: +254 (0) 759 233 065
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gradient-to-r from-pink-500/20 to-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2025 Hungarian Bites. All rights reserved.
            </p>
            <p className="text-gray-400 text-center md:text-right">
              Made BY{" "}
              <span className="animate-shimmer font-bold">trainWithSteve</span>
              <span className="text-pink-400 inline-block animate-bounce mx-3">❤️</span>
              in Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;