import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

export const ProductDiscovery = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setStep(2);
  };

  const resetDiscovery = () => {
    setStep(1);
    setSelectedCategory(null);
  };

  const matchingProducts = products.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 bg-primary text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Find what fits your needs.</h2>
          <p className="text-lg text-gray-300">Answer a quick question to discover relevant Herbal Deck products.</p>
        </div>

        <div className="bg-white text-text-main rounded-3xl p-8 md:p-12 shadow-2xl relative min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Step 1 of 2</span>
                  <h3 className="text-3xl font-serif text-primary">What are you exploring today?</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.name)}
                      className="flex flex-col items-center justify-center p-6 border-2 border-sage hover:border-primary rounded-xl transition-all hover:bg-sage/20 group"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-primary transition-colors">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-primary text-center">{category.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center mb-8 relative">
                  <button 
                    onClick={resetDiscovery}
                    className="absolute left-0 text-text-muted hover:text-primary transition-colors flex items-center"
                  >
                    <ArrowLeft size={20} className="mr-1" /> Back
                  </button>
                  <div className="w-full text-center">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Your Results</span>
                    <h3 className="text-3xl font-serif text-primary">Based on your selection</h3>
                  </div>
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
                    {matchingProducts.slice(0, 2).map(product => (
                      <div key={product.id} className="flex gap-4 border border-gray-100 p-4 rounded-2xl bg-gray-50">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-sage">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-serif text-xl font-medium text-primary">{product.name}</h4>
                          <span className="text-lg font-bold text-primary mt-1 mb-2">₹{product.price}</span>
                          <Link 
                            to={`/product/${product.id}`}
                            className="text-sm font-medium text-accent hover:text-primary transition-colors"
                          >
                            View Product →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12">
                    <p className="text-text-muted">No specific products found for this category yet. Please check our complete shop.</p>
                  </div>
                )}
                
                <div className="mt-12 text-center">
                  <p className="text-xs text-text-muted mb-4">
                    *This tool is for product discovery only and does not provide medical advice.
                  </p>
                  <Link 
                    to="/shop"
                    className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-medium transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
