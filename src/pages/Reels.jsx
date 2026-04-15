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

      {/* Reels Hero Section */}
      <section className="px-6 sm:px-12 lg:px-20 py-24 relative z-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_#7C3AED]"></span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/70">Neural Network Streams [LIVE]</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="clash text-[clamp(40px,8vw,100px)] font-bold tracking-[-0.08em] leading-[0.9] mb-6 glow-text"
          >
            FLUID <span className="serif italic font-normal text-[var(--accent-serif)]">Knowledge</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-[var(--text-muted)] font-medium max-w-lg mb-16 leading-relaxed"
          >
            Hyper-compact architectural insights. Watch top researchers and engineers break down complex algorithms in 60 seconds.
          </motion.p>
        </div>
      </section>

      {/* Interactive Reels Grid */}
      <section className="px-6 sm:px-12 lg:px-20 py-12 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
            <div className="text-[11px] font-bold tracking-[0.4em] uppercase text-[var(--accent-serif)] flex items-center gap-4">
              <iconify-icon icon="lucide:radio"></iconify-icon>
              Trending Broadcasts
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[10px] font-mono tracking-widest text-white/40 hover:text-white transition-colors uppercase">Sort: Popular</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {reels.filter(r => r.youtubeId).map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ReelCard reel={r} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
