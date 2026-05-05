import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Heart } from 'lucide-react';

interface LockPageProps {
  onUnlock: () => void;
}

export default function LockPage({ onUnlock }: LockPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === 'pradatta'.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[var(--color-bento-bg)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] text-9xl">❤️</div>
        <div className="absolute bottom-[10%] right-[10%] text-9xl">💖</div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bento-card p-10 max-w-md w-full bg-white flex flex-col items-center text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border-2 border-rose-100">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
             <Heart className="text-rose-500 fill-rose-500" size={40} />
          </motion.div>
        </div>

        <h2 className="text-3xl font-display font-bold text-[var(--color-bento-pink)] mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8 font-serif italic text-sm">Please enter the secret password to enter PRADATTA's world</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300 w-5 h-5 transition-colors group-focus-within:text-rose-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Magical Word..."
              className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-rose-50/50 border-2 outline-none transition-all font-display ${
                error ? 'border-red-300 animate-shake' : 'border-rose-100 focus:border-rose-300'
              }`}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-[var(--color-bento-pink)] text-white rounded-2xl font-bold font-display shadow-lg hover:bg-pink-600 transition-all"
          >
            Enter Now ❤️
          </motion.button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xs font-bold text-red-500 font-sans uppercase tracking-widest"
          >
            Wrong Password, Love!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
