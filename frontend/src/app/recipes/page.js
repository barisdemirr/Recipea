"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // URL parametrelerini okumak için
import styles from './styles.module.css';
import { useRouter } from 'next/navigation'

import allRecipes from "@/mocks/recipes.json"


// // ÖRNEK VERİ SETİ (Pagination'ı test etmek için veriyi biraz çoğalttım)
// const allRecipes = [
//   // Çorbalar
//   { id: 1, type: 'corba', title: "Mercimek Çorbası", img: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=500", ingredients: ["Mercimek", "Soğan", "Havuç"], recipe: "Sebzeleri kavurup mercimeği ekleyin." },
//   { id: 2, type: 'corba', title: "Domates Çorbası", img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=500", ingredients: ["Domates", "Un", "Süt"], recipe: "Domatesleri rendeleyip pişirin." },
//   { id: 3, type: 'corba', title: "Ezogelin", img: "https://images.unsplash.com/photo-1603105037880-880cd6edccf6?q=80&w=500", ingredients: ["Bulgur", "Mercimek", "Nane"], recipe: "Bakliyatları haşlayıp soslayın." },
//   { id: 4, type: 'corba', title: "Yayla Çorbası", img: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=500", ingredients: ["Yoğurt", "Pirinç", "Nane"], recipe: "Yoğurtlu terbiyeyi pirince ekleyin." },
  
//   // Ana Yemekler
//   { id: 5, type: 'ana-yemek', title: "Izgara Köfte", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=500", ingredients: ["Kıyma", "Soğan", "Baharat"], recipe: "Yoğurup şekil verin, ızgarada pişirin." },
//   { id: 6, type: 'ana-yemek', title: "Karnıyarık", img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=500", ingredients: ["Patlıcan", "Kıyma", "Domates"], recipe: "Patlıcanları kızartıp içini doldurun." },
//   { id: 7, type: 'ana-yemek', title: "Tavuk Sote", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500", ingredients: ["Tavuk", "Biber", "Domates"], recipe: "Tavukları soteleyip sebzeleri ekleyin." },
//   { id: 8, type: 'ana-yemek', title: "Mantı", img: "https://images.unsplash.com/photo-1606850246029-dd00bd5d0e29?q=80&w=500", ingredients: ["Un", "Kıyma", "Yoğurt"], recipe: "Hamuru açıp doldurun, haşlayın." },
//   { id: 9, type: 'ana-yemek', title: "Lahmacun", img: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?q=80&w=500", ingredients: ["Kıyma", "Soğan", "Hamur"], recipe: "İnce hamura harcı yayp fırınlayın." },

//   // Tatlılar
//   { id: 10, type: 'tatli', title: "Sütlaç", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500", ingredients: ["Süt", "Pirinç", "Şeker"], recipe: "Pirinci haşlayıp sütle kaynatın." },
//   { id: 11, type: 'tatli', title: "Baklava", img: "https://images.unsplash.com/photo-1597289124948-688c1a35cb48?q=80&w=500", ingredients: ["Yufka", "Fıstık", "Şerbet"], recipe: "Yufkaları yağlayıp dizin, şerbet dökün." },
//   { id: 12, type: 'tatli', title: "Magnolia", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500", ingredients: ["Bisküvi", "Muhallebi", "Çilek"], recipe: "Bisküvi ve muhallebiyi kat kat dizin." },
// ];

const ITEMS_PER_PAGE = 6; // Her sayfada 6 kart (2 satır x 3 sütun)

export default function RecipesPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // URL'den 'page' parametresini al, yoksa 1 kabul et
  const currentPage = Number(searchParams.get('page')) || 1;

  // Filtreleme Mantığı
  const filteredRecipes = activeFilter === 'all' 
    ? allRecipes 
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
            Tümü
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'corba' ? styles.active : ''}`}
            onClick={() => {
                setActiveFilter('corba')
                router.push("/recipes")
            }}
          >
            Çorbalar
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'ana-yemek' ? styles.active : ''}`}
            onClick={() => {
                setActiveFilter('ana-yemek')
                router.push("/recipes")
            }}
          >
            Ana Yemekler
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'tatli' ? styles.active : ''}`}
            onClick={() => {
                setActiveFilter('tatli')
                router.push("/recipes")
            }}
          >
            Tatlılar
          </button>
        </div>
      </div>

      {/* GRID CONTENT */}
      <div className={styles.contentWrapper}>
        <div className={styles.gridContainer}>
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <div key={recipe.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src={recipe.img} alt={recipe.title} className={styles.cardImage} />
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{recipe.title}</h4>
                  <p className={styles.ingredientsPreview}>
                    {recipe.ingredients.join(", ")}
                  </p>
                  <button className={styles.detailsLink}>
                    Tarifi Gör
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResult}>Bu kategoride tarif bulunamadı.</div>
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