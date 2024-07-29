import { Player, GridBooks } from '@/components/ui'
import { getSongs } from '@/lib/utils'

export const Sidebar = async () => {
  const songs = await getSongs()
  const randomIndex = Math.floor(Math.random() * songs.length)

  return (
    <>
      <Player songs={songs} initialSongIndex={randomIndex} />
      <aside className='[grid-area:sidebar] bg-secundary rounded-2xl py-5 px-10 h-full mb-5'>
        <h2 className='text-center text-2xl font-semibold px-5 mb-5 text-green'>
          Libros recomendados
        </h2>
        <GridBooks />
      </aside>
    </>
  )
}
