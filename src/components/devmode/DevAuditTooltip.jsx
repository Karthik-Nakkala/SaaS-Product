import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { useVibeStore } from '../../store/vibeStore';

export function DevAuditTooltip({ children }) {
  const { devMode } = useVibeStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!devMode) return null;

  return (
    <div className="absolute top-3 left-3 z-10">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="p-1.5 rounded-full bg-black/60 text-cyan-400 hover:text-white hover:bg-cyan-500/30 transition-colors shadow-lg border border-cyan-500/20 backdrop-blur group"
        title="Dev-Audit Info"
      >
        <Info size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className="absolute top-full left-0 mt-2 w-64 p-3 bg-black border border-cyan-500/40 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.9)] z-50 pointer-events-none"
          >
            <p className="text-xs font-mono text-cyan-200 leading-relaxed shadow-text">
              <span className="text-white block font-bold mb-1 tracking-wider uppercase">⚙️ Dev-Audit Check</span>
              AI-Generated Layout; Manually Optimized Logic for Performance.
              {children && (
                <span className="block mt-2 text-gray-400 border-t border-cyan-500/20 pt-2 pb-1">
                  {children}
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
