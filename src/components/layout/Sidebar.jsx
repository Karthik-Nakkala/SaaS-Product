import React from 'react';
import { motion } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { LayoutDashboard, Users, Settings, PieChart, Menu, FolderHeart, ShieldCheck } from 'lucide-react';
import { CodeOverlay } from '../devmode/CodeOverlay';

const sidebarCode = `
// Sidebar dynamic routing
const getSidebarLinks = (domain) => { ... }
`.trim();

export function Sidebar({ isOpen, toggleOpen }) {
  const { activeVibe } = useVibeStore();

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="h-screen bg-[#0A0A0A] border-r border-[#222] flex flex-col relative transition-all duration-500 z-40 shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
    >
      <CodeOverlay componentName="Sidebar.jsx" codeSnippet={sidebarCode} />
      
      <div className="flex items-center justify-between p-6">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring' }}
            className="font-black text-2xl tracking-tighter text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            SaaS<span style={{ color: `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`}}>.AI</span>
          </motion.div>
        )}
        <button onClick={toggleOpen} className="p-2.5 rounded hover:bg-white/10 transition-colors mx-auto text-white focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex-1 py-6 px-4 flex flex-col gap-3">
        <NavItem icon={<LayoutDashboard />} label="Dashboard" isOpen={isOpen} active />
        <NavItem icon={<PieChart />} label="Analytics" isOpen={isOpen} />
        <NavItem icon={<Users />} label="Team" isOpen={isOpen} />
        <NavItem icon={<FolderHeart />} label="Projects" isOpen={isOpen} />
        <NavItem icon={<ShieldCheck />} label="Security" isOpen={isOpen} />
      </div>

      <div className="p-4 border-t border-[#222] bg-gradient-to-t from-black to-transparent">
        <NavItem icon={<Settings />} label="Settings" isOpen={isOpen} />
      </div>
    </motion.div>
  );
}

function NavItem({ icon, label, isOpen, active }) {
  const { activeVibe } = useVibeStore();
  const vColor = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`;
  
  return (
    <button className={`flex items-center gap-4 px-4 py-3.5 rounded transition-all group relative w-full overflow-hidden ${active ? 'bg-white/5 font-bold tracking-wide' : 'hover:bg-white/10 font-medium tracking-wide opacity-80 hover:opacity-100'}`}>
      <div 
        className="flex-shrink-0 transition-colors drop-shadow-md z-10"
        style={active ? { color: vColor } : { color: '#9CA3AF' }}
      >
        {React.cloneElement(icon, { size: 22, strokeWidth: active ? 2.5 : 2 })}
      </div>
      
      <motion.span 
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
        className={`whitespace-nowrap overflow-hidden text-left flex-1 z-10 text-sm ${active ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}
      >
        {label}
      </motion.span>
      
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute inset-x-0 bottom-0 h-0.5"
          style={{ backgroundColor: vColor, boxShadow: `0 -5px 15px ${vColor}` }}
        />
      )}
    </button>
  );
}
