import { create } from "zustand";

interface AlgorithmState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  activeLines: number[]; // Lines to highlight
  playbackSpeed: number; // ms per step
  
  // Actions
  togglePlay: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTotalSteps: (total: number) => void;
  setActiveLines: (lines: number[]) => void;
  setPlaybackSpeed: (speed: number) => void;
  reset: () => void;
}

export const useAlgorithmStore = create<AlgorithmState>((set) => ({
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  activeLines: [],
  playbackSpeed: 1000,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1) 
  })),
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0) 
  })),
  setTotalSteps: (total) => set({ totalSteps: total }),
  setActiveLines: (lines) => set({ activeLines: lines }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  reset: () => set({ isPlaying: false, currentStep: 0, activeLines: [] }),
}));
