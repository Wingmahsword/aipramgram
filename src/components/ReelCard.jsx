import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReelCard({ reel }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // YouTube Snippet Logic: Start at 60s, end at 63s (3s snippet)
  // We use a key based on isPlaying to force re-render/re-load the iframe for "autoplay" behavior
  const videoUrl = `https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&start=60&end=63&rel=0&iv_load_policy=3`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onViewportEnter={() => setIsPlaying(true)}
      onViewportLeave={() => setIsPlaying(false)}
      viewport={{ amount: 0.6 }} // Start playing when 60% visible
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(124,58,237,0.3)] hover:border-[var(--accent-primary)] neo-depth"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[9/16] bg-slate-950 relative overflow-hidden">
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
              key={`video-${reel.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <iframe
                className="w-full h-[150%] -top-[25%] absolute pointer-events-none scale-150 origin-center"
                src={videoUrl}
                title="YouTube Video Preview"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                loading="lazy"
              ></iframe>
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-90" />
              <div className="absolute inset-0 border-[20px] border-slate-950/40 pointer-events-none blur-3xl opacity-80" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Instagram-style Interaction Overlays */}
        <div className="absolute inset-0 z-40 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100">
           <div className={`transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[8px] font-bold text-white border border-white/20">
                  {reel.creatorAvatar}
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">{reel.creator}</span>
              </div>
              <p className="text-[12px] text-white/90 font-medium leading-tight mb-3 line-clamp-2 drop-shadow-sm">
                {reel.title}
              </p>
           </div>
        </div>

        {/* Floating Sidebar Actions (Instagram Style) */}
        <div className="absolute right-3 bottom-20 z-40 flex flex-col gap-5 items-center">
           <div className="flex flex-col items-center gap-1 group/action">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <iconify-icon icon="lucide:heart" class="text-[22px] text-white drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[9px] font-bold text-white/80">{reel.likes}</span>
           </div>
           <div className="flex flex-col items-center gap-1">
              <motion.div whileHover={{ scale: 1.2 }}>
                <iconify-icon icon="lucide:message-square" class="text-[20px] text-white drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[9px] font-bold text-white/80">{reel.comments}</span>
           </div>
           <motion.div whileHover={{ scale: 1.2 }}>
              <iconify-icon icon="lucide:share-2" class="text-[20px] text-white drop-shadow-md"></iconify-icon>
           </motion.div>
        </div>
        
        {/* Progress Bar (Visual Only) - Synced to 3 seconds */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-50">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: isPlaying ? '100%' : '0%' }}
             transition={{ duration: 3, ease: "linear", repeat: Infinity }}
             className="h-full bg-[var(--accent-primary)] shadow-[0_0_10px_#7C3AED]"
           />
        </div>
      </div>
    </motion.div>
  );
}
