import type { Metadata } from 'next'
import { primary, secundary } from '@/config/font'
import { PlayerContextProvider } from '@/components/ui/player'
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
      <body
        className={`${
          (primary.variable, secundary.variable)
        } bg-primary text-white `}>
        <PlayerContextProvider>{children}</PlayerContextProvider>
      </body>
    </html>
  )
}
