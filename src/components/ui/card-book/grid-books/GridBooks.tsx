import { CardBook } from '../card-book/CardBook'
import { getBooks } from '@/lib/utils'

export const GridBooks = async () => {
  const books = await getBooks()

  return (
    <div className='flex flex-col gap-y-5'>
      {books.map((book) => {
        return (
          <CardBook
            key={book.id}
            title={book.name_book}
            href={book.url_book}
            image={book.image}
          />
        )
      })}
    </div>
  )
}
