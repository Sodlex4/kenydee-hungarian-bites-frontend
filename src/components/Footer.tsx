
import React from 'react';
import { Facebook, Instagram, Twitter, Whatsapp } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-500">HUNGARIAN BITES</h3>
            <p className="text-gray-400">
              Bringing authentic Hungarian street food to Kenya with premium quality and unbeatable taste.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: 'https://facebook.com/hungarianbites', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com/hungarianbites', label: 'Instagram' },
                { icon: Twitter, href: 'https://twitter.com/hungarianbites', label: 'Twitter' },
                { icon: Whatsapp, href: 'https://wa.me/254700123456', label: 'WhatsApp' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <i className="fas fa-phone mr-2 text-orange-500"></i>
                +254 (0) 700 123 456
              </p>
              <p className="flex items-center">
                <i className="fas fa-envelope mr-2 text-orange-500"></i>
                orders@hungarianbites.co.ke
              </p>
              <p className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Products', id: 'products' },
                { label: 'About Us', id: 'about' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' }
              ].map((link, index) => (
                <button
                  key={index}
                  onClick={() => link.id ? scrollToSection(link.id) : window.open(link.href, '_blank')}
                  className="block text-gray-400 hover:text-orange-500 transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Business Hours</h4>
            <div className="space-y-2 text-gray-400">
              <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
              <p className="text-orange-500 font-semibold">Online Orders: 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Hungarian Bites. All rights reserved. | Made with ❤️ in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
