import React from 'react';
import { FileText, Eye, Heart, Users } from 'lucide-react';
import styles from './styles.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      
      {/* Karşılama Başlığı */}
      <header className={styles.welcomeHeader}>
        <h1>Welcome, Admin!</h1>
        <p>You have successfully logged into the Recipea Admin Panel.</p>
      </header>

      {/* Örnek İstatistik Kartları (Grid Yapısı) */}
      <div className={styles.statsGrid}>
        
        <div className={styles.statCard}>
          <div className={styles.cardIcon} style={{ backgroundColor: 'rgba(46, 125, 50, 0.2)', color: '#4caf50' }}>
            <FileText size={24} />
          </div>
          <div className={styles.cardInfo}>
            <h3>All Recipes</h3>
            <p className={styles.statNumber}>124</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardIcon} style={{ backgroundColor: 'rgba(255, 152, 0, 0.2)', color: '#ff9800' }}>
            <Users size={24} />
          </div>
          <div className={styles.cardInfo}>
            <h3>Kayıtlı Kullanıcı</h3>
            <p className={styles.statNumber}>350</p>
          </div>
        </div>

      </div>

    </div>
  );
}