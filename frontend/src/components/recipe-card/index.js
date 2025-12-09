import React from "react"
import styles from "./styles.module.css"

function RecipeCard({recipe={}}) {
    return (
        <div key={recipe.id} className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={recipe.img} alt={recipe.title} className={styles.cardImage} />
            </div>
            <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{recipe.title}</h4>
                <p className={styles.ingredientsPreview}>
                    {recipe.ingredients.slice(0, 3).join(", ")}...
                </p>
                <button className={styles.detailsLink}><a href={`/recipes/${recipe.id}`}>Go to the recipe</a></button>
            </div>
        </div>
    )
}

export {RecipeCard}