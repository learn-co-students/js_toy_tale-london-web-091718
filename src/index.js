const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyColl = document.querySelector('#toy-collection')
const formClass = document.querySelector('.add-toy-form')
const formInputs = document.querySelectorAll('.input-text')

let addToy = false



// render one toy
const renderToy = (toy) => {
const toyDiv = document.createElement('div')
toyDiv.className = ('card')
toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
    <button class='remove'>Remove</button>
`
  const numLike = toyDiv.querySelector('p')
  const buttonLike = toyDiv.querySelector('.like-btn')

  buttonLike.addEventListener('click', event =>{
  toy.likes++
  numLike.innerHTML = `${toy.likes}`
  updateLike(toy)
  })
  buttonLike.addEventListener('mouseover', event =>{
  toy.likes--
  numLike.innerHTML = `${toy.likes}`
  updateLike(toy)
  })

  let asd = toyColl.appendChild(toyDiv)

  }

// render allToys

const renderAll = toys => {
  toys.forEach( toy =>
  renderToy(toy))
}

// create new toy

 formClass.addEventListener('submit', event => {
  event.preventDefault()
  const nameInput = formInputs[0]
  const imageInput = formInputs[1]
  const name = nameInput.value
  const image = imageInput.value
  const likes = 0
  const toy = {
    name: name,
    image: image,
    likes: likes
  }
  renderToy(toy)
  postToy(toy)

})

// delete toy




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
