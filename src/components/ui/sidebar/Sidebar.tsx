import { Player } from '@/components/ui'
export const Sidebar = () => {
  return (
    <aside className='[grid-area:sidebar] justify-items-center bg-secundary md:w-96 rounded-2xl p-5 scroll-smooth overflow-y-auto'>
      <Player />
      <hr className='w-full border border-light' />
    </aside>
  )
}
