import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, X } from 'lucide-react';
import { useVibeStore } from '../../store/vibeStore';

export function CodeOverlay({ componentName, codeSnippet }) {
  const { devMode } = useVibeStore();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!devMode) return null;

  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-full bg-slate-800/80 text-cyan-400 hover:bg-slate-700 transition-colors shadow-lg backdrop-blur"
        title="View Code Snippet"
      >
        <Code2 size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-[320px] sm:w-[480px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden glass z-50 origin-top-right"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
              <span className="text-xs font-mono text-slate-300">
                {componentName} <span className="text-slate-500">// Optimized Hook</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
              <pre className="text-xs text-sky-300 font-mono whitespace-pre-wrap leading-relaxed">
                {codeSnippet}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
