/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import LoveNotes from './components/LoveNotes';
import GiftGrid from './components/GiftGrid';
import MusicPlayer from './components/MusicPlayer';
import StickerGrid from './components/StickerGrid';
import SurpriseButton from './components/SurpriseButton';
import TypingMessage from './components/TypingMessage';
import FloatingHearts from './components/FloatingHearts';
import LockPage from './components/LockPage';
import KissSender from './components/KissSender';
import FloatingStickers from './components/FloatingStickers';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    if (isLocked) return;
    
    // Initial confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, [isLocked]);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 selection:bg-pink-200 relative overflow-x-hidden">
      <FloatingStickers />
      <AnimatePresence>
        {isLocked && (
          <motion.div
            key="lock"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[250]"
          >
            <LockPage onUnlock={() => setIsLocked(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingHearts />
      
      {/* Background Hearts */}
      <div className="heart-bg absolute top-[10%] left-[5%] text-[120px] opacity-[0.05] pointer-events-none text-pink-400 font-display">❤</div>
      <div className="heart-bg absolute bottom-[5%] right-[10%] text-[180px] opacity-[0.05] pointer-events-none text-pink-400 font-display">❤</div>
      <div className="heart-bg absolute top-[40%] right-[30%] text-[60px] opacity-[0.05] pointer-events-none text-pink-400 font-display">❤</div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={!isLocked ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10 pb-32"
      >
        
        {/* Hero + Timer */}
        <div className="md:col-span-8 md:h-[400px]">
          <Hero />
        </div>
        <div className="md:col-span-4 md:h-[400px]">
          <Countdown />
        </div>

        {/* Notes */}
        <div className="md:col-span-5 md:h-[500px]">
          <LoveNotes />
        </div>

        {/* Stickers */}
        <div className="md:col-span-4 md:h-[500px]">
          <StickerGrid />
        </div>

        {/* Gifts & Surprise */}
        <div className="md:col-span-3 md:h-[500px] flex flex-col gap-4">
          <div className="flex-1">
            <GiftGrid />
          </div>
          <SurpriseButton />
        </div>

        <div className="md:col-span-4 md:h-[250px]">
          <MusicPlayer autoPlay={!isLocked} />
        </div>

        <div className="md:col-span-3 md:h-[250px]">
           <KissSender />
        </div>

        <div className="md:col-span-5 md:h-[250px]">
          <TypingMessage />
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-pink-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-pink-300 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-pink-400 rounded-full" />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Decorative gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-100/20 rounded-full blur-[100px]"></div>
      </div>
    </main>
  );
}

