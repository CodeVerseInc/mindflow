import { Song } from '@/components'
import { useState, useRef, useEffect, RefObject } from 'react'

interface Params {
  songs: Song[]
  initialSongIndex: number
  audioPlayerRef: RefObject<HTMLAudioElement>
  progressBarRef: RefObject<HTMLInputElement>
}

export const usePlayer = ({
  audioPlayerRef,
  initialSongIndex,
  progressBarRef,
  songs
}: Params) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  const animationRef = useRef<number>()

  useEffect(() => {
    const audio = audioPlayerRef.current

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
    const audio = audioPlayerRef.current
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
    const audio = audioPlayerRef.current

    if (audio && progressBarRef.current) {
      progressBarRef.current.value = audio.currentTime.toString()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const changeRange = () => {
    const audio = audioPlayerRef.current

    if (audio && progressBarRef.current) {
      audio.currentTime = parseFloat(progressBarRef.current.value)
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

  const currentSong = songs[currentSongIndex]

  return {
    state: {
      isPlaying,
      totalTime,
      currentSong,
      currentTime
    },
    handlers: {
      changeRange,
      togglePlay,
      skipBackward,
      skipForward
    }
  }
}
