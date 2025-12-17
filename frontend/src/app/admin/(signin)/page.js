"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Giriş başarılıysa yönlendirmek için
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import styles from './styles.module.css';
import Cookies  from 'js-cookie';

export default function AdminLogin() {
  const router = useRouter();
  
  // Form verilerini tutacak state
  const [formData, setFormData] = useState({
    Username: '',
    Password: ''
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
      const response = await fetch('http://localhost:5170/api/auth/login', {
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
      
      Cookies.set("admin_token", data.token, {expires: 1, path: "/admin"})
      
      router.push('/admin/panel');

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
                name="Username" // State yönetimi için önemli
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
                name="Password"
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