import { Player, GridBooks } from '@/components/ui'
import { getSongs } from '@/lib/utils'

export const Sidebar = async () => {
  const songs = await getSongs()
  // console.log(songs)

  return (
    <aside className='[grid-area:sidebar] bg-secundary rounded-2xl p-5 scroll-smooth overflow-y-auto '>
      <h2 className='text-center text-2xl font-semibold p-5 text-green'>
        Libros recomendados
      </h2>
      <GridBooks />
    </aside>
  )
}
