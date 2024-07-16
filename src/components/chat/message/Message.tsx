import Image from 'next/image'

interface Props {
  role: 'user' | 'assistant'
  children: React.ReactNode
}

export const Message: React.FC<Props> = ({ children, role }) => {
  const img = role === 'assistant' ? '/img/thanatos.png' : '/img/avatar.png'

  return (
    <div
      className={`
        message-container
        ${
          role === 'assistant' ? 'justify-start mr-auto' : 'justify-end ml-auto'
        }
      `}>
      <Image
        src={img}
        width={20}
        height={20}
        alt='Avatar'
        className={` message-avatar w-10 h-10 ${
          role === 'assistant' ? 'order-none' : 'order-1'
        }`}
      />

      <p className='message-text'>{children}</p>
    </div>
  )
}
