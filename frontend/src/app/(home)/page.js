import React from "react";
import Link from "next/link"
import Image from 'next/image'

import styles from "./styles.module.css"
import recipeOfTheDay from "@/mocks/recipeOfTheDay.json"
import sliderRecipes from "@/mocks/recipes.json"

import {Carousel} from "./_components/Carousel"



export default function Home() {
    return (
        <div className={styles.container}>

            <main className={styles.main}>
                {/* HERO SECTION (RECIPE OF THE DAY) */}
                <section className={styles.heroSection}>
                    <h2 className={styles.sectionTitle}>Recipe of the Day</h2>

                    <div className={styles.heroCard}>
                        <div className={styles.heroImageWrapper}>
                            <img src="/img/karniyarik.jpg" alt={recipeOfTheDay.title} className={styles.heroImage} />
                        </div>

                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>{recipeOfTheDay.title}</h1>

                            <div className={styles.ingredientsArea}>
                                <h3>Ingredients:</h3>
                                <ul className={styles.ingredients}>
                                    {recipeOfTheDay.ingredients.slice(0,4).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                    <hr/>
                                    <a href="#">More than</a>
                                </ul>
                            </div>

                            <div className={styles.recipePreview}>
                                <h3>Instructions:</h3>
                                <p className={styles.instruction}>{recipeOfTheDay.recipe}</p>
                            </div>

                            <button className={styles.ctaButton}>
                                See Details
                            </button>
                        </div>
                    </div>
                </section>

                {/* CAROUSEL SECTION */}
                <div className={styles.carouselWrapper}>
                    <Carousel recipes={sliderRecipes} />
                </div>
            </main>
        </div>
    );
}