const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

// OR HERE!
const retrieveToys = () => fetch('http://localhost:3000/toys').then(result => result.json())



const likeToy = toyObject => {
  toyObject.likes ++
  fetch(`http://localhost:3000/toys/${toyObject.id}`, {
  method: "PATCH",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(toyObject)
  })
}


const showToy = toyObject => {
const toyElement = document.createElement("div")
toyElement.innerHTML = `
<div class = 'card'>
<h2 data-id="${toyObject.id}">${toyObject.name}</h2>
<img src="${toyObject.image}" class="toy-avatar">
<p id="like-number">Likes: ${toyObject.likes}</p>
<button class="like-btn">Like the plastic out of me!</button>
</div>`


const likeButton = toyElement.querySelector('.like-btn')
likeButton.addEventListener('click',() => { 
  likeToy(toyObject)
  const likeNum = toyElement.querySelector('#like-number')
  likeNum.innerText = `Likes: ${toyObject.likes}`
})

toyList.appendChild(toyElement)
}


const showToys = toys => toys.forEach(toy => showToy(toy))

const retrieveToysToPage = () => retrieveToys().then(toys=>showToys(toys))


const addNewToyRequest = toy => {
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  })
 }


 //upon page load:

retrieveToysToPage()

// Event listeners:


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

toyForm.addEventListener('submit', () => {
  const toyName = document.querySelector('#nameruni').value
  const toyImage = document.querySelector('#imageruni').value
  let toyObject = {name: toyName, image: toyImage, likes: 0}
  addNewToyRequest(toyObject).then(
  retrieveToysToPage())
})
