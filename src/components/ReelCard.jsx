import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReelCard({ reel }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube Snippet Logic: Accelerated to 3s per video for rapid micro-previews
  const videoUrl = `https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&start=60&end=63`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(124,58,237,0.25)] hover:border-[var(--accent-primary)] neo-depth"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      <div className="aspect-[9/14] bg-slate-950 relative overflow-hidden">
        {/* Placeholder Image (High Res Thumbnail) */}
        {!isPlaying && (
          <motion.img 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={`https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg`}
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 blur-[1px] transition-transform duration-1000 group-hover:scale-110"
            alt={reel.title}
          />
        )}

        {/* YouTube Video Snippet Layer */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <iframe
                className="w-full h-[150%] -top-[25%] absolute pointer-events-none scale-125"
                src={videoUrl}
                title="YouTube Video Preview"
                frameBorder="0"
                allow="autoplay; encrypted-media"
              ></iframe>
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-80" />
              <div className="absolute inset-0 border-[20px] border-slate-950 pointer-events-none blur-xl lg:blur-3xl opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Indigo Tint Overlay */}
        <div className="absolute inset-0 bg-indigo-950/20 mix-blend-overlay"></div>
        
        {/* Progress Bar (Visual Only) - Synced to 3 seconds */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-30">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: isPlaying ? '100%' : '0%' }}
             transition={{ duration: 3, ease: "linear", repeat: Infinity }}
             className="h-full bg-[var(--accent-primary)] shadow-[0_0_10px_#7C3AED]"
           />
        </div>

        {/* Time Badge */}
        <span className="absolute bottom-4 right-4 text-[10px] font-bold bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-[4px] tracking-widest border border-white/10 z-40">
          PRO_SNIPPET
        </span>
        
        {/* Interaction Indicator */}
        <div className={`absolute inset-0 flex items-center justify-center z-40 pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
            <iconify-icon icon="lucide:play" class="text-[24px] ml-1"></iconify-icon>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-white/5 relative z-50">
        <div className="text-[10px] text-[var(--accent-serif)] font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
           <div className="w-5 h-5 bg-[var(--accent-primary)] rounded-full flex items-center justify-center text-[8px] text-white font-bold opacity-80">
            {reel.creatorAvatar}
          </div>
          {reel.creator}
        </div>
        <h4 className="clash text-[18px] text-white font-bold leading-tight line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
          {reel.title}
        </h4>
        <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-bold text-white/40 group-hover:text-white/90 transition-colors">
            <iconify-icon icon="lucide:heart" class="text-[14px]"></iconify-icon>
            {reel.likes}
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white/50 tracking-tighter uppercase">
             LIVE_PREVIEW
          </div>
        </div>
      </div>
    </motion.div>
  );
}
