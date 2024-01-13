const content = document.querySelector("#content")

let index = 0
const text = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates iusto doloribus rem, in facere repellat deserunt. Et sequi aperiam, facere dolorum quasi numquam, soluta corporis voluptatum odit assumenda similique ducimus tempora ad tenetur mollitia nostrum illo harum? Magni odio cumque provident impedit ad qui quod, vero recusandae amet ex praesentium!"

text.split("").forEach(el => {
  content.innerHTML += `<letter>${el}</letter>`
})

const allLetter = document.querySelectorAll("letter")



window.addEventListener("keydown", (e) => {
  console.log(e.key)
  if(e.key == "Shift") return
  if(e.key == "Backspace") {
    allLetter[index].classList.remove("correct")
    allLetter[index].classList.remove("wrong")
    index--
    updateCursor()
    return
  }
  const currCharacter = content.textContent.split("")[index]

  if(e.key == currCharacter) {
    console.log("CORRECT")
    allLetter[index].classList.remove("wrong")
    allLetter[index].classList.add("correct")
    index++
  } else {
    allLetter[index].classList.add("wrong")
    console.log("WRONG")
    index++
  }
  updateCursor()
})

function updateCursor() {
  allLetter.forEach(el => {
    el.classList.remove("cursor")
    allLetter[index].classList.add("cursor")
  })
}
