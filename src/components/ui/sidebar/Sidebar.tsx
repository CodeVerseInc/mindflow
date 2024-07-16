import { Player, GridBooks } from '@/components/ui'
import { getSongs } from '@/lib/utils'

export const Sidebar = async () => {
  const songs = await getSongs()

  return (
    <>
      <Player song={songs[1]} />
      <aside className='[grid-area:sidebar] bg-secundary rounded-2xl p-5 scroll-smooth overflow-y-auto h-96 md:h-full mb-5'>
        <h2 className='text-center text-2xl font-semibold px-5 mb-5 text-green'>
          Libros recomendados
        </h2>
        <GridBooks />
      </aside>
    </>
  )
}
