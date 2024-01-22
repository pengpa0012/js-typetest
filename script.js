const content = document.querySelector("#content")
const pointsContent = document.querySelectorAll(".points")
const timeContent = document.querySelector("#time")
const gameMenu = document.querySelector("#game-menu")
const endMenu = document.querySelector("#end-menu")
const startMenu = document.querySelector("#start-menu")
const startBtn = document.querySelector(".start-btn")
const restartBtn = document.querySelector(".restart-btn")
const wordLengthSelect = document.querySelector(".word-length")
const timeLimitSelect = document.querySelector(".time-limit")

let index = 0
let text = "This is a sample text"
let loading = false
let points = 0
let gameStart = false
let endScreen = false
let wordLength = 5, timeLimit = 1 * 60

text.split("").forEach(el => {
  content.innerHTML += `<letter>${el}</letter>`
})

let allLetter = document.querySelectorAll("letter")
updateCursor()

startBtn.addEventListener("click", () => {
  gameMenu.classList.remove("hidden")
  startMenu.classList.add("hidden")
  gameStart = true
  // start setTimeout here 
  startTime(timeLimit)
})

restartBtn.addEventListener("click", () => {
  gameMenu.classList.add("hidden")
  endMenu.classList.add("hidden")
  startMenu.classList.remove("hidden")
  points = 0
  pointsContent.forEach(el => {
    el.textContent = points
  })
  addNewWord()
})

wordLengthSelect.addEventListener("input", (e) => {
  wordLength = e.target.value
})

timeLimitSelect.addEventListener("input", (e) => {
  timeLimit = e.target.value * 60
})

window.addEventListener("keydown", async (e) => {
  if(loading || !gameStart || e.key == "Shift") return

  if(e.key == "Backspace") {
    allLetter[index].classList.remove("correct")
    allLetter[index].classList.remove("wrong")
    if(index == 0) return
    index--
    updateCursor()
    return
  }
  const currCharacter = content.textContent.split("")[index]

 

  if(e.key == currCharacter) {
    allLetter[index].classList.remove("wrong")
    allLetter[index].classList.add("correct")
  } else {
    allLetter[index].classList.add("wrong")
  }

  if (text.split("").length - 1 == index) {
    // increment points if correct
    const allCorrect = Array.from(allLetter).every(el => el.classList.contains("correct"))

    if(allCorrect) {
      points++
      pointsContent.forEach(el => {
        el.textContent = points
      })
    }
    addNewWord()
    return
  }
  
  index++
  updateCursor()
})

function updateCursor() {
  allLetter.forEach(el => {
    el.classList.remove("cursor")
    allLetter[index].classList.remove("correct")
    allLetter[index].classList.remove("wrong")
    allLetter[index].classList.add("cursor")
  })
}

async function addNewWord() {
  // fetch new word
  index = 0
  text = await fetchNewWord()
  content.innerHTML = ""

  text.split("").forEach(el => {
    content.innerHTML += `<letter>${el}</letter>`
  })
  allLetter = document.querySelectorAll("letter")
  updateCursor()
}

function startTime(duration) {
  let time = duration
  let trigger = setInterval(function () {
    if(time <= -1) {
      // show score menu here then add route to start menu
      gameStart = false
      gameMenu.classList.add("hidden")
      endMenu.classList.remove("hidden")
      clearInterval(trigger)
      return
    }
    console.log(time)
    timeContent.textContent = time
    time--
  }, 1000)
}

async function fetchNewWord() {
  loading = true
  return fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
  .then(res => res.json())
  .then(data => {
    loading = false
    return data[0]
  })
  .catch(console.error)
}
