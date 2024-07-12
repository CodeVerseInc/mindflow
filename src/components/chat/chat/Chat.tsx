import Image from 'next/image';

export const Chat = () => {
  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)]'>
      <main className='bg-secundary rounded-2xl p-5 h-full'>
        <div className='message-container justify-end'>
          <Image
            src='/img/thanatos.png'
            width={50}
            height={50}
            alt='Thanatos Avatar'
            className='message-avatar order-1'
          />

          <p className='message-text'>
            Hola, soy tu asistente de meditación. Mi nombre es Thanatos.
          </p>
        </div>
      </main>

      <input
        type='text'
        placeholder='Mensaje...'
        className='w-full bg-light rounded-2xl h-16 px-5'
      />
    </section>
  );
};
