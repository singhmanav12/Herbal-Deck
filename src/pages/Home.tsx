import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductDiscovery } from '../components/ProductDiscovery';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { addToCart } = useCart();
  return (
    <div>
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-sage rounded-bl-[150px] opacity-30 transform translate-x-1/4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 pb-24 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="mb-6 flex items-center space-x-2">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-sm font-semibold tracking-widest text-accent uppercase">
                  NATURAL WELLNESS • HERBAL FORMULATIONS
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-primary leading-tight mb-8">
                Nature's wisdom.<br />
                <span className="italic font-light">Made for modern wellness.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-text-muted mb-10 leading-relaxed max-w-lg">
                Pure herbal products for a healthier, happier you. Carefully crafted with nature's best ingredients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center group">
                  SHOP PRODUCTS
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/collections" className="bg-transparent border border-primary text-primary hover:bg-sage hover:border-transparent px-8 py-4 rounded-full font-medium transition-colors text-center">
                  EXPLORE COLLECTIONS
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative hidden lg:block h-[600px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000" 
                alt="Herbal Deck Premium Products" 
                className="w-full h-full object-cover rounded-t-full rounded-br-full shadow-2xl shadow-primary/20"
              />
              {/* Botanical Decoration */}
              <img 
                src="https://images.unsplash.com/photo-1629198725622-c356e792e3a8?auto=format&fit=crop&q=80&w=400"
                alt="Botanical Leaf"
                className="absolute -bottom-10 -left-10 w-48 h-48 object-cover rounded-full border-8 border-white shadow-xl opacity-90"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2 - SHOP BY NEED */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Find what you're looking for.</h2>
              <p className="text-lg text-text-muted">Explore Herbal Deck products by your wellness goal.</p>
            </div>
            <Link to="/categories" className="hidden md:flex items-center text-accent hover:text-primary font-medium transition-colors group">
              View All <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-sage">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <h3 className="font-serif text-lg font-medium text-center text-primary group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - BEST SELLERS */}
      <section className="py-24 bg-sage/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Made for everyday wellness.</h2>
              <p className="text-lg text-text-muted">Customer favorites designed for optimal health.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-accent hover:text-primary font-medium transition-colors group">
              View all Products <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.isBestSeller).map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
        </div>
      </section>

      {/* SECTION 4 - BRAND STORY */}
      <section className="py-0 bg-primary overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
              alt="Traditional Herbs" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="px-6 py-20 lg:p-24 flex flex-col justify-center bg-primary text-white">
            <div className="mb-6 flex items-center space-x-2">
              <span className="h-px w-8 bg-accent"></span>
              <span className="text-sm font-semibold tracking-widest text-accent uppercase">
                OUR STORY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
              Rooted in tradition.<br />
              Designed for today.
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed font-light">
              At Herbal Deck, we believe in the power of nature to support your wellness journey. Our products are crafted using carefully selected herbs and ingredients, inspired by traditional wisdom and modern understanding.
            </p>
            <div>
              <Link to="/about" className="inline-flex items-center text-white border-b border-white hover:text-accent hover:border-accent pb-1 transition-all group font-medium">
                EXPLORE OUR STORY <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductDiscovery />
    </div>
  );
};
