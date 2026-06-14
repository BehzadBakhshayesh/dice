import { useEffect, useRef } from 'react';
import dice from '@/assets/sounds/dice.wav';

const audioBufferCache: Record<string, AudioBuffer> = {};

export const useSound = (url: string = dice, volume: number = 0.5) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const init = async () => {
      const context = new AudioContext();
      audioContextRef.current = context;

      const gainNode = context.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(context.destination);
      gainNodeRef.current = gainNode;

      if (audioBufferCache[url]) {
        bufferRef.current = audioBufferCache[url];
      } else {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const decoded = await context.decodeAudioData(arrayBuffer);
        bufferRef.current = decoded;
        audioBufferCache[url] = decoded;
      }
    };

    init();

    return () => {
      audioContextRef.current?.close();
    };
  }, [url]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const play = () => {
    if (
      !audioContextRef.current ||
      !bufferRef.current ||
      !gainNodeRef.current
    ) {
      return;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = bufferRef.current;

    source.connect(gainNodeRef.current);
    source.start(0);
  };

  return play;
};