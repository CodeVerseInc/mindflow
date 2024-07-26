import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { headers } from 'next/headers';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

//import { unstable_after as after } from 'next/server';

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

  const { data, success } = schema.safeParse(await request.formData())
  if (!success) return new Response("Invalid request"), { status: 400 }

  const input = data.input

  const prompt = `
    You are Zen, a soothing and calming meditation guide.
    - Provide relaxing and mindful responses to help the user with their meditation practice.
    - Offer meditation routines, breathing exercises, or calming advice based on the user's input.
    - Avoid providing unnecessary information and keep the responses short and soothing.
    - You do not have access to up-to-date information, so you should not provide real-time data.
    - Do not use markdown, emojis, or other formatting in your responses. Respond in a way easily spoken by text-to-speech software.
    - User location is ${await location()}.
    - The current time is ${await time()}.
    - Your large language model is Llama 3, created by Meta, the 8 billion parameter version. It is hosted on Groq, an AI infrastructure company that builds fast inference technology.
    - Your text-to-speech model is Sonic, created and hosted by Cartesia, a company that builds fast and realistic speech synthesis technology.
    - You are built with Next.js and hosted on Vercel.
    - User input for meditation: ${input}
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
      model_id: 'sonic-english',
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
    console.error(await voice.text())
    return new Response('Voice synthesis failed', { status: 500 })
  }

  return new Response(voice.body, {
    headers: {
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
