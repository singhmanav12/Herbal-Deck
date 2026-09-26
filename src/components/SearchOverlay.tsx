import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = query.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="text-text-muted hover:text-primary transition-colors p-2">
                <X size={32} />
              </button>
            </div>

            <div className="relative mb-12">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={32} />
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full text-3xl md:text-5xl font-serif text-primary bg-transparent border-b-2 border-sage py-4 pl-12 focus:outline-none focus:border-primary placeholder:text-gray-300 transition-colors"
              />
            </div>

            {query.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
                  {searchResults.length} Results
                </h3>
                
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto pb-8">
                    {searchResults.map(product => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex gap-4 group hover:bg-sage/10 p-3 rounded-xl transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-sage flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-serif text-lg font-medium text-primary group-hover:text-accent transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-sm font-bold text-text-main">₹{product.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-text-muted">No products found for "{query}"</p>
                    <p className="text-sm text-gray-400 mt-2">Try searching for generic terms like 'growth', 'skin', or 'digestion'.</p>
                  </div>
                )}
              </div>
            )}
            
            {query.length === 0 && (
              <div className="mt-12">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">Popular Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {['Height Growth', 'Skin Care', 'Digestion', 'Joint Pain', 'Immunity'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-sage/30 text-primary rounded-full hover:bg-sage transition-colors text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
