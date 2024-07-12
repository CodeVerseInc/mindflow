import { Message } from './message/Message';

export const Chat = () => {
  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)]'>
      <main className='bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar'>
        <Message role='ai'>
          Hola, soy tu asistente de meditación. Mi nombre es Thanatos.
        </Message>

        <Message role='user'>Hola</Message>
      </main>

      <input
        type='text'
        placeholder='Mensaje...'
        className='w-full bg-light rounded-2xl h-16 px-5'
      />
    </section>
  );
};
