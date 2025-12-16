import React from "react";
import Link from "next/link"
import styles from "./styles.module.css"
// import {Poppins} from "next/font/google"

// const poppins = Poppins({
//   weight: '400',
//   subsets: ['latin'],
//   display: 'swap',
// })

function Header() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.logoArea}>
                    <span className={styles.logoText}>Recipea</span>
                </div>
                <div className={`${styles.navLinks} `}>
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