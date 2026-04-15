import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

export default function ReelCard({ reel }) {
  const { isMuted, setIsMuted } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  // High-Reliability Embed: Using youtube-nocookie and 'enablejsapi' for better cross-origin playback.
  // Enlarged start/end window (10s) to give the player more breathing room to buffer and play.
  const videoUrl = `https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&start=60&end=70&rel=0&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsPlaying(true)}
      onViewportLeave={() => setIsPlaying(false)}
      viewport={{ amount: 0.8 }}
      className="w-full h-full bg-black relative overflow-hidden flex flex-col"
    >
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        {/* Placeholder Thumbnail Layer (Fades out when video arrives) */}
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

        {/* Screen-Filled Video Layer (Instagram Style) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              key={`video-${reel.id}-${isMuted}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* 
                SCALING LOGIC:
                YouTube is 16:9 (horizontal), Reels are 9:16 (vertical).
                To fill the screen perfectly without bars, we scale the frame significantly (2.2x+) 
                and use origin-center to crop the sides, keeping the speaker/subject centered.
              */}
              <iframe
                className="w-[100%] h-[150%] -top-[25%] absolute pointer-events-none scale-[2.2] origin-center object-cover"
                src={videoUrl}
                title="Neural Reel"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
              ></iframe>
              
              {/* Cinematic Vignette Overlay (Deeper edges for immersion) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
              <div className="absolute inset-0 border-[60px] border-black/40 pointer-events-none blur-3xl opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sound Toggle (Volumetric Control) */}
        <div className="absolute top-6 right-6 z-[60]">
           <motion.button 
             whileHover={{ scale: 1.15, rotate: 5 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setIsMuted(!isMuted)}
             className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-[20px] shadow-2xl transition-all hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
           >
              <iconify-icon icon={isMuted ? 'lucide:volume-x' : 'lucide:volume-2'}></iconify-icon>
           </motion.button>
        </div>

        {/* IG-Pattern Interaction Overlays */}
        <div className="absolute inset-x-0 bottom-0 z-50 p-6 pb-12 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
           <div className="max-w-[85%]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-indigo-400 p-[2px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[12px] font-bold text-white border border-white/10">
                    {reel.creatorAvatar}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white drop-shadow-md tracking-tight">{reel.creator}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] text-[var(--accent-serif)] font-bold tracking-widest uppercase opacity-80">VERIFIED_STREAM</span>
                    <iconify-icon icon="lucide:check-circle" class="text-[10px] text-blue-400"></iconify-icon>
                  </div>
                </div>
              </div>
              <h4 className="clash text-[22px] text-white font-bold leading-[1.1] mb-4 drop-shadow-lg tracking-tight">
                {reel.title}
              </h4>
              <p className="text-[13px] text-white/70 line-clamp-2 leading-relaxed mb-4 font-medium italic">
                "{reel.description}"
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {reel.tags?.map(tag => (
                  <span key={tag} className="text-[9px] tracking-widest px-3 py-1 bg-[var(--accent-primary)]/20 backdrop-blur-md border border-[var(--accent-primary)]/30 rounded-full text-[var(--accent-serif)] font-bold uppercase transition-all hover:bg-[var(--accent-primary)]/40 cursor-default">#{tag}</span>
                ))}
              </div>
           </div>
        </div>

        {/* Floating Sidebar (Vertical Actions) */}
        <div className="absolute right-4 bottom-32 z-50 flex flex-col gap-7 items-center">
           <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.8 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:text-red-500 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all shadow-xl">
                <iconify-icon icon="lucide:heart" class="text-[28px] drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[11px] font-bold text-white drop-shadow-md">{reel.likes}</span>
           </div>
           <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:text-blue-400 group-hover:border-blue-400/50 group-hover:bg-blue-400/10 transition-all shadow-xl">
                <iconify-icon icon="lucide:message-circle" class="text-[26px] drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[11px] font-bold text-white drop-shadow-md">{reel.comments}</span>
           </div>
           <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:text-emerald-400 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10 transition-all shadow-xl">
                <iconify-icon icon="lucide:share-2" class="text-[24px] drop-shadow-md"></iconify-icon>
              </motion.div>
              <span className="text-[10px] font-bold text-white/50 tracking-tighter uppercase">SHARE</span>
           </div>
           {/* Course Thumbnail Rotation Link */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="w-10 h-10 rounded-full border-2 border-dashed border-[var(--accent-primary)] p-0.5 mt-2 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
           >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <img src={`https://img.youtube.com/vi/${reel.youtubeId}/default.jpg`} className="w-full h-full object-cover scale-[2]" alt="avatar" />
              </div>
           </motion.div>
        </div>
        
        {/* Dynamic Snap Tracker (Visual Layer) */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full z-50">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: isPlaying ? '100%' : '0%' }}
             transition={{ duration: 10, ease: "linear", repeat: Infinity }}
             className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-indigo-500 to-[var(--accent-primary)] shadow-[0_0_20px_#7C3AED]"
           />
        </div>
      </div>
    </motion.div>
  );
}
