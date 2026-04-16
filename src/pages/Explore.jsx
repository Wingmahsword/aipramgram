import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import CourseCard from '../components/CourseCard';

const categories = [
  { id: 'all',                 name: 'All Modules' },
  { id: 'Machine Learning',   name: 'Machine Learning' },
  { id: 'Deep Learning',      name: 'Deep Learning' },
  { id: 'Generative AI',      name: 'Generative AI' },
  { id: 'Prompt Engineering', name: 'Prompt Eng.' },
  { id: 'AI Applications',    name: 'AI Applications' },
];

export default function Explore() {
  const { courses, comprehensiveModules } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesTab = activeTab === 'all' || course.category === activeTab;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [courses, activeTab, searchQuery]);

  return (
    <div className="page-wrapper min-h-screen bg-[var(--bg-deep)] pt-[var(--nav-h)] overflow-x-hidden text-white">
      {/* Background Visual Infrastructure */}
      <div className="atmospheric-glow" />
      <div className="website-pattern opacity-40" />
      <div className="grain-overlay" />

      {/* Explore Hero Section */}
      <section className="px-6 sm:px-12 lg:px-20 py-24 relative z-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-[var(--accent-primary)] shadow-[0_0_10px_#7C3AED]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--accent-serif)]">Neural Registry</span>
            </div>
            <h1 className="clash text-[clamp(50px,8vw,120px)] font-bold tracking-[-0.08em] leading-[0.85] mb-8 glow-text">
              CHART THE <br/>
              <span className="serif italic font-normal text-[var(--accent-serif)] opacity-80">Unknown</span>.
            </h1>
            <p className="text-[18px] text-[var(--text-muted)] font-medium leading-[1.6] max-w-[500px] mb-12">
              Deep dive into production-grade neural architectures. Curated for performance. Optimized for velocity.
            </p>
            
            <div className="flex items-center gap-12">
              <div className="flex flex-col">
                <span className="clash text-[32px] font-bold text-white">30</span>
                <span className="text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase">MODULES_ONLINE</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-12">
                <span className="clash text-[32px] font-bold text-[var(--accent-primary)]">DAIR.AI</span>
                <span className="text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase">SOURCE_PARTNER</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-12">
                <span className="clash text-[32px] font-bold text-white">FREE</span>
                <span className="text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase">ALL_COURSES</span>
              </div>
            </div>
          </motion.div>

          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-video bg-indigo-950/20 flex items-center justify-center overflow-hidden border border-white/10 rounded-xl backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[var(--accent-primary)] to-transparent"></div>
              <div className="relative z-10 text-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-[var(--accent-primary)] rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                >
                  <iconify-icon icon="lucide:play" class="text-[32px] text-white ml-2"></iconify-icon>
                </motion.div>
                <div className="mt-6 text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">CORE_MODULE_PREVIEW.RAW</div>
              </div>
              
              <div className="absolute top-6 left-6 text-[9px] font-bold text-[var(--accent-serif)] opacity-40 font-mono">DTYPE: FLOAT32</div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></span>
                <span className="text-[9px] font-bold text-white/40 font-mono tracking-widest uppercase">ENCODING_OPTIMAL</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[var(--nav-h)] z-[90] border-y border-white/5 bg-[var(--bg-deep)]/80 backdrop-blur-2xl px-6 sm:px-12 lg:px-20 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex-shrink-0 px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all border ${activeTab === cat.id ? 'bg-[var(--accent-primary)] border-transparent text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-[400px]">
            <input 
              type="text" 
              placeholder="QUERY_NEURAL_DATABASE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 font-mono text-[11px] tracking-widest uppercase text-white focus:outline-none focus:border-[var(--accent-primary)] focus:bg-white/10 transition-all"
            />
            <iconify-icon icon="lucide:search" class="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 text-[20px]"></iconify-icon>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="px-6 sm:px-12 lg:px-20 py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="text-[11px] font-bold tracking-[0.35em] uppercase text-[var(--accent-primary)] flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--accent-primary)]"></span>
                Comprehensive Modules
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">3-6 months · Certification + Job Assurance</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {comprehensiveModules.map((module, i) => (
                <motion.article
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <h3 className="clash text-[24px] leading-tight uppercase text-white">{module.title}</h3>
                    <span className="px-3 py-1 text-[9px] font-bold tracking-[0.15em] uppercase rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/15 text-[var(--accent-serif)] whitespace-nowrap">
                      {module.duration}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="text-[12px] text-white/80"><span className="text-[var(--accent-primary)] font-bold">Certification:</span> {module.certification}</div>
                    <div className="text-[12px] text-white/80"><span className="text-[var(--accent-primary)] font-bold">Job Assurance:</span> {module.jobAssurance}</div>
                  </div>

                  <div className="mb-6">
                    <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/35 mb-2">Includes</div>
                    <div className="flex flex-wrap gap-2">
                      {module.includes.map(item => (
                        <span key={item} className="px-2.5 py-1 text-[10px] border border-white/10 rounded-full text-white/70 bg-white/5">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex items-end justify-between">
                    <div>
                      <div className="text-[28px] clash font-bold text-white">₹{module.price}</div>
                      <div className="text-[9px] tracking-[0.2em] uppercase text-[var(--accent-serif)]">Complete Track</div>
                    </div>
                    <button className="px-5 py-3 text-[10px] font-bold tracking-[0.15em] uppercase rounded-xl bg-[var(--accent-primary)] text-white border border-transparent hover:brightness-110 transition-all">
                      Apply Now
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-16 px-4">
            <div className="text-[11px] font-bold tracking-[0.4em] uppercase text-[var(--accent-serif)] flex items-center gap-4">
              <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full"></span>
              FOUND {filteredCourses.length} ACTIVE MODULES
            </div>
            <div className="flex items-center gap-2">
              {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-white/20"></div>)}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
            >
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCourses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-60 text-center rounded-3xl border-2 border-dashed border-white/5"
            >
              <div className="clash text-[32px] font-bold text-white/20 tracking-tight">NULL_SET: NO RESULTS</div>
              <div className="mt-4 text-[12px] font-mono tracking-widest text-[var(--accent-primary)] opacity-40 uppercase">RETRY_FILTERING_LOGIC</div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
