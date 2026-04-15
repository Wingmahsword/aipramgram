import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import ReelCard from '../components/ReelCard';

export default function Reels() {
  const { reels } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Monitor scroll to determine active video for predictive pre-loading
  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const windowHeight = window.innerHeight;
    const index = Math.round(scrollPosition / windowHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-wrapper min-h-screen bg-black text-white pt-0 overflow-x-hidden relative"
    >
      {/* Optimization: Preconnect to YouTube for instant DNS resolution */}
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="dns-prefetch" href="https://img.youtube.com" />

      {/* Atmospheric Layout */}
      <div className="atmospheric-glow opacity-20" />
      <div className="grain-overlay opacity-30" />

      {/* Full-Screen Vertical Scroll Snap Feed */}
      <section 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar relative bg-black"
      >
        {reels.filter(r => r.youtubeId).map((r, i) => (
          <div key={r.id} className="h-screen w-full snap-start snap-always flex items-center justify-center bg-black overflow-hidden relative">
            <div className="w-full max-w-[500px] h-full relative">
               <ReelCard 
                 reel={r} 
                 isActive={i === activeIndex} 
                 isBuffered={Math.abs(i - activeIndex) <= 1} // Preload if it's the next or previous
               />
            </div>
          </div>
        ))}
      </section>
    </motion.div>
  );
}
