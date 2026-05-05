import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffafbd', '#ff6a88', '#ffc3a0']
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpen}
        className="w-full py-6 bg-[var(--color-bento-pink)] text-white rounded-[24px] font-bold shadow-lg hover:bg-pink-600 transition-all font-display flex items-center justify-center gap-3"
      >
        <Gift size={20} />
        Click Me ❤️
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-rose-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white rounded-[3rem] p-10 max-w-lg w-full relative shadow-2xl border-2 border-rose-100"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-rose-500 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                  <Heart className="text-rose-500 fill-rose-500" size={40} />
                </div>
                <h3 className="text-3xl font-romantic text-rose-600 mb-6 font-bold">A Special Secret Just for You...</h3>
                <p className="text-xl text-gray-700 leading-relaxed italic">
                  "Pradatta, being your person is the greatest privilege I've ever had. You're my home, my peace, and my forever. 💍"
                </p>
                <div className="mt-8 flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="text-rose-300 fill-rose-300" size={16} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

