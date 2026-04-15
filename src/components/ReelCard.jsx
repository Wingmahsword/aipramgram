import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReelCard({ reel }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Optimized YouTube Embed: Ensured 'mute=1' and 'autoplay=1' are first to prevent blockages.
  // Using a slightly larger window (6s) or just the start to ensure the video actually loads.
  const videoUrl = `https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&start=60&end=66&rel=0&enablejsapi=1`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsPlaying(true)}
      onViewportLeave={() => setIsPlaying(false)}
      viewport={{ amount: 0.8 }} // Play when almost fully in view
      className="w-full h-full bg-black relative overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        {/* Placeholder Thumbnail */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.img 
              key="thumb"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={`https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg`}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 blur-[2px]"
              alt={reel.title}
            />
          )}
        </AnimatePresence>

        {/* Full-Screen YouTube Video Snippet */}
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
                className="w-full h-[150%] -top-[25%] absolute pointer-events-none scale-[1.8] origin-center object-cover"
                src={videoUrl}
                title="Reel Video Preview"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
              ></iframe>
              {/* High-Fidelity Cinematic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
              <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none blur-3xl opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Interaction Overlays (Instagram Pattern) */}
        <div className="absolute inset-x-0 bottom-0 z-50 p-6 flex flex-col justify-end">
           <div className="max-w-[80%]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[12px] font-bold text-white border-2 border-white/20 shadow-lg">
                  {reel.creatorAvatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white drop-shadow-md">{reel.creator}</span>
                  <span className="text-[10px] text-white/60 font-mono">ID_{reel.youtubeId.substring(0,6)}</span>
                </div>
                <button className="ml-2 px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-md text-[10px] font-bold text-white transition-all">FOLLOW</button>
              </div>
              <h4 className="clash text-[18px] text-white font-bold leading-tight mb-4 drop-shadow-lg">
                {reel.title}
              </h4>
              <div className="flex gap-2 flex-wrap">
                {reel.tags?.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-sm text-white/60 font-medium">#{tag.replace('#','')}</span>
                ))}
              </div>
           </div>
        </div>

        {/* Floating Vertical Actions Sidebar */}
        <div className="absolute right-4 bottom-24 z-50 flex flex-col gap-6 items-center">
           <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-all">
                <iconify-icon icon="lucide:heart" class="text-[24px] text-white drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[11px] font-bold text-white/90 drop-shadow-md">{reel.likes}</span>
           </div>
           <div className="flex flex-col items-center gap-1.5 cursor-pointer">
              <motion.div whileHover={{ scale: 1.2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                <iconify-icon icon="lucide:message-circle" class="text-[24px] text-white drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[11px] font-bold text-white/90 drop-shadow-md">{reel.comments}</span>
           </div>
           <div className="flex flex-col items-center gap-1.5 cursor-pointer">
              <motion.div whileHover={{ scale: 1.2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                <iconify-icon icon="lucide:share-2" class="text-[22px] text-white drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[9px] font-bold text-white/90 opacity-60">SHARE</span>
           </div>
           <motion.div whileHover={{ scale: 1.2 }} className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden rotate-45 mt-4">
              <img src={`https://img.youtube.com/vi/${reel.youtubeId}/default.jpg`} className="w-full h-full object-cover -rotate-45 scale-150" alt="avatar" />
           </motion.div>
        </div>
        
        {/* Dynamic Scrub Path (Visual) */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full z-50">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: isPlaying ? '100%' : '0%' }}
             transition={{ duration: 6, ease: "linear", repeat: Infinity }}
             className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-indigo-400 shadow-[0_0_15px_#7C3AED]"
           />
        </div>
      </div>
    </motion.div>
  );
}
