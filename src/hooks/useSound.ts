import { useState, useCallback } from 'react';

// Simple sound effect using Web Audio API
const playBeep = (frequency: number, duration: number, volume: number = 0.3) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const playRfidBeep = useCallback(() => {
    if (soundEnabled) {
      playBeep(800, 0.1);
    }
  }, [soundEnabled]);

  const playSuccessSound = useCallback(() => {
    if (soundEnabled) {
      playBeep(600, 0.1);
      setTimeout(() => playBeep(800, 0.15), 100);
    }
  }, [soundEnabled]);

  const playPaymentSound = useCallback(() => {
    if (soundEnabled) {
      playBeep(700, 0.15);
      setTimeout(() => playBeep(900, 0.15), 150);
    }
  }, [soundEnabled]);

  const playGateSound = useCallback(() => {
    if (soundEnabled) {
      playBeep(400, 0.3);
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playRfidBeep,
    playSuccessSound,
    playPaymentSound,
    playGateSound
  };
}

