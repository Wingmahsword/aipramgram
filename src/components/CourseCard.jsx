import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'framer-motion';
import CourseModal from './CourseModal';

const THUMBNAIL_ICONS = {
  ml:     'lucide:brain',
  dl:     'lucide:cpu',
  llm:    'lucide:message-square',
  prompt: 'lucide:pen-tool',
  apps:   'lucide:rocket',
};

const LEVEL_COLORS = {
  Beginner:     'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  Advanced:     'text-violet-400 bg-violet-400/10 border-violet-400/20',
};

const CourseCard = React.memo(function CourseCard({ course }) {
  const { enrollCourse, enrolledCourses } = useApp();
  const enrolled = enrolledCourses.includes(course.id);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEnroll = (e) => {
    e.stopPropagation();
    enrollCourse(course.id);
  };

  const handleWatch = (e) => {
    e.stopPropagation();
    if (course.url) window.open(course.url, '_blank');
  };

  return (
    <>
    {modalOpen && <CourseModal course={course} onClose={() => setModalOpen(false)} />}
    <motion.div 
      whileHover={{ y: -8, borderColor: 'rgba(124,58,237,0.4)' }}
      onClick={() => setModalOpen(true)}
      className="neo-depth p-8 flex flex-col border border-white/5 backdrop-blur-md bg-white/5 group transition-all cursor-pointer"
      id={`course-${course.id}`}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="w-14 h-14 bg-[var(--accent-primary)] text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] text-[24px]">
          <iconify-icon icon={THUMBNAIL_ICONS[course.thumbnail] || 'lucide:brain'}></iconify-icon>
        </div>
        <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1 border rounded-full ${LEVEL_COLORS[course.level] || LEVEL_COLORS.Intermediate}`}>
          {course.level}
        </span>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--accent-serif)] uppercase">
          {course.instructor}
        </span>
      </div>

      <h3 className="clash text-[20px] font-bold leading-tight mb-4 uppercase text-white group-hover:text-[var(--accent-primary)] transition-colors">
        {course.title}
      </h3>
      
      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed flex-1 mb-6 font-medium">
        {course.description}
      </p>

      <div className="flex items-center gap-3 mb-2 text-[10px] text-white/30 font-mono">
        <span>⏱ {course.duration}</span>
        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
        <span>🏆 {course.rewardCoins} pts</span>
      </div>
      <div className="text-[18px] font-bold clash text-white mb-4">₹{course.price}</div>

      <div className="pt-6 border-t border-white/10 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(239,68,68,0.9)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWatch}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/80 text-white text-[10px] font-bold tracking-[0.15em] uppercase border border-red-500/30 transition-all"
        >
          <iconify-icon icon="lucide:play" class="text-[14px]"></iconify-icon>
          YOUTUBE
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: enrolled ? 'rgba(124,58,237,0.3)' : 'var(--accent-primary)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleEnroll}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-white text-[10px] font-bold tracking-[0.15em] uppercase border transition-all ${
            enrolled
              ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/20 text-[var(--accent-serif)]'
              : 'border-white/20 bg-white/5'
          }`}
        >
          <iconify-icon icon={enrolled ? 'lucide:check' : 'lucide:plus'} class="text-[14px]"></iconify-icon>
           {enrolled ? 'ENROLLED' : 'ENROLL'}
        </motion.button>
      </div>
    </motion.div>
    </>
  );
});

export default CourseCard;
