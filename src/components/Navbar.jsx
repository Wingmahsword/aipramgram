import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();

  const headerHeight = useTransform(scrollY, [0, 100], [120, 90]);
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.85)']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  const isExplore = location.pathname === '/courses';

  return (
    <motion.header 
      style={{ height: headerHeight, backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 sm:px-12 lg:px-20 transition-all border-b border-transparent backdrop-blur-md"
    >
      <motion.div 
        style={{ opacity: borderOpacity }}
        className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-white/10"
      />

      <Link to="/" className="relative z-10">
        <motion.div 
          style={{ scale: logoScale }}
          className="clash text-[32px] font-bold tracking-[-0.08em] text-white transition-all flex items-center gap-2"
        >
          EDUHUB<span className="text-[var(--accent-primary)] font-mono text-[10px] tracking-normal glow-text">v7.0</span>
        </motion.div>
      </Link>
      
      <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
        {[
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: 'Reels', path: '/reels' },
          { name: 'Playground', path: '/playground' }
        ].map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.name}
              to={item.path}
              className="relative group py-2"
            >
              <span className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-all ${isActive ? 'text-white opacity-100 scale-110' : 'text-white/40 group-hover:opacity-100'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent-primary)] shadow-[0_0_10px_#7C3AED]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter leading-none mb-1">
            {isExplore ? 'EXPLORATION_ACTIVE' : 'NETWORK_STABILITY'}
          </span>
          <span className="text-[14px] font-mono font-bold leading-none text-white/80">{isExplore ? 'SCANNING...' : '99.98%'}</span>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-[var(--accent-primary)] text-white text-[11px] font-bold tracking-[0.3em] transition-all border border-white/10"
        >
          {isExplore ? 'PORTAL_AUTH' : 'ENROLL_NOW'}
        </motion.button>
      </div>
      
      <motion.div 
        className="data-strip"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
      />
    </motion.header>
  );
}
