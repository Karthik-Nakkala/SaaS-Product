import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useVibeStore } from '../../store/vibeStore';

export function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { activeVibe } = useVibeStore();

  const domainKey = activeVibe.domain.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');

  return (
    <div 
      className="flex h-screen w-full overflow-hidden transition-colors duration-[1000ms] ease-out bg-[#141414] text-white"
    >
      <Sidebar isOpen={isSidebarOpen} toggleOpen={() => setSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto w-full z-0">
        {/* Cinematic Netflix-style ambient background glow */}
        <div 
          className="absolute top-[-20%] left-[20%] w-[60rem] h-[60rem] rounded-full blur-[180px] opacity-[0.12] pointer-events-none transition-colors duration-1000 mix-blend-screen"
          style={{ backgroundColor: `var(--color-${domainKey}-primary, #e50914)` }}
        />
        
        <Navbar />
        
        <main className="flex-1 p-6 md:p-12 xl:px-16 mx-auto w-full z-10 max-w-[1600px]">
          {children}
        </main>
      </div>
    </div>
  );
}
