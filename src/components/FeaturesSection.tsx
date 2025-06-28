
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Fire, Heart } from 'lucide-react';

const FeaturesSection = () => {
  useEffect(() => {
    gsap.fromTo(".feature-card", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Hover animations
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        gsap.to(card.querySelector('.feature-icon'), { 
          rotation: 360, 
          duration: 0.6, 
          ease: "power2.out" 
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, []);

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Made with the finest ingredients and traditional Hungarian recipes for authentic taste and superior quality.'
    },
    {
      icon: Fire,
      title: 'Perfectly Crispy',
      description: 'Golden brown exterior with a satisfying crunch that gives way to tender, flavorful filling inside.'
    },
    {
      icon: Heart,
      title: 'Irresistible Taste',
      description: 'Every bite delivers an explosion of flavor that will keep you coming back for more.'
    }
  ];

  return (
    <section id="products" className="features-section py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Our <span className="text-orange-500">Hot Dog Rolls</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover what makes our Hungarian hot dog rolls the perfect choice for snack lovers across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-gradient-to-b from-gray-800 to-gray-900 border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/40 transition-all duration-300 cursor-pointer"
              role="article"
              tabIndex={0}
            >
              <div className="feature-icon w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
