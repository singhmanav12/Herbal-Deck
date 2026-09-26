import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-bold text-white">Herbal Deck</span>
            </Link>
            <p className="text-gray-300 mb-6 font-light leading-relaxed">
              Your trusted partner in natural wellness. Pure ingredients, better outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors font-serif italic text-sm">
                Ig
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors font-serif italic text-sm">
                Fb
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors font-serif italic text-sm">
                Tw
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif text-xl mb-6 font-medium">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/shop?sort=bestsellers" className="text-gray-300 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?sort=new" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-serif text-xl mb-6 font-medium">Help</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns & Cancellation</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-serif text-xl mb-6 font-medium">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-300">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <span>+91 90989090909</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <span>support@herbaldeck.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Herbal Deck. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            Made with <span className="text-accent">♥</span> for a healthier India.
          </div>
        </div>
      </div>
    </footer>
  );
};
