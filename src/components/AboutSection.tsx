
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Award } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

const AboutSection = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

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

    gsap.fromTo(".stat-card",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section id="about" className="about-section py-20 relative" style={{
      background: 'linear-gradient(to bottom, hsl(270 40% 8%), hsl(230 50% 12%), hsl(270 40% 8%))'
    }}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)_/_0.3),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)_/_0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="about-content max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
              About <span style={{ backgroundImage: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hungarian Bites</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-primary)' }}></div>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
              A passionate journey bringing authentic Hungarian street food culture to Kenya through modern culinary excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            <div className="space-y-8">
              <div className="backdrop-blur-xl border rounded-3xl p-8" style={{
                background: 'hsl(var(--card) / 0.5)',
                borderColor: 'hsl(var(--primary) / 0.2)'
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Our Story</h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Founded with a passion for authentic Hungarian flavors, we've revolutionized street food in Kenya.
                  Each hot dog roll is a testament to traditional recipes perfected through generations.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Our commitment to quality ingredients and artisan craftsmanship ensures every bite delivers
                  the perfect balance of crispy exterior and tender, flavorful filling that defines Hungarian cuisine.
                </p>
              </div>

              <div className="backdrop-blur-xl border rounded-3xl p-8" style={{
                background: 'hsl(var(--card) / 0.5)',
                borderColor: 'hsl(var(--accent) / 0.2)'
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Our Mission</h3>
                <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  To bring the authentic taste of Hungarian street food to every corner of Kenya,
                  creating memorable experiences one delicious bite at a time.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden group">
                  <img
                    src="/image/cheese-dog-bread-rolls.webp"
                    alt="Hungarian Bites cheese dog rolls"
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    width="300"
                    height="224"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))' }}></div>
                  <div className="absolute top-4 left-4 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg" style={{
                    background: 'hsl(var(--card) / 0.9)',
                    color: 'hsl(var(--primary))'
                  }}>
                    <div className="font-bold text-xs">Fresh Daily</div>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden group bg-gradient-to-br from-pink-900/50 to-purple-900/50 border" style={{
                  borderColor: 'hsl(var(--primary) / 0.2)'
                }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{
                      background: 'var(--gradient-primary)'
                    }}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Authentic Recipe</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Passed down through generations of Hungarian chefs</p>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden group bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border" style={{
                  borderColor: 'hsl(var(--accent) / 0.2)'
                }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{
                      background: 'var(--gradient-secondary)'
                    }}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Local Delivery</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Free delivery within Murang'a Town</p>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden group">
                  <img
                    src="/image/hotdog.webp"
                    alt="Hungarian hot dog rolls ready for delivery"
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    width="300"
                    height="224"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.3))' }}></div>
                  <div className="absolute bottom-4 right-4 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg" style={{
                    background: 'hsl(var(--card) / 0.9)',
                    color: 'hsl(var(--accent))'
                  }}>
                    <div className="font-bold text-xs">Best in Town</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, number: '500+', label: 'Happy Customers', color: 'var(--gradient-primary)' },
              { icon: Award, number: '100%', label: 'Premium Ingredients', color: 'var(--gradient-secondary)' },
              { icon: Clock, number: '2hr', label: 'Fast Delivery', color: 'var(--gradient-secondary)' }
            ].map((stat, index) => (
              <div key={index} className="stat-card text-center group">
                <div className="backdrop-blur-xl border rounded-3xl p-8 hover:scale-105 transition-all duration-300" style={{
                  background: 'hsl(var(--card) / 0.5)',
                  borderColor: 'hsl(var(--primary) / 0.2)'
                }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{
                    background: stat.color
                  }}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-4xl font-bold mb-2" style={{ backgroundImage: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {stat.number}
                  </div>

                  <div className="font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
