import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BackToTop = () => {
  const { isCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-hidden={isCartOpen}
      tabIndex={isCartOpen ? -1 : 0}
      className={`fixed z-[55] md:bottom-32 bottom-[calc(10.5rem+env(safe-area-inset-bottom,0px))] md:right-6 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 animate-fadeIn ${isCartOpen ? 'opacity-0 pointer-events-none' : ''}`}
      style={{
        background: 'var(--gradient-primary)',
        border: '1px solid hsl(var(--primary) / 0.3)'
      }}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
};

export default BackToTop;
