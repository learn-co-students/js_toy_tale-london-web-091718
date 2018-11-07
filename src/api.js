const toysURL = 'http://localhost:3000'


const getToys = () =>
  fetch(`${toysURL}/toys`)
  .then(resp => resp.json())


const getToy = id =>
  fetch(`${toysURL}/toys/${id}`)
  .then(resp => resp.json())


const createToy = toy =>
  fetch(`${toysURL}/toys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())

const updateToyLikes = toy =>
  fetch(`${toysURL}/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())

const deleteToy = toy =>
  fetch(`${toysURL}/toys/${toy.id}`, {
    method: 'DELETE'
  })
