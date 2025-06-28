
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Fire, Heart, Award } from 'lucide-react';

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
    .from(".variant-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5");

    // Floating animation for product image
    gsap.to(".main-product-image", {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });

    // Glow animation
    gsap.to(".product-glow", {
      scale: 1.2,
      opacity: 0.8,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/20 pt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="hero-content space-y-6">
          <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 text-orange-400 text-sm font-medium">
            Premium Snack
          </div>
          
          <h1 className="space-y-2">
            <div className="text-4xl md:text-6xl font-bold text-orange-500" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              HUNGARIAN
            </div>
            <div className="text-3xl md:text-5xl font-bold text-white">
              Hot Dog
            </div>
            <div className="text-4xl md:text-6xl font-bold text-orange-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              ROLLS
            </div>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
            Crispy, golden, and irresistibly delicious Hungarian-style hot dog rolls. 
            Made with premium ingredients and traditional recipes for the perfect snack experience.
          </p>

          <p className="text-2xl font-bold text-orange-500 italic">
            kila bite ina slap !
          </p>

          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-white">
              <span className="text-2xl text-gray-400">Ksh</span> 70/=
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToOrder}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30"
              aria-label="Order Hungarian Hot Dog Rolls now"
            >
              Order Now
            </button>
            <button
              onClick={scrollToProducts}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              aria-label="View our product menu"
            >
              View Menu
            </button>
          </div>
        </div>

        <div className="product-showcase relative flex justify-center">
          <div className="product-glow absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full blur-3xl"></div>
          
          <div className="main-product-image relative w-80 h-80 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=center"
              alt="Delicious Hungarian Hot Dog Rolls - Golden brown and crispy"
              className="w-64 h-64 object-cover rounded-full"
              loading="lazy"
            />
          </div>

          <div className="product-variants absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {[
              { icon: Fire, label: 'Spicy' },
              { icon: Heart, label: 'Classic' },
              { icon: Award, label: 'Premium' }
            ].map((variant, index) => (
              <div
                key={index}
                className="variant-item w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 shadow-lg"
                role="button"
                tabIndex={0}
                aria-label={`${variant.label} variant`}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
              >
                <variant.icon className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
