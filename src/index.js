const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const toyNameInput = document.querySelector('#name-input')
const toyImageInput = document.querySelector('#image-input')
const submitForm = document.getElementById('toy-submit')
let addToy = false

// YOUR CODE HERE

const state = {
  toys: []
}

const renderToy = toy => {
  const toyItem = document.createElement('div')
  toyItem.className = 'card'
  toyItem.innerHTML =
  `<h2>${toy.name}</h2>
  <img src='${toy.image}' class='toy-avatar' />
  <p data-id='${toy.id}'>${toy.likes}</p>
  <button data-id='${toy.id}' class='like-btn'>Like &#9829;</button>
  <button data-id='${toy.id}' class='trash-btn'></button>`
  toyCollection.appendChild(toyItem)
}

const renderToys = toys => {
  toys.forEach(toy => renderToy(toy))
}

getToys()
  .then(toys => {
    state.toys = toys
    renderToys(toys)
  })

const newToyEvenetListener = () => {
    toyForm.addEventListener('submit', event => {
    console.log(event.target)
    event.preventDefault();

    const toy = {
      name: toyNameInput.value,
      image: toyImageInput.value,
      likes: 0
    }

    createToy(toy)
      .then(toy => renderToy(toy))
    event.target.reset();
  })
}

const findToy = id => {
  return state.toys.find(toy => toy.id === parseInt(id))
}

// const updateLikeBtn = toy => {
//   toy.likes.innerHTML = toy.likes += 1
// }


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    newToyEvenetListener()
    } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('click', event => {
  if(event.target.className === 'like-btn') {
    const id = event.target.dataset.id
    const likesOnPage = document.querySelector(`p[data-id='${id}']`)
    const foundToy = findToy(id)
    likesOnPage.innerText = `${foundToy.likes += 1}`
    updateToyLikes(foundToy)
  }
})


// OR HERE!
