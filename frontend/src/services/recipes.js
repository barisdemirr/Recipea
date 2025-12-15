import { notFound } from "next/navigation";

const BASE_URL = "http://localhost:5170/api"


const GetAllRecipes = async ()=>{
    try {
        const res = await fetch(`${BASE_URL}/recipes`).then(res=>res.json())
        return res;
    } catch (error) {
        console.log(`hata bu knk: ${error}`)
        return [];
    }
}

const GetFilteredRecipe = async recipeId=>{
    try {
        const res = await fetch(`${BASE_URL}/recipes/${recipeId}`).then(res=>res.json())
        return res;
    } catch (error) {
        console.log(`hata bu knk: ${error}`)
    }
}

const GetRecipeOfTheDay = async ()=>{
    try {
        const res = await fetch(`${BASE_URL}/recipes/recipeoftheday`).then(res=>res.json())
        return res;
    } catch (error) {
        console.log(`hata bu knk: ${error}`)
    }
}

export { GetRecipeOfTheDay, GetFilteredRecipe, GetAllRecipes }