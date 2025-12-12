"use client";

import { ArrowRight, Heart, Trash2 } from 'lucide-react';
import styles from './styles.module.css';
import Link from 'next/link';
import useFavorites from '@/hooks/useFavorites';

function FavoriteRecipeCard({recipe, onDelete}) {
    
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={recipe.img} alt={recipe.title} className={styles.cardImage} />
                <button
                    className={styles.removeBtn}
                    onClick={onDelete}
                    title="Remove Favorite"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* İçerik Alanı */}
            <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{recipe.title}</h4>
                <p className={styles.ingredientsPreview}>
                    {recipe.ingredients.join(", ")}
                </p>

                <div className={styles.cardFooter}>
                    <Link href={`/recipes/${recipe.id}`} className={styles.detailsLink}>
                        Go to recipe <ArrowRight size={16} />
                    </Link>
                    <Heart size={20} className={styles.favIconFilled} fill="#e11d48" color="#e11d48" />
                </div>
            </div>
        </div>
    )
}

export {FavoriteRecipeCard}