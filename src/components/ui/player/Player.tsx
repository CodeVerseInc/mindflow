"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward
} from '@tabler/icons-react';
import { ButtonPlayer } from './button-player/ButtonPlayer';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener('timeupdate', updateTime);
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        console.log('pause');
        audioRef.current.pause();
      } else {
        console.log('play');
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-10 m-14'>
      <span className='font-secondary text-4xl font-black flex flex-col items-center justify-center'>
        {Math.floor(currentTime)}
      </span>

      <div className='flex gap-x-5'>
        <ButtonPlayer onClick={skipBackward}>
          <IconPlayerSkipBack stroke={2} />
        </ButtonPlayer>

        <ButtonPlayer onClick={togglePlay}>
          {isPlaying ? (
            <IconPlayerPause stroke={2} />
          ) : (
            <IconPlayerPlay stroke={2} />
          )}
        </ButtonPlayer>

        <ButtonPlayer onClick={skipForward}>
          <IconPlayerSkipForward stroke={2} />
        </ButtonPlayer>
      </div>
      <audio ref={audioRef} src="/music/temporary_music.mp3" />

      <p className='underline text-xl text-center'>La people</p>
    </div>
  );
};

export default Player;
