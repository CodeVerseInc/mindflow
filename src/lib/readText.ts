export const readText = (text: string) => {
  if ('speechSynthesis' in window) {
    const message = new SpeechSynthesisUtterance(text)

    message.lang = 'es-ES' // Set language
    message.pitch = 1 // Set tone
    message.rate = 1 // Set speed
    message.volume = 1 // Set volume

    window.speechSynthesis.speak(message)
  }
}
