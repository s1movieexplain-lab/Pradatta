import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function KissSender() {
  const [kisses, setKisses] = useState<{ id: number; left: string; delay: number }[]>([]);

  const sendKisses = () => {
    const newKisses = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5
    }));
    
    setKisses(prev => [...prev, ...newKisses]);
    
    // Cleanup
    setTimeout(() => {
      setKisses(prev => prev.slice(newKisses.length));
    }, 3000);
  };

  return (
    <div className="bento-card flex flex-col items-center justify-center p-4 h-full relative overflow-hidden group bg-white">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={sendKisses}
        className="relative z-10 w-24 h-24 bg-white rounded-full shadow-lg border-2 border-rose-100 flex flex-col items-center justify-center gap-1 hover:bg-rose-50 transition-colors"
      >
        <span className="text-4xl">💋</span>
        <span className="text-[10px] font-sans font-bold text-rose-400 uppercase tracking-tighter">Send Kiss</span>
      </motion.button>

      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
        <AnimatePresence>
          {kisses.map(kiss => (
            <motion.div
              key={kiss.id}
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ 
                y: -400, 
                opacity: 0, 
                scale: 1.5,
                x: (Math.random() - 0.5) * 200 
              }}
              transition={{ duration: 2, ease: "easeOut", delay: kiss.delay }}
              className="absolute text-4xl"
              style={{ left: kiss.left, bottom: '20px' }}
            >
              💋
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center">
         <p className="text-xs font-serif italic text-rose-300">Click to shower with kisses...</p>
      </div>
    </div>
  );
}
