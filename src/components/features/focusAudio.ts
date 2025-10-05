// src/components/features/focusAudio.ts
let audio: HTMLAudioElement | null = null;
export function getFocusAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.25;
  }
  return audio;
}
