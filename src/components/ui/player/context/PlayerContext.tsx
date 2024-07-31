'use client'

import { createContext } from 'react'
import { PlayerState } from './playerReducer'

export interface PlayerContextValues extends PlayerState {
  endedSong: (songsLength: number) => void
}

export const PlayerContext = createContext<null | PlayerContextValues>(null)
