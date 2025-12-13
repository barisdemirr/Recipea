"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChefHat, PlusCircle, LayoutDashboard, Settings, Users } from 'lucide-react';
import styles from './styles.module.css';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // Aktif linki belirlemek için yardımcı fonksiyon
    const isActive = (path) => pathname === path;

    return (
        <div className={styles.adminContainer}>
            {/* YÜZEN NAVBAR */}
            <nav className={styles.floatingNavbar}>

                {/* Logo Alanı */}
                <div className={styles.navBrand}>
                    <div className={styles.logoCircle}>
                        <ChefHat size={20} color="#fff" />
                    </div>
                    <span className={styles.brandText}>Admin Panel</span>
                </div>

                <div className={styles.navLinks}>
                    <Link href="/admin/panel" className={`${styles.navLink} ${isActive('/admin/panel') ? styles.active : ''}`}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>

                    <Link href="/admin/panel/addrecipe" className={`${styles.navLink} ${isActive('/admin/panel/addrecipe') ? styles.active : ''}`}>
                        <PlusCircle size={18} />
                        <span>Add Recipe</span>
                    </Link>
                </div>
            </nav>

            <main className={styles.contentWrapper}>
                {children}
            </main>
        </div>
    );
}