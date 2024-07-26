import { useRef, useState } from "react";

export function usePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);

  async function play(blob: Blob, callback: () => void) {
    stop();
    audioContext.current = new AudioContext({ sampleRate: 24000 });

    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);

    source.current = audioContext.current.createBufferSource();
    source.current.buffer = audioBuffer;
    source.current.connect(audioContext.current.destination);
    source.current.start();

    source.current.onended = () => {
      stop();
      callback();
    };

    setIsPlaying(true);
  }

  function stop() {
    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }
    setIsPlaying(false);
  }

  return {
    isPlaying,
    play,
    stop,
  };
}
