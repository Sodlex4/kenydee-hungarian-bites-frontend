
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import OrderSection from '../components/OrderSection';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import LoadingScreen from '../components/LoadingScreen';
import { CartProvider } from '../context/CartContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `;
    document.head.appendChild(script2);

    // Loading screen animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {isLoading && <LoadingScreen />}
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
      </div>
    </CartProvider>
  );
};

export default Index;
