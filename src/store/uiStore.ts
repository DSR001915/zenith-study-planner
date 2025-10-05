import { create } from 'zustand';

type SoundOption = 'rain' | 'cafe' | 'none';

interface UIState {
  isFocusMode: boolean;
  sound: SoundOption;
  toggleFocusMode: () => void;
  setSound: (sound: SoundOption) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isFocusMode: false,
  sound: 'none',
  toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),
  setSound: (sound) => set({ sound }),
}));