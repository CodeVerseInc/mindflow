'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward
} from '@tabler/icons-react'
import { ButtonPlayer } from './button-player/ButtonPlayer'
import styles from './audioplayer.module.css'

export const Player = () => {
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
    if (audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.pause()
      } else {
        audioPlayer.current.play()
      }
      setIsPlaying(!isPlaying)
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
    <div className='flex flex-col items-center justify-center gap-y-5 m-14'>
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
      <audio ref={audioPlayer} src='/music/temporary_music.mp3' />
      <p className='underline text-xl text-center'>La people</p>
    </div>
  )
}
