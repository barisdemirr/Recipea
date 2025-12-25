"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 
import styles from './styles.module.css';
import { useRouter } from 'next/navigation'
import { RecipeCard } from "@/components/recipe-card"
import { GetAllRecipes } from '@/services/recipes';
import { Spinner } from "@/components/loading"


const ITEMS_PER_PAGE = 6; 

export default function RecipesPage() {
    const [loading, setLoading] = useState(true)
    const [allRecipes, setAllRecipes] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        async function GetAllRecipesAsync() {
            try {
                const response = await GetAllRecipes()
                if (!response.ok) {
                    throw new Error("Something went wrong!")
                }

                const allRecipesData = await response.json()
                
                if (allRecipesData.length == 0 ){
                    throw new Error("No recipes yet.")
                } else{
                    setAllRecipes(allRecipesData)
                }
                
                setLoading(false)
            } catch (err) {
                if (err.message == "Failed to fetch"){
                    setError("Server connection failed!")
                }else {
                    setError(err.message)
                }
                setLoading(false)
            }
        }

        GetAllRecipesAsync()
    }, [])



    const router = useRouter()
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('all');

    const currentPage = Number(searchParams.get('page')) || 1;

    // Filter Logic
    const filteredRecipes = activeFilter === 'all'
        ? (allRecipes || [])
        : allRecipes.filter(r => r.type === activeFilter);

    // Pagination Logic
    const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);


    // LOADING CHECK 
    if (loading) {
        return (
            <Spinner fullPage />
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.filterBarWrapper}>
                <div className={styles.filterBar}>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveFilter('all')
                            router.push("/recipes")
                        }}
                    >
                        All
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'soup' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveFilter('soup')
                            router.push("/recipes")
                        }}
                    >
                        Soups
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'main' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveFilter('main')
                            router.push("/recipes")
                        }}
                    >
                        Main Courses
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'dessert' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveFilter('dessert')
                            router.push("/recipes")
                        }}
                    >
                        Desserts
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'beverage' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveFilter('beverage')
                            router.push("/recipes")
                        }}
                    >
                        Beverages
                    </button>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.gridContainer}>
                    {currentRecipes.length > 0 ? (
                        currentRecipes.map((recipe) => (
                            <div key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResult}>{error}</div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <Link
                            href={`/recipes?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                            className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                            aria-disabled={currentPage === 1}
                        >
                            &lt;
                        </Link>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                            <Link
                                key={num}
                                href={`/recipes?page=${num}`}
                                className={`${styles.pageBtn} ${currentPage === num ? styles.activePage : ''}`}
                            >
                                {num}
                            </Link>
                        ))}

                        <Link
                            href={`/recipes?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                            className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                            aria-disabled={currentPage === totalPages}
                        >
                            &gt;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}