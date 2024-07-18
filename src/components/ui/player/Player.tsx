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
  songs: Song[]
  initialSongIndex: number
}

export const Player: React.FC<PlayerProps> = ({ songs, initialSongIndex }) => {
  const [currentSongIndex, setCurrentSongIndex] =
    useState<number>(initialSongIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  const audioPlayer = useRef<HTMLAudioElement>(null)
  const progressBar = useRef<HTMLInputElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const audio = audioPlayer.current

    const updateTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime)
      }
    }

    const setDuration = () => {
      if (audio) {
        setTotalTime(audio.duration)
      }
    }

    const endedSong = () => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)
      setIsPlaying(false)
    }

    if (audio) {
      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', setDuration)
      audio.addEventListener('ended', endedSong)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', setDuration)
        audio.removeEventListener('ended', endedSong)
      }
    }
  }, [currentSongIndex, songs])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    const audio = audioPlayer.current
    if (audio) setTotalTime(audio.duration)

    if (!isPlaying && audio) {
      audio.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audio?.pause()
      cancelAnimationFrame(animationRef.current!)
    }
  }

  const whilePlaying = () => {
    const audio = audioPlayer.current

    if (audio && progressBar.current) {
      progressBar.current.value = audio.currentTime.toString()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const changeRange = () => {
    const audio = audioPlayer.current

    if (audio && progressBar.current) {
      audio.currentTime = parseFloat(progressBar.current.value)
    }
  }

  const skipBackward = () => {
    const newIndex =
      currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1
    setCurrentSongIndex(newIndex)
    setIsPlaying(false)
  }

  const skipForward = () => {
    const newIndex = (currentSongIndex + 1) % songs.length
    setCurrentSongIndex(newIndex)
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    if (time == null) return `0:00`
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentSong = songs[currentSongIndex]

  return (
    <div className='[grid-area:player] bg-secundary flex flex-col items-center justify-center gap-y-3 rounded-2xl p-5'>
      <Image
        src={currentSong.image}
        alt='Portada'
        width={100}
        height={100}
        className='w-24 h-24 object-cover rounded-md'
      />
      <div className='flex gap-x-5 items-center'>
        <span>{formatTime(currentTime)}</span>
        <input
          type='range'
          ref={progressBar}
          defaultValue='0'
          onChange={changeRange}
          className={styles.progressBar}
          max={totalTime}
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
      <audio ref={audioPlayer} src={currentSong.url_song} />
      <p className='underline text-xl text-center'>{currentSong.name}</p>
    </div>
  )
}
