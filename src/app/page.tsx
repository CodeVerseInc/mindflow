import { Sidebar, Chat, Player } from '@/components'
import './globals.css'

export const metadata = {
  title: 'MindFlow & IA Send',
  description:
    'Aplicacion integrada con inteligencia articifial dedicada a mejorar la salud mental de la personas mediante la meditacion y concentracion plena ademas del valor agregar de inteligencia artificial'
}

export default function HomePage() {
  return (
    <main className={`wrapper w-full p-5 h-screen`}>
      <Player />
      <Sidebar />
      <Chat />
    </main>
  )
}
