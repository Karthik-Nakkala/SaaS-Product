import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { History, Copy, Check, X, FileTerminal } from 'lucide-react';

export function PromptHistoryPanel() {
  const { prompts, isPromptHistoryOpen, togglePromptHistory } = useVibeStore();
  const [copiedId, setCopiedId] = React.useState(null);

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isPromptHistoryOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePromptHistory}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl z-50 bg-[#111] border-l border-[#333] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col"
          >
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />
            
            <div className="flex items-center justify-between p-6 border-b border-[#222] bg-[#0A0A0A]">
              <div className="flex items-center gap-3 text-cyan-400">
                <FileTerminal size={24} />
                <h3 className="font-bold tracking-widest uppercase text-lg">Prompt Engineering</h3>
              </div>
              <button 
                onClick={togglePromptHistory}
                className="p-2 text-gray-500 hover:text-white rounded hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {prompts.length === 0 ? (
                <div className="text-gray-500 text-center mt-20 italic">
                  Generate a new vibe to see the system prompts!
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {prompts.map((p, i) => (
                    <motion.div
                      layout
                      key={p.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                      className="relative p-5 rounded bg-[#181818] border border-white/5 hover:border-cyan-500/30 transition-all group overflow-hidden shadow-lg"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex justify-between items-start mb-4">
                        <div className="text-sm font-semibold text-white tracking-wide leading-relaxed">
                          Intent: <span className="font-medium text-gray-400 ml-2 italic">"{p.query}"</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(p.id, p.structured)}
                          className="p-2 ml-4 rounded bg-black/40 text-gray-400 hover:text-cyan-400 transition-colors flex-shrink-0 border border-transparent hover:border-cyan-500/20"
                          title="Copy Structured Prompt"
                        >
                          {copiedId === p.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        </button>
                      </div>
                      
                      <div className="text-xs font-mono text-cyan-300/80 whitespace-pre-wrap bg-[#050505] p-5 rounded border border-[#222] shadow-inner leading-loose">
                        {p.structured}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
