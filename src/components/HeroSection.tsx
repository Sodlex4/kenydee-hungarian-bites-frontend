
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Star, Zap, Heart } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

const HeroSection = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ delay: 0.5 });

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
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden section-gradient-hero">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(var(--accent) / 0.15)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'hsl(var(--primary) / 0.08)' }}></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hero-content space-y-8 text-center lg:text-left">
          <div className="badge-chip">
            Bites That Slap
          </div>

          <h1 className="space-y-4">
            <div className="text-5xl md:text-7xl font-bold text-gradient-primary tracking-wider" style={{
              fontFamily: 'Bebas Neue, sans-serif',
            }}>
              HUNGARIAN
            </div>
            <div className="text-4xl md:text-6xl font-bold tracking-wide" style={{ fontFamily: 'Poppins, sans-serif', color: 'hsl(var(--primary))' }}>
              Hot Dog Rolls
            </div>
            <div className="text-3xl md:text-5xl font-bold text-gradient-primary tracking-wider" style={{
              fontFamily: 'Bebas Neue, sans-serif',
            }}>
              REIMAGINED
            </div>
          </h1>

          <p className="text-lg leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Hungarian recipe. Kenyan heat. Murang'a's finest.
            Kila bite ina flavor — real talk.
          </p>

          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="text-4xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
              <span className="text-2xl" style={{ color: 'hsl(var(--muted-foreground))' }}>Ksh</span> 70
            </div>
            <div className="font-semibold" style={{ color: 'hsl(var(--muted-foreground))' }}>per piece</div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>4.9/5</span>
            </div>
            <div className="h-4 w-px" style={{ background: 'hsl(var(--border))' }} />
            <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>500+ happy customers</span>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
              style={{
                background: 'hsl(142 70% 40% / 0.15)',
                borderColor: 'hsl(142 70% 40% / 0.3)',
                color: '#4ade80'
              }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Free delivery within Murang'a
            </div>
            <div className="badge-chip !px-4 !py-2">
              <div className="w-2 h-2 rounded-full animate-pulse bg-pink-400 mr-2" />
              2hr delivery
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToOrder}
              className="btn-gradient"
            >
              Order Now
            </button>
            <button
              onClick={scrollToProducts}
              className="btn-outline-primary"
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
              src="/image/cheese-dog-bread-rolls.webp"
              alt="Premium Hungarian Hot Dog Rolls"
              className="w-56 h-56 object-cover rounded-full shadow-xl"
              width="224"
              height="224"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>

          <div className="floating-card absolute -top-4 -left-4 glass-card !rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-pink-400">Premium</span>
            </div>
          </div>

          <div className="floating-card absolute -top-4 -right-4 glass-card !rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="font-semibold text-purple-400">Fast</span>
            </div>
          </div>

          <div className="floating-card absolute -bottom-4 left-1/2 transform -translate-x-1/2 glass-card !rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-pink-400">Loved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
