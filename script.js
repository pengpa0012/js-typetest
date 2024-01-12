const content = document.querySelector("#content")

let index = 0
const text = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates iusto doloribus rem, in facere repellat deserunt. Et sequi aperiam, facere dolorum quasi numquam, soluta corporis voluptatum odit assumenda similique ducimus tempora ad tenetur mollitia nostrum illo harum? Magni odio cumque provident impedit ad qui quod, vero recusandae amet ex praesentium!"

text.split("").forEach(el => {
  content.innerHTML += `<letter>${el}</letter>`
})

const letterIndex = document.querySelectorAll("letter")


window.addEventListener("keydown", (e) => {

  if(e.key == "Backspace") {
    letterIndex[index].classList.remove("correct")
    letterIndex[index].classList.remove("wrong")
    index--
    return
  }
  const currCharacter = content.textContent.split("")[index]

  if(e.key.toLocaleLowerCase() == currCharacter.toLocaleLowerCase()) {
    console.log("CORRECT")
    letterIndex[index].classList.add("correct")
    index++
  } else {
    letterIndex[index].classList.add("wrong")
    console.log("WRONG")
    index++
  }
})

