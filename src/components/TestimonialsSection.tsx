
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TestimonialsSection = () => {
  useEffect(() => {
    gsap.fromTo(".testimonial-card", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const testimonials = [
    {
      text: "These hot dog rolls are on another level. Crunchy and full of flavor. 100% recommend!",
      author: "Steve"
    },
    {
      text: "Perfect snack for parties. My friends keep asking for them!",
      author: "Jimmy"
    },
    {
      text: "A taste explosion. Hungarian Bites never disappoints!",
      author: "Mc Wizzy"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-orange-500">Fans Say</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Don't just take our word for it - hear from our satisfied customers!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-gradient-to-b from-orange-500/5 to-orange-500/10 border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/40 transition-all duration-300 hover:scale-105"
            >
              <div className="text-6xl text-orange-500/30 mb-4">"</div>
              
              <p className="text-gray-300 text-lg italic leading-relaxed mb-6">
                {testimonial.text}
              </p>
              
              <h4 className="text-xl font-bold text-orange-500" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {testimonial.author}
              </h4>
              
              <div className="flex justify-center mt-4 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-orange-500 text-xl">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
