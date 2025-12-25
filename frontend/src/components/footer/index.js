import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';
import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.topSection}>
          
          <div className={styles.brandColumn}>
            <div className={styles.brandLogo}>
              <span className={styles.brandName}>Recipea</span>
            </div>
            <p className={styles.brandDescription}>
              A meeting point for healthy and delicious recipes, made with the freshest ingredients.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialLink} aria-label="Github"><Github size={20} /></a>
              <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* 2. Kolon: Hızlı Linkler */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Discover</h4>
            <ul className={styles.linkList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/recipes">Recipes</Link></li>
              <li><Link href="/favorites">Favorites</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Institutional</h4>
            <ul className={styles.linkList}>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomSection}>
          <p className={styles.copyrightText}>
            No Copyright © 2025 <strong>Recipea</strong>.
          </p>
        </div>

      </div>
    </footer>
  );
}

export { Footer }