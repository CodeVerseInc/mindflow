import Image from 'next/image'
import Link from 'next/link'
import type { Book } from '@/types'

export const CardBook = ({ title, href, image }: Book) => {
  return (
    <Link
      href={href}
      target='_blank'
      className='w-80 h-22 bg-primary rounded-lg p-5 flex justify-between items-center curosr-pointer'>
      <h3 className='font-bold'>{title}</h3>
      {/* Todo: agregar portada a los libros */}
      <Image
        src={image}
        width={40}
        height={40}
        className='w-10 h-16 object-cover'
        alt={`Portada del libro ${title}`}
      />
    </Link>
  )
}
