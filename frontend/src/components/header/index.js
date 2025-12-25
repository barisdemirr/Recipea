import React from "react";
import Link from "next/link"
import styles from "./styles.module.css"
import localFont from "next/font/local"

const Poppins = localFont({
  src: [
    {
      path: "../../../public/fonts/Poppins/Poppins-Regular.ttf",
      weight: '400', 
      style: 'normal'
    },
    {
      path: "../../../public/fonts/Poppins/Poppins-Bold.ttf",
      weight: '700', 
      style: 'bold'
    }
  ]
})

function Header() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.logoArea}>
                    <img src="/favicon.ico" width={30} height={30}/>
                    <span className={styles.logoText}>Recipea</span>
                </div>
                <div className={`${styles.navLinks} ${Poppins.className}`}>
                    <Link href="/">Home</Link>
                    <Link href="/recipes">Recipes</Link>
                    <Link href="/recipes/favorites">Favorites</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </nav>
    );
}

export { Header };