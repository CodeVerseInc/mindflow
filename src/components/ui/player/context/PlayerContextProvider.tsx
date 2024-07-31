'use client'

import { useReducer } from 'react'
import { PlayerContext } from './PlayerContext'
import { playerReducer, PlayerState } from './playerReducer'

interface Props {
  children: React.ReactNode
}

const initialState: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  currentSongIndex: 0,
  totalTime: 0
}

export const PlayerContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState)

  const endedSong = (songsLength: number) => {
    dispatch({
      type: 'SET_CURRENT_SONG_INDEX',
      payload: (state.currentSongIndex + 1) % songsLength
    })

    //TODO: Set is playing to false
  }

  return (
    <PlayerContext.Provider value={{ ...state, endedSong }}>
      {children}
    </PlayerContext.Provider>
  )
}
