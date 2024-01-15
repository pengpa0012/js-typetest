const content = document.querySelector("#content")

let index = 0
let text = "This is a sample text"
let loading = false

text.split("").forEach(el => {
  content.innerHTML += `<letter>${el}</letter>`
})

let allLetter = document.querySelectorAll("letter")
updateCursor()


window.addEventListener("keydown", async (e) => {
  if(loading) return
  if(e.key == "Shift") return
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

async function fetchNewWord() {
  loading = true
  return fetch("https://random-word-api.herokuapp.com/word?length=15")
  .then(res => res.json())
  .then(data => {
    loading = false
    return data[0]
  })
  .catch(console.error)
}

// Add checker for correct typed word