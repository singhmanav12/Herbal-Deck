import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';

export const Shop = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-6">Shop Herbal Deck</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Explore our complete range of Ayurvedic formulations designed to support your natural wellness journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-primary font-medium">Filters</h3>
                <button className="lg:hidden flex items-center text-sm font-medium text-text-muted hover:text-primary">
                  <Filter size={16} className="mr-2" />
                  Show Filters
                </button>
              </div>
              
              <div className="hidden lg:block space-y-8">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-text-main mb-4 flex items-center justify-between cursor-pointer">
                    Category <ChevronDown size={16} />
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={activeCategory === 'All'}
                        onChange={() => setActiveCategory('All')}
                        className="form-radio text-accent focus:ring-accent" 
                      />
                      <span className={`text-sm transition-colors ${activeCategory === 'All' ? 'text-primary font-medium' : 'text-text-muted group-hover:text-primary'}`}>All Products</span>
                    </label>
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="category" 
                          checked={activeCategory === category.name}
                          onChange={() => setActiveCategory(category.name)}
                          className="form-radio text-accent focus:ring-accent" 
                        />
                        <span className={`text-sm transition-colors ${activeCategory === category.name ? 'text-primary font-medium' : 'text-text-muted group-hover:text-primary'}`}>{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-text-main mb-4 flex items-center justify-between cursor-pointer">
                    Price Range <ChevronDown size={16} />
                  </h4>
                  <input type="range" min="0" max="2000" className="w-full accent-accent" />
                  <div className="flex justify-between text-xs text-text-muted mt-2">
                    <span>₹0</span>
                    <span>₹2000+</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <span className="text-text-muted text-sm">{filteredProducts.length} products</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-muted">Sort by:</span>
                <select className="bg-transparent border-none text-sm font-medium text-primary focus:ring-0 cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative p-4"
                >
                  <button className="absolute top-6 right-6 z-10 text-gray-400 hover:text-accent transition-colors">
                    <Heart size={20} />
                  </button>
                  
                  <Link to={`/product/${product.id}`} className="block relative aspect-square mb-6 overflow-hidden rounded-xl bg-sage/20">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.mrp > product.price && (
                      <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                      </div>
                    )}
                  </Link>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                      {product.category}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif text-xl font-medium text-primary mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-text-muted mb-4 line-clamp-2">
                      {product.shortDesc}
                    </p>
                    
                    {product.rating && (
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(product.rating!) ? "fill-accent text-accent" : "text-gray-300"} />
                        ))}
                        <span className="text-xs text-text-muted ml-2">({product.reviews})</span>
                      </div>
                    )}
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-primary mr-2">₹{product.price}</span>
                        {product.mrp > product.price && (
                          <span className="text-sm text-text-muted line-through">₹{product.mrp}</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product, 1);
                        }}
                        className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              <button className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors">
                Load More
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
