import { Song } from '@/components'
import { useRef, useEffect, RefObject, useContext } from 'react'
import { PlayerContext, PlayerContextValues } from '../context'

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
  const { state, dispatchers } = useContext(
    PlayerContext
  ) as PlayerContextValues

  const { currentSongIndex, currentTime, isPlaying, totalTime } = state
  const { setCurrentSongIndex, setCurrentTime, setIsPlaying, setTotalTime } =
    dispatchers

  const animationRef = useRef<number>()

  useEffect(() => {
    setCurrentSongIndex(initialSongIndex)
  }, [initialSongIndex])

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
      const newIndex = (currentSongIndex + 1) % songs.length
      setCurrentSongIndex(newIndex)
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
