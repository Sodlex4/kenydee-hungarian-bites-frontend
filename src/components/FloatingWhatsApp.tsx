import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER, API_URL } from '../lib/env';

const FloatingWhatsApp = () => {
  const { isCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [footerOffset, setFooterOffset] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const overlap = entry.boundingClientRect.bottom - window.innerHeight;
          setFooterOffset(Math.max(0, overlap + 100));
        } else {
          setFooterOffset(0);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleOpenWhatsApp = () => {
    fetch(`${API_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'order',
        title: 'New WhatsApp Inquiry',
        message: 'A customer is inquiring about products via WhatsApp.',
        time: 'Just now',
        read: false,
      }),
    }).catch(() => {});
    const message = "Hello! I'd like to order Hungarian Hot Dog Rolls. Please confirm availability and delivery details.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  const baseBottom = isDesktop
    ? '1.5rem'
    : 'calc(4.5rem + env(safe-area-inset-bottom, 0px))';
  const bottom = footerOffset > 0
    ? `calc(${footerOffset}px + ${baseBottom})`
    : baseBottom;

  return (
    <div
      className={`fixed z-[60] md:right-6 right-4 group transition-all duration-300 ${
        isCartOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ bottom }}
      {...(isCartOpen ? { 'aria-hidden': true, tabIndex: -1 } : {})}
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
