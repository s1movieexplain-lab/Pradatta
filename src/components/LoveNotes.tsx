import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const notes = [
  { text: "তুই আমার জীবনের সবচেয়ে সুন্দর অনুভূতি 💕", color: "bg-pink-50" },
  { text: "তোকে ভালোবাসা আমার প্রতিদিনের সবচেয়ে প্রিয় কাজ ❤️", color: "bg-rose-50" },
  { text: "তুই থাকলে সবকিছুই সুন্দর লাগে 🌸", color: "bg-white" },
];

export default function LoveNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextNote = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % notes.length);
    }, 300);
  };

  const prevNote = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + notes.length) % notes.length);
    }, 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bento-card p-6 flex flex-col gap-4 overflow-hidden h-full relative group bg-gradient-to-br from-white to-pink-50"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-pink-500 flex items-center gap-2 font-display">
          <Mail size={20} />
          Love Letters
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevNote} 
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors border border-pink-50"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextNote} 
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors border border-pink-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center perspective-1000 mt-4">
        <div 
          className="relative w-full max-w-[300px] h-[200px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-pink-100 rounded-b-xl border-2 border-pink-200 z-10" />
          
          {/* Envelope Flap */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-full bg-pink-200 rounded-t-xl border-2 border-pink-200 origin-top z-30"
            initial={false}
            animate={{ 
              rotateX: isOpen ? -160 : 0,
              zIndex: isOpen ? 5 : 30
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="text-white fill-pink-400" size={32} />
            </div>
          </motion.div>

          {/* Paper / Letter Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={`absolute left-4 right-4 top-2 p-6 rounded-lg shadow-md z-20 flex flex-col items-center justify-center text-center font-romantic ${notes[currentIndex].color} border border-pink-100`}
              initial={false}
              animate={{ 
                y: isOpen ? -80 : 0,
                scale: isOpen ? 1.05 : 0.9,
                opacity: isOpen ? 1 : 0.5
              }}
              transition={{ duration: 0.6, delay: isOpen ? 0.3 : 0 }}
            >
              <Heart size={16} className="mb-3 text-rose-300" fill="currentColor" />
              <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                "{notes[currentIndex].text}"
              </p>
              <div className="mt-4 text-[8px] uppercase tracking-widest text-pink-300 font-bold">
                Tap to close
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Envelope Front (Triangle look) */}
          <div 
             className="absolute inset-0 bg-pink-100/50 z-20 pointer-events-none" 
             style={{ 
               clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%)',
               border: '1px solid rgba(244, 114, 182, 0.2)' 
             }} 
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-3">
        {/* Progress dots */}
        <div className="flex gap-2">
          {notes.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: index === currentIndex ? 16 : 8,
                backgroundColor: index === currentIndex ? '#ec4899' : '#fbcfe8'
              }}
              className="h-2 rounded-full transition-colors cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => setCurrentIndex(index), 300);
              }}
            />
          ))}
        </div>
        <p className="text-[10px] uppercase font-sans font-bold text-rose-300 tracking-[0.2em] animate-pulse">
          {!isOpen ? "Tap heart to open" : `Letter ${currentIndex + 1} of ${notes.length}`}
        </p>
      </div>
    </motion.div>
  );
}

