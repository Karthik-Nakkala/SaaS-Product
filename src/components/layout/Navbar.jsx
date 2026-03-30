import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { CodeOverlay } from '../devmode/CodeOverlay';
import { Search, Sparkles, Terminal, ToggleLeft, ToggleRight, Loader2, ChevronDown, History } from 'lucide-react';
import { Badge } from '../ui/Primitives';

const navbarHookCode = `
// Vibe Switcher Handler
const handleIndustryChange = (e) => {
  const domain = e.target.value;
  vibeStore.getState().generateVibe(domain);
};
`.trim();

export function Navbar() {
  const { generateVibe, activeVibe, isGenerating, devMode, toggleDevMode, togglePromptHistory } = useVibeStore();
  const [inputVal, setInputVal] = useState('');

  const vColor = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputVal.trim()) generateVibe(inputVal);
    setInputVal('');
  };

  const handleIndustrySelect = (e) => {
    if(e.target.value) {
      generateVibe(e.target.value);
    }
  };

  return (
    <nav className="h-24 bg-gradient-to-b from-black/90 to-transparent border-b border-transparent flex flex-wrap gap-4 items-center justify-between px-8 lg:px-16 sticky top-0 z-30 pointer-events-none">
      <div className="absolute inset-0 z-0 bg-transparent blur-2xl" style={{ boxShadow: `inset 0 40px 60px -20px rgba(0,0,0,0.8)`}} />
      <CodeOverlay componentName="Navbar.jsx" codeSnippet={navbarHookCode} />
      
      <div className="flex-1 max-w-3xl relative z-10 pointer-events-auto mt-4 flex items-center gap-4">
        
        {/* Industry Switcher Dropdown */}
        <div className="relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#181818] border border-white/5 rounded transition-colors hover:border-white/20">
          <select 
            onChange={handleIndustrySelect}
            className="appearance-none bg-transparent text-white font-medium pl-4 pr-10 py-4 focus:outline-none cursor-pointer w-44"
            disabled={isGenerating}
            defaultValue=""
          >
            <option value="" disabled className="bg-[#181818]">Industry...</option>
            <option value="Healthcare" className="bg-[#181818]">Healthcare</option>
            <option value="E-commerce" className="bg-[#181818]">E-commerce</option>
            <option value="Real Estate" className="bg-[#181818]">Real Estate</option>
            <option value="Finance" className="bg-[#181818]">Finance</option>
            <option value="CRM" className="bg-[#181818]">CRM</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Text Input Search */}
        <form onSubmit={handleSubmit} className="flex-1 relative group flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded bg-[#181818] border border-white/5 transition-colors focus-within:border-white/20">
          <div className="absolute left-5 opacity-40 text-white">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder='Or ask for a workflow...'
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

        <div className="flex gap-3 items-center">
          <button
            onClick={togglePromptHistory}
            className="flex items-center gap-2 px-4 py-2.5 rounded transition-all font-semibold tracking-wide bg-[#181818] border border-cyan-500/30 hover:border-cyan-400 text-cyan-500 hover:text-cyan-300 shadow-[0_5px_15px_rgba(34,211,238,0.15)] hover:shadow-[0_5px_20px_rgba(34,211,238,0.3)]"
            title="View Prompt History Slide-over"
          >
            <History size={18} />
            <span className="text-sm hidden md:inline">Prompts</span>
          </button>
          
          <button 
            onClick={toggleDevMode}
            className={`flex items-center gap-3 px-4 py-2.5 rounded transition-all font-semibold tracking-wide ${devMode ? 'bg-[#181818] border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-[#181818] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 shadow-lg'}`}
            title="Toggle Dev-Audit Overlays"
          >
            <Terminal size={16} />
            <span className="text-sm hidden lg:inline whitespace-nowrap">DEV-AUDIT</span>
            {devMode ? <ToggleRight size={20} className="text-cyan-400" /> : <ToggleLeft size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
