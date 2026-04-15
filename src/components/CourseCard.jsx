import React from 'react';
import { useApp } from '../AppContext';
import { motion } from 'framer-motion';

export default function CourseCard({ course }) {
  const { enrollCourse } = useApp();

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="neo-depth p-8 flex flex-col border border-white/5 backdrop-blur-md bg-white/5 group cursor-pointer transition-all"
      id={`course-${course.id}`}
      onClick={() => {
        enrollCourse(course.id);
        if (course.url) window.open(course.url, '_blank');
      }}
    >
      <div className="w-16 h-16 bg-[var(--accent-primary)] text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center mb-10 transition-transform duration-500 group-hover:rotate-[360deg] text-[28px]">
        <iconify-icon icon={course.thumbnail === 'ml' ? 'lucide:brain' : 'lucide:cpu'}></iconify-icon>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--accent-serif)] uppercase">
          {course.partner}
        </span>
        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
        <span className="text-[10px] font-mono text-white/30">ID_{course.id.substring(0,4)}</span>
      </div>

      <h3 className="clash text-[24px] font-bold leading-tight mb-6 uppercase text-white group-hover:text-[var(--accent-primary)] transition-colors">
        {course.title}
      </h3>
      
      <p className="text-[14px] text-[var(--text-muted)] leading-relaxed flex-1 mb-10 font-medium">
        {course.description}
      </p>

      <div className="pt-8 border-t border-white/10 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-[14px] font-bold text-white tracking-widest uppercase">${course.price || '299'}.00</div>
          <div className="text-[9px] text-[var(--accent-serif)] font-bold uppercase tracking-widest mt-1">REWARD: {course.rewardCoins} CREDITS</div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-primary)' }}
          className="w-12 h-12 border border-white/20 text-white flex items-center justify-center transition-all group-hover:border-transparent group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]"
        >
          <iconify-icon icon="lucide:arrow-right" class="text-[20px]"></iconify-icon>
        </motion.button>
      </div>
    </motion.div>
  );
}
