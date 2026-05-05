import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const gifts = [
  { id: 1, name: 'Teddy Hugs', emoji: '🧸' },
  { id: 2, name: 'Infinite Blooms', emoji: '💐' },
  { id: 3, name: 'Sweet Delights', emoji: '🍫' },
  { id: 4, name: 'Forever Ring', emoji: '💍' },
];

export default function GiftGrid() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bento-card p-6 flex flex-col items-center justify-between bg-gradient-to-b from-[#FFF5F7] to-white h-full"
    >
      <div className="w-full">
        <h3 className="text-sm font-sans uppercase tracking-[0.2em] text-pink-400 font-bold mb-6 text-center">Gifts For You 🎁</h3>
        
        <div className="space-y-4">
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white/50 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition group-hover:rotate-6">
                {gift.emoji}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700">{gift.name}</span>
                <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider">Virtual Box</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full mt-8">
        <div className="flex items-center gap-2 justify-center mb-4 text-pink-200">
           <Heart size={12} fill="currentColor" />
           <Heart size={16} fill="currentColor" />
           <Heart size={12} fill="currentColor" />
        </div>
      </div>
    </motion.div>
  );
}

