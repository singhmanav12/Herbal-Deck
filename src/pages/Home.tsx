import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, Star, Leaf, Shield, Check, Play, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { scrollY } = useScroll();
  const { addToCart } = useCart();
  
  // Parallax effects for Hero
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  // Ingredients state
  const [activeIngredient, setActiveIngredient] = useState(0);
  const ingredients = [
    { name: 'Ashwagandha', desc: 'The ultimate adaptogen for stress relief, vitality, and hormonal balance.', img: 'https://images.unsplash.com/photo-1611078768078-d56715d2a842?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Shilajit', desc: 'Pure Himalayan resin packed with fulvic acid for unparalleled cellular stamina.', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Triphala', desc: 'An ancient balancing triad of fruits for perfect digestion and detoxification.', img: 'https://images.unsplash.com/photo-1584308666744-24d5e74653e1?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Safed Musli', desc: 'A potent rasayana herb known to boost strength, energy, and endurance.', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1200' },
  ];

  return (
    <div className="bg-background overflow-x-hidden">
      
      {/* ─── 1. ULTRA-PREMIUM HERO ─────────────────────── */}
      <section className="relative h-[100svh] min-h-[700px] bg-[#06120C] overflow-hidden flex items-center justify-center pt-20">
        {/* Atmospheric Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#173C2A] rounded-full blur-[120px] opacity-60 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

        <motion.div style={{ opacity, y: y1 }} className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 lg:mb-12"
          >
            <Leaf size={14} className="text-[#B9673E]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#E5E8D8] uppercase">Premium Ayurvedic Science</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-serif text-[#F7F3E9] leading-[0.85] tracking-tight mb-10"
          >
            Elevate Your <br />
            <span className="italic font-light text-[#B9673E] pr-4">Existence</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link to="/shop" className="group relative inline-flex items-center justify-center gap-4 bg-transparent text-[#F7F3E9] border border-white/20 px-8 py-5 rounded-full font-bold text-sm tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 hover:border-[#B9673E]">
              <div className="absolute inset-0 bg-[#B9673E] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 flex items-center gap-3">
                Discover Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Parallax Products */}
        <motion.div style={{ y: y2 }} className="absolute right-[5%] lg:right-[12%] top-[25%] w-32 md:w-48 lg:w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 rotate-[8deg] border border-white/10 z-20 opacity-0 md:opacity-100 hidden sm:block">
          <img src={products[0].image} alt="Product" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute left-[5%] lg:left-[10%] bottom-[15%] w-28 md:w-40 lg:w-56 aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/50 -rotate-[12deg] border border-white/10 z-20 opacity-0 md:opacity-100 hidden sm:block">
          <img src={products[2].image} alt="Product" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* ─── 2. SLEEK MARQUEE ────────────────────────────── */}
      <div className="bg-[#B9673E] py-5 sm:py-7 overflow-hidden rotate-[-2deg] scale-[1.05] relative z-30 shadow-2xl border-y border-[#a05632]">
        <div className="flex gap-8 animate-[marquee_15s_linear_infinite] whitespace-nowrap">
          {Array(10).fill('100% ORGANIC · NO SIDE EFFECTS · CLINICALLY TESTED · ').map((text, i) => (
            <span key={i} className="text-3xl sm:text-5xl font-serif italic text-white/90 tracking-wide">{text}</span>
          ))}
        </div>
      </div>

      {/* ─── 3. CURATED MASTERPIECES (Products) ──────────── */}
      <section className="py-32 md:py-48 bg-[#F7F3E9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <div className="max-w-2xl">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="flex items-center gap-3 mb-6"
               >
                 <span className="h-px w-12 bg-[#B9673E]" />
                 <span className="text-xs font-bold tracking-[0.2em] text-[#B9673E] uppercase">The Collection</span>
               </motion.div>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-7xl font-serif text-[#173C2A] leading-[1.1]"
               >
                 Curated for <br/><span className="italic text-[#B9673E]">Perfection</span>
               </motion.h2>
             </div>
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
               <Link to="/shop" className="group flex items-center gap-5 text-[#173C2A] font-bold tracking-[0.15em] uppercase text-xs">
                 View All Formulas
                 <span className="w-14 h-14 rounded-full border border-[#173C2A]/20 flex items-center justify-center group-hover:bg-[#173C2A] group-hover:text-[#F7F3E9] transition-all duration-500">
                   <ArrowRight size={20} />
                 </span>
               </Link>
             </motion.div>
          </div>
          
          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Large Feature Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 group relative rounded-[2rem] overflow-hidden bg-white aspect-square md:aspect-[16/10] shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <img src={bestSellers[0].image} alt={bestSellers[0].name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06120C]/90 via-[#06120C]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-[#F7F3E9]">
                 <span className="text-xs font-bold tracking-[0.2em] text-[#B9673E] uppercase mb-3 block">{bestSellers[0].category}</span>
                 <h3 className="text-4xl md:text-5xl font-serif mb-4 max-w-lg">{bestSellers[0].name}</h3>
                 <div className="flex items-center justify-between mt-4">
                   <div className="flex items-baseline gap-3">
                     <span className="text-2xl font-semibold">₹{bestSellers[0].price}</span>
                     <span className="text-lg text-white/50 line-through">₹{bestSellers[0].mrp}</span>
                   </div>
                   <button 
                     onClick={() => addToCart(bestSellers[0], 1)}
                     className="bg-white/10 hover:bg-[#B9673E] backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
                   >
                     <ShoppingBag size={16} /> Add
                   </button>
                 </div>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 group relative rounded-[2rem] overflow-hidden bg-white aspect-square md:aspect-auto shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <img src={bestSellers[1].image} alt={bestSellers[1].name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06120C]/90 to-transparent opacity-80" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#F7F3E9]">
                 <span className="text-[10px] font-bold tracking-[0.2em] text-[#B9673E] uppercase mb-2 block">{bestSellers[1].category}</span>
                 <h3 className="text-3xl font-serif mb-3 leading-snug">{bestSellers[1].name}</h3>
                 <div className="flex items-center justify-between mt-2">
                   <span className="text-xl font-semibold">₹{bestSellers[1].price}</span>
                   <button onClick={() => addToCart(bestSellers[1], 1)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B9673E] backdrop-blur-md flex items-center justify-center transition-colors">
                     <ShoppingBag size={16} />
                   </button>
                 </div>
              </div>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 group relative rounded-[2rem] overflow-hidden bg-white aspect-square md:aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <img src={bestSellers[2].image} alt={bestSellers[2].name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06120C]/90 to-transparent opacity-80" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#F7F3E9]">
                 <span className="text-[10px] font-bold tracking-[0.2em] text-[#B9673E] uppercase mb-2 block">{bestSellers[2].category}</span>
                 <h3 className="text-3xl font-serif mb-3 leading-snug">{bestSellers[2].name}</h3>
                 <div className="flex items-center justify-between mt-2">
                   <span className="text-xl font-semibold">₹{bestSellers[2].price}</span>
                   <button onClick={() => addToCart(bestSellers[2], 1)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B9673E] backdrop-blur-md flex items-center justify-center transition-colors">
                     <ShoppingBag size={16} />
                   </button>
                 </div>
              </div>
            </motion.div>

            {/* Wide Banner Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-8 group relative rounded-[2rem] overflow-hidden bg-[#173C2A] aspect-square md:aspect-auto shadow-sm hover:shadow-xl transition-all duration-700 p-8 md:p-14 flex flex-col justify-center"
            >
               <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                 <img src={bestSellers[3].image} className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-r from-[#173C2A] to-transparent" />
               </div>
               
               <div className="relative z-10 max-w-md">
                 <span className="text-[10px] font-bold tracking-[0.2em] text-[#B9673E] uppercase mb-4 block">New Arrival</span>
                 <h3 className="text-4xl md:text-5xl font-serif text-[#F7F3E9] mb-4 leading-tight">{bestSellers[3].name}</h3>
                 <p className="text-white/60 mb-8 line-clamp-2 leading-relaxed">{bestSellers[3].shortDesc}</p>
                 
                 <div className="flex items-center gap-6">
                   <span className="text-3xl font-serif text-[#F7F3E9]">₹{bestSellers[3].price}</span>
                   <button 
                     onClick={() => addToCart(bestSellers[3], 1)}
                     className="bg-[#B9673E] hover:bg-white hover:text-[#173C2A] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300"
                   >
                     Add to Cart
                   </button>
                 </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 4. INTERACTIVE INGREDIENT SPOTLIGHT ─────────── */}
      <section className="py-32 md:py-48 bg-[#06120C] text-[#F7F3E9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Interactive List */}
            <div className="space-y-12 z-10">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#B9673E] uppercase mb-4 block">The Science</span>
                <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                  Sourced from <br/><span className="italic text-[#B9673E]">the Earth</span>
                </h2>
              </div>
              
              <div className="space-y-0">
                {ingredients.map((item, i) => (
                  <div 
                    key={i} 
                    onMouseEnter={() => setActiveIngredient(i)}
                    className={`cursor-pointer transition-all duration-500 py-6 border-b border-white/10 ${activeIngredient === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-3xl md:text-4xl font-serif transition-transform duration-500 ${activeIngredient === i ? 'translate-x-4 text-[#B9673E]' : ''}`}>
                        {item.name}
                      </h3>
                      <ChevronRight size={24} className={`transition-all duration-500 ${activeIngredient === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
                    </div>
                    <motion.div 
                      initial={false}
                      animate={{ height: activeIngredient === i ? 'auto' : 0, opacity: activeIngredient === i ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/50 text-lg leading-relaxed pt-2 pl-4 max-w-md">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right: Dynamic Image */}
            <div className="relative h-[500px] md:h-[700px] rounded-[2rem] overflow-hidden border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeIngredient}
                  src={ingredients[activeIngredient].img}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06120C]/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. BENTO TRUST SECTION ──────────────────────── */}
      <section className="py-32 bg-[#F7F3E9] px-4 md:px-8">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-serif text-[#173C2A]">The Herbal Deck Difference</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              
              {/* Giant Stat Block */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-[#E5E8D8] rounded-[2rem] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group"
              >
                 <div className="relative z-10">
                   <h3 className="text-5xl md:text-6xl font-serif text-[#173C2A] mb-6 leading-tight max-w-lg">
                     Backed by 700+ <br/><span className="italic">Health Experts</span>
                   </h3>
                   <p className="text-[#687066] text-lg max-w-md">Our formulations are crafted, tested, and recommended by certified Ayurvedic practitioners across the nation.</p>
                 </div>
                 {/* Decorative large icon */}
                 <Shield className="absolute -bottom-10 -right-10 text-white/50 w-64 h-64 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              </motion.div>
              
              {/* 58k Customers Block */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#173C2A] text-[#F7F3E9] rounded-[2rem] p-10 md:p-12 flex flex-col justify-between aspect-square md:aspect-auto"
              >
                 <Star className="text-[#B9673E] fill-[#B9673E]" size={40} />
                 <div className="mt-12">
                   <p className="text-6xl md:text-7xl font-serif mb-2">58k+</p>
                   <p className="text-white/60 text-lg">Happy customers finding natural healing every day.</p>
                 </div>
              </motion.div>
              
              {/* Quote Block */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#B9673E] text-white rounded-[2rem] p-10 md:p-12 flex items-center justify-center text-center aspect-square md:aspect-auto"
              >
                 <p className="text-3xl md:text-4xl font-serif italic leading-snug">"Finally, natural supplements that actually work without any side effects."</p>
              </motion.div>
              
              {/* Quality Guarantee Block */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-12 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left"
              >
                 <div className="w-24 h-24 bg-[#E5E8D8] rounded-full flex items-center justify-center shrink-0">
                   <Check size={40} className="text-[#173C2A]" />
                 </div>
                 <div>
                   <h4 className="text-2xl md:text-3xl font-serif text-[#173C2A] mb-3">100% Satisfaction Guarantee</h4>
                   <p className="text-[#687066] text-lg leading-relaxed max-w-xl">We stand by our formulations. Clean, pure, and rigorously tested for heavy metals and impurities. Because your body deserves only the best.</p>
                 </div>
              </motion.div>
              
           </div>
         </div>
      </section>

      {/* ─── 6. EPIC CTA ─────────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#06120C]">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-30" alt="" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
           <h2 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-[0.9]">
             Begin Your <br/><span className="italic text-[#B9673E]">Journey.</span>
           </h2>
           <p className="text-xl text-white/70 mb-12 max-w-xl mx-auto">
             Experience the profound difference of true, unfiltered Ayurvedic wellness.
           </p>
           <Link to="/shop" className="inline-flex items-center justify-center gap-3 bg-white text-[#173C2A] px-10 py-5 rounded-full font-bold text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
             Shop The Collection
             <ArrowRight size={18} />
           </Link>
        </div>
      </section>

    </div>
  );
};
