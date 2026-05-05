
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
      background: 'linear-gradient(to bottom, hsl(330 80% 20%), hsl(270 70% 20%), hsl(230 70% 20%))'
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
              <div className="relative rounded-3xl overflow-hidden group">
                <img
                  src="/image/hotdog.jpg"
                  alt="Hungarian Bites kitchen preparation"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3))' }}></div>

                <div className="absolute top-6 left-6 backdrop-blur-sm rounded-2xl p-3 shadow-xl" style={{
                  background: 'hsl(var(--card) / 0.9)',
                  color: 'hsl(var(--primary))'
                }}>
                  <div className="font-bold text-sm">Premium Quality</div>
                </div>
                <div className="absolute bottom-6 right-6 backdrop-blur-sm rounded-2xl p-3 shadow-xl" style={{
                  background: 'hsl(var(--card) / 0.9)',
                  color: 'hsl(var(--accent))'
                }}>
                  <div className="font-bold text-sm">Delicious</div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, number: '500+', label: 'Happy Customers', color: 'var(--gradient-primary)' },
              { icon: Award, number: '100%', label: 'Premium Ingredients', color: 'var(--gradient-secondary)' },
              { icon: Clock, number: '24/7', label: 'Online Ordering', color: 'var(--gradient-secondary)' }
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
