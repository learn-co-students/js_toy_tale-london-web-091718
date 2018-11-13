// Temporary Data
const state = {
  allToys: [],
  addToy: false
}

// Page Elements & Initial State
const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

// API calls
getToys = () =>
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => state.allToys = toys)
  .then(() => showToys())

addToy = (toy) =>
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }).then(() => getToys())

addLike = (toyId, body) =>
  fetch(`http://localhost:3000/toys/${toyId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"},
    body: JSON.stringify(body)
  }).then(() => getToys())

// Visualizers
showToys = () => {
  toyCollection.innerHTML = ""
  state.allToys.forEach(toy => {
    toyCollection.appendChild(createToyCard(toy))
  })
}

createToyCard = (toy) => {
  let el = document.createElement("div")
  el.className = "card"
  el.id = toy.id
  el.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like</buttton>
  `
  return el
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  getToys()
})

addBtn.addEventListener('click', () => {
  state.addToy = !state.addToy
  if (state.addToy) {
    toyFormContainer.style.display = 'block'
    toyForm.addEventListener("submit", () =>{
      const nameInput = event.target.querySelector("#name-input")
      const imageInput = event.target.querySelector("#image-input")
      const toy = {
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
      }
      addToy(toy)
    })
  } else {
    toyFormContainer.style.display = 'none'
  }
})

document.addEventListener("click", event => {
  if (event.target.className === "like-btn"){
    const like = {likes: parseInt(event.target.parentNode.children[2].innerText) + 1}
    addLike(parseInt(event.target.parentNode.id), like)
  }
})
