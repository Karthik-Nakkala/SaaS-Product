import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { vibePresets } from '../../utils/vibeParser';
import { Search, Command, ArrowRight } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { generateVibe } = useVibeStore();
  const inputRef = useRef(null);

  const presets = Object.values(vibePresets).filter(p => p.domain !== 'Generic SaaS');
  
  const filteredPresets = presets.filter(p => 
    p.domain.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
        setSearch('');
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleNavigation = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => Math.min(i + 1, filteredPresets.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredPresets[selectedIndex]) {
            generateVibe(filteredPresets[selectedIndex].domain);
            setIsOpen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, selectedIndex, filteredPresets, generateVibe]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm px-4"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center px-4 py-4 border-b border-white/10 gap-3">
            <Search size={22} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search business features or workflows..."
              className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500 font-medium"
            />
            <div className="flex gap-1">
              <span className="px-2 py-1 bg-white/5 border border-white/20 rounded text-xs text-gray-400 font-bold tracking-widest uppercase flex items-center gap-1">
                <Command size={12} /> K
              </span>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredPresets.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-medium tracking-wide">
                No features found for "{search}"
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredPresets.map((preset, i) => {
                  const active = i === selectedIndex;
                  return (
                    <li
                      key={preset.domain}
                      className={`p-4 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        active ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                      onMouseEnter={() => setSelectedIndex(i)}
                      onClick={() => {
                        generateVibe(preset.domain);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: active ? `var(--color-${preset.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-bg)` : 'rgba(255,255,255,0.05)' }}
                        >
                          <div style={{ color: `var(--color-${preset.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary)`}}>
                            <ArrowRight size={18} />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-base">{preset.domain}</p>
                          <p className={`text-xs ${active ? 'text-gray-300' : 'text-gray-500'} mt-0.5`}>Switch feature set</p>
                        </div>
                      </div>
                      
                      {active && (
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded">
                          Enter to switch
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
               <span><kbd className="bg-white/10 rounded px-1.5 py-0.5 mr-1 text-gray-400 font-mono">↑</kbd><kbd className="bg-white/10 rounded px-1.5 py-0.5 mr-1 text-gray-400 font-mono">↓</kbd> to navigate</span>
               <span><kbd className="bg-white/10 rounded px-1.5 py-0.5 mr-1 text-gray-400 font-mono">Enter</kbd> to select</span>
            </div>
            <span><kbd className="bg-white/10 rounded px-1.5 py-0.5 mr-1 text-gray-400 font-mono">Esc</kbd> to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
