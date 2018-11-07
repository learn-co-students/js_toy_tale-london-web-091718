const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyEl = document.querySelector("#toy-collection") // div for toy collection container 

const formListen = document.querySelector(".add-toy-form") // form input
const getName = document.querySelector(".input-text") // listens to input name event
const getUrl = document.querySelector(".input-text.url") // listens to get url input

let addToy = false

let state = { // collects all our toys, when the page is loaded (gives access to them later)
  toys: []
}

// some code, that was given to us
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

//  listens to when form is submitted
formListen.addEventListener("submit", (event) => {
  event.preventDefault()
  const newToy = {
    name: getName.value,
    image: getUrl.value,
    likes: 0
  } 
  console.log(newToy)

  createToy(newToy) // creates a toy
    .then(toy => {
      renderToy(toy) //renders toy to page
      state.toys.push(toy)  // see below
      /* important to push the toy to the local array,
       when it gets its idea and comes back from the database */
    }) // takes the object and renders if straight away
})

// adds listner to the whole page, we place all our event listens for the page in here
document.addEventListener("click", event => {
  if (event.target.className === "like-btn") {
  const id = event.target.dataset.id
  const foundToy = state.toys.find(toy => toy.id === parseInt(id))

  console.log(foundToy)
  addLike(foundToy)
    .then(() => {
      const p = event.target.parentNode.querySelector('p')
      p.innerText = `${foundToy.likes}` 
      // this event gets the parent node of the element 
    })
  }

  if (event.target.className === "delete-btn") { //looks a specific class
    const id = event.target.dataset.id 
    const foundToy = state.toys.find(toy => toy.id === parseInt(id))
    let newArray = [...state.toys]
    event.target.parentNode.remove()
    deleteAToy(foundToy)
  }
})

const deleteAToy = (toy) => {
  deleteToy(toy)
  delete toy // this is destructive to the array
}

const addLike = (toy) => {
  toy.likes += 1 
  return updateToy(toy) //needed a return to get our like function to return somthing
}

// render toy
const renderToy = (toy) => {
  const toyItem = document.createElement("div")
  toyItem.className = "card"
    toyItem.innerHTML = `
        <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${parseInt(toy.likes)}</p>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
        <button data-id=${toy.id} class="delete-btn">Delete</button>
    `
    // added data-id, and gave each element a unique identifier, buttons can have the same id
    toyEl.appendChild(toyItem)
}

// renders all the toys to the page
const renderAllToys = (toys) => 
  toys.forEach(toy => renderToy(toy))

// gets all the toys
getToys()
  .then(toys => {
    state.toys = [...toys] // adds a copy of the array, rather then mutate
    // arrays and objects are pass by referance
    renderAllToys(toys)
  })