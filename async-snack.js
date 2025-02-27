async function getChefBirthday(id) {
    let recipe
    try {
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`)
        recipe = await recipeResponse.json()
    }
    catch (error) {
        console.error(error)
        throw new Error(`Fetch della Ricetta con id: ${id} non riuscito`)
    }

    if (recipe.message) {
        throw new Error(recipe.message)
    }
    let chef
    try {
        const chefResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`)
        chef = await chefResponse.json()
        birthday = recipe.userId.birthDate
    }
    catch (error) {
        console.error(error)
        throw new Error(`Fecth dello Chef con id: ${id} non riuscito`)
    }
    if (chef.message) {
        throw new Error(chef.message)
    }
    const formattedDate = dayjs(chef.birthDate).format('DD/MM/YYYY')
    return formattedDate
}

(async () => {
    try {
        const birthday = await getChefBirthday(1)
        console.log("Data di nascita dello chef:", birthday)
    }
    catch (error) {
        console.error("Errore:", error.message)
    }
})()
