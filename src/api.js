const getToys = (url) =>
    fetch(url)
    .then(resp => resp.json())

const addToyToDB = (url, newToy) =>
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())

const likeToyUpdate = (url, id, likes) => {
    return fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ likes })
    })
        .then(response => response.json())
};