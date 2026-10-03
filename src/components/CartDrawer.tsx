import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const FREE_SHIPPING_THRESHOLD = 2000;

export const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();
  
  const progressPercentage = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;
  
  // Upsells: Pick 2 products not in cart
  const cartItemIds = cart.map(item => item.id);
  const upsellProducts = products.filter(p => !cartItemIds.includes(p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 right-4 md:right-8 w-full max-w-md max-h-[80vh] bg-[#F7F3E9]/70 backdrop-blur-[40px] shadow-[0_40px_100px_rgba(23,60,42,0.15)] z-50 flex flex-col rounded-[32px] border border-white/50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-[#173C2A]/10 flex items-center justify-between shrink-0">
              <h2 className="font-serif text-2xl text-[#173C2A]">The Apothecary Bag</h2>
              <button 
                onClick={toggleCart}
                className="text-[#173C2A]/50 hover:text-[#173C2A] transition-colors p-2 bg-white/30 rounded-full backdrop-blur-md"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-[#173C2A]/5 border-b border-[#173C2A]/10 shrink-0">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-[#173C2A]">
                    {amountToFreeShipping > 0 
                      ? `₹${amountToFreeShipping} away from Free Shipping` 
                      : '✨ Free Shipping Unlocked'}
                  </span>
                </div>
                <div className="h-1 w-full bg-[#173C2A]/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-[#B9673E]"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 bg-white/40 rounded-full flex items-center justify-center text-[#173C2A] mb-2 shadow-inner">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-[#173C2A]">Your bag is empty</h3>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 gooey relative overflow-hidden bg-[#173C2A] text-[#F7F3E9] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#B9673E] transition-colors shadow-lg"
                  >
                    Enter The Apothecary
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, i) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex gap-4 p-3 bg-white/40 rounded-2xl border border-white/50 shadow-sm backdrop-blur-md"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F7F3E9]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-grow flex flex-col py-1">
                        <div className="flex justify-between items-start mb-1">
                          <Link 
                            to={`/product/${item.id}`} 
                            onClick={toggleCart}
                            className="font-serif text-lg font-medium text-[#173C2A] hover:text-[#B9673E] transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#173C2A]/40 hover:text-[#B9673E] p-1 bg-white/50 rounded-full transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="text-sm font-bold text-[#173C2A] mb-auto">
                          ₹{item.price}
                        </div>
                        
                        <div className="flex items-center border border-[#173C2A]/10 bg-white/30 rounded-full w-24 h-8 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex-1 flex items-center justify-center text-[#173C2A]/60 hover:text-[#173C2A] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="flex-1 text-center text-xs font-bold text-[#173C2A]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex-1 flex items-center justify-center text-[#173C2A]/60 hover:text-[#173C2A] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Upsells Section */}
            {cart.length > 0 && upsellProducts.length > 0 && (
              <div className="px-6 py-4 border-t border-[#173C2A]/10 bg-white/20 shrink-0">
                <h3 className="text-[10px] font-bold text-[#173C2A] uppercase tracking-widest mb-3">Perfect Pairings</h3>
                <div className="space-y-3">
                  {upsellProducts.map((upsell, i) => (
                    <motion.div 
                      key={upsell.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex gap-3 items-center p-2 rounded-xl hover:bg-white/40 transition-colors border border-transparent hover:border-white/50"
                    >
                      <div className="w-12 h-12 bg-[#F7F3E9] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={upsell.image} alt={upsell.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-serif font-medium text-[#173C2A] line-clamp-1">{upsell.name}</h4>
                        <span className="text-xs font-bold text-[#173C2A]/60">₹{upsell.price}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(upsell, 1)}
                        className="bg-white text-[#173C2A] shadow-sm hover:bg-[#173C2A] hover:text-[#F7F3E9] px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors gooey"
                      >
                        Add
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#173C2A]/10 p-6 bg-white/40 shrink-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#173C2A]/70 font-medium text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif text-3xl font-bold text-[#173C2A]">₹{cartTotal}</span>
                </div>
                <button className="gooey w-full bg-[#B9673E] hover:bg-[#173C2A] text-[#F7F3E9] py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-colors shadow-xl">
                  Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
