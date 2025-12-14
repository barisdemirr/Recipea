import { notFound } from "next/navigation";

const BASE_URL = "http://localhost:5170/api"


export const GetAllRecipes = async ()=>{
    try {
        const res = await fetch(`${BASE_URL}/recipes`).then(res=>res.json())
        return res;
    } catch (error) {
        console.log(`hata bu knk: ${error}`)
        return [];
    }
}

export const GetFilteredRecipe = async recipeId=>{
    try {
        const res = await fetch(`${BASE_URL}/recipes/${recipeId}`).then(res=>res.json())
        return res;
    } catch (error) {
        console.log(`hata bu knk: ${error}`)
    }
}