import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

const LEVEL_COLORS = {
  Beginner:     { bg: 'bg-emerald-400/10 border-emerald-400/30', text: 'text-emerald-400' },
  Intermediate: { bg: 'bg-sky-400/10 border-sky-400/30',         text: 'text-sky-400' },
  Advanced:     { bg: 'bg-violet-400/10 border-violet-400/30',    text: 'text-violet-400' },
};

const THUMB_ICONS = { ml: '🧠', dl: '⚡', llm: '💬', prompt: '✍️', apps: '🚀' };

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 40 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', stiffness: 360, damping: 28 } },
  exit:    { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.18 } },
};

const rowVariants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export default function CourseModal({ course, onClose }) {
  const { enrollCourse, enrolledCourses } = useApp();
  const enrolled = enrolledCourses.includes(course.id);
  const level = LEVEL_COLORS[course.level] || LEVEL_COLORS.Intermediate;

  const handleEnroll = () => { enrollCourse(course.id); };
  const handleWatch  = () => { if (course.url) window.open(course.url, '_blank'); };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#070d1a] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Top accent bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent-primary)] via-[#a78bfa] to-transparent" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[28px] rounded-xl">
                  {THUMB_ICONS[course.thumbnail] || '📚'}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 border rounded-full ${level.bg} ${level.text}`}>
                      {course.level}
                    </span>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--accent-serif)]">{course.partner}</span>
                  </div>
                  <p className="text-[11px] text-white/40 font-mono uppercase tracking-widest">{course.instructor}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                onClick={onClose}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </motion.button>
            </div>

            <h2 className="clash text-[28px] sm:text-[34px] font-bold leading-tight uppercase text-white mt-6 tracking-[-0.04em]">
              {course.title}
            </h2>
          </div>

          {/* Body */}
          <motion.div variants={rowVariants} initial="hidden" animate="visible" className="px-8 py-6 space-y-6">

            {/* Description */}
            <motion.p variants={itemVariants} className="text-[15px] text-[var(--text-muted)] leading-relaxed font-medium">
              {course.description}
            </motion.p>

            {/* Meta row */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              {[
                { label: 'DURATION',  value: course.duration },
                { label: 'CATEGORY',  value: course.category },
                { label: 'CREDITS',   value: `${course.rewardCoins} pts` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/4 border border-white/8 rounded-xl p-4">
                  <div className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase mb-1">{label}</div>
                  <div className="text-[13px] font-bold text-white mono">{value}</div>
                </div>
              ))}
            </motion.div>

            {/* What you'll learn */}
            <motion.div variants={itemVariants}>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--accent-primary)] mb-3 flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--accent-primary)]" />
                What you'll learn
              </div>
              <ul className="space-y-2">
                {getTopics(course).map((topic, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.05, type: 'spring', stiffness: 260, damping: 22 }}
                    className="flex items-start gap-3 text-[13px] text-white/70"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] flex-shrink-0" />
                    {topic}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="text-[28px] font-bold clash text-white">₹{course.price}</div>
              <div className="text-[9px] text-[var(--accent-serif)] font-bold tracking-widest uppercase">One-time · Lifetime access</div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(239,68,68,0.9)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWatch}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600/70 border border-red-500/30 text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-xl transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: enrolled ? 'rgba(124,58,237,0.5)' : 'var(--accent-primary)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnroll}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-xl border transition-all ${
                  enrolled
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/25 text-[var(--accent-serif)]'
                    : 'border-transparent bg-[var(--accent-primary)] shadow-[0_0_24px_rgba(124,58,237,0.4)]'
                }`}
              >
                {enrolled ? '✓ ENROLLED' : `ENROLL — ₹${course.price}`}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function getTopics(course) {
  const map = {
    'Machine Learning':   ['Linear & logistic regression', 'SVMs and kernel methods', 'Neural network fundamentals', 'Model evaluation & debugging'],
    'Deep Learning':      ['Backpropagation from scratch', 'CNN / RNN architectures', 'Attention & transformer blocks', 'Training best practices'],
    'Generative AI':      ['Transformer architecture deep-dive', 'Pre-training & fine-tuning', 'Prompt design patterns', 'LLM evaluation methods'],
    'Prompt Engineering': ['Zero-shot & few-shot prompting', 'Chain-of-thought techniques', 'Structured output generation', 'LLM API integration'],
    'AI Applications':    ['LLM-powered app architecture', 'RAG & vector search', 'Deployment & monitoring', 'Production LLMOps'],
  };
  return map[course.category] || ['Core concepts', 'Hands-on projects', 'Real-world applications', 'Best practices'];
}
