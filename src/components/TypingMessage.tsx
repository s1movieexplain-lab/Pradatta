import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function TypingMessage() {
  const message = "No matter what happens, I will always love you PRADATTA ❤️";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bento-card flex items-center justify-center p-8 bg-[var(--color-bento-pink)] text-white border-none h-full"
    >
      <p className="text-xl md:text-2xl font-serif font-medium text-center italic leading-relaxed">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </motion.div>
  );
}

