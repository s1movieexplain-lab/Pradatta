import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift } from 'lucide-react';

const gifs = [
  "OvpDkvslMuDdw59me5", // bubu dudu
  "fvN5KrNcKKUyX7hNIA", // bear cheek
  "PR7zNUghf2Ku3Nbta5", // molang
  "KBcLiQdBQ85QiuMr8U", // pudgy penguins
  "oiwKNY1fVAi7rQUXSv", // bubu dudu happy
  "MBqN7v8uY4F2X9iS1f"  // symmetry
];

export default function StickerGrid() {
  const [openedIndex, setOpenedIndex] = useState<number[]>([]);

  const toggleGift = (index: number) => {
    if (openedIndex.includes(index)) {
      setOpenedIndex(openedIndex.filter(i => i !== index));
    } else {
      setOpenedIndex([...openedIndex, index]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bento-card p-5 overflow-hidden h-full"
    >
      <h3 className="text-sm font-sans uppercase tracking-widest text-pink-400 font-bold mb-4 flex items-center gap-2">
        <Gift size={16} />
        Tap to Open 🧸
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-[calc(100%-3rem)] min-h-[200px]">
        {gifs.map((id, index) => {
          const isOpen = openedIndex.includes(index);
          return (
            <motion.div
              key={index}
              onClick={() => toggleGift(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-2xl overflow-hidden shadow-sm border border-pink-50 relative cursor-pointer aspect-square ${isOpen ? 'bg-white' : 'bg-pink-100 flex items-center justify-center'}`}
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="closed"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    className="flex flex-col items-center justify-center p-2"
                  >
                    <Gift size={32} className="text-rose-400 mb-1" />
                    <span className="text-[8px] font-sans font-bold text-rose-300 uppercase tracking-tighter">Open Me</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="opened"
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <iframe
                      src={`https://giphy.com/embed/${id}`}
                      width="100%"
                      height="100%"
                      className="pointer-events-none absolute inset-0 object-cover scale-150"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 bg-pink-400/5 pointer-events-none" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

