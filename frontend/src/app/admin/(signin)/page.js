"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Giriş başarılıysa yönlendirmek için
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import styles from './styles.module.css';

export default function AdminLogin() {
  const router = useRouter();
  
  // Form verilerini tutacak state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // UI durumları
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Input değişimlerini yakala
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfa yenilenmesini engelle
    setError('');
    setLoading(true);

    try {
      // Backend'e istek atıyoruz
      const response = await fetch('https://api.seninsiten.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Backend'in beklediği formatta veriyi gönderiyoruz
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error('Giriş başarısız. Bilgilerinizi kontrol edin.');
      }

      const data = await response.json();
      
      // Token'ı kaydet (LocalStorage veya Cookie)
      // localStorage.setItem('token', data.token);
      
      console.log("Giriş Başarılı:", data);
      
      // Admin paneline yönlendir
      // router.push('/admin/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <div className={styles.header}>
          <div className={styles.logoCircle}>
            <Lock size={24} color="#fff" />
          </div>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>Sign in to access admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Hata Mesajı Alanı */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Kullanıcı Adı Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={20} />
              <input
                type="text"
                id="username"
                name="username" // State yönetimi için önemli
                placeholder="Admin username"
                className={styles.input}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Şifre Input */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={20} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            (
              <>
                Sign in <ArrowRight size={20} />
              </>
            )
          </button>

        </form>
      </div>
    </div>
  );
}