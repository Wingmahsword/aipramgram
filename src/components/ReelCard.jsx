import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

export default function ReelCard({ reel }) {
  const { isMuted, setIsMuted } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Video URL: Toggles 'mute' parameter based on global app state.
  const videoUrl = `https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&start=60&end=66&rel=0&enablejsapi=1`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsPlaying(true)}
      onViewportLeave={() => setIsPlaying(false)}
      viewport={{ amount: 0.8 }}
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

        {/* YouTube Video Snippet */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              key={`video-${reel.id}-${isMuted}`} // Key change triggers reload on mute toggle
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
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sound Toggle (Floating Action) */}
        <div className="absolute top-6 right-6 z-[60]">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setIsMuted(!isMuted)}
             className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-[18px] shadow-xl hover:bg-[var(--accent-primary)] transition-colors"
           >
              <iconify-icon icon={isMuted ? 'lucide:volume-x' : 'lucide:volume-2'}></iconify-icon>
           </motion.button>
        </div>

        {/* Interaction Overlays */}
        <div className="absolute inset-x-0 bottom-0 z-50 p-6 flex flex-col justify-end">
           <div className="max-w-[85%]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[12px] font-bold text-white border-2 border-white/20 shadow-lg">
                  {reel.creatorAvatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white drop-shadow-md">{reel.creator}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--accent-serif)] font-bold">VERIFIED_SOURCE</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="text-[10px] text-white/40">{reel.duration}</span>
                  </div>
                </div>
              </div>
              <h4 className="clash text-[20px] text-white font-bold leading-tight mb-4 drop-shadow-lg">
                {reel.title}
              </h4>
              <p className="text-[12px] text-white/70 line-clamp-2 leading-relaxed mb-4">
                {reel.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {reel.tags?.map(tag => (
                  <span key={tag} className="text-[9px] tracking-widest px-2.5 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm text-white/80 font-bold uppercase">#{tag}</span>
                ))}
              </div>
           </div>
        </div>

        {/* Sidebar Actions */}
        <div className="absolute right-4 bottom-28 z-50 flex flex-col gap-6 items-center">
           <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:text-red-500 group-hover:border-red-500/50 transition-all">
                <iconify-icon icon="lucide:heart" class="text-[26px] drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[11px] font-bold text-white/90 drop-shadow-md">{reel.likes}</span>
           </div>
           <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.15 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:text-blue-400 group-hover:border-blue-400/50 transition-all">
                <iconify-icon icon="lucide:message-circle" class="text-[24px] drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[11px] font-bold text-white/90 drop-shadow-md">{reel.comments}</span>
           </div>
           <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.15 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:text-emerald-400 group-hover:border-emerald-400/50 transition-all">
                <iconify-icon icon="lucide:share-2" class="text-[22px] drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[10px] font-bold text-white/60">SHARE</span>
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden mt-2 p-[2px]">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <img src={`https://img.youtube.com/vi/${reel.youtubeId}/default.jpg`} className="w-full h-full object-cover scale-150" alt="avatar" />
              </div>
           </div>
        </div>
        
        {/* Progress Tracker */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-50">
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
