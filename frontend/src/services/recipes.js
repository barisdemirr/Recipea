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