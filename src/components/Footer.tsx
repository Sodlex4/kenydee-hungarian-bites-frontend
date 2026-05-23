
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { WHATSAPP_URL, CONTACT_EMAIL, PHONE_DISPLAY, FACEBOOK_URL, INSTAGRAM_URL } from '../lib/env';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="py-16 relative overflow-hidden section-gradient-footer">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(var(--primary) / 0.05)' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(var(--accent) / 0.05)' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">

          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4 tracking-wider text-gradient-primary" style={{
                fontFamily: 'Bebas Neue, sans-serif',
              }}>
                HUNGARIAN BITES
              </h3>
              <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Hungarian recipe. Kenyan heat. Murang'a's finest. Bites that slap, delivered to your door.
              </p>
            </div>

            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: FACEBOOK_URL || '#', label: 'Facebook', color: 'hsl(var(--primary))' },
                { icon: Instagram, href: INSTAGRAM_URL || '#', label: 'Instagram', color: 'hsl(var(--primary))' },
                { icon: Twitter, href: 'https://twitter.com/hungarianbites', label: 'Twitter', color: 'hsl(var(--primary))' },
                { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp', color: 'hsl(var(--primary))' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'hsl(var(--primary) / 0.2)',
                    borderColor: 'hsl(var(--primary) / 0.3)',
                    color: social.color
                  }}
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Get In Touch</h4>
            <div className="space-y-4">
              {[
                { icon: Phone, text: PHONE_DISPLAY || '+254 (0) 759 233 065', color: 'hsl(var(--primary))' },
                { icon: Mail, text: CONTACT_EMAIL || 'info@hungarianbites.co.ke', color: 'hsl(var(--primary))' },
                { icon: MapPin, text: 'Murang\'a, Kenya', color: 'hsl(var(--primary))' }
              ].map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{
                    background: 'hsl(var(--primary) / 0.2)'
                  }}>
                    <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {contact.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Menu', id: 'products' },
                { label: 'About', id: 'about' },
                { label: 'Reviews', id: 'testimonials' },
                { label: 'FAQ', id: 'faq' },
                { label: 'Order', id: 'order' },
                { label: 'Privacy Policy', href: '/legal/privacy' },
                { label: 'Terms of Service', href: '/legal/terms' }
              ].map((link, index) => (
                link.href ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-left hover:translate-x-2 transform transition-all duration-300"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-left hover:translate-x-2 transform transition-all duration-300"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Business Hours</h4>
            <div className="backdrop-blur-sm border rounded-2xl p-4" style={{
              background: 'hsl(var(--card) / 0.5)',
              borderColor: 'hsl(var(--primary) / 0.2)'
            }}>
              <div className="space-y-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <p className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span style={{ color: 'hsl(var(--foreground))' }}>02:00 PM - 10:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sat:</span>
                  <span style={{ color: 'hsl(var(--foreground))' }}>1:00 PM - 9:00 PM</span>
                </p>
                <div className="border-t pt-2 mt-3" style={{ borderColor: 'hsl(var(--primary) / 0.2)' }}>
                    <p className="text-center font-bold text-gradient-primary">
                    Order via WhatsApp: 24/7
                    <br />
                    call us: {PHONE_DISPLAY || '+254 (0) 759 233 065'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8" style={{ borderTop: '1px solid hsl(var(--primary) / 0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              &copy; {new Date().getFullYear()} Hungarian Bites. All rights reserved.
            </p>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              Made BY{" "}
              <span className="font-bold text-gradient-primary">trainWithSteve</span>
              <span className="text-pink-400 inline-block mx-3">❤</span>
              in Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
