import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songUrl = "https://www.dropbox.com/scl/fi/w2p80y3py2v5zjczl3eik/Meri-Banogi-Kya-Rito-Riba-Prakriti-P-Karan-J-Rajat-Nagpal-Anshul-Garg-Gurinder-Bawa.mp3?rlkey=tqxbrs1k3qa3phw5xa61hp6el&st=hv2c3mqv&raw=1";

  useEffect(() => {
    const audio = audioRef.current;
    if (autoPlay && audio && audio.paused) {
      audio.play().catch(e => console.log("Auto-play blocked by browser, waiting for interaction", e));
    }
  }, [autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bento-card p-6 flex flex-col gap-4 bg-[#1A1A1A] text-white h-full"
    >
      <audio ref={audioRef} src={songUrl} loop preload="auto" />
      
      <div className="flex items-center gap-4">
        <motion.div 
          animate={isPlaying ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/20 shrink-0"
        >
          🎵
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-pink-300 font-sans tracking-widest uppercase mb-1 font-bold">Now Playing</div>
          <div className="font-bold truncate text-sm text-white font-display uppercase tracking-tight">Meri Banogi Kya</div>
        </div>
      </div>

      <div className="space-y-2 mt-auto">
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
          </button>
          
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-pink-500"
          />
        </div>
        
        <div className="flex justify-between text-[10px] text-gray-500 font-mono">
          <span>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}</span>
          <span>{duration ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : '0:00'}</span>
        </div>
      </div>
    </motion.div>
  );
}

