export const readText = (text: string, voices: any[]) => {
  const utter = new SpeechSynthesisUtterance()
  utter.rate = 1
  utter.pitch = 0.5
  utter.lang = 'es-ES'
  utter.text = text


  const selectedVoice = voices.find(voice => voice.lang === 'es-ES' || voice.lang.startsWith('es-'))
  console.log(selectedVoice)
  if (selectedVoice) {
    utter.voice = selectedVoice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
    console.log("Utterance configurada: ", utter)
  } else {
    console.error("No se encontró una voz adecuada para 'es-ES'.")
  }
}
