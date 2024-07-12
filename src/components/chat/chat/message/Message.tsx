import Image from 'next/image';

interface Props {
  role: 'user' | 'ai';
  children: React.ReactNode;
}

export const Message: React.FC<Props> = ({ children, role }) => {
  //TODO: Add user image
  const img = role === 'ai' ? '/img/thanatos.png' : '';

  return (
    <div
      className={`message-container ${
        role === 'ai' ? 'justify-end ml-auto' : 'justify-start mr-auto'
      }`}
    >
      <Image
        src={img}
        width={50}
        height={50}
        alt='Thanatos Avatar'
        className={` message-avatar ${
          role === 'ai' ? 'order-1' : 'order-none'
        }`}
      />

      <p className='message-text'>{children}</p>
    </div>
  );
};
