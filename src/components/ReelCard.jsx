import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

export default function ReelCard({ reel, isActive, isBuffered }) {
  const { isMuted, setIsMuted } = useApp();
  const iframeRef = useRef(null);

  // OPTIMIZED URL: Using 'enablejsapi' to allow remote control without reloads where possible.
  // We use the 'isBuffered' check to ensure the next video is READY in the background.
  const videoUrl = `https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=${isActive ? 1 : 0}&mute=${(isActive && !isMuted) ? 0 : 1}&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&rel=0&enablejsapi=1&origin=${window.location.origin}&widgetid=1`;

  // Remote Control for YouTube Iframe API (No Reload strategy)
  useEffect(() => {
    if (iframeRef.current && isActive) {
      // Small delay to ensure the iframe is ready to receive commands
      const timer = setTimeout(() => {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute' }), '*');
      }, 500);
      return () => clearTimeout(timer);
    } else if (iframeRef.current && !isActive) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
    }
  }, [isActive, isMuted]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-black relative overflow-hidden flex flex-col snap-center"
    >
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        
        {/* INSTANT THUMBNAIL LAYER (Visible immediately) */}
        <div className="absolute inset-0 z-0">
           <img 
              src={`https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg`}
              className="w-full h-full object-cover grayscale opacity-40 blur-[4px] scale-110"
              alt={reel.title}
            />
            {/* Soft Ambient Light for Niche Feel */}
            <div className="absolute inset-0 bg-[var(--accent-primary)]/5 mix-blend-color" />
        </div>

        {/* PRE-LOADED VIDEO LAYER (Iframe resides here even when buffered) */}
        <AnimatePresence>
          {isBuffered && (
            <motion.div 
              key={`video-${reel.id}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0 pointer-events-none'}`}
            >
              {/* 
                INSTANT-SCALE LOGIC (2.2x): 
                Fills the vertical viewport perfectly.
                The 'isBuffered' logic ensures the next video is already loaded in the DOM.
              */}
              <iframe
                ref={iframeRef}
                className="w-full h-[150%] -top-[25%] absolute pointer-events-none scale-[2.2] origin-center object-cover"
                src={videoUrl}
                title="Neural Reel"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                loading={isActive ? "eager" : "lazy"}
              ></iframe>
              
              {/* High-Contrast Interactive Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Interaction HUD (Always on top) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
           {/* Sound Toggle */}
           <div className="absolute top-6 right-6 pointer-events-auto">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-[20px] shadow-2xl transition-all"
              >
                 <iconify-icon icon={isMuted ? 'lucide:volume-x' : 'lucide:volume-2'}></iconify-icon>
              </motion.button>
           </div>

           {/* Creator Info (Social Proof Overlay) */}
           <div className="absolute inset-x-0 bottom-0 p-6 pb-12 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-indigo-400 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[12px] font-bold text-white uppercase">
                    {reel.creatorAvatar}
                  </div>
                </div>
                <div>
                   <span className="block text-[14px] font-bold text-white tracking-tight">{reel.creator}</span>
                   <span className="block text-[10px] text-[var(--accent-serif)] font-bold tracking-widest uppercase opacity-60">Verified AI Partner</span>
                </div>
              </div>
              <h4 className="clash text-[22px] text-white font-bold leading-tight mb-3 tracking-tight max-w-[80%]">
                {reel.title}
              </h4>
              <p className="text-[13px] text-white/70 line-clamp-2 leading-relaxed mb-4 italic font-medium">
                "{reel.description}"
              </p>
              <div className="flex gap-2">
                {reel.tags?.map(t => (
                  <span key={t} className="text-[10px] tracking-widest px-3 py-1 bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 rounded-full text-[var(--accent-serif)] font-bold uppercase">#{t}</span>
                ))}
              </div>
           </div>

           {/* Action Sidebar */}
           <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center pointer-events-auto">
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                 <motion.div whileHover={{ scale: 1.2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white">
                    <iconify-icon icon="lucide:heart" class="text-[26px]"></iconify-icon>
                 </motion.div>
                 <span className="text-[11px] font-bold text-white/80">{reel.likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                 <motion.div whileHover={{ scale: 1.2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white">
                    <iconify-icon icon="lucide:message-circle" class="text-[24px]"></iconify-icon>
                 </motion.div>
                 <span className="text-[11px] font-bold text-white/80">{reel.comments}</span>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} className="w-11 h-11 rounded-full border-2 border-dashed border-[var(--accent-primary)] p-0.5 mt-2 overflow-hidden shadow-[0_0_15px_#7C3AED88]">
                 <img src={`https://img.youtube.com/vi/${reel.youtubeId}/default.jpg`} className="w-full h-full object-cover rounded-full scale-[2.5]" alt="profile" />
              </motion.div>
           </div>
        </div>

        {/* Progress Tracker Layer */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-30">
           <motion.div 
             animate={{ width: isActive ? '100%' : '0%' }}
             transition={{ duration: 15, ease: "linear", repeat: Infinity }}
             className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-indigo-500 shadow-[0_0_10px_#7C3AED]"
           />
        </div>
      </div>
    </motion.div>
  );
}
