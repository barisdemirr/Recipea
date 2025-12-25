"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link"
import Image from 'next/image'

import styles from "./styles.module.css"
import { ArrowRight, ArrowLeft } from 'lucide-react';

import { Carousel } from "./_components/Carousel"

import { GetRecipeOfTheDay, GetAllRecipes } from "@/services/recipes";
import { notFound } from "next/navigation";

import { Spinner } from "@/components/loading"



export default function Home() {
    const [ingreNumber, setIngreNumber] = useState(0);
    const [recipeOfTheDay, setRecipeOfTheDay] = useState({})
    const [allRecipes, setAllRecipes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetAllRecipesAsync() {
            try {
                const rotd = await GetRecipeOfTheDay()
                setRecipeOfTheDay(rotd)
            } catch (error) {
                notFound()
            }

            try {
                const allR = await GetAllRecipes()
                const allRData = await allR.json()
                setAllRecipes(allRData)     
            } catch (error) {
                notFound()
            }

            setLoading(false)
        }

        GetAllRecipesAsync()
    }, [])

    // LOADING CHECK (Guard Clause)
    if (loading) {
        return (
                <Spinner fullPage />
        );
    }
    let totalIngre = recipeOfTheDay.ingredients.length
    const sliderRecipes = allRecipes.slice(0, 8)
    return (
        <div className={styles.container}>

            <main className={styles.main}>
                {/* HERO SECTION (RECIPE OF THE DAY) */}
                <section className={styles.heroSection}>
                    <h2 className={styles.sectionTitle}>Recipe of the Day</h2>

                    <div className={styles.heroCard}>
                        <div className={styles.heroImageWrapper}>
                            <img src={`http://localhost:5170/uploads/recipes/${recipeOfTheDay.img}`} alt={recipeOfTheDay.title} className={styles.heroImage} />
                        </div>

                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>{recipeOfTheDay.title}</h1>

                            <div className={styles.ingredientsArea}>
                                <h3>Ingredients:</h3>
                                <ul className={styles.ingredients}>
                                    {recipeOfTheDay.ingredients.slice(ingreNumber, ingreNumber + 4).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <div className={styles.buttonBar}>
                                    <hr />
                                    <div className={styles.buttons}>
                                        <button onClick={() => {
                                            if (ingreNumber - 4 >= 0) {
                                                setIngreNumber(ingreNumber - 4)
                                            }
                                        }} className={styles.navButton}>
                                            <ArrowLeft size={16} />
                                        </button>
                                        <button onClick={() => {
                                            if (ingreNumber + 4 <= totalIngre) {
                                                setIngreNumber(ingreNumber + 4)
                                            }
                                        }
                                        } className={styles.navButton}>
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.recipePreview}>
                                <h3>Instructions:</h3>
                                <p className={styles.instruction}>{recipeOfTheDay.recipeText}</p>
                            </div>

                            <button className={styles.ctaButton}>
                                <a href={`/recipes/${recipeOfTheDay.id}`} >See Details</a>
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