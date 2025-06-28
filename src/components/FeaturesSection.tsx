
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Sparkles, Shield } from 'lucide-react';

const FeaturesSection = () => {
  useEffect(() => {
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

    // Floating animation for icons
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
      title: 'Royal Quality',
      description: 'Crafted with the finest ingredients and time-honored Hungarian traditions for an unmatched taste experience.'
    },
    {
      icon: Sparkles,
      title: 'Artisan Crafted',
      description: 'Each roll is carefully handcrafted by our master chefs, ensuring perfect texture and flavor in every bite.'
    },
    {
      icon: Shield,
      title: 'Trusted Excellence',
      description: 'Over 500 satisfied customers trust us for consistent quality and authentic Hungarian street food experience.'
    }
  ];

  return (
    <section id="products" className="features-section py-20 bg-gradient-to-b from-purple-900 via-indigo-900 to-pink-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.4),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Why Choose Our <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Masterpiece</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the perfect harmony of traditional Hungarian recipes and modern culinary innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative"
            >
              {/* Glassmorphism Card */}
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-8 text-center hover:border-pink-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                
                {/* Icon Container */}
                <div className="feature-icon relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-50"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center mt-16 space-x-4">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
