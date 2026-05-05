import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bento-card p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[#FFF0F5] relative h-full"
    >
      <div className="absolute top-4 right-4 animate-pulse">
        <Heart className="text-rose-200 fill-rose-100" size={32} />
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl md:text-5xl floating-element">💖</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-bento-pink)] font-display">
          For My Love PRADATTA
        </h1>
      </div>
      
      <p className="text-xl md:text-2xl font-serif italic text-[var(--color-bento-text)] opacity-80 leading-relaxed max-w-2xl">
        "A little world made just for you, where every corner breathes our love."
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-pink-100/50 rounded-full text-xs font-sans uppercase tracking-[0.2em] text-pink-600 font-bold border border-pink-200">
          Est. 24 Dec 2023
        </span>
        <span className="px-4 py-2 bg-pink-100/50 rounded-full text-xs font-sans uppercase tracking-[0.2em] text-pink-600 font-bold border border-pink-200">
          Always & Forever
        </span>
      </div>
    </motion.div>
  );
}

