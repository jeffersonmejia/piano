const d = document
const $keys = d.querySelectorAll('.keyboard div')
const INITIAL_COUNTER = 4
const MAX_KEY_SCALE = 7
let keyCounter = INITIAL_COUNTER
let scaleCounter = 0
let isPlaying = false
let currentKeyPressed
let currentKey
const audio = {}
let lastPlayed

function fillKeys() {
	$keys.forEach((key, index) => {
		if (key.classList.contains('white-key')) {
			if (scaleCounter === MAX_KEY_SCALE) {
				keyCounter++
				scaleCounter = 0
			}
			scaleCounter++
		}
		let $noteName = d.createElement('h5')
		let $keyName = d.createElement('small')

		$noteName.classList.add('key-label')
		key.dataset.note += keyCounter
		$noteName.textContent = key.dataset.note
		$keyName.innerHTML = `<br/>(${key.dataset.key})`
		$noteName.appendChild($keyName)
		key.appendChild($noteName)
		let note = key.dataset.note.toLowerCase()
		if (note.includes('#')) note = note.replace(/#/g, 's')
		audio[key.dataset.note] = new Audio(`sounds/octaves/${note}.mp3`)
		audio[key.dataset.note].volume = 0.4
	})
}

function playNote(pressedKey) {
	if (!pressedKey) return
	if (lastPlayed) {
		if (!lastPlayed.paused) {
			lastPlayed.pause()
		}
	}
	audio[pressedKey].currentTime = 0
	audio[pressedKey].play()
	lastPlayed = audio[pressedKey]
}
function fadeOut(audioObject, duration) {
	const interval = 10
	const reductionAmount = audioObject.volume / (duration / interval)
	let currentVolume = audioObject.volume

	const intervalId = setInterval(() => {
		currentVolume -= reductionAmount
		if (currentVolume < 0) {
			clearInterval(intervalId)
			currentVolume = 0
		}
		audioObject.volume = currentVolume
	}, interval)
}

// Utiliza la función fadeOut después de llamar a playNote()

d.addEventListener('DOMContentLoaded', (e) => fillKeys())

d.addEventListener('keydown', (e) => {
	const set = Array.from($keys)
	const filter = set.filter((el) => el.dataset.key === e.key)
	currentKey = filter?.length > 0 && filter[0]
	if (currentKey) {
		const isWhite = currentKey.classList.contains('white-key')
		if (isWhite) currentKey.classList.add('white-key-active')
		else currentKey.classList.add('black-key-active')
		currentKeyPressed = e.key
		lastPlayed?.pause()
		playNote(currentKey.dataset.note)
		fadeOut(audio[pressedKey], 1000) // 1000 representa el tiempo en milisegundos que tardará el desvanecimiento.
	}
})

d.addEventListener('keyup', (e) => {
	if (e.key !== currentKeyPressed) return
	if (currentKeyPressed) {
		const isWhite = currentKey.classList.contains('white-key')
		if (isWhite) currentKey.classList.remove('white-key-active')
		else currentKey.classList.remove('black-key-active')
	}
})
