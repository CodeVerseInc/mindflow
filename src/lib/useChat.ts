import clsx from 'clsx'
import { useEffect, useRef, useState, useActionState, RefObject } from 'react'
import { toast } from 'sonner'
import { usePlayer } from '@/lib/usePlayer'

type Message = {
  role: 'user' | 'assistant'
  content: string
  latency?: number
}

export const useChat = (inputRef: RefObject<HTMLInputElement>) => {
  const [input, setInput] = useState('')
  const player = usePlayer()

  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault() // Prevents form submission on Enter key press
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setInput('')
      }
    }

    window.addEventListener('keydown', keyDown)
    return () => window.removeEventListener('keydown', keyDown)
  }, [])

  const action = async (
    prevMessages: Message[],
    data: string | Blob
  ): Promise<Message[]> => {
    const formData = new FormData()

    if (typeof data === 'string') {
      formData.append('input', data)
    }

    for (const message of prevMessages) {
      formData.append('message', JSON.stringify(message))
    }

    const submittedAt = Date.now()

    const response = await fetch('/api/chat2/', {
      method: 'POST',
      body: formData
    })

    const transcript = decodeURIComponent(
      response.headers.get('X-Transcript') || ''
    )
    const text = decodeURIComponent(response.headers.get('X-Response') || '')

    if (!response.ok || !transcript || !text || !response.body) {
      if (response.status === 429) {
        toast.error('Too many requests. Please try again later.')
      } else {
        toast.error((await response.text()) || 'An error occurred.')
      }

      return prevMessages
    }

    const latency = Date.now() - submittedAt
    console.log(response.body)

    player.play(response.body, () => {})

    setInput(transcript)

    return [
      ...prevMessages,
      {
        role: 'user',
        content: transcript
      },
      {
        role: 'assistant',
        content: text,
        latency
      }
    ]
  }

  const [messages, submit, isPending] = useActionState<
    Array<Message>,
    string | Blob
  >(action, [])

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    submit(input)
  }

  return {
    handleFormSubmit,
    messages,
    input,
    setInput,
    isPending
  }
}
