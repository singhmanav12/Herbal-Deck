import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, CreditCard, Plus, Minus, ChevronDown, ChevronUp, Leaf, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { IngredientTooltip } from '../components/IngredientTooltip';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id) || products[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { addToCart } = useCart();

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => addToCart(product, quantity);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-10">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">

          {/* ── Left: Gallery ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-[4/5] bg-sage/20 rounded-3xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {discount > 0 && (
                <div className="absolute top-5 left-5 bg-accent text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  {discount}% OFF
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(n => (
                <button key={n} className="aspect-square bg-sage/20 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary focus:border-primary transition-colors">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Details ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <p className="text-accent font-bold tracking-widest text-xs uppercase mb-3">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary leading-tight mb-5">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-primary">{product.rating}</span>
              <span className="text-sm text-text-muted">({product.reviews.toLocaleString('en-IN')} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-2">
              <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (
                <span className="text-xl text-text-muted line-through mb-1">₹{product.mrp.toLocaleString('en-IN')}</span>
              )}
              {discount > 0 && (
                <span className="mb-1 text-sm font-bold text-accent bg-accent/10 px-2 py-1 rounded">Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}</span>
              )}
            </div>
            <p className="text-xs text-text-muted mb-6">Inclusive of all taxes. Free shipping on this order.</p>

            <p className="text-text-muted leading-relaxed mb-8">{product.shortDesc}</p>

            {/* Net Qty / Shelf Life */}
            {(product.netQty || product.shelfLife) && (
              <div className="flex gap-6 mb-8">
                {product.netQty && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Package size={16} className="text-primary" />
                    Net Qty: <span className="font-medium text-primary">{product.netQty}</span>
                  </div>
                )}
                {product.shelfLife && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Leaf size={16} className="text-primary" />
                    Shelf Life: <span className="font-medium text-primary">{product.shelfLife}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-full bg-white h-14 w-36">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                  <Minus size={18} />
                </button>
                <span className="flex-1 text-center font-semibold text-primary text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <button onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-secondary text-white rounded-full h-14 font-semibold text-base transition-colors shadow-lg shadow-primary/20">
                Add to Cart
              </button>
              <button onClick={handleAddToCart}
                className="flex-1 bg-accent hover:bg-[#a05632] text-white rounded-full h-14 font-semibold text-base transition-colors">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200 mb-8">
              {[
                { icon: <Truck size={22} />, label: 'Free Shipping' },
                { icon: <ShieldCheck size={22} />, label: 'No Side Effects' },
                { icon: <CreditCard size={22} />, label: 'COD Available' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center text-center gap-2">
                  <div className="text-primary">{b.icon}</div>
                  <span className="text-xs font-medium text-text-muted">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="space-y-3">
              {[
                {
                  key: 'overview',
                  label: 'Benefits & Overview',
                  content: (
                    <ul className="list-disc pl-5 space-y-2 text-text-muted text-sm leading-relaxed">
                      {product.benefits?.map((b, i) => <li key={i}>{b}</li>) || <li>Carefully formulated with natural ingredients.</li>}
                    </ul>
                  )
                },
                {
                  key: 'ingredients',
                  label: 'Key Ingredients',
                  content: (
                    <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm leading-relaxed">
                       {/* Hardcoding some common herbs for the demo */}
                       <span className="text-text-muted">This blend contains extracts of</span>
                       <IngredientTooltip name="Ashwagandha" />,
                       <IngredientTooltip name="Brahmi" />, and 
                       <IngredientTooltip name="Tulsi" /> 
                       <span className="text-text-muted">in a pure, bio-available format.</span>
                    </div>
                  )
                },
                {
                  key: 'how-to-use',
                  label: 'How to Use',
                  content: (
                    <p className="text-text-muted text-sm leading-relaxed">
                      {product.howToUse || 'Follow the directions on the product label or consult your healthcare provider.'}
                    </p>
                  )
                },
                {
                  key: 'disclaimer',
                  label: 'Important Disclaimer',
                  content: (
                    <p className="text-text-muted text-sm leading-relaxed">
                      This product is not intended to diagnose, treat, cure, or prevent any disease.
                      Results may vary. Consult your healthcare provider before use if you are pregnant,
                      nursing, or have a medical condition.
                    </p>
                  )
                }
              ].map(acc => (
                <div key={acc.key} className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                  <button
                    onClick={() => setActiveTab(activeTab === acc.key ? '' : acc.key)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-xl text-primary hover:bg-sage/10 transition-colors"
                  >
                    {acc.label}
                    {activeTab === acc.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {activeTab === acc.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-5 pb-5"
                    >
                      {acc.content}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-sage/20">
                    <img src={p.image} alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-base font-medium text-primary line-clamp-2 mb-1">{p.name}</h4>
                    <p className="text-sm font-bold text-primary">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
