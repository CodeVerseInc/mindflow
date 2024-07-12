import type { Metadata } from 'next'
import { primary } from '@/config/font'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: '/img/mind.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${primary.variable} bg-primary text-white `}>
        {children}
      </body>
    </html>
  )
}
