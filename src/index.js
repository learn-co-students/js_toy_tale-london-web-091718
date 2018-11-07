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
  toyItem.dataset.id = `${toy.id}`
  toyItem.innerHTML =
    `<h2>${toy.name}</h2>
    <img src='${toy.image}' class='toy-avatar' />
    <p data-id='${toy.id}'>${toy.likes}</p>
    <button data-id='${toy.id}' class='like-btn'>Like &#9829;</button>
    <button data-id='${toy.id}' class='trash-btn' id='trash-btn'>X</button>`
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

const likeToy = (toy, likesEl) => {
  likesEl.innerText = `${toy.likes += 1}`
  updateToyLikes(toy)
}

document.addEventListener('click', event => {
  if(event.target.className === 'like-btn') {
    likeToy(findToy(event.target.dataset.id), document.querySelector(`p[data-id='${event.target.dataset.id}']`))
  }

  if(event.target.className === 'trash-btn') {
    const deleteToyById = event.target.dataset.id
    const toyCard = document.querySelector(`div[data-id='${deleteToyById}']`)
    const foundToyToDelete = findToy(deleteToyById)
    toyCard.remove()
    deleteToy(foundToyToDelete)
  }

})


// OR HERE!
