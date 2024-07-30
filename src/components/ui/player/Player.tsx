'use client'

import Image from 'next/image'
import { useRef } from 'react'

import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward
} from '@tabler/icons-react'

import { ButtonPlayer } from './button-player/ButtonPlayer'
import { formatTime } from '@/lib/formatTime'
import { usePlayer } from '@/lib/usePlayer'
import styles from './audioplayer.module.css'

export interface Song {
  url_song: string
  name: string
  image: string
}

interface PlayerProps {
  songs: Song[]
  initialSongIndex: number
}

export const Player: React.FC<PlayerProps> = ({ songs, initialSongIndex }) => {
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const progressBar = useRef<HTMLInputElement>(null)

  const { handlers, state } = usePlayer({
    songs,
    initialSongIndex,
    audioPlayerRef: audioPlayer,
    progressBarRef: progressBar
  })

  const { totalTime, isPlaying, currentSong, currentTime } = state
  const { skipBackward, skipForward, togglePlay, changeRange } = handlers

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
