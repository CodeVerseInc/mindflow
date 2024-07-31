'use client'

import { createContext, Dispatch, ReducerAction } from 'react'
import { PlayerState } from './playerReducer'

export interface PlayerContextValues {
  state: PlayerState
  dispatchers: {
    setCurrentTime: (time: number) => void
    setTotalTime: (time: number) => void
    setIsPlaying: (playing: boolean) => void
    setCurrentSongIndex: (index: number) => void
  }
}

export const PlayerContext = createContext<null | PlayerContextValues>(null)
