import { create } from 'zustand';
import { parseVibe, vibePresets } from '../utils/vibeParser';
import { generateTableData } from '../utils/mockDataGen';
import { buildStructuredPrompt } from '../utils/promptBuilder';

export const useVibeStore = create((set) => ({
  vibeText: '',
  activeVibe: vibePresets.default,
  isGenerating: false,
  tableData: generateTableData(vibePresets.default.domain),
  prompts: [],
  devMode: false,
  isPromptHistoryOpen: false,
  activeTabIndex: 0,

  setVibeText: (text) => set({ vibeText: text }),
  
  toggleDevMode: () => set((state) => ({ devMode: !state.devMode })),
  
  togglePromptHistory: () => set((state) => ({ isPromptHistoryOpen: !state.isPromptHistoryOpen })),
  
  setActiveTab: (index) => set({ activeTabIndex: index }),

  generateVibe: async (text) => {
    set({ isGenerating: true, activeTabIndex: 0 });
    
    // Artificial delay to show Skeletons / Framer motion entering
    await new Promise(r => setTimeout(r, 1200));

    const newVibe = parseVibe(text);
    const newData = generateTableData(newVibe.domain);
    const newPrompt = buildStructuredPrompt(text, newVibe);

    set((state) => ({
      activeVibe: newVibe,
      tableData: newData,
      prompts: [newPrompt, ...state.prompts],
      isGenerating: false,
      vibeText: '' // clear input
    }));
  }
}));
