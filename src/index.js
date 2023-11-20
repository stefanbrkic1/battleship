import './styles/style.css'
import './assets/audio/Recognizer.mp3'

const playBtn = document.getElementById('playBtn')
const audioSwitch = document.getElementById('audioSwitch')

playBtn.addEventListener('click', () => {
  window.location.href = 'battleship.html'
})

class AudioHandler {
  constructor() {
    this.backgroundMusic = new Audio('./assets/audio/Recognizer.mp3')
    this.isAudioPlaying = false

    // Add an event listener for the 'canplaythrough' event to ensure the audio is fully loaded before playing.
    this.backgroundMusic.addEventListener('canplaythrough', () => {
      // Optionally, you can set up additional logic here if needed.
    })
  }

  playAudio() {
    if (!this.isAudioPlaying) {
      this.backgroundMusic.loop = true
      this.backgroundMusic.play()
      this.isAudioPlaying = true
    }
  }

  stopAudio() {
    if (this.isAudioPlaying) {
      this.backgroundMusic.pause()
      this.backgroundMusic.currentTime = 0
      this.isAudioPlaying = false
    }
  }
}

const audioHandler = new AudioHandler()

const debounce = (func, delay) => {
  let timeout
  return function debouncedFunction(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delay)
  }
}

audioSwitch.addEventListener(
  'click',
  debounce(() => {
    if (audioHandler.isAudioPlaying) {
      audioHandler.stopAudio()
    } else {
      audioHandler.playAudio()
    }
  }, 300),
)
