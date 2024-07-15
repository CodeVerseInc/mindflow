'use client'

import { Message as MessageType, useChat } from 'ai/react'
import { Message } from './message/Message'
import { useEffect, useRef } from 'react'

const initialMessages: MessageType[] = [
  {
    id: '12345678',
    content:
      '¡Hola! Soy un asistente de meditación. ¿Estás interesado en realizar una sesión de meditación guiada hoy?',
    role: 'assistant'
  }
]

export const Chat = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages
  })

  useEffect(() => {
    if (!messagesContainerRef.current) return

    const { scrollHeight } = messagesContainerRef.current

    messagesContainerRef.current.scrollTop = scrollHeight
  }, [messages])

  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)]'>
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
        <input
          type='text'
          placeholder='Mensaje...'
          className='w-full bg-light rounded-2xl h-16 px-5'
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </section>
  )
}
