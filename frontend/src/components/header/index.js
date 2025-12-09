import React from "react";
import Link from "next/link"
import styles from "./styles.module.css"

function Header() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.logoArea}>
                    <span className={styles.logoText}>Recipea</span>
                </div>
                <div className={styles.navLinks}>
                    <Link href="/">Home</Link>
                    <Link href="/recipes">Recipes</Link>
                    <Link href="#">About</Link>
                    <Link href="#">Log In</Link>
                    <Link href="#">Register</Link>
                </div>
            </div>
        </nav>
    );
}

export { Header };