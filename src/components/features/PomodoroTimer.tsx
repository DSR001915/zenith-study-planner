// inside PomodoroTimer.tsx
import { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { getFocusAudio } from './focusAudio';

export default function PomodoroTimer() {
  const { sound } = useUIStore();

  // ✅ Fix: Declare state
  const [isActive, setIsActive] = useState(false);

  const handleStartStop = async () => {
    const next = !isActive;
    setIsActive(next);

    const audio = getFocusAudio();
    if (next && sound !== 'none') {
      const src = `/sounds/${sound}.mp3`;
      if (!audio.src.endsWith(src)) audio.src = src;
      try {
        await audio.play();
      } catch {
        // ignore play error
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div>
      {/* ✅ Fix: Use the function so it's not "declared but never read" */}
      <button onClick={handleStartStop}>
        {isActive ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
