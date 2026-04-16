import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

export default function ReelCard({ reel, isActive, isBuffered }) {
  const { isMuted, setIsMuted } = useApp();
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const iframeRef = useRef(null);

  // Reset pause state when active index changes
  useEffect(() => {
    if (!isActive) setIsPaused(false);
  }, [isActive]);

  const videoUrl = `https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=${isActive ? 1 : 0}&mute=${(isActive && !isMuted) ? 0 : 1}&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&rel=0&enablejsapi=1&origin=${window.location.origin}&widgetid=1`;

  // Remote Control for YouTube Iframe API (No Reload strategy)
  useEffect(() => {
    if (iframeRef.current && isActive) {
      const timer = setTimeout(() => {
        // Handle Play/Pause
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ 
          event: 'command', 
          func: isPaused ? 'pauseVideo' : 'playVideo' 
        }), '*');
        
        // Handle Sound (Explicit Mute/Unmute)
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ 
          event: 'command', 
          func: isMuted ? 'mute' : 'unMute' 
        }), '*');
      }, 500);
      return () => clearTimeout(timer);
    } else if (iframeRef.current && !isActive) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
    }
  }, [isActive, isMuted, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    setShowPauseIcon(true);
    setTimeout(() => setShowPauseIcon(false), 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-black relative overflow-hidden flex flex-col items-center justify-center snap-center p-2 sm:p-4 transition-all duration-500"
    >
      {/* 
          REEL FRAME (Device Mockup Style)
      */}
      <div className="relative h-[calc(100vh-1rem)] max-h-[860px] aspect-[9/16] w-auto max-w-full rounded-[36px] sm:rounded-[48px] border-[8px] sm:border-[10px] border-[#1A1A1A] shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden bg-black ring-1 ring-white/10 group">
        
        {/* Clickable Area for Play/Pause */}
        <div 
          onClick={togglePause}
          className="absolute inset-0 z-10 cursor-pointer"
        />

        {/* Inner Content Area */}
        <div className="w-full h-full relative overflow-hidden">
          
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 select-none">
             <img 
                src={`https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg`}
                className="w-full h-full object-cover grayscale opacity-30 blur-[10px] scale-110"
                alt={reel.title}
              />
          </div>

          {/* Video Layer */}
          <AnimatePresence>
            {isBuffered && (
              <motion.div 
                key={`video-${reel.id}`} 
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 w-full h-full ${isActive ? 'z-0' : 'z-0 pointer-events-none'}`}
              >
                <iframe
                  ref={iframeRef}
                  className="absolute top-0 left-1/2 h-full w-[177.78%] -translate-x-1/2 pointer-events-none"
                  src={videoUrl}
                  title="Neural Reel"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  loading={isActive ? "eager" : "lazy"}
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Interaction Overlays */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             
             {/* Center Play/Pause Feedback Icon */}
             <AnimatePresence>
                {showPauseIcon && (
                   <motion.div 
                     initial={{ scale: 0.5, opacity: 0 }}
                     animate={{ scale: 1.5, opacity: 1 }}
                     exit={{ scale: 2, opacity: 0 }}
                     className="absolute inset-0 flex items-center justify-center z-50 text-white/50"
                   >
                      <iconify-icon icon={isPaused ? 'lucide:play' : 'lucide:pause'} class="text-[80px] drop-shadow-2xl"></iconify-icon>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Sound Toggle (Branded Audio Source) */}
             <div className="absolute top-5 right-5 sm:top-8 sm:right-8 pointer-events-auto">
                <motion.button 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Don't trigger pause when clicking sound
                    setIsMuted(!isMuted);
                  }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-2xl border flex items-center justify-center text-white text-[18px] sm:text-[20px] shadow-2xl transition-all ${isMuted ? 'bg-red-500/20 border-red-500/50' : 'bg-white/10 border-white/20'}`}
                >
                   <iconify-icon icon={isMuted ? 'lucide:volume-x' : 'lucide:volume-2'}></iconify-icon>
                </motion.button>
             </div>

             {/* HUD Bottom Info */}
             <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 pb-9 sm:pb-12 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-auto">
                <div className="flex items-center gap-3 mb-4">
                   <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-indigo-400 p-[2px] shadow-lg">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[11px] font-black text-white uppercase">
                        {reel.creatorAvatar}
                      </div>
                   </motion.div>
                   <div>
                      <span className="block text-[14px] font-bold text-white tracking-tight leading-none mb-1">{reel.creator}</span>
                      <span className="block text-[8px] text-[var(--accent-serif)] font-bold tracking-[0.25em] uppercase opacity-80">AI ARCHITECT</span>
                   </div>
                </div>
                <h4 className="clash text-[16px] sm:text-[18px] text-white font-bold leading-tight mb-4 tracking-tight max-w-[85%] drop-shadow-md">
                   {reel.title}
                </h4>
                <div className="flex gap-2.5 flex-wrap">
                   {reel.tags?.map(t => (
                      <span key={t} className="text-[9px] tracking-[0.15em] px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 font-bold uppercase transition-colors hover:border-[var(--accent-primary)] hover:text-white">#{t}</span>
                   ))}
                </div>
             </div>

             {/* Action Sidebar */}
             <div className="absolute right-3 sm:right-4 bottom-24 sm:bottom-28 flex flex-col gap-5 sm:gap-6 items-center pointer-events-auto">
                {/* LIKE */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                   <motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white transition-all group-hover:text-red-500 group-hover:border-red-500/50 group-hover:bg-red-500/10">
                      <iconify-icon icon="lucide:heart" class="text-[26px]"></iconify-icon>
                   </motion.div>
                   <span className="text-[10px] font-black text-white/60 tracking-tighter">{reel.likes}</span>
                </div>
                
                {/* COMMENT */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                   <motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white transition-all group-hover:text-blue-400 group-hover:border-blue-400/50 group-hover:bg-blue-400/10">
                      <iconify-icon icon="lucide:message-circle" class="text-[24px]"></iconify-icon>
                   </motion.div>
                   <span className="text-[10px] font-black text-white/60 tracking-tighter">{reel.comments}</span>
                </div>

                {/* RETWEET */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                   <motion.div whileHover={{ scale: 1.2, rotate: 180 }} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white group-hover:text-emerald-400 transition-all border-dashed">
                      <iconify-icon icon="lucide:repeat" class="text-[22px]"></iconify-icon>
                   </motion.div>
                   <span className="text-[8px] font-black text-white/40 tracking-[0.2em] uppercase">Repost</span>
                </div>

                {/* BRANDED AUDIO ICON */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border border-white/30 p-[4px] mt-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] bg-black/80 flex items-center justify-center backdrop-blur-md"
                >
                   <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-white/5 overflow-hidden">
                      <iconify-icon 
                        icon="hugeicons:brain-02" 
                        class="text-[20px] text-[var(--accent-primary)] drop-shadow-[0_0_8px_var(--accent-primary)]"
                      ></iconify-icon>
                   </div>
                </motion.div>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5 z-30">
             <motion.div 
               animate={{ width: isActive ? '100%' : '0%' }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity }}
               className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-indigo-500 shadow-[0_0_15px_var(--accent-primary)]"
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
