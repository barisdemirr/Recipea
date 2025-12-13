"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // URL parametrelerini okumak için
import styles from './styles.module.css';
import { useRouter } from 'next/navigation'
import {RecipeCard} from "@/components/recipe-card"
import { GetAllRecipes } from '@/services/recipes';


const ITEMS_PER_PAGE = 6; // Her sayfada 6 kart (2 satır x 3 sütun)

export default  function RecipesPage() {
    
    const [allRecipes, setAllRecipes] = useState([])
    useEffect(()=>{
        GetAllRecipes()
        .then(res=> {
            console.log(res)
            setAllRecipes(res)
        })
        .catch(err=>console.log(`data fetching failed ${err}`))
    }, [])
    
    const router = useRouter()
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('all');

    // URL'den 'page' parametresini al, yoksa 1 kabul et
    const currentPage = Number(searchParams.get('page')) || 1;

    // Filtreleme Mantığı
    const filteredRecipes = activeFilter === 'all'
        ? (allRecipes || [])
        : allRecipes.filter(r => r.type === activeFilter);

    // Sayfalama Mantığı
    const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Filtre değişince sayfayı 1 yapmamız gerekir ancak 
    // basitlik için Link ile sayfayı yeniliyoruz veya kullanıcı manuel gider.
    // Bu örnekte filtre butonları sadece state'i değiştiriyor.

    return (
        <div className={styles.container}>

            {/* FILTER BAR */}
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
                </div>
            </div>

            {/* GRID CONTENT */}
            <div className={styles.contentWrapper}>
                <div className={styles.gridContainer}>
                    {currentRecipes.length > 0 ? (
                        currentRecipes.map((recipe) => (
                            <div key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResult}>No recipes yet.</div>
                    )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {/* Önceki Sayfa Butonu */}
                        <Link
                            href={`/recipes?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                            className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                            aria-disabled={currentPage === 1}
                        >
                            &lt;
                        </Link>

                        {/* Sayfa Numaraları */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                            <Link
                                key={num}
                                href={`/recipes?page=${num}`}
                                className={`${styles.pageBtn} ${currentPage === num ? styles.activePage : ''}`}
                            >
                                {num}
                            </Link>
                        ))}

                        {/* Sonraki Sayfa Butonu */}
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