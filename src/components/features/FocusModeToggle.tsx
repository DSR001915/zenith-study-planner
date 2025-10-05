// src/components/features/FocusModeToggle.tsx
import { Maximize, Minimize } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { getFocusAudio } from './focusAudio';

export const FocusModeToggle = () => {
  const { isFocusMode, toggleFocusMode, sound } = useUIStore();

  const handleClick = async () => {
    const next = !isFocusMode;
    toggleFocusMode();

    const audio = getFocusAudio();
    if (next && sound !== 'none') {
      const src = `/sounds/${sound}.mp3`;
      if (!audio.src.endsWith(src)) audio.src = src;
      try {
        await audio.play(); // user-gesture initiated
      } catch (err: any) {
        // Optionally show a toast: playback blocked, tap again to enable
      }
    } else {
      audio.pause();
    }
  };

  return (
    <button onClick={handleClick} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Toggle Focus Mode">
      {isFocusMode ? <Minimize size={20} /> : <Maximize size={20} />}
    </button>
  );
};
