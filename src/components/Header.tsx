
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, toggleCart } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-xl"
        style={{
          background: isScrolled ? 'hsl(var(--background) / 0.95)' : 'transparent',
          borderBottom: isScrolled ? '1px solid hsl(var(--primary) / 0.2)' : 'none'
        }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
          onClick={() => scrollToSection('home')}
          style={{
            fontFamily: 'Pacifico, cursive',
            backgroundImage: 'var(--gradient-primary)'
          }}
        >
          HUNGARIAN BITES
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { label: 'Home', id: 'home' },
            { label: 'Products', id: 'products' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="transition-colors duration-300 relative group font-medium"
              style={{ color: 'hsl(var(--primary))' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--primary-light, var(--primary)))'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--primary))'}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{
                background: 'var(--gradient-primary)'
              }}></span>
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-3 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'hsl(var(--primary) / 0.2)',
              border: '1px solid hsl(var(--primary) / 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(var(--primary) / 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'hsl(var(--primary) / 0.2)'}
          >
            <ShoppingCart className="w-6 h-6" style={{ color: 'hsl(var(--primary))' }} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg" style={{
                background: 'var(--gradient-primary)',
                color: 'white'
              }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 backdrop-blur-sm rounded-full transition-all duration-300"
            style={{
              background: 'hsl(var(--primary) / 0.2)',
              border: '1px solid hsl(var(--primary) / 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(var(--primary) / 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'hsl(var(--primary) / 0.2)'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" style={{ color: 'hsl(var(--primary))' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'hsl(var(--primary))' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden backdrop-blur-xl" style={{
          background: 'hsl(var(--background) / 0.95)',
          borderTop: '1px solid hsl(var(--primary) / 0.2)'
        }}>
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Products', id: 'products' },
              { label: 'About', id: 'about' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition-colors text-left py-2 text-lg font-medium"
                style={{ color: 'hsl(var(--primary))' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--primary-light, var(--primary)))'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--primary))'}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
