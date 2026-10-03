import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const allCategoryNames = ['All', ...Array.from(new Set(products.map(p => p.category)))];

export const Shop = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  let filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (searchQuery.trim()) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-[#06120C] py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <p className="text-[#B9673E] text-xs font-bold tracking-[0.3em] uppercase mb-6">Herbal Deck</p>
        <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#F7F3E9] tracking-tighter">The Apothecary</h1>
        <p className="text-[#F7F3E9]/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed tracking-wide">
          Explore our complete range of Ayurvedic formulations — {products.length} products distilled from the absolute purest essence of the earth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              {/* Search */}
              <div>
                <h3 className="font-serif text-xl text-primary mb-4">Search</h3>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-serif text-xl text-primary mb-4 flex items-center justify-between">
                  Category <ChevronDown size={16} />
                </h3>
                <div className="space-y-2">
                  {allCategoryNames.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:bg-sage/40 hover:text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-serif text-xl text-primary mb-4 flex items-center justify-between">
                  Price <ChevronDown size={16} />
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Under ₹1,000', fn: () => {} },
                    { label: '₹1,000 – ₹2,499', fn: () => {} },
                    { label: '₹2,500 – ₹3,699', fn: () => {} },
                    { label: 'Above ₹3,699', fn: () => {} },
                  ].map(p => (
                    <label key={p.label} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-accent rounded" />
                      <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <p className="text-text-muted text-sm">Showing <span className="font-semibold text-primary">{filtered.length}</span> products</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl text-sm font-medium text-primary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="font-serif text-2xl text-primary mb-2">No products found</h3>
                <p className="text-text-muted">Try adjusting your filters or search query.</p>
                <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="mt-6 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="group bg-transparent rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-700 hover:bg-white/40 hover:shadow-[0_20px_40px_rgba(23,60,42,0.05)] border border-transparent hover:border-white/50 backdrop-blur-sm"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6D9] rounded-[2.5rem] m-2">
                      <Link to={`/product/${product.id}`}>
                        <motion.img 
                          layoutId={`product-image-${product.id}`}
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-multiply" 
                        />
                      </Link>
                      {product.mrp > product.price && (
                        <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </div>
                      )}
                      <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-accent transition-colors shadow-sm">
                        <Heart size={15} />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-1.5">{product.category}</p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg font-medium text-primary leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-text-muted mb-4 line-clamp-2 leading-relaxed">{product.shortDesc}</p>

                      <div className="flex items-center gap-1.5 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="fill-accent text-accent" />
                          ))}
                        </div>
                        <span className="text-xs text-text-muted">
                          {product.rating} ({product.reviews.toLocaleString('en-IN')})
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="text-sm text-text-muted line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="gooey bg-[#173C2A] hover:bg-[#B9673E] text-[#F7F3E9] px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-colors shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
