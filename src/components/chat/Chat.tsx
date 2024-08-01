'use client'

import { readText } from '@/lib/readText'
import { IconSend2 } from '@tabler/icons-react'
import { Message as MessageType, useChat } from 'ai/react'
import { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext, PlayerContextValues } from '../ui/player/context'
import { Message } from './message/Message'

const initialMessages: MessageType[] = [
  {
    id: '12345678',
    content:
      '¡Hola! Soy Thanatos tu asistente de meditación. ¿Estás interesado en meditar hoy?',
    role: 'assistant'
  }
]

export const Chat = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)
  const {
    dispatchers: { setIsPlaying }
  } = useContext(PlayerContext) as PlayerContextValues

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    onFinish: (message) => {
      readText(message.content)
    }
  })

  useEffect(() => {
    if (!messagesContainerRef.current) return

    const { scrollHeight } = messagesContainerRef.current

    messagesContainerRef.current.scrollTop = scrollHeight
  }, [messages])

  useEffect(() => {
    if (messages.length < 2) {
      if (hasStartedPlaying) {
        setHasStartedPlaying(false) // Reinicia el estado si hay menos de 2 mensajes
      }
      return
    }

    if (!hasStartedPlaying) {
      setIsPlaying(true)
      setHasStartedPlaying(true) // Marca que ya se ha llamado
    }
  }, [messages, setIsPlaying, hasStartedPlaying])

  return (
    <section className='[grid-area:chat] flex flex-col gap-5 h-[calc(100vh-40px)] md:h-auto'>
      <main
        className='bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar flex flex-col gap-5 scroll-smooth'
        ref={messagesContainerRef}>
        <h1 className='text-center text-green text-2xl font-semibold'>
          Mind Flow
        </h1>

        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              role={message.role as 'user' | 'assistant'}>
              {message.content}
            </Message>
          )
        })}
      </main>

      <form onSubmit={handleSubmit}>
        <div className='flex gap-x-5'>
          <input
            type='text'
            placeholder='Mensaje...'
            className='w-full  bg-light rounded-2xl h-16 px-5'
            value={input}
            onChange={handleInputChange}
          />
          <button
            className='bg-secundary bottom-5 w-20 rounded-2xl flex  justify-center items-center'
            onClick={handleSubmit}>
            <IconSend2 stroke={2} />
          </button>
        </div>
      </form>
    </section>
  )
}
