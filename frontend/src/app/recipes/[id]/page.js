"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.css';
import { ChefHat, Heart, Clock, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import allRecipes from  "@/mocks/recipes.json"

export default function RecipeDetail() {
    const params = useParams()
    const recipeId = Number(params.id);
    const [isFavorite, setIsFavorite] = useState(false);
    // bir sonraki aşamada dinamik api oluştracağız ve fetch("...recipes/1") diyerek direkt istediğimiz tarifi çekeceğiz
    const recipe = allRecipes.find(r => r.id === recipeId) || allRecipes[0];

    // Tarif metnini noktalara göre bölüp adım adım göstermek için array yapıyoruz
    const steps = recipe.recipe.split('.').filter(step => step.trim() !== '');

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Gelecekte buraya API isteği eklenecek
    };

    return (
        <div className={styles.container}>

            <main className={styles.mainContent}>

                {/* HEADER AREA */}
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

                    {/* Meta Bilgiler (Statik Örnek) */}
                    <div className={styles.metaTags}>
                        <span className={styles.metaTag}><Clock size={16} /> 30 dk</span>
                        <span className={styles.metaTag}><Users size={16} /> 4 Kişilik</span>
                    </div>
                </header>

                {/* HERO IMAGE */}
                <div className={styles.imageWrapper}>
                    <img src={recipe.img} alt={recipe.title} className={styles.heroImage} />
                </div>

                {/* CONTENT GRID */}
                <div className={styles.contentGrid}>

                    {/* SOL KOLON: MALZEMELER (Öne Çıkarılmış) */}
                    <aside className={styles.sidebar}>
                        <div className={styles.ingredientsCard}>
                            <div className={styles.cardHeader}>
                                <h3>Ingredients</h3>
                                <div className={styles.separator}></div>
                            </div>
                            <ul className={styles.ingredientsList}>
                                {recipe.ingredients.map((item, index) => (
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

                    {/* SAĞ KOLON: HAZIRLANIŞ */}
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