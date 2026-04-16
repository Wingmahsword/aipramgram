import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [hideOnReels, setHideOnReels] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerHeight = useTransform(scrollY, [0, 100], [120, 90]);
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.85)']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  const isExplore = location.pathname === '/courses';
  const isReels = location.pathname === '/reels';
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Reels', path: '/reels' },
    { name: 'Playground', path: '/playground' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isReels) {
      setHideOnReels(false);
      return;
    }

    const handleReelScroll = (event) => {
      const { direction, atTop } = event.detail || {};
      if (atTop || direction === 'up') {
        setHideOnReels(false);
      } else if (direction === 'down') {
        setHideOnReels(true);
      }
    };

    window.addEventListener('reels-scroll', handleReelScroll);
    return () => window.removeEventListener('reels-scroll', handleReelScroll);
  }, [isReels]);

  return (
    <motion.header 
      animate={{ y: hideOnReels ? '-120%' : 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
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
        {navItems.map((item) => {
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

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter leading-none mb-1">
            {isExplore ? 'EXPLORATION_ACTIVE' : 'NETWORK_STABILITY'}
          </span>
          <span className="text-[14px] font-mono font-bold leading-none text-white/80">{isExplore ? 'SCANNING...' : '99.98%'}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileMenuOpen(v => !v)}
          className="md:hidden w-10 h-10 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white"
          aria-label="Toggle navigation menu"
        >
          <iconify-icon icon={mobileMenuOpen ? 'lucide:x' : 'lucide:menu'} class="text-[18px]"></iconify-icon>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-10 py-2.5 sm:py-4 bg-[var(--accent-primary)]/90 sm:bg-[var(--accent-primary)] text-white text-[9px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] transition-all border border-white/10"
        >
          {isExplore ? 'PORTAL_AUTH' : 'ENROLL_NOW'}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl border border-white/15 bg-[rgba(2,6,23,0.94)] backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-3 rounded-xl text-center text-[10px] font-bold tracking-[0.12em] uppercase border transition-all ${
                      isActive
                        ? 'bg-[var(--accent-primary)]/25 border-[var(--accent-primary)]/40 text-white'
                        : 'bg-white/5 border-white/10 text-white/75'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="data-strip"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
      />
    </motion.header>
  );
}
