import { Montserrat_Alternates, Nunito_Sans } from 'next/font/google'

export const primary = Montserrat_Alternates({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary'
})

export const secundary = Nunito_Sans({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-secundary'
})
