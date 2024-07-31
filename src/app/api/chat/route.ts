import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { headers } from 'next/headers'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

async function location() {
  const headersList = headers()

  const country = headersList.get('x-vercel-ip-country')
  const region = headersList.get('x-vercel-ip-country-region')
  const city = headersList.get('x-vercel-ip-city')

  if (!country || !region || !city) return 'unknown'

  return `${city}, ${region}, ${country}`
}

async function time() {
  return new Date().toLocaleString('en-US', {
    timeZone: headers().get('x-vercel-ip-timezone') || undefined
  })
}

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  const { messages } = await req.json()

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
  `

  const result = await streamText({
    model: groq('llama3-8b-8192'),
    system: prompt,
    messages,
    maxTokens: 1000
  })

  return result.toAIStreamResponse()
}
