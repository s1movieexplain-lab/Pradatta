import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 100 + '%';
      const size = Math.random() * (30 - 15) + 15 + 'px';
      const duration = Math.random() * (10 - 5) + 5 + 's';
      const delay = Math.random() * 2 + 's';

      setHearts((prev) => [...prev, { id, left, size, duration, delay }]);

      // Clean up old hearts
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 12000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle flex items-center justify-center text-rose-300"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            bottom: '-50px',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
