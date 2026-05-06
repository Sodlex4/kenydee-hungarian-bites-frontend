
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

const TestimonialsSection = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

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
      image: "/image/trainwithsteve.webp"
    },
    {
      text: "These hot dog rolls have become my go-to for parties. Guests always ask where I got them - they're truly exceptional!",
      author: "Jimmy .",
      rating: 5,
      image: "/image/jimmy.webp"
    },
    {
      text: "The quality is outstanding and the flavors are authentic. Hungarian Bites never fails to impress!",
      author: "Mc Wizzy",
      rating: 5,
      image: "/image/mc-wizzy.webp"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(330 40% 10%), hsl(270 50% 15%), hsl(230 40% 10%))'
    }}>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--primary) / 0.1)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--accent) / 0.1)' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="text-center mb-16">
          <div className="inline-block backdrop-blur-sm border rounded-full px-6 py-2 text-sm font-medium mb-6" style={{
            background: 'hsl(var(--primary) / 0.2)',
            borderColor: 'hsl(var(--primary) / 0.3)',
            color: 'hsl(var(--primary))'
          }}>
            Customer Love Stories
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
            What Our <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Community</span> Says
          </h2>

          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Real experiences from real customers who've fallen in love with our authentic Hungarian flavors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card group">

              <div className="backdrop-blur-xl border rounded-3xl p-8 hover:scale-105 transition-all duration-500 relative" style={{
                background: 'hsl(var(--card) / 0.5)',
                borderColor: 'hsl(var(--primary) / 0.2)'
              }}>

                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{
                  background: 'var(--gradient-primary)'
                }}>
                  <Quote className="w-6 h-6 text-white" />
                </div>

                <div className="flex justify-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-lg italic leading-relaxed mb-6 text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  "{testimonial.text}"
                </blockquote>

                <div className="text-center">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-20 h-20 rounded-full mx-auto mb-3 border-2 object-cover"
                      style={{ borderColor: 'hsl(var(--primary))' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  )}
                  <h4 className="text-xl font-bold tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif', backgroundImage: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {testimonial.author}
                  </h4>
                  <div className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Verified Customer</div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60" style={{ background: 'hsl(var(--primary))' }}></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full opacity-60" style={{ background: 'hsl(var(--accent))' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block backdrop-blur-xl border rounded-2xl p-6" style={{
            background: 'hsl(var(--card) / 0.5)',
            borderColor: 'hsl(var(--primary) / 0.2)'
          }}>
            <p className="text-lg mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>Join our community of satisfied customers</p>
            <div className="flex justify-center items-center space-x-2" style={{ color: 'hsl(var(--primary))' }}>
              <Star className="w-5 h-5 fill-current" />
              <span className="text-2xl font-bold" style={{ backgroundImage: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4.9/5</span>
              <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>average rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
