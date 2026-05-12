
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Sparkles, Shield } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

const FeaturesSection = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(".feature-card",
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.to(".feature-icon", {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      ease: "power2.inOut"
    });
  }, []);

  const features = [
    {
      icon: Crown,
      title: 'Top Tier',
      description: 'Real ingredients. Real recipe. Real taste. We don\'t cut corners.'
    },
    {
      icon: Sparkles,
      title: 'Made Proper',
      description: 'Hungarian recipe, Kenyan style. Fresh daily, made with love.'
    },
    {
      icon: Shield,
      title: 'People Love Us',
      description: '500+ customers keep coming back. Word on the street says it all.'
    }
  ];

  return (
    <section id="products" className="features-section py-20 relative section-gradient-features">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)_/_0.4),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
            Why Choose Our <span className="text-gradient-primary">Masterpiece</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Experience the perfect harmony of traditional Hungarian recipes and modern culinary innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative"
            >
              <div className="glass-card p-6 sm:p-8 text-center hover:scale-105 transition-all duration-500">
                <div className="feature-icon relative mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg" style={{
                    background: 'var(--gradient-primary)'
                  }}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: 'hsl(var(--primary) / 0.3)'
                  }}></div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-300 transition-colors duration-300" style={{ color: 'hsl(var(--foreground))' }}>
                  {feature.title}
                </h3>

                <p className="leading-relaxed group-hover:text-gray-200 transition-colors duration-300" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {feature.description}
                </p>

                <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-50" style={{ background: 'hsl(var(--primary))' }}></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full opacity-50" style={{ background: 'hsl(var(--accent))' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16 space-x-4">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'hsl(var(--primary))' }}></div>
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'hsl(var(--accent))', animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'hsl(var(--indigo))', animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
