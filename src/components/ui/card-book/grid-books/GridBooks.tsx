import { CardBook } from '../card-book/CardBook'

export const GridBooks = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <CardBook />
      <CardBook />
      <CardBook />
      <CardBook />
    </div>
  )
}
