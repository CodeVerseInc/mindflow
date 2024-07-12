import {
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward
} from '@tabler/icons-react'
import { ButtonPlayer } from './button-player/ButtonPlayer'

export const Player = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10  m-14'>
      <span className='font-secundary text-4xl font-black flex flex-col items-center justify-center'>
        2:00
      </span>

      {/* Buttons player */}
      <div className='flex gap-x-5'>
        <ButtonPlayer>
          <IconPlayerSkipBack stroke={2} />
        </ButtonPlayer>
        <ButtonPlayer>
          <IconPlayerPlay stroke={2} />
        </ButtonPlayer>
        <ButtonPlayer>
          <IconPlayerSkipForward stroke={2} />
        </ButtonPlayer>
      </div>

      <p className='underline text-xl text-center'>La people</p>
    </div>
  )
}
