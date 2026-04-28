import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
// Using the local video asset for preview
import bgVideo from '../assets/bg-animation.mp4';

export default function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Playback error:', e));
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(124,58,237,0.2)] hover:border-[var(--accent-primary)] neo-depth"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-[9/14] bg-slate-950 flex items-center justify-center text-[40px] relative overflow-hidden">
        {/* Video Background Layer */}
        <video
          ref={videoRef}
          src={bgVideo}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-40 grayscale blur-[2px]'}`}
        />
        
        {/* Indigo Tint Overlay */}
        <div className="absolute inset-0 bg-indigo-950/40 mix-blend-overlay"></div>
        
        {/* Play Icon Placeholder (Visible when paused) */}
        <div className={`transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100 z-10'}`}>
          <iconify-icon icon="lucide:play" class="text-white drop-shadow-md text-[48px]"></iconify-icon>
        </div>

        {/* Time Badge */}
        <span className="absolute bottom-4 right-4 text-[10px] font-bold bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-[4px] tracking-widest border border-white/10 z-20">
          {reel.duration || '0:58'}
        </span>
        
        {/* Hover State Play Indicator */}
        <div className={`absolute inset-0 bg-black/10 transition-opacity flex items-center justify-center z-20 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: isPlaying ? 1 : 0.8 }}
            className="w-14 h-14 rounded-full bg-[var(--accent-primary)]/90 backdrop-blur-sm flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.6)]"
          >
            <iconify-icon icon="lucide:play" class="text-[20px] ml-1"></iconify-icon>
          </motion.div>
        </div>
      </div>

      <div className="p-5 bg-slate-900/50 backdrop-blur-sm border-t border-white/5">
        <div className="text-[10px] text-[var(--accent-serif)] font-bold tracking-[0.1em] uppercase mb-2 flex items-center gap-2">
          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[7px] text-white">
            {reel.creatorAvatar || 'SC'}
          </div>
          {reel.creatorName || reel.creator || 'EduHub AI'}
        </div>
        <h4 className="clash text-[16px] text-white font-bold leading-tight line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
          {reel.title}
        </h4>
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-white/50 group-hover:text-white/80 transition-colors">
            <iconify-icon icon="lucide:heart"></iconify-icon>
            {reel.likes || '2.4k'}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-white/50 group-hover:text-white/80 transition-colors">
            <iconify-icon icon="lucide:message-square"></iconify-icon>
            {reel.comments || '120'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
