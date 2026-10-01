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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary">Your Cart</h2>
              <button 
                onClick={toggleCart}
                className="text-text-muted hover:text-primary transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-sage/10 border-b border-gray-100">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-primary">
                    {amountToFreeShipping > 0 
                      ? `You're ₹${amountToFreeShipping} away from Free Shipping!` 
                      : '✨ You unlocked Free Shipping!'}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-accent"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center text-primary mb-2">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="font-serif text-xl text-primary">Your cart is empty</h3>
                  <p className="text-text-muted text-sm max-w-[250px]">
                    Looks like you haven't added any products to your cart yet.
                  </p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-sage/30 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <Link 
                            to={`/product/${item.id}`} 
                            onClick={toggleCart}
                            className="font-serif text-lg font-medium text-primary hover:text-accent transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-muted hover:text-accent p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="text-sm font-bold text-primary mb-auto">
                          ₹{item.price}
                        </div>
                        
                        <div className="flex items-center border border-gray-200 rounded-full w-24 h-8">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex-1 flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex-1 flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upsells Section */}
            {cart.length > 0 && upsellProducts.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 bg-white">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Perfect Pairings</h3>
                <div className="space-y-3">
                  {upsellProducts.map(upsell => (
                    <div key={upsell.id} className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-sage/30 rounded-md overflow-hidden flex-shrink-0">
                        <img src={upsell.image} alt={upsell.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium text-primary line-clamp-1">{upsell.name}</h4>
                        <span className="text-xs font-bold text-text-muted">₹{upsell.price}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(upsell, 1)}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1 rounded-full text-xs font-bold transition-colors"
                      >
                        ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-text-muted font-medium">Subtotal</span>
                  <span className="font-serif text-2xl font-bold text-primary">₹{cartTotal}</span>
                </div>
                <p className="text-xs text-text-muted mb-4 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <button className="w-full bg-accent hover:bg-[#a05632] text-white py-4 rounded-xl font-medium text-lg transition-colors shadow-lg shadow-accent/20">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
