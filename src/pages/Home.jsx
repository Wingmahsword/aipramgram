import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useApp } from '../AppContext';
import WebGLBackground from '../components/WebGLBackground';
import CourseCard from '../components/CourseCard';

const springFast   = { type: "spring", stiffness: 400, damping: 30 };
const springSmooth = { type: "spring", stiffness: 100, damping: 20 };

const CARD_W   = 380; // px per card
const CARD_GAP = 32;  // gap-8 = 32px

export default function Home() {
  const { courses } = useApp();
  const containerRef  = useRef(null);
  const carouselRef   = useRef(null);
  const wrapperRef    = useRef(null);
  
  // Hardware-accelerated Parallax Hooks (No React State Re-renders)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, springSmooth);
  
  // Parallax Transforms
  const heroY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const cardSectionY = useTransform(smoothProgress, [0, 1], [0, -100]);

  // Unified Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  return (
    <main ref={containerRef} className="page-wrapper min-h-screen pt-[var(--nav-h)] overflow-x-hidden text-white bg-[var(--bg-deep)]">
      {/* Optimized Background Layers */}
      <div className="website-pattern opacity-40 fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
      <div className="grain-overlay fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
      <WebGLBackground />

      {/* SEO-Optimized Hero Section */}
      <motion.section style={{ y: heroY, opacity: heroOpacity }} className="py-20 px-6 sm:px-12 lg:px-20 relative min-h-[90vh] flex items-center justify-center z-10">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center justify-center text-center">
            
            <motion.div variants={fadeInUp} className="px-5 py-2 bg-white/5 border border-white/10 text-[var(--accent-serif)] text-[10px] font-bold tracking-[0.5em] uppercase mb-16 flex items-center gap-3 backdrop-blur-md rounded-full">
              <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full shadow-[0_0_12px_#7C3AED]" />
              SYSTEM_READY: V7.6_OPTIMIZED
            </motion.div>

            {/* Semantic H1 for SEO */}
            <motion.h1 variants={fadeInUp} className="relative select-none mb-16 w-full flex flex-col items-center">
              <div className="clash tracking-[-0.08em] leading-[0.85] relative z-20 flex flex-col gap-0 items-center w-full">
                <div className="text-[clamp(60px,16vw,240px)] font-bold text-white glow-text relative w-full">
                  EVOLVE.
                </div>
                <div className="flex items-center justify-center gap-4 -mt-2 my-2 w-full">
                  <div className="w-8 sm:w-24 h-2 bg-[var(--accent-primary)] hidden sm:block" />
                  <div className="text-[clamp(60px,16vw,240px)] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text-muted)]">
                    DEPLOY.
                  </div>
                  <div className="w-8 sm:w-24 h-2 bg-[var(--accent-primary)] hidden sm:block" />
                </div>
                <div className="text-[clamp(40px,10vw,140px)] font-bold text-white/20 -mt-2">
                  MASTER AI.
                </div>
              </div>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[18px] sm:text-[22px] text-[var(--text-muted)] max-w-[700px] font-medium leading-[1.6] mb-16 px-4">
              Hardware-accelerated knowledge architectures. Experience neural computing perfectly optimized for search engines and unparalleled velocity.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 items-center mb-3">
              {/* Native Button - No heavy React State listeners */}
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "var(--accent-primary)", borderColor: "transparent", y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={springFast}
                className="px-16 py-6 border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-[14px] tracking-[0.2em] relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                aria-label="Enter the EduHub platform"
              >
                ENTER HUB
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Draggable Course Carousel Section */}
      <motion.section style={{ y: cardSectionY }} className="py-20 relative z-20">
        <div className="max-w-[1400px] mx-auto mb-12 px-6 sm:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-[11px] font-bold tracking-[0.4em] uppercase text-[var(--accent-primary)] mb-6 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[var(--accent-primary)]"></span>
            <h2 className="m-0">Neural Registry</h2>
          </motion.div>
          <div className="flex items-end justify-between">
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title text-[clamp(40px,8vw,100px)]">
              LIVE MODULES
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="hidden sm:flex items-center gap-2 mb-4 text-[10px] text-white/30 font-mono uppercase tracking-widest"
            >
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              >←</motion.span>
              drag to scroll
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              >→</motion.span>
            </motion.div>
          </div>
        </div>

        {/* Overflow wrapper with ref for drag constraints */}
        <div ref={wrapperRef} className="overflow-hidden cursor-grab active:cursor-grabbing pb-12 pl-6 sm:pl-12 lg:pl-20">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={wrapperRef}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
            whileDrag={{ cursor: 'grabbing' }}
            className="flex gap-8 w-max"
          >
            {courses.slice(0, 10).map((course, i) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 25 }}
                className="w-[340px] md:w-[380px] shrink-0"
              >
                <CourseCard course={course} />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
