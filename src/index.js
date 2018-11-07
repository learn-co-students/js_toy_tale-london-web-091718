const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let newToyName = document.querySelector('input[name="name"]')
let newToyImage = document.querySelector('input[name="image"]')
const submit = document.querySelector('.submit')
let addToy = false

// YOUR CODE HERE


getToys()
  .then(toys => {

    toys.forEach(toy => {
    renderToys(toy)
    })
  });


function renderToys(toy) {
  const toyDiv = document.createElement('div')
  toyDiv.setAttribute('class', 'card')
  toyDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class="toy-avatar" />
  <p class="likes">${toy.likes} Likes </p>
  <button class="like-btn-${toy.id}">Like <3</button>
  `

  toyCollection.appendChild(toyDiv)

  //update toy likes

  let likeButton = toyCollection.querySelector(`.like-btn-${toy.id}`)
  let likes = toyCollection.querySelector(`.likes`)

  likeButton.addEventListener('click', event => {
    event.preventDefault
    updateLikes(toy)
      .then(resp => resp.json())
      .then(data => likes.innerText= `${data.likes} likes`)
  })

}



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


//event listener

submit.addEventListener('click', event => {
  event.preventDefault()

  console.log(newToyName.value)
  console.log(newToyImage.value)
  const newToy = {
    name: newToyName.value,
    image: newToyImage.value
  }
  addToyApi(newToy)
})



