import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { DevAuditTooltip } from '../devmode/DevAuditTooltip';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '../ui/Primitives';

export function LiveChart() {
  const { activeVibe, isGenerating } = useVibeStore();
  const data = useRealtimeData(20);

  // Derive metric name from current vibe
  const metricName = activeVibe.metrics[0]?.label || 'Active Sessions';
  const vColor = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`;

  // Custom polished tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111] border border-white/10 p-4 rounded shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Real-time Node</p>
          <p className="text-white text-lg font-bold" style={{ color: vColor }}>
            {payload[0].value.toFixed(0)} <span className="text-sm text-gray-400 font-normal">ops/s</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative bg-white/10 backdrop-blur-md rounded-md overflow-hidden shadow-2xl border border-white/20 h-[400px] flex flex-col pt-3"
    >
      <DevAuditTooltip>
        The data-fetching hook useRealtimeData() uses `useRef` to mutate stream arrays silently, bypassing React's diffing algorithm until the batch is ready.
      </DevAuditTooltip>

      <div className="px-8 pt-4 pb-2 flex justify-between items-end relative z-10 w-full">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Live {metricName} Stream
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: vColor }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: vColor }}></span>
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Synchronized</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative -ml-2 pb-2">
        {isGenerating ? (
           <div className="w-full h-full p-6"><Skeleton className="w-full h-full shimmer" /></div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={vColor} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={vColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" hide />
              <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
              <Area 
                type="monotone" 
                dataKey="uv" 
                stroke={vColor} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorUv)" 
                isAnimationActive={false} 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
