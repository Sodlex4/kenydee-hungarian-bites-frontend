
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Star, Zap, Heart } from 'lucide-react';
import { prefersReducedMotion, getGsapDuration } from '../lib/motion';

const HeroSection = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

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

    gsap.to(".floating-card", {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      ease: "power2.inOut"
    });

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
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, hsl(330 80% 20%), hsl(270 70% 20%), hsl(230 70% 20%))'
    }}>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(var(--accent) / 0.15)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(var(--primary) / 0.08)' }}></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hero-content space-y-8 text-center lg:text-left">
          <div className="inline-block backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium" style={{
            background: 'hsl(var(--primary) / 0.2)',
            border: '1px solid hsl(var(--primary) / 0.3)',
            color: 'hsl(var(--primary))'
          }}>
            Premium Street Food Experience
          </div>

          <h1 className="space-y-4">
            <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent" style={{
              fontFamily: 'Pacifico, cursive',
              backgroundImage: 'var(--gradient-primary)'
            }}>
              HUNGARIAN
            </div>
            <div className="text-4xl md:text-6xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
              Hot Dog Rolls
            </div>
            <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent" style={{
              fontFamily: 'Pacifico, cursive',
              backgroundImage: 'var(--gradient-primary)'
            }}>
              REIMAGINED
            </div>
          </h1>

          <p className="text-lg leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Discover the perfect fusion of traditional Hungarian flavors and modern culinary artistry in Murang'a.
            Each bite is a journey through authentic taste and premium quality.
          </p>

          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="text-4xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
              <span className="text-2xl" style={{ color: 'hsl(var(--muted-foreground))' }}>Ksh</span> 70
            </div>
            <div className="font-semibold" style={{ color: 'hsl(var(--muted-foreground))' }}>per piece</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToOrder}
              className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                boxShadow: '0 10px 30px hsl(var(--primary) / 0.3)'
              }}
            >
              Order Now
            </button>
            <button
              onClick={scrollToProducts}
              className="border-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              style={{
                borderColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary))',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--primary))';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'hsl(var(--primary))';
              }}
            >
              Explore Menu
            </button>
          </div>
        </div>

        <div className="product-showcase relative flex justify-center items-center">
          <div className="product-rotate relative w-80 h-80 rounded-full backdrop-blur-sm flex items-center justify-center shadow-2xl" style={{
            background: 'hsl(var(--primary) / 0.1)',
            border: '1px solid hsl(var(--primary) / 0.3)'
          }}>
            <img
              src="/image/Cheese Dog Bread Rolls.jpg"
              alt="Premium Hungarian Hot Dog Rolls"
              className="w-56 h-56 object-cover rounded-full shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>

          <div className="floating-card absolute -top-4 -left-4 backdrop-blur-sm rounded-2xl p-4 shadow-xl" style={{
            background: 'hsl(var(--primary) / 0.15)',
            border: '1px solid hsl(var(--primary) / 0.3)'
          }}>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>Premium</span>
            </div>
          </div>

          <div className="floating-card absolute -top-4 -right-4 backdrop-blur-sm rounded-2xl p-4 shadow-xl" style={{
            background: 'hsl(var(--accent) / 0.15)',
            border: '1px solid hsl(var(--accent) / 0.3)'
          }}>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" style={{ color: 'hsl(var(--accent))' }} />
              <span className="font-semibold" style={{ color: 'hsl(var(--accent))' }}>Fast</span>
            </div>
          </div>

          <div className="floating-card absolute -bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm rounded-2xl p-4 shadow-xl" style={{
            background: 'hsl(var(--primary) / 0.15)',
            border: '1px solid hsl(var(--primary) / 0.3)'
          }}>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>Loved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
