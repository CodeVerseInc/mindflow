import { useEffect, useState } from "react"

export const useVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const synth = window.speechSynthesis

    const loadVoices = () => {
      const availableVoices = synth.getVoices()
      setVoices(availableVoices)
      console.log("Voces disponibles: ", availableVoices)
    }

    // Cargar voces y escuchar cambios en las voces
    loadVoices()
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices
    }
  }, [])

  return voices
}