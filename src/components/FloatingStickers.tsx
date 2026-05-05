import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const STICKERS = ['🧸', '🎀', '✨', '💖', '🍭', '🍓', '🐣', '🌸', '🌈', '☁️', '🍦', '🍡'];

interface FloatingSticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingStickers() {
  const [stickers, setStickers] = useState<FloatingSticker[]>([]);

  useEffect(() => {
    const newStickers = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      emoji: STICKERS[Math.floor(Math.random() * STICKERS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (40 - 20) + 20,
      duration: Math.random() * (6 - 3) + 3,
      delay: Math.random() * 5,
    }));
    setStickers(newStickers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: sticker.duration,
            repeat: Infinity,
            delay: sticker.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            fontSize: `${sticker.size}px`,
          }}
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </div>
  );
}
