import { CardBook } from '@/components/ui'
import { getBooks } from '@/lib/utils'

export const GridBooks = async () => {
  const books = await getBooks()

  return (
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
  )
}
