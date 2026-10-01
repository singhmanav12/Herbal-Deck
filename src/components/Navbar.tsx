import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SearchOverlay } from './SearchOverlay';
import { categories } from '../data/categories';

export const Navbar = () => {
  const { toggleCart, cartItemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (productId: string) => {
    setIsShopDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center py-2 text-xs font-semibold tracking-wide">
        🌿 &nbsp; Flat ₹400 OFF on all Prepaid Orders &nbsp;|&nbsp; Free & Fast Shipping &nbsp; 🌿
      </div>

      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-background py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Mobile menu */}
            <button className="lg:hidden p-1" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
              <Menu size={24} className="text-primary" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-tight whitespace-nowrap">
                Herbal Deck
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Shop with dropdown */}
              <div className="relative" onMouseEnter={() => setIsShopDropdownOpen(true)} onMouseLeave={() => setIsShopDropdownOpen(false)}>
                <button className="flex items-center gap-1 text-text-main hover:text-primary transition-colors font-medium">
                  Shop <ChevronDown size={16} className={`transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isShopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50"
                    >
                      <Link to="/shop"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="block px-5 py-2.5 text-sm font-semibold text-primary hover:bg-sage/30 transition-colors border-b border-gray-100 mb-1">
                        All Products
                      </Link>
                      {categories.map(cat => (
                        <button key={cat.id}
                          onClick={() => handleCategoryClick(cat.productId)}
                          className="block w-full text-left px-5 py-2.5 text-sm text-text-muted hover:text-primary hover:bg-sage/20 transition-colors">
                          {cat.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/about" className="text-text-main hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/glossary" className="text-text-main hover:text-primary transition-colors font-medium">Ingredients</Link>
              <Link to="/contact" className="text-text-main hover:text-primary transition-colors font-medium">Contact</Link>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="text-primary hover:text-secondary transition-colors">
                <Search size={20} />
              </button>
              <button onClick={toggleCart} aria-label="Cart" className="text-primary hover:text-secondary transition-colors relative">
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <span className="font-serif text-2xl font-bold text-primary">Herbal Deck</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} className="text-text-muted" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-primary py-3 border-b border-gray-100">Home</Link>
                  <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-primary py-3 border-b border-gray-100">All Products</Link>

                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-4 mb-2">Shop by Goal</p>
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/product/${cat.productId}`} onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base text-text-muted hover:text-primary py-2 transition-colors">
                      {cat.name}
                    </Link>
                  ))}

                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-4">
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-primary">About Us</Link>
                    <Link to="/glossary" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-primary">Ingredients</Link>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-primary">Contact</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
