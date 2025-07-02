import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  useEffect(() => {
    gsap.fromTo(".testimonial-card", 
      { y: 50, opacity: 0, rotation: -5 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Floating animation for cards
    gsap.to(".testimonial-card", {
      y: -5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      ease: "power2.inOut"
    });
  }, []);

  const testimonials = [
    {
      text: "Absolutely incredible! The perfect blend of traditional Hungarian flavors with modern presentation. Every bite is pure perfection.",
      author: "trainWithSteve.",
      rating: 5,
      gradient: "from-pink-500/20 to-rose-500/20",
      image: "/image/trainWithSteve.jpg"
    },
    {
      text: "These hot dog rolls have become my go-to for parties. Guests always ask where I got them - they're truly exceptional!",
      author: "Jimmy .",
      rating: 5,
      gradient: "from-purple-500/20 to-indigo-500/20",
      image: "/image/jimmy.jpg"
    },
    {
      text: "The quality is outstanding and the flavors are authentic. Hungarian Bites never fails to impress!",
      author: "Mc Wizzy",
      rating: 5,
      gradient: "from-indigo-500/20 to-purple-500/20",
      image: "/image/Mc Wizzy.jpg"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-2 text-pink-300 text-sm font-medium mb-6">
            ⭐ Customer Love Stories
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What Our <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Community</span> Says
          </h2>
          
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Real experiences from real customers who've fallen in love with our authentic Hungarian flavors.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card group">
              
              <div className={`bg-gradient-to-br ${testimonial.gradient} backdrop-blur-xl border border-pink-500/20 rounded-3xl p-8 hover:border-pink-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 relative`}>
                
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex justify-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-gray-200 text-lg italic leading-relaxed mb-6 text-center">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Author */}
                <div className="text-center">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {testimonial.author}
                  </h4>
                  <div className="text-gray-400 text-sm mt-1">Verified Customer</div>
                </div>

                {/* Avatar Image */}
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-pink-400 object-cover"
                    style={{ borderRadius: '50%' }}
                  />
                )}

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6">
            <p className="text-gray-300 text-lg mb-4">Join our community of satisfied customers</p>
            <div className="flex justify-center items-center space-x-2 text-pink-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-2xl font-bold">4.9/5</span>
              <span className="text-gray-400">average rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
