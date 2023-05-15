const d = document
const $keys = d.querySelectorAll('.keyboard div')
const INITIAL_COUNTER = 4
const MAX_KEY_SCALE = 7
let keyCounter = INITIAL_COUNTER
let scaleCounter = 0
let isPlaying = false
let currentKeyPressed
let currentKeys = {} // Objeto para almacenar las teclas actualmente presionadas
const audio = {}
let lastPlayed
const config = {
	showKeyLabel: false,
}

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
		if (config.showKeyLabel) {
			$noteName.textContent = key.dataset.note
			$keyName.innerHTML = `<br/>(${key.dataset.key})`
			$noteName.appendChild($keyName)
			key.appendChild($noteName)
		}
		let note = key.dataset.note.toLowerCase()
		if (note.includes('#')) note = note.replace(/#/g, 's')
		audio[key.dataset.note] = new Audio(`sounds/octaves/${note}.mp3`)
		audio[key.dataset.note].volume = 0.4
	})
}

function playNote() {
	// Reproducir todas las notas de las teclas presionadas
	Object.keys(currentKeys).forEach((key) => {
		audio[currentKeys[key]].currentTime = 0
		audio[currentKeys[key]].play()
	})
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

d.addEventListener('DOMContentLoaded', (e) => fillKeys())

d.addEventListener('keydown', (e) => {
	const set = Array.from($keys)
	const filter = set.filter((el) => el.dataset.key === e.key)
	currentKeys = filter?.length > 0 && filter[0]
	if (currentKeys) {
		const isWhite = currentKeys.classList.contains('white-key')
		if (isWhite) currentKeys.classList.add('white-key-active')
		else currentKeys.classList.add('black-key-active')
		currentKeys[e.key] = currentKeys.dataset.note // Agregar la tecla actual al objeto de teclas presionadas
		lastPlayed?.pause()
		playNote()
		fadeOut(audio[currentKey.dataset.note], 1000) // 1000 representa el tiempo en milisegundos que tardará el desvanecimiento.
	}
})

d.addEventListener('keyup', (e) => {
	const set = Array.from($keys)
	const filter = set.filter((el) => el.dataset.key === e.key)
	currentKeys = filter?.length > 0 && filter[0]
	if (currentKeys) {
		const isWhite = currentKeys.classList.contains('white-key')
		if (isWhite) currentKeys.classList.remove('white-key-active')
		else currentKeys.classList.remove('black-key-active')
		currentKeyPressed = currentKeyPressed.filter(
			(note) => note !== currentKeys.dataset.note
		)
	}
})
