import { Player, GridBooks } from '@/components/ui';
import { getSongs } from '@/lib/utils';

export const Sidebar = async () => {
  const songs = await getSongs();
  const randomIndex = Math.floor(Math.random() * songs.length);

  return (
    <>
      <Player songs={songs} initialSongIndex={randomIndex} />
      <aside className='[grid-area:sidebar] bg-secundary rounded-2xl p-5 scroll-smooth overflow-y-auto h-96 md:h-full mb-5'>
        <h2 className='text-center text-2xl font-semibold px-5 mb-5 text-green'>
          Libros recomendados
        </h2>
        <div className='px-5 scroll-smooth overflow-y-auto h-[600px]'>
          <GridBooks />
        </div>
      </aside>
    </>
  );
};
