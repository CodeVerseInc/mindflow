import { Player } from '@/components/ui'
import { getBooks, getSongs } from '@/lib/utils'
import { CardBook } from '../card-book/card-book/CardBook'

export const Sidebar = async () => {
  const songs = await getSongs()
  const randomIndex = Math.floor(Math.random() * songs.length)
  const books = await getBooks()

  return (
    <>
      <Player songs={songs} initialSongIndex={randomIndex} />
      <aside className='[grid-area:sidebar] bg-secundary rounded-2xl'>
        <h2 className='text-center text-2xl font-semibold text-green py-5'>
          Libros recomendados
        </h2>
        <div className='flex flex-col gap-y-5 h-[600px] overflow-y-scroll px-10 pb-5 md:h-3/4'>
          {books.map((book) => (
            <CardBook
              key={book.id}
              title={book.name_book}
              href={book.url_book}
              image={book.image}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
