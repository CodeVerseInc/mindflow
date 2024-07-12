export const Chat = () => {
  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)]'>
      <main className='bg-secundary rounded-2xl p-5 h-full'>
        <h1>Hola mundo</h1>
      </main>

      <input
        type='text'
        placeholder='Mensaje...'
        className='w-full bg-light rounded-2xl h-16 px-5'
      />
    </section>
  );
};
