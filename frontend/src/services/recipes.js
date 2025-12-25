import { notFound } from "next/navigation";

const BASE_URL = "http://localhost:5170/api"


const GetAllRecipes = async () => {
    const res = await fetch(`${BASE_URL}/recipes`)
    return res;
}

const GetFilteredRecipe = async recipeId => {
    const res = await fetch(`${BASE_URL}/recipes/${recipeId}`)
    return res;

}

const GetRecipeOfTheDay = async () => {
    const res = await fetch(`${BASE_URL}/recipes/recipeoftheday`)
    return res;
}

const AdminSignIn = async formData => {
    const res = await fetch('http://localhost:5170/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Backend'in beklediği formatta veriyi gönderiyoruz
        body: JSON.stringify(formData),
    });
    return res
}

const CountRecipeService = async token => {
    const res = await fetch(`${BASE_URL}/recipes/recipecount`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res;
}


const AddRecipeService = async (formdata, token) => {
    const res = await fetch(`${BASE_URL}/recipes/addrecipe`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata,
    })
    return res
}

export { GetRecipeOfTheDay, GetFilteredRecipe, GetAllRecipes, AdminSignIn, CountRecipeService, AddRecipeService }