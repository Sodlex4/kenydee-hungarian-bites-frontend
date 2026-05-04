import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Heart, Award, Users, MapPin } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Quality',
      description: 'Every Hungarian Hot Dog Roll is crafted with love and attention to detail in Murang\'a.'
    },
    {
      icon: Award,
      title: 'Authentic Flavors',
      description: 'Traditional Hungarian recipes passed down through generations, adapted for local tastes.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We\'re proud to serve the Murang\'a community with exceptional food and service.'
    },
    {
      icon: MapPin,
      title: 'Local Roots',
      description: 'Born and raised in Murang\'a, we understand what our community loves.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6" style={{ 
              color: 'hsl(var(--foreground))',
              fontFamily: 'Pacifico, cursive'
            }}>
              Our Story
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Bringing the authentic taste of Hungarian street food to the heart of Murang'a with a modern twist and local love.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="backdrop-blur-sm rounded-2xl p-8 border" style={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))'
            }}>
              <h2 className="text-3xl font-semibold mb-6" style={{ 
                color: 'hsl(var(--accent))',
                fontFamily: 'Pacifico, cursive'
              }}>
                The Beginning
              </h2>
              <div className="space-y-4" style={{ color: 'hsl(var(--foreground))' }}>
                <p className="leading-relaxed">
                  It all started with a simple dream: to bring the incredible flavors of Hungarian street food to our beloved 
                  community in Murang'a. Having traveled and experienced the authentic taste of Hungarian hot dog rolls, 
                  we knew we had to share this culinary delight with our neighbors.
                </p>
                <p className="leading-relaxed">
                  What began as a small family venture has grown into a local favorite, serving fresh, high-quality Hungarian 
                  Hot Dog Rolls that combine traditional European flavors with locally-sourced ingredients.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-sm rounded-2xl p-8 border" style={{
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))'
            }}>
              <h2 className="text-3xl font-semibold mb-6" style={{ 
                color: 'hsl(var(--accent))',
                fontFamily: 'Pacifico, cursive'
              }}>
                Our Mission
              </h2>
              <div className="space-y-4" style={{ color: 'hsl(var(--foreground))' }}>
                <p className="leading-relaxed">
                  Our mission is simple: to serve the most delicious, authentic Hungarian Hot Dog Rolls in Murang'a while 
                  building lasting relationships with our community. We believe that great food brings people together.
                </p>
                <p className="leading-relaxed">
                  Every roll we make is a testament to our commitment to quality, authenticity, and the satisfaction of 
                  our customers. We source the finest ingredients and use time-tested recipes to ensure every bite is perfect.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ 
              color: 'hsl(var(--foreground))',
              fontFamily: 'Pacifico, cursive'
            }}>
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm rounded-2xl p-6 border text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))'
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'hsl(var(--accent) / 0.2)' }}
                  >
                    <value.icon className="w-8 h-8" style={{ color: 'hsl(var(--accent))' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--foreground))' }}>
                    {value.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="backdrop-blur-sm rounded-2xl p-8 border text-center" style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}>
            <h2 className="text-4xl font-bold mb-6" style={{ 
              color: 'hsl(var(--accent))',
              fontFamily: 'Pacifico, cursive'
            }}>
              Meet the Team
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
              Our dedicated team of food enthusiasts works tirelessly to ensure every Hungarian Hot Dog Roll meets our 
              high standards. From our skilled chefs to our friendly delivery team, everyone plays a crucial role in 
              bringing you the best dining experience in Murang'a.
            </p>
            <div className="mt-8">
              <button 
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white'
                  }}
              >
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;