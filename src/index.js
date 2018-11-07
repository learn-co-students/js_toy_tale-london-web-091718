const BASE_URL = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector('form.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
let allToys = []

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
  } else {
    toyFormContainer.style.display = 'none'
  }
})

const getAllToys = () => {
  fetch(`${BASE_URL}`)
  .then(res => res.json())
  .then(toys => toys.forEach(toy => {
    allToys.push(toy)
    renderToy(toy)
  }))
}

const renderToy = (toy) => {
  let toyDiv = document.createElement('div')
  toyDiv.className = "card"
  toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id="${toy.id}" data-likes="${toy.likes}">Like <3</button>
  `
  toyCollection.appendChild(toyDiv)
}

const refreshToys = () => {
  toyCollection.innerHTML = ''
  getAllToys()
}

const addNewToy = (e) => {
  e.preventDefault()
  const newToyName = e.target.querySelector('input[name="name"]').value
  const newToyImage = e.target.querySelector('input[name="image"]').value
  if(newToyName !== "" && newToyImage !== ""){
    return fetch(BASE_URL, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name: newToyName, image: newToyImage, likes: 0})
    })
    // .then(res => res.json())
    // .then(data => console.log(data))
    .then(()=> refreshToys())
  } else {
    alert("Fuck off")
  }
}

const likeToy = (toyId, currentLikes) => {
  return fetch(`${BASE_URL}/${toyId}`, {
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: Number(currentLikes) + 1})
  })
  .then(res => res.json())
  .then(data => data.likes)
}

const init = () => {
  toyForm.addEventListener('submit', addNewToy)
  toyCollection.addEventListener('click', (e) => {
    if (e.target.className === 'like-btn') {
      likeToy(e.target.dataset.id, e.target.dataset.likes)
      .then(likes => {
        e.target.parentElement.querySelector('p').innerHTML = `${likes} likes`
        e.target.dataset.likes = likes
      })
    }
  })
  getAllToys()
}

document.addEventListener("DOMContentLoaded", init);