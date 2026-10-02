import { useRef, useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductQuiz } from '../components/ProductQuiz';
import { ReviewMarquee } from '../components/ReviewMarquee';

// ─── PREMIUM FEATURE: SCROLL-SCRUBBING TEXT REVEAL ────────
const TextScrubReveal = ({ text, progress, range }: { text: string, progress: any, range: [number, number] }) => {
  const words = text.split(" ");
  return (
    <p className="flex flex-wrap justify-center text-center max-w-5xl mx-auto gap-x-3 md:gap-x-5 gap-y-2 text-3xl md:text-5xl lg:text-7xl font-serif text-[#F7F3E9] leading-tight">
      {words.map((word, i) => {
        const start = range[0] + (i / words.length) * (range[1] - range[0]);
        const end = start + (1 / words.length) * (range[1] - range[0]);
        const opacity = useTransform(progress, [start, end], [0.15, 1]);
        // Also add a slight Y-axis drop-in for each word
        const y = useTransform(progress, [start, end], ["10px", "0px"]);
        return (
          <motion.span key={i} style={{ opacity, y }} className="inline-block">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

// ─── MAIN HOME COMPONENT ────────────────────────────────────
const rotatingWords = ["Masterpiece", "Medicine", "Remedy", "Secret", "Essence"];

const CRAZY_PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: Math.random() * 120 - 60,
  y: Math.random() * 120 - 60,
  scale: Math.random() * 0.8 + 0.2,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

export const Home = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth the scroll progress for butter-smooth animations
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 80, mass: 0.5 });

  // --- GLOBAL BACKGROUND TIMELINE (0 to 1) ---
  const bg = useTransform(smoothProgress, 
    [0, 0.15, 0.2, 0.7, 0.8], 
    ["#F7F3E9", "#F7F3E9", "#06120C", "#06120C", "#B9673E"]
  );

  // --- SCENE 1: THE SPLIT (0.0 to 0.2) ---
  const s1TextYTop = useTransform(smoothProgress, [0, 0.2], ["0vh", "-80vh"]);
  const s1TextYBot = useTransform(smoothProgress, [0, 0.2], ["0vh", "20vh"]);
  const s1ImgScale = useTransform(smoothProgress, [0, 0.25], [1, 3.5]);
  const s1ImgOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]);
  const s1ContentOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // --- SCENE 2: THE 3D CAROUSEL (0.2 to 0.6) ---
  const carouselOpacity = useTransform(smoothProgress, [0.2, 0.3, 0.55, 0.65], [0, 1, 1, 0]);
  const carouselScale = useTransform(smoothProgress, [0.2, 0.3, 0.55, 0.65], [0.5, 1, 1, 1.5]);
  const carouselRotateY = useTransform(smoothProgress, [0.2, 0.65], [60, -320]);
  
  // --- SCENE 3: PHILOSOPHY TEXT SCRUB (0.6 to 0.8) ---
  const s3Opacity = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  
  // --- SCENE 4: FINAL IMPACT (0.8 to 1.0) ---
  const s4Opacity = useTransform(smoothProgress, [0.8, 0.85], [0, 1]);
  const s4Scale = useTransform(smoothProgress, [0.8, 0.85], [0.8, 1]);

  const { addToCart } = useCart();

  return (
    <div className="w-full bg-[#F7F3E9] flex flex-col">
      <motion.div ref={containerRef} style={{ backgroundColor: bg }} className="relative h-[800vh] w-full transition-colors duration-0">
        
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none z-50" />

        {/* ==========================================
            SCENE 1: ULTRA-CLEAN HERO
        ========================================== */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-10 md:pt-20">
           
           {/* --- CRAZY ADDITION: Floating Nature Particles & Glowing Orbs --- */}
           <motion.div style={{ opacity: s1ImgOpacity }} className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none z-0">
             {CRAZY_PARTICLES.map((p) => (
               <motion.div
                 key={p.id}
                 initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: 0, opacity: 0 }}
                 animate={{
                   y: [`${p.y}vh`, `${p.y - 20}vh`, `${p.y}vh`],
                   rotate: [0, 180, 360],
                   opacity: [0, 0.4, 0.4, 0]
                 }}
                 transition={{
                   duration: p.duration,
                   repeat: Infinity,
                   delay: p.delay,
                   ease: "linear"
                 }}
                 className="absolute text-[#B9673E]"
                 style={{ scale: p.scale }}
               >
                 <Sparkles className="w-6 h-6 md:w-10 md:h-10 opacity-60" />
               </motion.div>
             ))}
             {/* Glowing animated orbs behind everything */}
             <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.05, 0.15, 0.05],
                  rotate: [0, 90, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#B9673E] blur-[100px] rounded-full z-0 mix-blend-multiply"
             />
             <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.15, 0.05],
                  x: [0, 100, -100, 0],
                  y: [0, -100, 100, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[#173C2A] blur-[120px] rounded-full z-0 mix-blend-multiply"
             />
           </motion.div>

           <motion.div style={{ y: s1TextYTop, opacity: s1ImgOpacity }} className="text-center z-20 px-4">
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }} 
                className="text-[#B9673E] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-8 block"
              >
                 The Benchmark of Purity
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.2, delay: 0.3 }} 
                className="text-6xl md:text-8xl lg:text-[110px] font-serif text-[#173C2A] leading-[0.9] tracking-tighter"
              >
                Nature's <br/>
                <span className="relative inline-block overflow-hidden pb-4">
                  <span className="invisible pointer-events-none italic block">Masterpiece</span>
                  <AnimatePresence>
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: "0%" }}
                      exit={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="italic text-[#B9673E] absolute inset-0 flex items-center justify-center"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
           </motion.div>
           
           <motion.div 
             style={{ scale: s1ImgScale, opacity: s1ImgOpacity, y: s1TextYBot }} 
             className="relative z-10 w-[70vw] md:w-[45vw] max-w-[500px] aspect-[16/10] md:aspect-[3/2] mt-10 md:mt-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-[#173C2A]/10 origin-center"
           >
              <img src={products[0].image} className="w-full h-full object-cover" alt="Hero Product" />
           </motion.div>

           {/* Scroll Indicator */}
           <motion.div style={{ opacity: s1ContentOpacity }} className="absolute bottom-8 flex flex-col items-center gap-2">
             <span className="text-[10px] text-[#173C2A] tracking-[0.3em] font-bold uppercase">Scroll to Discover</span>
             <div className="w-[1px] h-12 bg-[#173C2A]/20 relative overflow-hidden">
               <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-[#173C2A]" />
             </div>
           </motion.div>
        </div>


        {/* ==========================================
            SCENE 2: THE 3D CAROUSEL (0.2 to 0.6)
        ========================================== */}
        <motion.div style={{ opacity: carouselOpacity }} className="absolute inset-0 z-15 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2500" className="w-full h-full object-cover scale-105" alt="Natural Herbal Background" />
           <div className="absolute inset-0 bg-[#06120C]/60 mix-blend-overlay" />
           <div className="absolute inset-0 bg-[#06120C]/30" />
        </motion.div>

        <motion.div 
           style={{ opacity: carouselOpacity, scale: carouselScale, perspective: "2500px" }} 
           className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
           <div className="absolute top-[10%] md:top-[15%] text-center text-[#F7F3E9] opacity-80 uppercase tracking-[0.5em] text-xs font-bold shadow-black drop-shadow-xl">
              The Collection
           </div>

           <motion.div style={{ rotateY: carouselRotateY, transformStyle: "preserve-3d" }} className="relative w-[280px] h-[380px] md:w-[350px] md:h-[480px]">
              {products.slice(0, 6).map((p, i) => {
                 const angle = i * (360 / 6);
                 return (
                   <div 
                     key={p.id}
                     style={{ 
                       transform: `rotateY(${angle}deg) translateZ(clamp(280px, 45vw, 700px))`, 
                       transformStyle: "preserve-3d" 
                     }} 
                     className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[2rem] p-4 shadow-[0_0_80px_rgba(0,0,0,0.6)] pointer-events-auto group border border-white/20 flex flex-col"
                   >
                     <div className="w-full flex-grow rounded-xl overflow-hidden mb-4 relative">
                       <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                       <div className="absolute inset-0 bg-[#173C2A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-md">
                          <button onClick={() => addToCart(p, 1)} className="bg-[#F7F3E9] text-[#173C2A] p-4 rounded-full hover:scale-110 transition-transform duration-300 shadow-2xl">
                             <ShoppingBag size={24} />
                          </button>
                       </div>
                     </div>
                     <div className="text-center px-2 pb-4 shrink-0">
                        <span className="text-[10px] text-[#F7F3E9]/70 font-bold tracking-widest uppercase mb-1 block">{p.category}</span>
                        <h3 className="font-serif text-xl md:text-2xl text-white mb-1 truncate drop-shadow-md">{p.name}</h3>
                        <p className="text-md font-bold text-[#F7F3E9]">₹{p.price}</p>
                     </div>
                   </div>
                 )
              })}
           </motion.div>
        </motion.div>


        {/* ==========================================
            SCENE 3: PHILOSOPHY TEXT SCRUB (0.6 to 0.8)
        ========================================== */}
        <motion.div 
           style={{ opacity: s3Opacity }}
           className="absolute inset-0 z-25 flex flex-col items-center justify-center px-6 md:px-12 pointer-events-none"
        >
           <TextScrubReveal 
             text="We do not formulate supplements. We distill the absolute purest essence of the earth to fundamentally shift your human biology." 
             progress={smoothProgress} 
             range={[0.6, 0.75]} 
           />
        </motion.div>


        {/* ==========================================
            SCENE 4: FINAL IMPACT (0.8 to 1.0)
        ========================================== */}
        <motion.div 
           style={{ opacity: s4Opacity, scale: s4Scale }}
           className="absolute inset-0 z-30 flex flex-col items-center justify-center text-[#F7F3E9] pointer-events-none"
        >
           <Sparkles className="w-16 h-16 mb-8 opacity-80" />
           <h2 className="text-[12vw] font-serif tracking-tighter leading-none mb-12 text-center">
             PURE <br/><span className="italic font-light">NATURE</span>
           </h2>
           <div className="pointer-events-auto relative z-40">
             <Link to="/shop" className="group relative overflow-hidden rounded-full bg-[#173C2A] px-12 py-6 font-bold tracking-[0.2em] uppercase text-xs md:text-sm text-[#F7F3E9] transition-transform hover:scale-105 shadow-2xl flex border border-white/20">
               <span className="absolute inset-0 bg-[#F7F3E9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
               <span className="relative z-10 flex items-center gap-3 group-hover:text-[#173C2A] transition-colors duration-500">
                 Enter The Apothecary <ArrowRight size={16} />
               </span>
             </Link>
           </div>
        </motion.div>

      </div>
      </motion.div>

      {/* Normal flow sections added below the sticky scroll */}
      <div className="relative z-50 bg-[#F7F3E9]">
        <ReviewMarquee />
        <ProductQuiz />
      </div>
    </div>
  );
};
