import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { SearchOverlay } from './SearchOverlay';

export const Navbar = () => {
  const { toggleCart, cartItemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-center py-2 text-sm font-medium tracking-wide">
        Free shipping on all orders over ₹999 | Secure Delivery
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-background py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-text-main"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center justify-center lg:justify-start w-full lg:w-auto absolute lg:static left-0 pointer-events-none lg:pointer-events-auto">
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary pointer-events-auto">
                Herbal Deck
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/shop" className="text-text-main hover:text-primary transition-colors font-medium">Shop</Link>
              <Link to="/collections" className="text-text-main hover:text-primary transition-colors font-medium">Collections</Link>
              <Link to="/about" className="text-text-main hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/story" className="text-text-main hover:text-primary transition-colors font-medium">Our Story</Link>
              <Link to="/ingredients" className="text-text-main hover:text-primary transition-colors font-medium">Ingredients</Link>
              <Link to="/contact" className="text-text-main hover:text-primary transition-colors font-medium">Contact</Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-text-main hover:text-primary transition-colors"
              >
                <Search size={20} />
              </button>
              <button className="hidden lg:block text-text-main hover:text-primary transition-colors">
                <User size={20} />
              </button>
              <button 
                onClick={toggleCart}
                className="text-text-main hover:text-primary transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-serif text-2xl font-bold text-primary">
                    Herbal Deck
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} className="text-text-muted" />
                  </button>
                </div>
                <div className="flex flex-col space-y-6">
                  <Link to="/shop" className="text-lg font-medium text-text-main" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                  <Link to="/collections" className="text-lg font-medium text-text-main" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
                  <Link to="/about" className="text-lg font-medium text-text-main" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                  <Link to="/story" className="text-lg font-medium text-text-main" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                  <Link to="/ingredients" className="text-lg font-medium text-text-main" onClick={() => setIsMobileMenuOpen(false)}>Ingredients</Link>
                  <Link to="/contact" className="text-lg font-medium text-text-main" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                  
                  <div className="border-t border-gray-200 pt-6 mt-2">
                    <Link to="/account" className="flex items-center space-x-3 text-text-main" onClick={() => setIsMobileMenuOpen(false)}>
                      <User size={20} />
                      <span className="font-medium">My Account</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
