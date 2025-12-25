"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './styles.module.css';
import { Heart, Clock, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Favorites } from "./_components/favorites"
import { GetFilteredRecipe } from '@/services/recipes';
import { Spinner } from '@/components/loading';
import useFavorites from '@/hooks/useFavorites';


export default function RecipeDetail() {
    const { handleFavorite, isInFavorites } = useFavorites();
    const params = useParams();

    const [recipe, setRecipe] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    if (params.id === "favorites") {
        return <Favorites />;
    }

    useEffect(() => {
        const FetchDataAsync = async () => {
            try {
                const response = await GetFilteredRecipe(params.id)
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.Message)
                }
                setLoading(false);
                const recipeData = await response.json()
                setRecipe(recipeData);

            } catch (err) {
                if (err.message == "Failed to fetch") {
                    setError("Server connection failed!")
                } else {
                    setError(err.message)
                }

                setLoading(false);
            }
        }

        FetchDataAsync();

    }, []);


    if (loading) {
        return (
            <Spinner fullPage />
        );
    }

    if (!recipe) {
        return (
        <div className={styles.container}>
            <div className={styles.noResult}>{error}</div>
        </div>
        )
    }
    const recipeId = Number(params.id);

    const steps = recipe.recipeText
        ? recipe.recipeText.split('.').filter(step => step.trim() !== '')
        : [];

    const isFavorite = isInFavorites(recipeId);

    const toggleFavorite = () => {
        handleFavorite(recipe);
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.titleArea}>
                        <h1 className={styles.pageTitle}>{recipe.title}</h1>
                        <button
                            className={`${styles.favButton} ${isFavorite ? styles.activeFav : ''}`}
                            onClick={toggleFavorite}
                            title="Add to Favorites"
                        >
                            <Heart size={28} fill={isFavorite ? "#e11d48" : "none"} />
                        </button>
                    </div>

                    <div className={styles.metaTags}>
                        <span className={styles.metaTag}><Clock size={16} /> 30 dk</span>
                        <span className={styles.metaTag}><Users size={16} /> 4 Kişilik</span>
                    </div>
                </header>

                <div className={styles.imageWrapper}>
                    <img src={`http://localhost:5170/uploads/recipes/${recipe.img}`} alt={recipe.title} className={styles.heroImage} />
                </div>

                <div className={styles.contentGrid}>
                    <aside className={styles.sidebar}>
                        <div className={styles.ingredientsCard}>
                            <div className={styles.cardHeader}>
                                <h3>Ingredients</h3>
                                <div className={styles.separator}></div>
                            </div>
                            <ul className={styles.ingredientsList}>
                                {recipe.ingredients?.map((item, index) => (
                                    <li key={index} className={styles.ingredientItem}>
                                        <CheckCircle2 size={18} className={styles.checkIcon} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.cardFooter}>
                                <small>* If you want, you can change the amounts.</small>
                            </div>
                        </div>
                    </aside>

                    <section className={styles.preparationSection}>
                        <h2 className={styles.sectionTitle}>Instructions</h2>
                        <div className={styles.stepsContainer}>
                            {steps.map((step, index) => (
                                <div key={index} className={styles.stepRow}>
                                    <div className={styles.stepNumber}>{index + 1}</div>
                                    <p className={styles.stepText}>{step.trim()}.</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.bonAppetit}>
                            Bon Appetit!
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}