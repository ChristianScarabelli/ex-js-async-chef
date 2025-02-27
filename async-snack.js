async function getChefBirthday(id) {
    let recipe
    try {
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`)
        recipe = await recipeResponse.json()
    }
    catch (error) {
        throw new Error(`Ricetta con id: ${id} non trovata`)
    }

    if (recipe.message) {
        throw new Error(recipe.message)
    }
    let userId = recipe.userId
    let birthday
    try {
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`)
        recipe.userId = await userResponse.json()
        birthday = recipe.userId.birthDate
    }
    catch (error) {
        throw new Error(`Utente con id: ${userId} non trovato`)
    }

    birthday = dayjs(recipe.userId.birthDate).format('DD/MM/YYYY')
    return birthday;
}

getChefBirthday(2)
    .then(birthday => console.log("Data di nascita dello chef:", birthday))
    .catch(error => console.error("Errore:", error.message));