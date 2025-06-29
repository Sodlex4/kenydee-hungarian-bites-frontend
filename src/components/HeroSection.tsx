
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Star, Zap, Heart } from 'lucide-react';

const HeroSection = () => {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });
    
    tl.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    })
    .from(".product-showcase", {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".floating-card", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5");

    // Floating animation for cards
    gsap.to(".floating-card", {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      ease: "power2.inOut"
    });

    // Rotate animation for product
    gsap.to(".product-rotate", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hero-content space-y-8 text-center lg:text-left">
          <div className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-3 text-pink-300 text-sm font-medium">
            ✨ Premium Street Food Experience
          </div>
          
          <h1 className="space-y-4">
            <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              HUNGARIAN
            </div>
            <div className="text-4xl md:text-6xl font-bold text-white">
              Hot Dog Rolls
            </div>
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              REIMAGINED
            </div>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Discover the perfect fusion of traditional Hungarian flavors and modern culinary artistry. 
            Each bite is a journey through authentic taste and premium quality.
          </p>

          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="text-4xl font-bold text-white">
              <span className="text-2xl text-pink-400">Ksh</span> 70
            </div>
            <div className="text-pink-400 font-semibold">per piece</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToOrder}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30"
            >
              Order Now
            </button>
            <button
              onClick={scrollToProducts}
              className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Explore Menu
            </button>
          </div>
        </div>

        <div className="product-showcase relative flex justify-center items-center">
          {/* Main Product Circle */}
          <div className="product-rotate relative w-80 h-80 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center shadow-2xl">
            <img 
              src="\image\Cheese Dog Bread Rolls.jpg"
              alt="Premium Hungarian Hot Dog Rolls"
              className="w-56 h-56 object-cover rounded-full shadow-xl"
            />
          </div>

          {/* Floating Feature Cards */}
          <div className="floating-card absolute -top-4 -left-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-pink-400" />
              <span className="text-white font-semibold">Premium</span>
            </div>
          </div>

          <div className="floating-card absolute -top-4 -right-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Fast</span>
            </div>
          </div>

          <div className="floating-card absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-indigo-400" />
              <span className="text-white font-semibold">Loved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
