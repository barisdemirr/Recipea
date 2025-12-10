"use client";

import React, { useRef } from 'react';
import styles from './styles.module.css';   
import { ArrowRight, ArrowLeft } from 'lucide-react';           

import {RecipeCard} from "@/components/recipe-card"

const Carousel = ({ recipes }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 320; // Kaydırma miktarı
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.header}>
                <h3>Other Popular Recipes</h3>
                <div className={styles.buttons}>
                    <button onClick={() => scroll('left')} className={styles.navButton}>
                        <ArrowLeft size={16} />
                    </button>
                    <button onClick={() => scroll('right')} className={styles.navButton}>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <div className={styles.slider} ref={scrollRef}>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </div>

                ))}
            </div>
        </div>
    );
};

export {Carousel};