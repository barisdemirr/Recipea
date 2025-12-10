'use client';

import React, { useState, useEffect, use } from "react";
 

export default function useFavorites(){
    const [favorites, setFavorites] = useState([]) 

    
    // works and brings favorites from localstorage when the page loaded
    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorite_recipes");
        if (storedFavs){
            setFavorites(JSON.parse(storedFavs))
        }else{
            localStorage.setItem("favorite_recipes", [])
        }
    }, [])


    // add or delete a favorite recipe
    const handleFavorite = recipe =>{
        let updatedFavorites;
        const exists = favorites.find(f=> f.id == recipe.id)
        console.log(favorites)
        if (exists){
            console.log(1)
            updatedFavorites = favorites.filter(f=> f.id != recipe.id)
        }else { 
            console.log(2)
            updatedFavorites = [...favorites, recipe]
        }
        console.log(updatedFavorites)
        setFavorites(updatedFavorites);
        
        localStorage.setItem("favorite_recipes", JSON.stringify(updatedFavorites))
    }


    // checks if a recipe is favorite or not. returns a bool
    const isInFavorites = recipeId => {
        return favorites.some(f=> f.id == recipeId)
    }


    return { favorites, handleFavorite, isInFavorites }
}