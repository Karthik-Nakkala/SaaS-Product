import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVibeStore } from '../../store/vibeStore';
import { Badge, Skeleton } from '../ui/Primitives';
import { CodeOverlay } from '../devmode/CodeOverlay';
import { Edit2, Trash2, ArrowUpDown } from 'lucide-react';

const mockTableHookCode = `
// Memoized Sorting Hook
function useSortableTable(data, config) { ... }
`.trim();

export function DataTable() {
  const { activeVibe, tableData, isGenerating } = useVibeStore();
  const [sortKey, setSortKey] = useState('id');
  const [direction, setDirection] = useState('asc');

  const vColor = `var(--color-${activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}-primary, #e50914)`;

  const cols = activeVibe.tableColumns || [];
  const handleSort = (key) => {
    if (sortKey === key) setDirection(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setDirection('asc'); }
  };

  const getVariant = (status) => {
    if (!status) return 'default';
    const s = status.toLowerCase();
    if (s.includes('active') || s.includes('delivered') || s.includes('completed')) return 'primary';
    if (s.includes('pending') || s.includes('processing') || s.includes('waiting')) return 'warning';
    if (s.includes('failed') || s.includes('lost') || s.includes('rejected')) return 'danger';
    return 'default';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative netflix-glass rounded-md overflow-hidden shadow-2xl border border-white/5"
    >
      <CodeOverlay componentName="DataTable.jsx" codeSnippet={mockTableHookCode} />
      
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {activeVibe.domain} Analytics
        </h2>
        <div className="flex gap-3">
           <button className="px-5 py-2 text-sm font-bold tracking-wide uppercase rounded bg-white text-black hover:bg-gray-200 transition-colors shadow-lg">
            Export Report
           </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#181818] text-slate-400 border-b border-white/10 uppercase tracking-wider text-xs font-bold">
            <tr>
              {cols.map((col) => (
                <th key={col} className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort(col)}>
                  <div className="flex items-center gap-2">
                    {col}
                    <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#141414]/50">
            {isGenerating ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {cols.map((c, j) => (
                    <td key={j} className="px-6 py-4"><Skeleton className="h-5 w-full shimmer" /></td>
                  ))}
                  <td className="px-6 py-4"><Skeleton className="h-5 w-12 ml-auto shimmer" /></td>
                </tr>
              ))
            ) : (
              tableData.map((row, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                  whileHover={{ 
                    scale: 1.01, 
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    boxShadow: '0 5px 15px -3px rgba(0,0,0,0.5)',
                    zIndex: 10
                  }}
                  key={row.id || i}
                  className="transition-all relative cursor-pointer group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: vColor }} />
                  {cols.map((col, j) => {
                    const val = Object.values(row)[j] || '-';
                    const isStatus = col.toLowerCase().includes('status') || col.toLowerCase().includes('stage');
                    return (
                      <td key={j} className="px-6 py-5 text-slate-300 font-medium">
                        {isStatus ? <Badge variant={getVariant(val)}>{val}</Badge> : val}
                      </td>
                    );
                  })}
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
