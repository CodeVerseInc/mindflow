type ActionType =
  | 'SET_CURRENT_SONG_INDEX'
  | 'SET_IS_PLAYING'
  | 'SET_CURRENT_TIME'
  | 'SET_TOTAL_TIME'

type Action = {
  type: ActionType
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

    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload
      }

    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload
      }

    case 'SET_TOTAL_TIME':
      return {
        ...state,
        totalTime: action.payload
      }

    default:
      return state
  }
}
