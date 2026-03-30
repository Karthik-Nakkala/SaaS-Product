import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { LayoutDashboard, Users, Settings, PieChart, Menu, FolderHeart, ShieldCheck, FileText, Briefcase, ShoppingBag, Stethoscope, Activity, FileLineChart } from 'lucide-react';
import { CodeOverlay } from '../devmode/CodeOverlay';

const sidebarCode = `
// Sidebar dynamic routing
const labels = useStore(vibeStore, s => s.activeVibe.sidebarLabels);
`.trim();

const getIcon = (label) => {
  const lc = label.toLowerCase();
  if (lc.includes('dash') || lc.includes('hub') || lc.includes('front') || lc.includes('overview')) return <LayoutDashboard />;
  if (lc.includes('analytic') || lc.includes('report') || lc.includes('ledger') || lc.includes('audits')) return <PieChart />;
  if (lc.includes('team') || lc.includes('staff') || lc.includes('patient') || lc.includes('client') || lc.includes('customer') || lc.includes('agent')) return <Users />;
  if (lc.includes('record') || lc.includes('invoice') || lc.includes('trans')) return <FileText />;
  if (lc.includes('project') || lc.includes('portfol')) return <Briefcase />;
  if (lc.includes('order') || lc.includes('invent') || lc.includes('promo')) return <ShoppingBag />;
  if (lc.includes('health') || lc.includes('appt')) return <Stethoscope />;
  if (lc.includes('activity') || lc.includes('pipeline')) return <Activity />;
  return <FolderHeart />;
};

export function Sidebar({ isOpen, toggleOpen }) {
  const { activeVibe } = useVibeStore();
  const labels = activeVibe.sidebarLabels || ['Dashboard', 'Analytics', 'Team', 'Projects', 'Security'];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="h-screen bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col relative transition-all duration-500 z-40 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
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
        <AnimatePresence mode="popLayout">
          {labels.map((lbl, i) => (
            <motion.div
              key={lbl}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: i * 0.05 }}
            >
              <NavItem icon={getIcon(lbl)} label={lbl} isOpen={isOpen} active={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
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
