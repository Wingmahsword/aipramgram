import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';

const MODELS = [
  { id: 'gpt4o',    name: 'GPT-4o',       org: 'OpenAI',      color: '#10a37f', icon: '⬡' },
  { id: 'claude35', name: 'Claude 3.5',   org: 'Anthropic',   color: '#d4a27f', icon: '◈' },
  { id: 'gemini',   name: 'Gemini Pro',   org: 'Google',      color: '#4285f4', icon: '✦' },
  { id: 'mistral',  name: 'Mistral 7B',   org: 'Mistral AI',  color: '#ff6b35', icon: '⊕' },
  { id: 'llama3',   name: 'Llama 3',      org: 'Meta',        color: '#0082fb', icon: '▲' },
];

const STARTERS = [
  'Explain gradient descent visually',
  'What is the attention mechanism?',
  'How does RAG work in production?',
  'Compare CNNs vs Transformers',
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg, modelColor }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-bold"
        style={{ background: isUser ? 'var(--accent-primary)' : modelColor + '22', border: `1px solid ${isUser ? 'transparent' : modelColor + '44'}`, color: isUser ? '#fff' : modelColor }}
      >
        {isUser ? 'U' : '⬡'}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed font-medium whitespace-pre-wrap ${
          isUser
            ? 'bg-[var(--accent-primary)] text-white rounded-tr-sm'
            : 'bg-white/6 border border-white/8 text-white/85 rounded-tl-sm'
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

export default function Playground() {
  const { messages, sendMessage } = useApp();
  const [activeModel, setActiveModel] = useState(MODELS[0]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const visibleMessages = messages.filter(m => m.role !== 'thinking');
  const isThinking = messages.some(m => m.role === 'thinking');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setSending(true);
    await sendMessage(text, activeModel.id);
    setSending(false);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-wrapper pt-[var(--nav-h)] bg-[var(--bg-deep)] text-white min-h-screen flex flex-col relative overflow-hidden"
    >
      <div className="atmospheric-glow" />
      <div className="website-pattern opacity-20" />
      <div className="grain-overlay" />

      <div className="relative z-10 flex flex-col flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8 gap-6">

        {/* Page header */}
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'circOut' }}>
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--accent-primary)] mb-2 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--accent-primary)]" />
            AI Sandbox
          </div>
          <h1 className="clash text-[clamp(36px,8vw,90px)] font-bold tracking-[-0.06em] leading-[0.85] text-white glow-text uppercase">
            Playground
          </h1>
        </motion.div>

        {/* Model selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 22 }}
          className="flex flex-wrap gap-2"
        >
          {MODELS.map(model => (
            <motion.button
              key={model.id}
              onClick={() => setActiveModel(model)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[11px] font-bold tracking-[0.1em] uppercase transition-all"
              style={activeModel.id === model.id
                ? { borderColor: model.color, background: model.color + '18', color: model.color, boxShadow: `0 0 16px ${model.color}30` }
                : { borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.45)' }
              }
            >
              <span className="text-[16px] leading-none">{model.icon}</span>
              <span>{model.name}</span>
              {activeModel.id === model.id && (
                <motion.span
                  layoutId="active-dot"
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: model.color }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Chat area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 24 }}
          className="flex-1 flex flex-col rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl overflow-hidden"
          style={{ minHeight: '480px' }}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mono">
                {activeModel.org} / {activeModel.name}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: activeModel.color }}
              />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: activeModel.color }}>ONLINE</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5" style={{ scrollbarWidth: 'none' }}>
            <AnimatePresence>
              {visibleMessages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} modelColor={activeModel.color} />
              ))}
              {isThinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px]"
                    style={{ background: activeModel.color + '22', border: `1px solid ${activeModel.color}44`, color: activeModel.color }}
                  >
                    {activeModel.icon}
                  </div>
                  <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Starter chips */}
          {visibleMessages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-6 pb-4 flex flex-wrap gap-2"
            >
              {STARTERS.map(s => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.03, borderColor: activeModel.color }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setInput(s); inputRef.current?.focus(); }}
                  className="text-[11px] text-white/50 px-3 py-1.5 border border-white/10 rounded-full hover:text-white transition-all"
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Input row */}
          <div className="px-4 pb-4 pt-2 border-t border-white/8 bg-white/2">
            <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[var(--accent-primary)] transition-colors">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`Ask ${activeModel.name} anything about AI…`}
                className="flex-1 bg-transparent text-white text-[14px] font-medium resize-none outline-none placeholder-white/25 leading-relaxed"
                style={{ maxHeight: '120px', scrollbarWidth: 'none' }}
              />
               <motion.button
                 whileHover={{ scale: 1.08 }}
                 whileTap={{ scale: 0.92 }}
                 onClick={handleSend}
                 disabled={!input.trim() || sending}
                 className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                 style={{ background: input.trim() && !sending ? activeModel.color : 'rgba(255,255,255,0.08)' }}
                 aria-label={sending ? "Sending message..." : "Send message"}
               >
                 {sending ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                   </svg>
                 )}
               </motion.button>
            </div>
            <div className="text-[9px] text-white/20 font-mono mt-2 text-center tracking-widest uppercase">
              Press Enter to send · Shift+Enter for new line · Answers by {activeModel.name}
            </div>
          </div>
        </motion.div>

        {/* Side info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 24 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: 'Context Window', value: '128k tokens' },
            { label: 'Response Mode', value: 'Active Q&A' },
            { label: 'Topics',         value: 'ML · DL · LLMs' },
            { label: 'Models Online',  value: `${MODELS.length} bots` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/3 border border-white/8 rounded-xl p-4">
              <div className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase mb-1">{label}</div>
              <div className="text-[13px] font-bold mono" style={{ color: activeModel.color }}>{value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
