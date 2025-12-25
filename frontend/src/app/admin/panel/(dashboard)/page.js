'use client'

import React, { useEffect, useState } from "react";
import { FileText } from 'lucide-react';
import styles from './styles.module.css';
import {CountRecipeService} from "@/services/recipes"
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [recipeCount, setRecipeCount] = useState(0)

  useEffect(() => {
    async function CountRecipe(){
      const token = Cookies.get("admin_token")

      if (!token){
        console.log("401")
        return {};
      }


      const res = await CountRecipeService(token);
      const resData = await res.json()
      setRecipeCount(resData)
    }

    CountRecipe();
  }, [])

  return (
    <div className={styles.dashboard}>

      <header className={styles.welcomeHeader}>
        <h1>Welcome, Admin!</h1>
        <p>You have successfully logged into the Recipea Admin Panel.</p>
      </header>

      <div className={styles.statsGrid}>

        <div className={styles.statCard}>
          <div className={styles.cardIcon} style={{ backgroundColor: 'rgba(46, 125, 50, 0.2)', color: '#4caf50' }}>
            <FileText size={24} />
          </div>
          <div className={styles.cardInfo}>
            <h3>All Recipes</h3>
            <p className={styles.statNumber}>{recipeCount}</p>
          </div>
        </div>

      </div>

    </div>
  );
}