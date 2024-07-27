import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { headers } from 'next/headers';
import { z } from 'zod';
import { zfd } from 'zod-form-data';


const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})


const schema = zfd.formData({

  input: zfd.text(),
  message: zfd.repeatableOfType(
    zfd.json(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
      })
    )
  )

})

export async function POST(request: Request) {
  console.time("transcribe " + request.headers.get("x-vercel-id") || "local")

  const { data, success } = schema.safeParse(await request.formData())
  if (!success) return new Response("Invalid request"), { status: 400 }

  const input = data.input

  const prompt = `
    Eres Thanatos, un asistente de meditacion tranquilo y amigable.
    - Ayuda al usuario con preguntas para identificar su estado de animo y en base a eso crear una meditacion personalizada.
    - Ofrece rutinas de meditacion en base al estado de animo del usuario, ejercicios de respiracion o consejos calmantes basados en el estado de animo del usuario.
    - Evita proporcionar información innecesaria y mantiene las respuestas cortas y relajantes.
    - No tienes acceso a información actualizada, por lo que no debes proporcionar datos en tiempo real.
    - No uses markdown, emojis u otro formato en tus respuestas. Responde de una manera que sea fácilmente leída por software de síntesis de voz.
    - La ubicación del usuario es ${await location()}.
    - La hora actual es ${await time()}.
    - Tu modelo de lenguaje grande es Llama 3, creado por Meta, la versión de 8 mil millones de parámetros. Está alojado en Groq, una empresa de infraestructura de IA que construye tecnología de inferencia rápida.
    - Tu modelo de síntesis de voz es Sonic, creado y alojado por Cartesia, una empresa que construye tecnología de síntesis de voz rápida y realista.
    - Estás construido con Next.js y alojado en Vercel.
    - Entrada del usuario para meditación: ${input}
`
  const completion = await generateText({
    model: groq('llama3-8b-8192'),
    prompt
  })


  const voice = await fetch('https://api.cartesia.ai/tss/bytes', {
    method: 'POST',
    headers: {
      'Cartesia-Version': '2024-06-30',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CARTESIA_API_KEY!,
    },
    body: JSON.stringify({
      model_id: 'sonic-multilingual',
      trasncript: completion.text,
      voice: {
        mode: 'id',
        id: '79a125e8-cd45-4c13-8a67-188112f4dd22',
      },
      output_format: {
        container: 'raw',
        encoding: 'pcm_f32le',
        sample_rate: 24000,
      },
    }),
  })


  if (voice.ok) {
    const errorMessage = await voice.text();
    console.error("Voice synthesis failed:", errorMessage);


    console.log(voice.body)
    return new Response('Voice synthesis failed', { status: 500 })

  }

  return new Response(voice.body, {
    headers: {
      "Content-Type": "audio/wav",
      "X-Transcript": encodeURIComponent(input),
      "X-Response": encodeURIComponent(completion.text)
    }
  })
}



async function location() {
  const headersList = headers()

  const country = headersList.get("x-vercel-ip-country")
  const region = headersList.get("x-vercel-ip-country-region")
  const city = headersList.get("x-vercel-ip-city")

  if (!country || !region || !city) return "unknown"

  return `${city}, ${region}, ${country}`

}


async function time() {
  return new Date().toLocaleString('en-US', {
    timeZone: headers().get('x-vercel-ip-timezone') || undefined,
  });
}
