import { Sidebar, Chat } from '@/components'
import './globals.css'

export default function HomePage() {
  return (
    <main className={`wrapper md:h-screen w-full`}>
      <Sidebar />
      <Chat />
    </main>
  )
}
