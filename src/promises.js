//get all toys 

function getToys() {
    return fetch('http://localhost:3000/toys')
        .then(resp => resp.json())
}

//add toy
const addToyApi = (toy) => {
    fetch(`http://localhost:3000/toys`, {
        method: 'POST',
        body: JSON.stringify(toy),
        headers: {'Content-Type': 'application/json'}
    })
}

//update likes
const updateLikes = (toy) => {
    toy.likes++
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(toy)
    })
}