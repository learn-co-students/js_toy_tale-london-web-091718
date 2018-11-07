// get all the toys
const getToys = () =>
    fetch(`http://localhost:3000/toys`)
        .then(resp => resp.json())

// create a toy 
const createToy = toy => 
    fetch(`http://localhost:3000/toys`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json"},
        body: JSON.stringify(toy)
    }).then(resp => resp.json()) // the object is being created, then turned into a string

// update a toy 
const updateToy = toy =>
    fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(toy)
    })

// update a toy 
const deleteToy = toy =>
    fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'delete'
    })





