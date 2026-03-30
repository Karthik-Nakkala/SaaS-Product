import React from 'react';
import { motion } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { Skeleton } from '../ui/Primitives';
import { DevAuditTooltip } from '../devmode/DevAuditTooltip';
import * as Icons from 'lucide-react';

const getIcon = (label) => {
  const lc = label.toLowerCase();
  if (lc.includes('revenue') || lc.includes('sales')) return Icons.DollarSign;
  if (lc.includes('user') || lc.includes('patient') || lc.includes('candidate')) return Icons.Users;
  if (lc.includes('rate') || lc.includes('bounce') || lc.includes('inquiries')) return Icons.Activity;
  if (lc.includes('time') || lc.includes('appt')) return Icons.Clock;
  if (lc.includes('price')) return Icons.Tag;
  return Icons.PieChart;
};

export function MetricGrid() {
  const { activeVibe, isGenerating } = useVibeStore();
  
  const vColor = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`; // Fallback to Netflix red!
  const vBg = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-bg, transparent)`;
  
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-4">
      <DevAuditTooltip>
        Metric Hook utilizes Zustand proxy mapping to dynamically inject semantic fallback layouts directly into memory.
      </DevAuditTooltip>
      
      {activeVibe.metrics.map((m, i) => {
        const Icon = getIcon(m.label);
        const isPositive = m.trend.startsWith('+');
        const TrendIcon = isPositive ? Icons.TrendingUp : (m.trend === '0%' ? Icons.Minus : Icons.TrendingDown);
        
        if (isGenerating) return <Skeleton key={i} className="h-40 w-full shimmer rounded-md" />;

        return (
          <motion.div
            key={`${m.label}-${i}`}
            className="card-3d-wrapper group h-40"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.08, 
                z: 40,
                rotateX: -5,
                rotateY: 5,
                boxShadow: `0 30px 60px -10px rgba(0,0,0,0.8), 0 0 20px -5px ${vColor}`
              }}
              className="card-3d-inner w-full h-full p-6 rounded-md bg-white/10 backdrop-blur-md border border-white/20 border-b-[3px] relative overflow-hidden flex flex-col justify-between"
              style={{ borderBottomColor: vColor }}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"
                style={{ backgroundColor: vColor, transform: 'translate(30%, -30%)' }}
              />

              <div className="flex justify-between items-start z-10 relative">
                <span className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
                  {m.label}
                </span>
                <div 
                  className="p-2.5 rounded-full"
                  style={{ backgroundColor: vBg, color: vColor }}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex items-end justify-between z-10 relative">
                <h3 className="text-4xl font-extrabold tracking-tighter text-white drop-shadow-md">
                  {m.value}
                </h3>
                <span className={`flex items-center text-sm font-bold ${isPositive ? 'text-emerald-400' : (m.trend === '0%' ? 'text-slate-400' : 'text-rose-500')}`}>
                  <TrendIcon size={16} strokeWidth={3} className="mr-1" />
                  {m.trend}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
