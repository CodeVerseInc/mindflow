import Image from 'next/image'

interface Props {
  role: 'user' | 'assistant'
  children: React.ReactNode
}

export const Message: React.FC<Props> = ({ children, role }) => {
  const img = role === 'assistant' ? '/img/thanatos.png' : '/img/avatar.png';

  return (
    <div
      className={`
        message-container
        ${
          role === 'assistant' ? 'justify-start mr-auto' : 'justify-end ml-auto'
        }
      `}
    >
      <Image
        src={img}
        width={50}
        height={50}
        alt='Avatar'
        className={` message-avatar ${
          role === 'assistant' ? 'order-none' : 'order-1'
        }`}
      />

      <p className='message-text'>{children}</p>
    </div>
  )
}
