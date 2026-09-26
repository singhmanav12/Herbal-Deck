import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { categories } from '../data/categories';

export const Footer = () => (
  <footer className="bg-[#0f2319] text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-6">
            <span className="font-serif text-3xl font-bold">Herbal Deck</span>
          </Link>
          <p className="text-gray-400 mb-6 font-light leading-relaxed text-sm">
            100% Organic, Plant-Based Ayurvedic Wellness — trusted by lakhs of customers across India.
          </p>
          <div className="flex gap-3">
            {['IG', 'FB', 'YT', 'TW'].map(s => (
              <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-xs font-bold transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-serif text-lg mb-6">Shop</h4>
          <ul className="space-y-3">
            <li><Link to="/shop" className="text-gray-400 hover:text-white text-sm transition-colors">All Products</Link></li>
            {categories.slice(0, 6).map(cat => (
              <li key={cat.id}>
                <Link to={`/product/${cat.productId}`} className="text-gray-400 hover:text-white text-sm transition-colors">{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-serif text-lg mb-6">Help</h4>
          <ul className="space-y-3">
            {[
              { label: 'FAQ', to: '/faq' },
              { label: 'Shipping Policy', to: '/shipping' },
              { label: 'Returns & Cancellation', to: '/returns' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms & Conditions', to: '/terms' },
              { label: 'Disclaimer', to: '/disclaimer' },
            ].map(item => (
              <li key={item.to}>
                <Link to={item.to} className="text-gray-400 hover:text-white text-sm transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg mb-6">Contact Us</h4>
          <ul className="space-y-5">
            <li>
              <a href="tel:+918962421207" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-white text-sm font-medium">Call Support</p>
                  <p className="text-sm">+91-8962421207</p>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:support@herbaldeck.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-white text-sm font-medium">Email Support</p>
                  <p className="text-sm">support@herbaldeck.com</p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 text-gray-400">
              <MapPin size={18} className="mt-0.5 flex-shrink-0 text-accent" />
              <div>
                <p className="text-white text-sm font-medium">Location</p>
                <p className="text-sm">Indore, Madhya Pradesh, India</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Herbal Deck. All rights reserved.</p>
        <p>Made with <span className="text-accent">♥</span> for a healthier India.</p>
      </div>
    </div>
  </footer>
);
