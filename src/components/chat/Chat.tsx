'use client'

import { useRef } from 'react'

import { useChat } from '@/lib/useChat'

export const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleFormSubmit, messages, input, setInput, isPending } =
    useChat(inputRef)

  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)] md:min-h-0'>
      <main className='bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar flex flex-col gap-5 scroll-smooth'>
        <h1 className='text-center text-green text-2xl font-semibold'>
          Mind Flow
        </h1>

        {messages.length > 0 && (
          <p>
            {messages.at(-1)?.content}
            <span className='text-xs font-mono text-neutral-300 dark:text-neutral-700'>
              {' '}
              ({messages.at(-1)?.latency}ms)
            </span>
          </p>
        )}
      </main>

      <form onSubmit={handleFormSubmit}>
        <div className='flex gap-x-5'>
          <input
            type='text'
            placeholder='Mensaje...'
            className='w-full bg-light rounded-2xl h-16 px-5'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button
            type='submit'
            className='bg-secundary bottom-5 w-20 rounded-2xl flex justify-center items-center'
            disabled={isPending}>
            Enviar
          </button>
        </div>
      </form>
    </section>
  )
}
