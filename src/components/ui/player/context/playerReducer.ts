type Action = {
  type: string
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
    case '':
      return state

    default:
      return state
  }
}
