
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-purple-900/95 backdrop-blur-xl border-b border-pink-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
          onClick={() => scrollToSection('home')}
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
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
              className="text-white hover:text-pink-400 transition-colors duration-300 relative group font-medium"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-purple-900/95 backdrop-blur-xl border-t border-pink-500/20">
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
                className="text-white hover:text-pink-400 transition-colors text-left py-2 text-lg font-medium"
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
