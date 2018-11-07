const baseURL = 'http://localhost:3000/toys'

const getToys = () => 
    fetch(baseURL)
    .then(resp => resp.json())

const addNewToy = toy =>
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toy)
    }).then(resp => resp.json())

const updateToy = toy =>
    fetch(baseURL + `/${toy.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toy)
    }).then(resp => resp.json())

