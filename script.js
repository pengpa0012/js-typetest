const content = document.querySelector("#content")
let index = 0


window.addEventListener("keydown", (e) => {
  const currCharacter = content.textContent.split("")[index]
  if(e.key.toLocaleLowerCase() == currCharacter.toLocaleLowerCase()) {
    console.log("CORRECT")
    index++
  } else {
    console.log("WRONG")
  }
})
