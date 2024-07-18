'use client'

import { Message as MessageType, useChat } from 'ai/react'
import { Message } from './message/Message'
import { useEffect, useRef } from 'react'
import { IconSend2 } from '@tabler/icons-react'
import { readText } from '@/lib/readText'

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

  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)] md:min-h-0'>
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
