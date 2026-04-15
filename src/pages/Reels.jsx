import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import ReelCard from '../components/ReelCard';

export default function Reels() {
  const { reels } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-wrapper min-h-screen bg-[var(--bg-deep)] text-white pt-[var(--nav-h)] overflow-x-hidden relative"
    >
      {/* Background Visual Infrastructure */}
      <div className="atmospheric-glow" />
      <div className="website-pattern opacity-30" />
      <div className="grain-overlay" />

      {/* Full-Screen Vertical Scroll Snap Feed */}
      <section className="h-[100vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
        {reels.filter(r => r.youtubeId).map((r, i) => (
          <div key={r.id} className="h-screen w-full snap-start snap-always flex items-center justify-center bg-black overflow-hidden relative">
            <div className="w-full max-w-[500px] h-full relative">
               <ReelCard reel={r} />
            </div>
          </div>
        ))}
      </section>
    </motion.div>
  );
}
