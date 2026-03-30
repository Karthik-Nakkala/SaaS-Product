import React from 'react';
import { Layout } from './components/layout/Layout';
import { MetricGrid } from './components/dashboard/MetricGrid';
import { LiveChart } from './components/dashboard/LiveChart';
import { DataTable } from './components/dashboard/DataTable';
import { PromptHistoryPanel } from './components/dashboard/PromptHistory';
import { CommandPalette } from './components/layout/CommandPalette';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeStore } from './store/vibeStore';

// Cinematic stagger children variant
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

function App() {
  const { activeVibe, devMode, activeTabIndex } = useVibeStore();
  
  const currentTabName = activeVibe.sidebarLabels?.[activeTabIndex] || 'Dashboard';
  // Include tab name in the cinematic title for immediate visual feedback
  const titleWords = `${activeVibe.domain} ${currentTabName}`.split(" ");

  return (
    <Layout>
      <div className="flex flex-col gap-6 relative z-10 w-full mb-24">
        <header className="mb-2 mt-4 pt-4">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeVibe.domain}
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.08 } }
              }}
              className="flex gap-2 flex-wrap mb-2"
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 2, y: 20, filter: 'blur(10px)' },
                    show: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 120, damping: 14 } }
                  }}
                  className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-xl font-medium tracking-wide max-w-2xl drop-shadow-md"
          >
            Orchestrating features and intelligence perfectly tailored for your workflow.
          </motion.p>
        </header>
        
        {devMode && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            className="bg-[#111] border-l-4 border-cyan-500 text-cyan-100 px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-4 text-sm mt-4 font-mono z-50 rounded relative overflow-hidden flex-col md:flex-row items-start md:items-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <strong className="font-bold tracking-widest text-cyan-400">DEV-AUDIT / ACTIVE</strong>
            <span className="opacity-80">Inspect components by hovering over the "ⓘ" icons for performance insights.</span>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${activeVibe.domain}-tab-${activeTabIndex}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
            className="flex flex-col gap-10 w-full mt-6"
          >
            {activeTabIndex === 0 && (
              <>
                <motion.div variants={itemVariants}><MetricGrid /></motion.div>
                <motion.div variants={itemVariants}><LiveChart /></motion.div>
                <motion.div variants={itemVariants}><DataTable /></motion.div>
              </>
            )}
            {activeTabIndex === 1 && (
              <>
                <motion.div variants={itemVariants}><LiveChart /></motion.div>
                <motion.div variants={itemVariants}><DataTable /></motion.div>
              </>
            )}
            {activeTabIndex === 2 && (
              <>
                <motion.div variants={itemVariants}><DataTable /></motion.div>
                <motion.div variants={itemVariants}><MetricGrid /></motion.div>
              </>
            )}
            {activeTabIndex === 3 && (
              <>
                <motion.div variants={itemVariants}><MetricGrid /></motion.div>
                <motion.div variants={itemVariants}><DataTable /></motion.div>
                <motion.div variants={itemVariants}><LiveChart /></motion.div>
              </>
            )}
            {activeTabIndex >= 4 && (
              <>
                <motion.div variants={itemVariants}><DataTable /></motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Render the Slide-over Panel and Command Palette */}
        <CommandPalette />
        <PromptHistoryPanel />
      </div>
    </Layout>
  );
}

export default App;
