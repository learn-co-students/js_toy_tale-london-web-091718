// fetching data from the server
const getToys = () =>
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => renderAll(toys))

getToys()

const postToy = toy =>
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)

  })


const updateLike = toy =>
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  })
