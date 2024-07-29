import { GridBooks, Player } from '@/components/ui'
import { getSongs } from '@/lib/utils'

export const Sidebar = async () => {
  const songs = await getSongs()
  const randomIndex = Math.floor(Math.random() * songs.length)

  return (
    <>
      <Player songs={songs} initialSongIndex={randomIndex} />
      <aside className='[grid-area:sidebar] bg-secundary rounded-2xl'>
        <h2 className='text-center text-2xl font-semibold text-green py-5'>
          Libros recomendados
        </h2>
    
        <GridBooks />
      </aside>
    </>
  )
}
