type Action = {
  type: 'SET_CURRENT_SONG_INDEX'
  payload?: any
}

export interface PlayerState {
  isPlaying: boolean
  currentTime: number
  currentSongIndex: number
  totalTime: number
}

export const playerReducer = (
  state: PlayerState,
  action: Action
): PlayerState => {
  switch (action.type) {
    case 'SET_CURRENT_SONG_INDEX':
      return {
        ...state,
        currentSongIndex: action.payload
      }

    default:
      return state
  }
}
