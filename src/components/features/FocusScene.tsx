// src/components/features/FocusScene.tsx
import { useEffect, useMemo, useState } from 'react';
import './FocusScene.css';
import { useUIStore } from '../../store/uiStore';

export const FocusScene = () => {
  const { isFocusMode, sound } = useUIStore();
  const [drops, setDrops] = useState<number[]>([]);

  // Create N raindrops with random lanes on mount
  const N = 120; // adjust for intensity
  useEffect(() => { setDrops(Array.from({ length: N }, (_, i) => i)); }, []);

  // Randomize lightning center occasionally
  const lightningVars = useMemo(() => {
    const lx = 40 + Math.random() * 40; // 40–80%
    const ly = 10 + Math.random() * 30; // 10–40%
    return { '--lx': `${lx}%`, '--ly': `${ly}%` } as React.CSSProperties;
  }, [isFocusMode]); // new position each time focus toggles on

  // Only show scene for ambient sounds; extend with other themes later
  const show = isFocusMode && (sound === 'rain' || sound === 'cafe');

  return (
    <div className={`focus-scene ${show ? 'active' : ''}`}>
      {/* raindrops */}
      {drops.map((i) => {
        const x = Math.random() * 110;                  // vw lane
        const delay = Math.random() * 2000;             // ms
        const dur = 1200 + Math.random() * 1200;        // ms
        const style: React.CSSProperties = {
          '--x': `${x}vw`,
          animationDuration: `${dur}ms`,
          animationDelay: `-${delay}ms`,
        } as any;
        return <div className="drop" style={style} key={i} />;
      })}
      <div className="mist" />
      {/* soft lightning pulse if rain selected */}
      {sound === 'rain' && <div className="flash" style={lightningVars} />}
    </div>
  );
};
