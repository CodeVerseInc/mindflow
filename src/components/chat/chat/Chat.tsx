import Image from 'next/image';

export const Chat = () => {
  return (
    <section className='[grid-area:chat] flex flex-col gap-5 min-h-[calc(100vh-40px)]'>
      <main className='bg-secundary rounded-2xl p-5 h-full overflow-y-scroll no-scrollbar'>
        <div className='message-container justify-end'>
          <Image
            src='/img/thanatos.png'
            width={50}
            height={50}
            alt='Thanatos Avatar'
            className='message-avatar order-1'
          />

          <p className='message-text'>
            Hola, soy tu asistente de meditación. Mi nombre es Thanatos. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Beatae laborum,
            magnam rem corrupti enim blanditiis perferendis iure incidunt
            dolorum, dolorem, natus officiis hic? Culpa corrupti temporibus
            nostrum labore quidem quis pariatur harum, dolorem, placeat expedita
            nam. Porro sunt ut veniam nesciunt harum perferendis molestiae
            recusandae laborum commodi neque, asperiores, omnis inventore dolore
            animi voluptatibus maxime velit dolor ex! Illo dolorem recusandae
            cum deleniti consequatur at consectetur vel optio eos. Nulla porro
            dolore nobis aperiam dolores ipsum explicabo, aspernatur ducimus
            officiis doloremque voluptate vitae impedit qui sequi voluptatibus
            iusto totam officia maiores repellendus sunt nisi aliquid. Veritatis
            repellat magnam laborum sed nulla sunt, quia odit et, corrupti
            praesentium obcaecati animi error exercitationem quisquam qui non
            facere accusantium omnis? Nesciunt, totam illo! Sunt libero saepe
            perferendis quasi voluptatem sequi nihil nobis facere minima
            corrupti et omnis ex amet numquam, excepturi ullam totam quam
            eveniet repudiandae similique pariatur nulla vitae quisquam
            reprehenderit? Beatae ipsam labore odio repellat voluptatum debitis
            quia adipisci porro? Quibusdam consequuntur doloribus itaque
            expedita ad eaque saepe, velit dolore reprehenderit illo inventore
            et sed, quis nesciunt, culpa dignissimos sequi iure repellendus eos
            delectus rerum asperiores fugit? In animi rem at blanditiis officiis
            nam impedit voluptatem voluptatum reiciendis ex, alias nulla?
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
