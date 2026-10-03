import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductQuiz } from '../components/ProductQuiz';
import { ReviewMarquee } from '../components/ReviewMarquee';
import { SpotlightSection } from '../components/SpotlightSection';
import { EditorialCollage } from '../components/EditorialCollage';
import { FluidBackground } from '../components/FluidBackground';

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

const FALLING_LEAVES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100, // 0 to 100vw
  startY: Math.random() * -100 - 20, // Start above screen
  endY: 120, // End below screen
  scale: Math.random() * 0.8 + 0.2,
  duration: Math.random() * 15 + 15,
  delay: Math.random() * -15, // Negative delay so they are already falling on load
  rotation: Math.random() * 360,
  swing: Math.random() * 10 + 5, // How much it swings left/right
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
  const s1Blur = useTransform(smoothProgress, [0, 0.25], ["blur(0px)", "blur(30px)"]);
  
  // Parallax slices for the hero image
  const slice1Y = useTransform(smoothProgress, [0, 0.25], ["0%", "-20%"]);
  const slice2Y = useTransform(smoothProgress, [0, 0.25], ["0%", "25%"]);
  const slice3Y = useTransform(smoothProgress, [0, 0.25], ["0%", "-15%"]);

  // --- SCENE 2: THE 3D CAROUSEL (0.2 to 0.6) ---
  const carouselOpacity = useTransform(smoothProgress, [0.2, 0.3, 0.55, 0.65], [0, 1, 1, 0]);
  const carouselScale = useTransform(smoothProgress, [0.2, 0.3, 0.55, 0.65], [0.5, 1, 1, 1.5]);
  const carouselRotateY = useTransform(smoothProgress, [0.2, 0.65], [60, -320]);
  
  // --- SCENE 3: PHILOSOPHY TEXT SCRUB (0.6 to 0.8) ---
  const s3Opacity = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  
  // --- SCENE 4: FINAL IMPACT (0.8 to 1.0) ---
  const s4Opacity = useTransform(smoothProgress, [0.8, 0.85], [0, 1]);
  const s4Scale = useTransform(smoothProgress, [0.8, 0.98], [0.8, 40]);
  const s4TextOpacity = useTransform(smoothProgress, [0.85, 0.95], [1, 0]);
  const s4ButtonOpacity = useTransform(smoothProgress, [0.95, 0.98], [0, 1]);
  const s4ButtonScale = useTransform(smoothProgress, [0.95, 0.98], [0.5, 1]);

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
             {FALLING_LEAVES.map((p) => (
               <motion.div
                 key={p.id}
                 initial={{ x: `${p.x}vw`, y: `${p.startY}vh`, rotate: p.rotation, opacity: 0 }}
                 animate={{
                   y: [`${p.startY}vh`, `${p.endY}vh`],
                   x: [`${p.x}vw`, `${p.x - p.swing}vw`, `${p.x + p.swing}vw`, `${p.x}vw`],
                   rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
                   opacity: [0, 0.4, 0.4, 0]
                 }}
                 transition={{
                   y: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" },
                   x: { duration: p.duration / 3, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
                   rotate: { duration: p.duration / 2, repeat: Infinity, delay: p.delay, ease: "linear" },
                   opacity: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" },
                 }}
                 className="absolute text-[#173C2A]"
                 style={{ scale: p.scale }}
               >
                 <Leaf className="w-6 h-6 md:w-10 md:h-10 opacity-40 mix-blend-multiply" />
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
                className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#B9673E] blur-[100px] rounded-full z-0"
             />
             <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.15, 0.05],
                  x: [0, 100, -100, 0],
                  y: [0, -100, 100, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[#173C2A] blur-[120px] rounded-full z-0"
             />
           </motion.div>

           <motion.div style={{ y: s1TextYTop, opacity: s1ImgOpacity, filter: s1Blur }} className="text-center z-20 px-4">
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
             style={{ scale: s1ImgScale, opacity: s1ImgOpacity, y: s1TextYBot, filter: s1Blur }} 
             className="relative z-10 w-[70vw] md:w-[45vw] max-w-[500px] aspect-[16/10] md:aspect-[3/2] mt-10 md:mt-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-[#173C2A]/10 origin-center flex bg-[#173C2A]"
           >
              <motion.div style={{ y: slice1Y }} className="w-1/3 h-[140%] -mt-[20%] relative overflow-hidden origin-center">
                <img src={products[0].image} className="absolute w-[300%] h-full max-w-none object-cover left-0" alt="" />
              </motion.div>
              <motion.div style={{ y: slice2Y }} className="w-1/3 h-[140%] -mt-[20%] relative overflow-hidden z-10 drop-shadow-2xl origin-center">
                <img src={products[0].image} className="absolute w-[300%] h-full max-w-none object-cover left-[-100%]" alt="" />
              </motion.div>
              <motion.div style={{ y: slice3Y }} className="w-1/3 h-[140%] -mt-[20%] relative overflow-hidden origin-center">
                <img src={products[0].image} className="absolute w-[300%] h-full max-w-none object-cover left-[-200%]" alt="" />
              </motion.div>
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
           <FluidBackground />
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
           style={{ opacity: s4Opacity }}
           className="absolute inset-0 z-30 flex flex-col items-center justify-center text-[#F7F3E9] pointer-events-none overflow-hidden"
        >
           <motion.div style={{ scale: s4Scale, opacity: s4TextOpacity }} className="flex flex-col items-center justify-center origin-center">
             <Sparkles className="w-16 h-16 mb-8 opacity-80" />
             <h2 className="text-[15vw] font-serif tracking-tighter leading-none mb-12 text-center whitespace-nowrap">
               PURE <br/><span className="italic font-light">NATURE</span>
             </h2>
           </motion.div>
           
           <motion.div style={{ opacity: s4ButtonOpacity, scale: s4ButtonScale }} className="pointer-events-auto absolute z-40 flex items-center justify-center gooey">
             <Link to="/shop" className="magnetic group relative overflow-hidden rounded-[40px] bg-[#F7F3E9] px-16 py-8 font-bold tracking-[0.3em] uppercase text-sm md:text-base text-[#B9673E] transition-transform hover:scale-105 shadow-[0_0_80px_rgba(247,243,233,0.3)] flex items-center justify-center border border-[#F7F3E9]/50">
               <span className="absolute inset-0 bg-[#173C2A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
               <span className="relative z-10 flex items-center gap-4 group-hover:text-[#F7F3E9] transition-colors duration-500">
                 Enter The Apothecary <ArrowRight size={20} />
               </span>
             </Link>
           </motion.div>
        </motion.div>

      </div>
      </motion.div>

      {/* Normal flow sections added below the sticky scroll */}
      <div className="relative z-50 bg-[#F7F3E9] w-full">
        <SpotlightSection />
        <EditorialCollage />
        <ReviewMarquee />
        <ProductQuiz />
      </div>
    </div>
  );
};
