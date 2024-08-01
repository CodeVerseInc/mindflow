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

  const setCurrentTime = (time: number) => {
    dispatch({
      type: 'SET_CURRENT_TIME',
      payload: time
    })
  }

  const setTotalTime = (time: number) => {
    dispatch({
      type: 'SET_TOTAL_TIME',
      payload: time
    })
  }

  const setIsPlaying = (playing: boolean) => {
    dispatch({
      type: 'SET_IS_PLAYING',
      payload: playing
    })
  }

  const setCurrentSongIndex = (index: number) => {
    dispatch({
      type: 'SET_CURRENT_SONG_INDEX',
      payload: index
    })
  }

  return (
    <PlayerContext.Provider
      value={{
        state,
        dispatchers: {
          setCurrentTime,
          setTotalTime,
          setCurrentSongIndex,
          setIsPlaying
        }
      }}>
      {children}
    </PlayerContext.Provider>
  )
}
