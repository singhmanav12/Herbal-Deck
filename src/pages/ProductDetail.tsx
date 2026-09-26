import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, CreditCard, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id) || products[0];
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'how-to-use'>('overview');
  const { addToCart } = useCart();
  
  const discount = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] bg-sage/30 rounded-3xl overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                  {discount}% OFF
                </div>
              )}
            </div>
            {/* Thumbnail Gallery (Placeholders) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(num => (
                <button key={num} className="aspect-square bg-sage/30 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-colors focus:outline-none focus:border-primary">
                  <img src={product.image} alt={`Thumbnail ${num}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-2 text-accent font-semibold tracking-wider text-sm uppercase">{product.category}</div>
            <h1 className="text-4xl sm:text-5xl font-serif text-primary mb-4">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.floor(product.rating!) ? "fill-current" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-main">{product.rating}</span>
                <span className="text-sm text-text-muted">({product.reviews} reviews)</span>
              </div>
            )}

            <div className="flex items-end space-x-4 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              {product.mrp > product.price && (
                <span className="text-xl text-text-muted line-through mb-1">₹{product.mrp}</span>
              )}
            </div>

            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              {product.shortDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-full bg-white h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium text-primary">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-grow bg-primary hover:bg-secondary text-white rounded-full h-14 font-medium transition-colors flex items-center justify-center text-lg"
              >
                Add to Cart
              </button>
              
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-grow bg-accent hover:bg-[#a05632] text-white rounded-full h-14 font-medium transition-colors flex items-center justify-center text-lg"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-gray-200">
              <div className="flex flex-col items-center text-center">
                <Truck size={24} className="text-primary mb-2" />
                <span className="text-xs font-medium text-text-main">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={24} className="text-primary mb-2" />
                <span className="text-xs font-medium text-text-main">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <CreditCard size={24} className="text-primary mb-2" />
                <span className="text-xs font-medium text-text-main">COD Available</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                <button 
                  onClick={() => setActiveTab(activeTab === 'overview' ? '' as any : 'overview')}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-xl text-primary"
                >
                  Overview & Benefits
                  {activeTab === 'overview' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeTab === 'overview' && (
                  <div className="p-5 pt-0 text-text-muted">
                    <ul className="list-disc pl-5 space-y-2">
                      {product.benefits?.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      )) || <li>Formulated with premium natural ingredients for maximum efficacy.</li>}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                <button 
                  onClick={() => setActiveTab(activeTab === 'ingredients' ? '' as any : 'ingredients')}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-xl text-primary"
                >
                  Key Ingredients
                  {activeTab === 'ingredients' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeTab === 'ingredients' && (
                  <div className="p-5 pt-0 text-text-muted">
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients?.map((ing, i) => (
                        <span key={i} className="bg-sage/50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {ing}
                        </span>
                      )) || <span>Proprietary Ayurvedic blend. Check packaging for full list.</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                <button 
                  onClick={() => setActiveTab(activeTab === 'how-to-use' ? '' as any : 'how-to-use')}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-xl text-primary"
                >
                  How to Use
                  {activeTab === 'how-to-use' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeTab === 'how-to-use' && (
                  <div className="p-5 pt-0 text-text-muted">
                    <p>{product.howToUse || "Follow the directions on the product label or consult your healthcare provider."}</p>
                  </div>
                )}
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};
