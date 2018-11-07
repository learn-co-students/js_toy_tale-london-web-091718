const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitButton = document.querySelector('.submit')
const toyCollection = document.querySelector('#toy-collection')
const toyNameInput = document.querySelector('#name-input')
const toyImageInput = document.querySelector('#image-input')
const likeButton = document.querySelector('.like-btn')
let addToy = false

let state = {
  toys: []
}

// render a toy to page 
const renderToy = toy => {
  console.log('renderToy toy', toy)
  const toyEl = document.createElement('div')
  const likeString = toy.likes === 1 ? `${toy.likes} Like` : `${toy.likes} Likes`
  toyEl.className = 'card'
  toyEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p data-id=${toy.id}>${likeString}</p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  `
  toyCollection.appendChild(toyEl)
}

// fetching data from api and passing the response (array of toys) into renderToy function
document.addEventListener('DOMContentLoaded', () => {
  getToys()
    .then(toys => renderToyCollection(toys))
  })

const renderToyCollection = toys => {
    state.toys = toys
    state.toys.forEach(toy => renderToy(toy))
  }

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// event listener to whole doc looking for clicks on like buttons and then triggering update functions
document.addEventListener('click', event => {
  if (event.target.className === 'like-btn') {
    const id = event.target.dataset.id // dataset.id relates to the data-id tag
    const foundToy = state.toys.find(toy => toy.id === parseInt(id)) // need to parse id because it will be a string from html
    const likeText = document.querySelector(`p[data-id='${id}']`)
    const likedToy = updateToyLikes(foundToy)
    likeText.innerText = likedToy.likes === 1 ? `${likedToy.likes} Like` : `${likedToy.likes} Likes`
    updateToy(likedToy)
  }
})

// increment number of likes
const updateToyLikes = toy => {
  ++toy.likes
  return toy
}

// create new toy button will 1) create new toy 2) add to api 3) render to page
submitButton.addEventListener('click', event => {
    event.preventDefault()
  const toy = {
    name: toyNameInput.value,
    image: toyImageInput.value,
    likes: 0
  }

  addNewToy(toy)
    .then((toy) => {
      state.toys.push(toy)
      renderToy(toy)
    })
  
  toyNameInput.value = ''
  toyImageInput.value = ''
})
