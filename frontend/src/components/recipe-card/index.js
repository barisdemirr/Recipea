import React from "react"
import styles from "./styles.module.css"
import { ArrowRight } from 'lucide-react';    

function RecipeCard({recipe={}}) {
    return (
        <div key={recipe.id} className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={`http://localhost:5170/uploads/recipes/${recipe.img}`} alt={recipe.title} className={styles.cardImage} />
            </div>
            <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{recipe.title}</h4>
                <p className={styles.ingredientsPreview}>
                    {recipe.ingredients.slice(0, 3).join(", ")}...
                </p>
                <a href={`/recipes/${recipe.id}`} className={styles.detailsLink}>Go to recipe <ArrowRight size={16}/></a>
            </div>
        </div>
    )
}

export {RecipeCard}