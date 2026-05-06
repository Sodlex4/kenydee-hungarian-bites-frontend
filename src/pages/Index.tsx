
import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import OrderSection from '../components/OrderSection';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import LoadingScreen from '../components/LoadingScreen';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BackToTop from '../components/BackToTop';
import { CartProvider } from '../context/CartContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingDone = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
        {isLoading && <LoadingScreen onSkip={handleLoadingDone} />}
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <TestimonialsSection />
          <OrderSection />
        </main>
        <Footer />
        <Cart />
        <FloatingWhatsApp />
        <BackToTop />
      </div>
    </CartProvider>
  );
};

export default Index;
