import { Message } from './message/Message';

export const Chat = () => {
  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)]'>
      <main className='bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar flex flex-col gap-10'>
        <Message role='ai'>
          Hola, soy tu asistente de meditación. Mi nombre es Thanatos.
        </Message>

        <Message role='user'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
          totam facilis harum tenetur minima, asperiores nam minus quo
          architecto quis cupiditate atque ducimus aspernatur illo deleniti
          dolore! Iusto quisquam mollitia porro aliquam quibusdam omnis
          reprehenderit minus modi quasi nobis esse, nemo dignissimos animi
          dolorum odio placeat quis pariatur, est non! Adipisci aut dolorem
          perferendis esse blanditiis, enim voluptate pariatur sit ratione ab
          eos eius impedit quos omnis asperiores alias quasi, veritatis sed
          nemo, expedita praesentium in ducimus deserunt quis! Iusto ipsam, ex
          totam voluptatibus, optio sequi, deserunt soluta tempore ipsa tempora
          eaque unde nemo obcaecati temporibus praesentium vel. Vitae, ipsam!
        </Message>
      </main>

      <input
        type='text'
        placeholder='Mensaje...'
        className='w-full bg-light rounded-2xl h-16 px-5'
      />
    </section>
  );
};
