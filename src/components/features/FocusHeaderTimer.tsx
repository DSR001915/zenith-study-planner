// src/components/features/FocusHeaderTimer.tsx
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function format(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

let focusAudio: HTMLAudioElement | null = null;
function getAudio() {
  if (!focusAudio) {
    focusAudio = new Audio();
    focusAudio.loop = true;
    focusAudio.preload = 'auto';
    focusAudio.volume = 0.25;
  }
  return focusAudio;
}

export const FocusHeaderTimer = () => {
  const { sound, isFocusMode } = useUIStore();
  const [time, setTime] = useState(FOCUS_TIME);
  const [active, setActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const tickRef = useRef<number | null>(null);

  // ticking
  useEffect(() => {
    if (active) {
      tickRef.current = window.setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [active]);

  // transitions
  useEffect(() => {
    if (time === 0) {
      if (isBreak) {
        setIsBreak(false);
        setTime(FOCUS_TIME);
      } else {
        setIsBreak(true);
        setTime(BREAK_TIME);
        setActive(true); // auto-continue into break
      }
    }
  }, [time, isBreak]);

  const start = async () => {
    setActive(true);
    const a = getAudio();
    if (sound !== 'none') {
      const src = `/sounds/${sound}.mp3`;
      if (!a.src.endsWith(src)) a.src = src;
      try { await a.play(); } catch {}
    }
  };

  const pause = () => {
    setActive(false);
    getAudio().pause();
  };

  const reset = () => {
    setActive(false);
    setIsBreak(false);
    setTime(FOCUS_TIME);
    getAudio().pause();
  };

  // stop audio if global focus mode exits
  useEffect(() => {
    if (!isFocusMode) getAudio().pause();
  }, [isFocusMode]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Focus Mode</span>
      <span className="text-sm font-mono px-2 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
        {isBreak ? 'Break' : 'Focus'} • {format(time)}
      </span>
      {!active ? (
        <button
          onClick={start}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          <Play size={16} /> Start
        </button>
      ) : (
        <button
          onClick={pause}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
        >
          <Pause size={16} /> Pause
        </button>
      )}
      <button
        onClick={reset}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 transition-colors"
      >
        <RotateCcw size={16} /> Reset
      </button>
    </div>
  );
};
