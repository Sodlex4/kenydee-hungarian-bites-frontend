
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';
import { testimonials, getAverageRating, getInitials } from '../data/testimonials';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

  return (
    <section id="testimonials" className="testimonials-section py-20 relative overflow-hidden section-gradient-purple">

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--primary) / 0.1)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'hsl(var(--accent) / 0.1)' }}></div>
      </div>

      <div className="container relative z-10">

        <div className="text-center mb-16">
          <div className="badge-chip mb-6">
            Wenye wameonja wanasema...
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
            What Our <span className="text-gradient-primary">Community</span> Says
          </h2>

          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
            The people have spoken. No cap.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card group">
              <div className="glass-card p-8 hover:scale-105 transition-all duration-500 relative">
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
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-20 h-20 rounded-full mx-auto mb-3 border-2 object-cover"
                      style={{ borderColor: 'hsl(var(--primary))' }}
                      width="80"
                      height="80"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.initials-fallback');
                          if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div className="initials-fallback w-20 h-20 rounded-full mx-auto mb-3 border-2 flex items-center justify-center text-xl font-bold" style={{
                    borderColor: 'hsl(var(--primary))',
                    background: 'hsl(var(--primary) / 0.15)',
                    color: 'hsl(var(--primary))',
                    display: testimonial.image ? 'none' : 'flex'
                  }}>
                    {testimonial.image ? '' : getInitials(testimonial.author)}
                  </div>
                  <h4 className="text-xl font-bold tracking-wide text-gradient-primary" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {testimonial.author}
                  </h4>
                  {testimonial.verified && (
                    <div className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Verified Customer</div>
                  )}
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60" style={{ background: 'hsl(var(--primary))' }}></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full opacity-60" style={{ background: 'hsl(var(--accent))' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Swipeable carousel */}
        <div className="md:hidden max-w-sm mx-auto">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="glass-card p-8 relative">
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
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-20 h-20 rounded-full mx-auto mb-3 border-2 object-cover"
                          style={{ borderColor: 'hsl(var(--primary))' }}
                          width="80"
                          height="80"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              const fallback = parent.querySelector('.initials-fallback');
                              if (fallback) (fallback as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div className="initials-fallback w-20 h-20 rounded-full mx-auto mb-3 border-2 flex items-center justify-center text-xl font-bold" style={{
                        borderColor: 'hsl(var(--primary))',
                        background: 'hsl(var(--primary) / 0.15)',
                        color: 'hsl(var(--primary))',
                        display: testimonial.image ? 'none' : 'flex'
                      }}>
                        {testimonial.image ? '' : getInitials(testimonial.author)}
                      </div>
                      <h4 className="text-xl font-bold tracking-wide text-gradient-primary" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        {testimonial.author}
                      </h4>
                      {testimonial.verified && (
                        <div className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Verified Customer</div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 w-10 h-10" />
              <CarouselNext className="static translate-y-0 w-10 h-10" />
            </div>
          </Carousel>
        </div>

        <div className="text-center mt-16">
          <div className="glass-card !rounded-2xl p-6">
            <p className="text-lg mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>Weka order, ujionee mwenyewe.</p>
            <div className="flex justify-center items-center space-x-2" style={{ color: 'hsl(var(--primary))' }}>
              <Star className="w-5 h-5 fill-current" />
              <span className="text-2xl font-bold text-gradient-primary">{getAverageRating(testimonials)}/5</span>
              <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>average rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
