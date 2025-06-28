
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Award } from 'lucide-react';

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

    // Animate stats
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
    <section id="about" className="about-section py-20 bg-gradient-to-b from-pink-900 via-purple-900 to-indigo-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(236,72,153,0.3),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="about-content max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Hungarian Bites</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
              A passionate journey bringing authentic Hungarian street food culture to Kenya through modern culinary excellence.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Text Content */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Our Story</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Founded with a passion for authentic Hungarian flavors, we've revolutionized street food in Kenya. 
                  Each hot dog roll is a testament to traditional recipes perfected through generations.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our commitment to quality ingredients and artisan craftsmanship ensures every bite delivers 
                  the perfect balance of crispy exterior and tender, flavorful filling that defines Hungarian cuisine.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To bring the authentic taste of Hungarian street food to every corner of Kenya, 
                  creating memorable experiences one delicious bite at a time.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=500&fit=crop&crop=center"
                  alt="Hungarian Bites kitchen preparation"
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl">
                  <div className="text-pink-600 font-bold text-sm">Premium Quality</div>
                </div>
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl">
                  <div className="text-purple-600 font-bold text-sm">Handcrafted</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-grid grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, number: '500+', label: 'Happy Customers', color: 'from-pink-500 to-rose-500' },
              { icon: Award, number: '100%', label: 'Premium Ingredients', color: 'from-purple-500 to-indigo-500' },
              { icon: Clock, number: '24/7', label: 'Online Ordering', color: 'from-indigo-500 to-purple-500' }
            ].map((stat, index) => (
              <div key={index} className="stat-card text-center group">
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-8 hover:border-pink-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  
                  <div className="text-gray-300 font-medium">
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
