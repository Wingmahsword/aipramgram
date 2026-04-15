import React from 'react';
import { motion } from 'framer-motion';

export default function Playground() {
  const [isThinking, setIsThinking] = React.useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-wrapper pt-[var(--nav-h)] bg-[var(--bg-deep)] text-white min-h-screen relative overflow-hidden"
    >
      {/* Dynamic Image Background with Indigo Translucency */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for the user's uploaded dual-robot image */}
        <img 
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" 
          alt="Playground Background" 
          className="w-full h-full object-cover object-center opacity-80"
        />
        {/* Indigo / Slate Translucent Overlay to match website aesthetic */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-[var(--accent-primary)]/20 mix-blend-overlay"></div>
        <div className="atmospheric-glow" />
        <div className="website-pattern opacity-40 mix-blend-overlay" />
        <div className="grain-overlay" />
      </div>

      <section className="px-6 sm:px-12 lg:px-20 py-32 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="clash text-[clamp(48px,12vw,160px)] font-bold tracking-[-0.07em] leading-[0.8] mb-20 text-white glow-text uppercase"
          >
            Playground
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              <h3 className="clash text-[32px] font-bold mb-8 leading-tight uppercase text-white drop-shadow-md">DEPLOY AGENTS<br/>IN SECONDS.</h3>
              <p className="text-[16px] text-white/70 font-medium leading-relaxed mb-10 drop-shadow-sm">Our terminal allows you to test logic gates, tool-use protocols, and RAG retrieval accuracy in a real-time sandbox environment.</p>
              
              <div className="space-y-4 shadow-xl">
                <button className="w-full py-4 px-6 bg-white/5 border border-white/20 backdrop-blur-md hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white text-[12px] font-bold tracking-[0.2em] transition-all text-left flex justify-between items-center group">
                  LOAD AGENT_V4
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_white]">→</span>
                </button>
                <button className="w-full py-4 px-6 bg-white/5 border border-white/20 backdrop-blur-md hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white text-[12px] font-bold tracking-[0.2em] transition-all text-left flex justify-between items-center group">
                  TEST TOOL_BOX
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_white]">→</span>
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-8"
            >
              {/* Dark Terminal (Glassmorphic) */}
              <div className="rounded-xl bg-slate-950/80 backdrop-blur-xl border border-white/10 overflow-hidden neo-depth shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[var(--accent-serif)] opacity-80 uppercase">root@eduhub:~/agent_v4</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">UTF-8</span>
                  </div>
                </div>
                <div className="p-8 mono text-[13px] leading-relaxed text-[#5EEAD4]">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.2 }}
                  >
                    <div className="mb-4 text-[#5EEAD4]/40">// Initializing neural weight matrix...</div>
                    <div className="flex gap-3 mb-2">
                      <span className="text-white/30">$</span>
                      <span className="text-white">python3 deploy_agent.py --model=eduhub-large-v2</span>
                    </div>
                    <div className="text-[#93C5FD]">{'>'} Loading embeddings: [####################] 100%</div>
                    <div className="text-[#93C5FD] mt-1">{'>'} Establishing secure websocket: CONNECTED</div>
                    
                    <div className="mt-8 border-l-2 border-[#5EEAD4]/30 pl-4 py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold text-[var(--accent-primary)] glow-text">STATUS:</span>
                        <div className="flex items-center gap-1">
                          <motion.span 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_#7c3aed]"
                          ></motion.span>
                          <span className="text-[11px] font-bold text-white uppercase tracking-widest animate-pulse">THINKING_PROMPT_REASONING...</span>
                        </div>
                      </div>
                      <div className="mt-4 opacity-70 text-white">
                        ANALYZING REPO STRUCTURE...<br/>
                        IDENTIFYING LATENT VULNERABILITIES...<br/>
                        SYNTHESIZING OPTIMAL TEST SUITE...
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button 
                        onClick={() => setIsThinking(!isThinking)}
                        className="px-6 py-2 bg-[var(--accent-primary)] text-white font-bold text-[11px] hover:brightness-110 shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all uppercase rounded-sm border border-transparent hover:border-white/20"
                      >
                        {isThinking ? 'HALT' : 'EXECUTE'}
                      </button>
                      <button className="px-6 py-2 bg-white/5 border border-white/20 text-white font-bold text-[11px] hover:bg-white/10 transition-all uppercase rounded-sm">
                        Clear Logs
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
