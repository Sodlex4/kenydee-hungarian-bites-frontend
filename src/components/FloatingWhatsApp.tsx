import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '254759233065';

const FloatingWhatsApp = () => {
  const { isCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenWhatsApp = () => {
    const message = "Hello! I'd like to order Hungarian Hot Dog Rolls. Please confirm availability and delivery details.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-[60] md:bottom-6 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:right-6 right-4 group transition-all duration-300 ${
        isCartOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full" style={{
        background: '#25D366',
        animation: 'wa-pulse 2s ease-in-out infinite',
      }} />

      {/* Button */}
      <button
        onClick={handleOpenWhatsApp}
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 shadow-lg"
        style={{ background: '#25D366' }}
        aria-label="Order via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>

      {/* Tooltip - desktop only */}
      {showTooltip && (
        <div className="hidden sm:block absolute bottom-full right-0 mb-3 whitespace-nowrap animate-fadeIn">
          <div className="px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg" style={{
            background: '#25D366'
          }}>
            Order via WhatsApp
          </div>
          <div className="w-3 h-3 rotate-45 mx-auto -mt-1.5" style={{
            background: '#25D366',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
          }} />
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsApp;
