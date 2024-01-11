const content = document.querySelector("#content")

window.addEventListener("keydown", (e) => {
  content.textContent += e.key
})