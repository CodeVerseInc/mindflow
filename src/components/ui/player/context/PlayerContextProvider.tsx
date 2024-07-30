import { PlayerContext } from './PlayerContext'

interface Props {
  children: React.ReactNode
}

export const PlayerContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <PlayerContext.Provider value={null}>{children}</PlayerContext.Provider>
  )
}
