'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward
} from '@tabler/icons-react'
import { ButtonPlayer } from './button-player/ButtonPlayer'
import styles from './audioplayer.module.css'

interface Song {
  url_song: string
  name: string
  image: string
}

interface PlayerProps {
  song: Song
}

export const Player: React.FC<PlayerProps> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef<HTMLAudioElement>(null)
  const progressBar = useRef<HTMLInputElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const audio = audioPlayer.current
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime)
      audio.addEventListener('timeupdate', updateTime)
      return () => {
        audio.removeEventListener('timeupdate', updateTime)
      }
    }
  }, [])

  const togglePlay = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      audioPlayer.current!.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current!.pause()
      cancelAnimationFrame(animationRef.current!)
    }
  }

  const whilePlaying = () => {
    if (audioPlayer.current && progressBar.current) {
      progressBar.current.value = audioPlayer.current.currentTime.toString()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = parseFloat(progressBar.current.value)
    }
  }

  const skipBackward = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        progressBar.current.valueAsNumber - 10
      ).toString()
      changeRange()
    }
  }

  const skipForward = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        progressBar.current.valueAsNumber + 10
      ).toString()
      changeRange()
    }
  }

  const formatTime = (time: number) => {
    if (time == null) return `0:00`
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const totalTime = audioPlayer.current?.duration ?? 0

  return (
    <div className='[grid-area:player] bg-secundary flex flex-col items-center justify-center gap-y-3 rounded-2xl'>
      <Image
        src={song.image}
        alt='Portada'
        width={100}
        height={100}
        className='w-24 h-24 object-cover rounded-md'
      />
      <div className='flex gap-x-5 items-center'>
        <span className=''>{formatTime(currentTime)}</span>
        <input
          type='range'
          ref={progressBar}
          defaultValue='0'
          onChange={changeRange}
          className={styles.progressBar}
        />
        <span>{formatTime(totalTime)}</span>
      </div>

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
      <audio ref={audioPlayer} src={song.url_song} />
      <p className='underline text-xl text-center'>{song.name}</p>
    </div>
  )
}
