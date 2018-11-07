const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDisplay = document.querySelector('#toy-collection')
const toyFormInput = toyForm.querySelector('.add-toy-form')
let addToy = false
let localToys

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

// Function to display a single toy
const displayToy = toy => {
  const toyItem = document.createElement('div')
  toyItem.className = 'card'
  toyItem.id = `${toy.id}`
  toyItem.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn">Like <3</button>
  `

  toyDisplay.appendChild(toyItem)
}

// Function to display all toys
const displayToys = toys => toys.forEach(toy => displayToy(toy))

// Fetch and display all toys
const renderToys = () => {
  getToys()
    .then(toys => {
      localToys = toys
      toyDisplay.innerHTML = ``
      displayToys(toys)
    })
}

renderToys()

// Listen to new toy form submission, create toy
toyForm.addEventListener('submit', event => {
  event.preventDefault()
  let inputValues = toyFormInput.querySelectorAll('.input-text')
  const toy = {
    name: inputValues[0].value,
    image: inputValues[1].value,
    likes: 0
  }

  createToys(toy)
    .then(toy => {
      renderToys()
      inputValues[0].value = ``
      inputValues[1].value = ``
    })
})

document.addEventListener('click', event => {
  if (event.target.className === 'like-btn') {
    let targetBtn = event.target
    let toyId = parseInt(targetBtn.parentElement.id)
    let toy = localToys.find(toy => toy.id === toyId)
    toy.likes++
    toyDisplay.innerHTML = ``
    updateToy(toy)
    displayToys(localToys)
  }
})
