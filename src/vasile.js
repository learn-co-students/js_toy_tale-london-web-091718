
addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
        toyForm.style.display = 'block'
        const form = toyForm.querySelector('.add-toy-form')
        form.addEventListener('submit', event => {
            event.preventDefault()
            newToy.name = form.querySelector("input[name='name']".value)
            newToy.image = form.querySelector("input[name='image']".value)
            addNewToy(newToy)
        })
    } else {
        toyForm.style.display = 'none'
    }
})

//in above method need to find my equivalent of newToy because couldnt check this in lelcture