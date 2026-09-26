import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Star, Heart, ShieldCheck, Truck, Leaf, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductDiscovery } from '../components/ProductDiscovery';
import { useCart } from '../context/CartContext';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export const Home = () => {
  const { addToCart } = useCart();
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-background">
        {/* Background organic blob */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-32 -top-32 w-[700px] h-[700px] rounded-full bg-sage opacity-40" />
          <div className="absolute right-64 bottom-0 w-[300px] h-[300px] rounded-full bg-sage opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-24 lg:py-0 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="visible" className="max-w-xl">
              <motion.div variants={fadeUp} custom={0} className="mb-5 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="text-xs font-bold tracking-widest text-accent uppercase">
                  NATURAL WELLNESS · HERBAL FORMULATIONS
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-[56px] sm:text-[68px] lg:text-[76px] font-serif text-primary leading-[1.05] mb-6">
                Nature's wisdom.<br />
                <em className="not-italic text-secondary">Made for modern</em><br />
                wellness.
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-lg text-text-muted mb-10 leading-relaxed">
                100% Organic, Plant-Based Formulations rooted in Ayurveda —
                trusted by lakhs of customers across India.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 group shadow-lg shadow-primary/20">
                  SHOP ALL PRODUCTS
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300">
                  TALK TO AN EXPERT
                </Link>
              </motion.div>

              {/* Mini trust row */}
              <motion.div variants={fadeUp} custom={4} className="mt-10 flex items-center gap-6 flex-wrap">
                {[
                  { icon: <Leaf size={16} />, text: '100% Plant-Based' },
                  { icon: <ShieldCheck size={16} />, text: 'No Side Effects' },
                  { icon: <Truck size={16} />, text: 'Free & Fast Shipping' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="text-primary">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right – product composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="hidden lg:block relative h-[620px]"
            >
              <div className="absolute inset-0 rounded-[60px] overflow-hidden shadow-2xl shadow-primary/15">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                  alt="Herbal Deck premium botanical products"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* floating badge */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-sage border-2 border-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="customer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-accent mb-0.5">
                    {[...Array(5)].map((_,i) => <Star key={i} size={10} className="fill-current" />)}
                  </div>
                  <p className="text-xs font-semibold text-primary">Trusted by 58,000+ customers</p>
                </div>
              </div>

              {/* floating pill */}
              <div className="absolute -right-4 top-16 bg-accent text-white rounded-2xl px-4 py-3 shadow-lg rotate-3">
                <p className="text-xs font-bold tracking-wide">FLAT ₹400 OFF</p>
                <p className="text-[10px] opacity-80">on Prepaid Orders</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── ANNOUNCEMENT BAND ────────────────────────── */}
      <div className="bg-secondary py-3 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex gap-16 flex-shrink-0">
              {['100% Organic', 'No Side Effects', 'Free Shipping', 'No Heavy Metals', 'Ayurvedic Expertise', 'Flat ₹400 OFF Prepaid'].map(t => (
                <span key={t} className="text-sm font-medium text-white tracking-widest uppercase">{t} &nbsp;·</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── SHOP BY CATEGORY ─────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-14">
            <div>
              <p className="text-accent text-sm font-bold tracking-widest uppercase mb-3">Shop by Goal</p>
              <h2 className="text-4xl md:text-5xl font-serif text-primary">Find what you're<br />looking for.</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-1 text-accent hover:text-primary font-semibold text-sm transition-colors group">
              All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
            {categories.slice(0, 9).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group cursor-pointer flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-sage/30">
                  <img src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
                <h3 className="font-medium text-sm text-primary group-hover:text-accent transition-colors leading-tight">
                  {cat.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-14">
            <div>
              <p className="text-accent text-sm font-bold tracking-widest uppercase mb-3">Customer Favourites</p>
              <h2 className="text-4xl md:text-5xl font-serif text-primary">Made for everyday<br />wellness.</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-1 text-accent hover:text-primary font-semibold text-sm transition-colors group">
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-square bg-sage/20">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                  </Link>

                  {/* Discount badge */}
                  {product.mrp > product.price && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </div>
                  )}

                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-accent transition-colors shadow-sm">
                    <Heart size={15} />
                  </button>

                  {/* Quick Add - appears on hover */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold shadow-lg"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-1.5">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg font-medium text-primary leading-tight mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

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
                      className="bg-sage hover:bg-primary text-primary hover:text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ──────────────────────────────── */}
      <section className="bg-primary overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="relative h-64 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1200"
              alt="Traditional Ayurvedic herbs"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
          <div className="flex flex-col justify-center px-8 py-16 lg:px-20 lg:py-24 text-white">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs font-bold tracking-widest text-accent uppercase">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
              Rooted in tradition.<br />
              <em className="not-italic opacity-70">Designed for today.</em>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-lg">
              At Herbal Deck, we believe in the power of nature to support your wellness journey.
              Authentic, 100% organic, plant-based Ayurvedic wellness — combining ancient wisdom
              with modern research.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10 max-w-md">
              {[
                { title: 'Purity Guaranteed', desc: 'Clean, natural sourcing' },
                { title: 'No Side Effects', desc: 'Gentle on your body' },
                { title: 'Ayurvedic Expertise', desc: 'Traditional recipes' },
                { title: 'Eco-Friendly', desc: 'Sustainable practices' },
              ].map(p => (
                <div key={p.title}>
                  <h4 className="font-semibold text-white text-sm mb-0.5">{p.title}</h4>
                  <p className="text-xs text-gray-400">{p.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/about"
              className="inline-flex items-center gap-2 text-white border-b border-white/40 hover:border-accent hover:text-accent pb-1 transition-all font-semibold text-sm group w-fit">
              EXPLORE OUR STORY
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT DISCOVERY ────────────────────────── */}
      <ProductDiscovery />

      {/* ─── TRUST SECTION ────────────────────────────── */}
      <section className="py-24 bg-sage/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-bold tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Wellness you can trust.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Leaf size={32} />, title: 'Carefully Selected', desc: 'Only verified natural ingredients in every product.' },
              { icon: <ShieldCheck size={32} />, title: 'No Side Effects', desc: 'Plant-based formulas gentle on your body.' },
              { icon: <Star size={32} />, title: 'Backed by Experts', desc: '700+ certified health experts across India.' },
              { icon: <Phone size={32} />, title: 'Customer Support', desc: 'Real people available 6 days a week.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-sage flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-bold tracking-widest uppercase mb-3">Customer Love</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Loved by our community.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Rohan S.', product: 'Height Veda Natural Growth', review: 'I have been using Height Veda for a few months and I feel more energetic. Really happy with the results.', rating: 5 },
              { name: 'Priya M.', product: 'Gut Amrit Smooth Digestion', review: 'Gut Amrit has helped me a lot with digestion. Great product and fast delivery. Highly recommend.', rating: 5 },
              { name: 'Aman R.', product: 'Fauji 360 Joint Pain Formula', review: 'Good quality products and trusted brand. My joint pain has reduced significantly. Will definitely buy again.', rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-3xl p-8 flex flex-col"
              >
                <div className="flex text-accent mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                </div>
                <p className="text-text-muted text-base leading-relaxed mb-6 flex-grow">"{t.review}"</p>
                <div>
                  <p className="font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────── */}
      <section className="py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Start your wellness journey.</h2>
          <p className="text-lg opacity-80 mb-10 max-w-lg mx-auto">
            Pure herbal products for a healthier, happier you. Backed by Ayurvedic tradition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop"
              className="bg-white text-accent hover:bg-primary hover:text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-xl">
              SHOP ALL PRODUCTS
            </Link>
            <a href="tel:+918962421207"
              className="border-2 border-white text-white hover:bg-white hover:text-accent px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300">
              CALL +91-8962421207
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
