import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth the scroll progress for butter-smooth animations
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 80, mass: 0.5 });

  // --- GLOBAL BACKGROUND ---
  const bg = useTransform(smoothProgress, [0, 0.2, 0.3, 0.75, 0.85], ["#F7F3E9", "#F7F3E9", "#040D09", "#040D09", "#B9673E"]);

  // --- SCENE 1: THE SPLIT (0.0 to 0.3) ---
  const s1TextYTop = useTransform(smoothProgress, [0, 0.25], ["0vh", "-100vh"]);
  const s1TextYBot = useTransform(smoothProgress, [0, 0.25], ["0vh", "100vh"]);
  const s1ImgScale = useTransform(smoothProgress, [0, 0.25], [1, 2.5]);
  const s1ImgOpacity = useTransform(smoothProgress, [0.2, 0.3], [1, 0]);
  const s1ContentOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // --- SCENE 2: THE 3D CAROUSEL (0.25 to 0.8) ---
  const carouselOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.7, 0.8], [0, 1, 1, 0]);
  const carouselScale = useTransform(smoothProgress, [0.25, 0.35, 0.7, 0.8], [0.5, 1, 1, 1.5]);
  const carouselRotateY = useTransform(smoothProgress, [0.3, 0.8], [60, -300]);
  
  // --- SCENE 3: FINAL IMPACT (0.75 to 1.0) ---
  const s3Opacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const s3Scale = useTransform(smoothProgress, [0.75, 0.85], [0.8, 1]);

  const { addToCart } = useCart();

  return (
    <motion.div ref={containerRef} style={{ backgroundColor: bg }} className="relative h-[700vh] w-full transition-colors duration-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none z-50" />

        {/* ==========================================
            SCENE 1: THE SPLIT 
        ========================================== */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
           
           <motion.div style={{ y: s1TextYTop }} className="relative z-10 overflow-hidden h-[50vh] w-full flex items-end justify-center pb-2 md:pb-6">
              <h1 className="text-[20vw] md:text-[15vw] font-serif text-[#173C2A] leading-none tracking-tighter uppercase translate-y-[30%]">
                SACRED
              </h1>
           </motion.div>
           
           <motion.div style={{ scale: s1ImgScale, opacity: s1ImgOpacity }} className="absolute z-20 w-[50vw] md:w-[25vw] max-w-[350px] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src={products[0].image} className="w-full h-full object-cover" alt="Hero" />
           </motion.div>

           <motion.div style={{ y: s1TextYBot }} className="relative z-10 overflow-hidden h-[50vh] w-full flex items-start justify-center pt-2 md:pt-6">
              <h1 className="text-[20vw] md:text-[15vw] font-serif text-[#173C2A] leading-none tracking-tighter uppercase -translate-y-[30%]">
                ROOTS
              </h1>
           </motion.div>

           {/* Scroll Indicator */}
           <motion.div style={{ opacity: s1ContentOpacity }} className="absolute bottom-10 flex flex-col items-center gap-2">
             <span className="text-[10px] text-[#173C2A] tracking-[0.3em] font-bold uppercase">Scroll to Discover</span>
             <div className="w-[1px] h-12 bg-[#173C2A]/20 relative overflow-hidden">
               <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-[#173C2A]" />
             </div>
           </motion.div>
        </div>


        {/* ==========================================
            SCENE 2: THE 3D CAROUSEL 
        ========================================== */}
        <motion.div 
           style={{ opacity: carouselOpacity, scale: carouselScale, perspective: "2500px" }} 
           className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
           <div className="absolute top-[15%] text-center text-[#F7F3E9] opacity-40 uppercase tracking-[0.5em] text-xs font-bold">
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
                     className="absolute inset-0 bg-[#F7F3E9] rounded-[2rem] p-4 shadow-[0_0_80px_rgba(0,0,0,0.6)] pointer-events-auto group border border-[#173C2A]/10 flex flex-col"
                   >
                     <div className="w-full flex-grow rounded-xl overflow-hidden mb-4 relative">
                       <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                       <div className="absolute inset-0 bg-[#173C2A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <button onClick={() => addToCart(p, 1)} className="bg-[#F7F3E9] text-[#173C2A] p-4 rounded-full hover:scale-110 transition-transform duration-300">
                             <ShoppingBag size={24} />
                          </button>
                       </div>
                     </div>
                     <div className="text-center px-2 pb-4 shrink-0">
                        <span className="text-[10px] text-[#B9673E] font-bold tracking-widest uppercase mb-1 block">{p.category}</span>
                        <h3 className="font-serif text-xl md:text-2xl text-[#173C2A] mb-1 truncate">{p.name}</h3>
                        <p className="text-md font-semibold text-[#173C2A]/60">₹{p.price}</p>
                     </div>
                   </div>
                 )
              })}
           </motion.div>
        </motion.div>

        {/* ==========================================
            SCENE 3: THE APOTHECARY 
        ========================================== */}
        <motion.div 
           style={{ opacity: s3Opacity, scale: s3Scale }}
           className="absolute inset-0 z-30 flex flex-col items-center justify-center text-[#F7F3E9] pointer-events-none"
        >
           <Sparkles className="w-16 h-16 mb-8 opacity-80" />
           <h2 className="text-[12vw] font-serif tracking-tighter leading-none mb-12 text-center">
             PURE <br/><span className="italic font-light">NATURE</span>
           </h2>
           <div className="pointer-events-auto">
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
  );
};
