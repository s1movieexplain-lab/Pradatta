import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const startDate = new Date('2023-12-24T00:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const Slot = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-pink-50 p-2 rounded-xl flex flex-col items-center flex-1 min-w-0">
      <div className="text-2xl font-bold text-[var(--color-bento-pink)] font-display">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] uppercase opacity-60 font-sans font-bold tracking-tighter">
        {label}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bento-card p-6 flex flex-col items-center justify-center text-center bg-[#FFFBFF] h-full"
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/50 rounded-full mb-4 border border-rose-100">
        <CalendarDays className="w-3.5 h-3.5 text-rose-400" />
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-pink-500 font-bold">
          Our Journey Since We Met ❤️
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full">
        <Slot value={timeLeft.days} label="Days" />
        <Slot value={timeLeft.hours} label="Hrs" />
        <Slot value={timeLeft.minutes} label="Min" />
        <Slot value={timeLeft.seconds} label="Sec" />
      </div>

      <div className="mt-4 text-xs font-serif italic text-pink-400">
        Every second counts with you...
      </div>
    </motion.div>
  );
}

