
import { useState, useCallback, useEffect, useRef } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import OrderSection from '../components/OrderSection';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import LoadingScreen from '../components/LoadingScreen';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BackToTop from '../components/BackToTop';
import MobileBottomNav from '../components/MobileBottomNav';
import { CartProvider } from '../context/CartContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('has-visited')) {
      return false;
    }
    return true;
  });

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          e.preventDefault();
        }
      };
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isLoading]);

  const handleLoadingDone = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
        {isLoading && <LoadingScreen onSkip={handleLoadingDone} />}
        <div
          ref={mainRef}
          aria-hidden={isLoading}
          {...(isLoading ? { inert: '' } : {}) as React.HTMLAttributes<HTMLDivElement>}
        >
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <OrderSection />
          </main>
          <Footer />
          <Cart />
          <FloatingWhatsApp />
          <BackToTop />
          <MobileBottomNav />
        </div>
      </div>
    </CartProvider>
  );
};

export default Index;
