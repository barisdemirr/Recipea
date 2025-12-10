"use client";

import React, { use, useEffect, useState } from 'react';
import useFavorites from '@/hooks/useFavorites';
import Link from 'next/link';
import { ArrowRight, Heart, Trash2 } from 'lucide-react';
import styles from './styles.module.css';
import { FavoriteRecipeCard } from "../favorite-recipe-card"

function Favorites() {
    const { favorites, handleFavorite } = useFavorites();


    const [isClient, setIsClient] = useState(false)
    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return (
            <h1>loading</h1>
        )
    }




    return (<div className={styles.container}>

        <main className={styles.mainContent}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>My Favorite Recipes</h1>
                <p className={styles.subTitle}>
                    {favorites.length} recipes you saved
                </p>
            </header>

            {favorites.length > 0 ? (
                <div className={styles.gridContainer}>
                    {favorites.map((recipe) => (
                        <div key={recipe.id}>
                            <FavoriteRecipeCard recipe={recipe} onDelete={() => handleFavorite(recipe)} />
                        </div>
                    ))}
                </div>
            ) : (
                /* BOŞ DURUM (EMPTY STATE) */
                <div className={styles.emptyState}>
                    <div className={styles.emptyIconWrapper}>
                        <Heart size={48} color="#ccc" />
                    </div>
                    <h3>You don't have a favorite recipe yet.</h3>
                    <p>You can add your favorite recipes here by clicking the like icon.</p>
                    <Link href="/recipes" className={styles.exploreButton}>
                        Explore Recipes
                    </Link>
                </div>
            )}
        </main>
    </div>
    );
}


export { Favorites }