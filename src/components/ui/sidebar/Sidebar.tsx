import { Player, GridBooks } from '@/components/ui'
import { getSongs } from '@/lib/utils'

export const Sidebar = async () => {
  const songs = await getSongs()
  const randomIndex = Math.floor(Math.random() * songs.length)

  return (
    <>
      <Player songs={songs} initialSongIndex={randomIndex} />
      <aside className='[grid-area:sidebar] bg-secundary rounded-xl h-full'>
        <h2 className='text-center text-2xl font-semibold p-5 text-green'>
          Libros recomendados
        </h2>
        <div className='px-5 scroll-smooth overflow-y-auto h-[600px]'>
          <GridBooks />
        </div>
      </aside>
    </>
  )
}
