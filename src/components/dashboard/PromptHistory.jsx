import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { History, Copy, Check } from 'lucide-react';

export function PromptHistoryPanel() {
  const { prompts } = useVibeStore();
  const [copiedId, setCopiedId] = React.useState(null);

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (prompts.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12 bg-[#111] p-8 rounded-md border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.9)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20" />
      
      <div className="flex items-center gap-3 mb-6 text-gray-400 border-b border-[#222] pb-4">
        <History size={20} className="text-gray-500" />
        <h3 className="font-bold tracking-widest uppercase text-sm">System Prompts Stream</h3>
      </div>
      
      <div className="space-y-6">
        <AnimatePresence>
          {prompts.map((p, i) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, x: 20, rotateX: 20 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative p-5 rounded bg-[#181818] border border-white/5 hover:border-white/20 transition-all group overflow-hidden shadow-lg"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-semibold text-white tracking-wide">
                  Query: <span className="font-medium text-gray-400 ml-2 italic">"{p.query}"</span>
                </div>
                <button
                  onClick={() => copyToClipboard(p.id, p.structured)}
                  className="p-2 rounded bg-black/40 text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/10"
                  title="Copy Structured Prompt"
                >
                  {copiedId === p.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="text-xs font-mono text-cyan-400/80 whitespace-pre-wrap bg-[#0c0c0c] p-4 rounded border border-white/5 overflow-x-auto shadow-inner">
                {p.structured}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
