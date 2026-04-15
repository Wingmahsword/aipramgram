import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

export default function ReelCard({ reel, isActive, isBuffered }) {
  const { isMuted, setIsMuted } = useApp();
  const iframeRef = useRef(null);

  const videoUrl = `https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=${isActive ? 1 : 0}&mute=${(isActive && !isMuted) ? 0 : 1}&controls=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}&rel=0&enablejsapi=1&origin=${window.location.origin}&widgetid=1`;

  useEffect(() => {
    if (iframeRef.current && isActive) {
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
      className="w-full h-full bg-black relative overflow-hidden flex flex-col items-center justify-center snap-center p-4"
    >
      {/* 
          REEL FRAME (Device Mockup Style)
          Using a high-end glassmorphic border with precise corner rounding 
          to encapsulate the content as requested.
      */}
      <div className="w-full h-full max-w-[420px] max-h-[850px] relative rounded-[48px] border-[10px] border-[#1A1A1A] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden bg-black ring-1 ring-white/10">
        
        {/* Inner Content Area */}
        <div className="w-full h-full relative overflow-hidden">
          
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
             <img 
                src={`https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg`}
                className="w-full h-full object-cover grayscale opacity-30 blur-[6px] scale-110"
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
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0 pointer-events-none'}`}
              >
                <iframe
                  ref={iframeRef}
                  className="w-full h-[150%] -top-[25%] absolute pointer-events-none scale-[2.2] origin-center object-cover"
                  src={videoUrl}
                  title="Neural Reel"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  loading={isActive ? "eager" : "lazy"}
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Interaction Overlays */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             {/* Sound Toggle */}
             <div className="absolute top-8 right-8 pointer-events-auto">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-[18px] shadow-2xl"
                >
                   <iconify-icon icon={isMuted ? 'lucide:volume-x' : 'lucide:volume-2'}></iconify-icon>
                </motion.button>
             </div>

             {/* HUD Bottom Info */}
             <div className="absolute inset-x-0 bottom-0 p-8 pb-12 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-indigo-400 p-[2px]">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {reel.creatorAvatar}
                    </div>
                  </div>
                  <div>
                     <span className="block text-[13px] font-bold text-white tracking-tight leading-none mb-1">{reel.creator}</span>
                     <span className="block text-[8px] text-[var(--accent-serif)] font-bold tracking-[0.2em] uppercase opacity-60">AI CREATOR</span>
                  </div>
                </div>
                <h4 className="clash text-[18px] text-white font-bold leading-tight mb-3 tracking-tight">
                  {reel.title}
                </h4>
                <div className="flex gap-2">
                  {reel.tags?.map(t => (
                    <span key={t} className="text-[9px] tracking-wider px-2 py-0.5 bg-white/10 border border-white/10 rounded-full text-white/60 font-medium uppercase font-sans">#{t}</span>
                  ))}
                </div>
             </div>

             {/* Action Sidebar (Like, Comment, Retweet) */}
             <div className="absolute right-4 bottom-28 flex flex-col gap-6 items-center pointer-events-auto">
                {/* LIKE */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                   <motion.div whileHover={{ scale: 1.2 }} className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-colors hover:text-red-500">
                      <iconify-icon icon="lucide:heart" class="text-[24px]"></iconify-icon>
                   </motion.div>
                   <span className="text-[10px] font-bold text-white/80">{reel.likes}</span>
                </div>
                
                {/* COMMENT */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                   <motion.div whileHover={{ scale: 1.2 }} className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-colors hover:text-blue-400">
                      <iconify-icon icon="lucide:message-circle" class="text-[22px]"></iconify-icon>
                   </motion.div>
                   <span className="text-[10px] font-bold text-white/80">{reel.comments}</span>
                </div>

                {/* RETWEET / REPOST */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                   <motion.div whileHover={{ scale: 1.2, rotate: 180 }} className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white group-hover:text-emerald-400 transition-all">
                      <iconify-icon icon="lucide:repeat" class="text-[22px]"></iconify-icon>
                   </motion.div>
                   <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase">RETWEET</span>
                </div>

                {/* ROTATING PROFILE */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full border border-white/20 p-0.5 mt-2 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                >
                   <img src={`https://img.youtube.com/vi/${reel.youtubeId}/default.jpg`} className="w-full h-full object-cover rounded-full scale-[2.5]" alt="profile" />
                </motion.div>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
             <motion.div 
               animate={{ width: isActive ? '100%' : '0%' }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity }}
               className="h-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
