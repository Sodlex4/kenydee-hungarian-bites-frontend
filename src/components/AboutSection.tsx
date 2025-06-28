
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutSection = () => {
  useEffect(() => {
    gsap.fromTo(".about-content", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section id="about" className="about-section py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 text-center">
        <div className="about-content max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            About <span className="text-orange-500">Hungarian Bites</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <p className="text-gray-300 text-lg leading-relaxed">
                We're passionate about bringing authentic Hungarian street food to Kenya. 
                Our hot dog rolls combine traditional recipes with modern flavors for a snack you'll never forget.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Every roll is carefully crafted using premium ingredients, ensuring that each bite delivers 
                the perfect balance of crispy exterior and tender, flavorful filling that has made Hungarian 
                street food famous worldwide.
              </p>

              <div className="flex items-center space-x-4 text-orange-500">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-gray-400">Fresh Ingredients</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-gray-400">Available</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=400&fit=crop&crop=center"
                alt="Hungarian Bites kitchen preparation"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
