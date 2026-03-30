import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { CodeOverlay } from '../devmode/CodeOverlay';
import { Search, Sparkles, Terminal, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import { Badge } from '../ui/Primitives';

const navbarHookCode = `
// Efficient Theme Dispatcher
const handleSearch = useCallback((query) => { ... }, []);
`.trim();

export function Navbar() {
  const { generateVibe, activeVibe, isGenerating, devMode, toggleDevMode } = useVibeStore();
  const [inputVal, setInputVal] = useState('');

  const vColor = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputVal.trim()) generateVibe(inputVal);
    setInputVal('');
  };

  return (
    <nav className="h-24 bg-gradient-to-b from-black/90 to-transparent border-b border-transparent flex items-center justify-between px-8 lg:px-16 sticky top-0 z-30 pointer-events-none">
      <div className="absolute inset-0 z-0 bg-transparent blur-2xl" style={{ boxShadow: `inset 0 40px 60px -20px rgba(0,0,0,0.8)`}} />
      <CodeOverlay componentName="Navbar.jsx" codeSnippet={navbarHookCode} />
      
      <div className="flex-1 max-w-2xl relative z-10 pointer-events-auto mt-4">
        <form onSubmit={handleSubmit} className="relative group flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded bg-[#181818] border border-white/5 transition-colors focus-within:border-white/20">
          <div className="absolute left-5 opacity-40 text-white">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder='Ask for a capability or workflow (e.g. "finance tools")'
            className="w-full pl-14 pr-16 py-4 bg-transparent text-white placeholder-gray-500 font-medium focus:outline-none transition-all"
            disabled={isGenerating}
          />
          <button 
            type="submit"
            disabled={isGenerating || !inputVal.trim()}
            className="absolute right-2 p-2.5 rounded text-white transition-all flex items-center justify-center disabled:opacity-30 disabled:grayscale hover:scale-105"
            style={{ backgroundColor: vColor, boxShadow: `0 0 15px ${vColor}` }}
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          </button>
        </form>
      </div>

      <div className="flex items-center gap-8 ml-8 z-10 pointer-events-auto mt-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">
            Current Vibe
          </span>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeVibe.domain}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="px-3 py-1 bg-[#181818] border border-white/10 rounded shadow-lg text-sm font-bold text-white tracking-wide"
            >
                {activeVibe.domain}
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={toggleDevMode}
          className={`flex items-center gap-3 px-4 py-2.5 rounded transition-all font-semibold tracking-wide ${devMode ? 'bg-[#181818] border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-[#181818] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 shadow-lg'}`}
          title="Toggle Dev Mode Overlays"
        >
          <Terminal size={16} />
          <span className="text-sm hidden md:inline">DEV</span>
          {devMode ? <ToggleRight size={20} className="text-cyan-400" /> : <ToggleLeft size={20} />}
        </button>
      </div>
    </nav>
  );
}
