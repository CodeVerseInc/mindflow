import { useTTS } from '@cartesia/cartesia-js/react'

export const useCartesia = () => {
  const tts = useTTS({
    apiKey: process.env.NEXT_PUBLIC_CARTERSIA_API_KEY || '',
    sampleRate: 44100,
  })

  const textToSpeech = async (text: string) => {
    // Begin buffering the audio.
    await tts.buffer({
      model_id: 'sonic-english', //TODO: Change lang to spanish
      voice: {
        mode: 'id',
        id: 'a0e99841-438c-4a64-b679-ae501e7d6091',
      },
      transcript: text,
    })

    // Immediately play the audio. (You can also buffer in advance and play later.)
    await tts.play()
  }

  return {
    textToSpeech
  }
}
