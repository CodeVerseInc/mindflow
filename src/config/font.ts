import { Montserrat_Alternates, Space_Grotesk } from 'next/font/google'

export const primary = Montserrat_Alternates({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary'
})

export const secundary = Space_Grotesk({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-secundary'
})
