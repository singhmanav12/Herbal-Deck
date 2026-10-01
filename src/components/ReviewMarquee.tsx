import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, name: "Sarah J.", text: "Absolutely changed my morning routine. I feel so much more balanced.", rating: 5 },
  { id: 2, name: "Michael T.", text: "The quality is unmatched. You can taste the purity in every drop.", rating: 5 },
  { id: 3, name: "Emma R.", text: "Finally, an herbal brand that doesn't compromise on sourcing.", rating: 5 },
  { id: 4, name: "David L.", text: "My sleep has improved dramatically since using the nighttime blend.", rating: 5 },
  { id: 5, name: "Olivia M.", text: "Beautiful packaging and even better products. A true masterpiece.", rating: 5 },
];

export const ReviewMarquee = () => {
  return (
    <div className="bg-primary text-[#F7F3E9] py-16 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="text-center mb-10 relative z-10 px-4">
        <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
          Loved by our community
        </span>
        <h2 className="text-3xl md:text-5xl font-serif">A Cult Following</h2>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap pl-6"
        >
          {/* Duplicate the array to create an infinite scroll effect */}
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[400px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between whitespace-normal"
            >
              <div>
                <div className="flex gap-1 mb-4 text-accent">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-serif text-lg md:text-xl text-[#F7F3E9]/90 mb-6 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                  {review.name.charAt(0)}
                </div>
                <span className="text-sm font-medium tracking-wide">{review.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
