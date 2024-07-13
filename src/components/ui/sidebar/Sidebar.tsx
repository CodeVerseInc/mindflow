//import { Player } from '@/components/ui';
import Player from '../player/Player'

export const Sidebar = () => {
  return (
    <aside className='[grid-area:sidebar] justify-items-center bg-secundary md:w-96 rounded-2xl p-5 scroll-smooth overflow-y-auto min-h-[90vh] md:min-h-0'>
      <Player />
      <hr className='w-full border border-light' />
    </aside>
  );
};
