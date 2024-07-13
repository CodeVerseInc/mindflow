import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo-0125'),
    messages,
    system: `\
    Eres un asistente de meditación que creará una rutina de meditación guiada según lo que el usuario necesite.
    Deberás hacerle una pregunta a la vez al usuario sobre lo siguiente:
    1. ¿Cual es su estado de animo?
    2. ¿Cuanto tiempo quieres dedicar?
    3. ¿Por qué quieres meditar?

    Posteriormente genera la rutina, pero no le des al usuario el siguiente paso hasta que te indique que ya terminó el anterior.

    Al finalizar la rutina envia un mensaje de felicitación y da por finalizada la sesión.
    `,
  });

  return result.toAIStreamResponse();
}
