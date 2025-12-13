"use client";

import React, { useState } from 'react';
import { Save, Type, Image as ImageIcon, FileText, List, AlignLeft } from 'lucide-react';
import styles from './styles.module.css';

export default function AddRecipe() {
    
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        image: '',
        ingredients: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("API'ye gidecek veri:", formData);

        try {
            const response = await fetch('/api/urun-ekle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData), 
            });

            if (response.ok) {
                console.log("success")
            } else {
                console.log("failed")
            }

        } catch (error) {
            console.error('Fetch error:', error);
        }

        setFormData({
            title: '',
            type: '',
            image: '',
            ingredients: '',
            description: ''
        })
    };

    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Add New Recipe</h1>
                <p className={styles.pageSubtitle}>To add a new recipe, fill out the form.</p>
            </header>

            <form onSubmit={handleSubmit} className={styles.formCard}>

                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>Title</label>
                    <div className={styles.inputWrapper}>
                        <Type className={styles.icon} size={20} />
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Ex: biber dolması"
                            className={styles.input}
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="type" className={styles.label}>Category</label>
                    <div className={styles.inputWrapper}>
                        <List className={styles.icon} size={20} />
                        <select
                            id="type"
                            name="type"
                            className={styles.select}
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="soup">Soups</option>
                            <option value="main">Main Courses</option>
                            <option value="dessert">Desserts</option>
                            <option value="beverage">Beverages</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="image" className={styles.label}>Image URL</label>
                    <div className={styles.inputWrapper}>
                        <ImageIcon className={styles.icon} size={20} />
                        <input
                            type="text" // URL inputu
                            id="image"
                            name="img"
                            placeholder="https://..."
                            className={styles.input}
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="ingredients" className={styles.label}>Ingredients</label>
                    <div className={styles.textareaWrapper}>
                        <AlignLeft className={styles.iconTop} size={20} />
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            placeholder="Write the ingredients separated by commas."
                            className={styles.textarea}
                            rows={5}
                            value={formData.ingredients}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Instructions</label>
                    <div className={styles.textareaWrapper}>
                        <FileText className={styles.iconTop} size={20} />
                        <textarea
                            id="description"
                            name="recipetext"
                            placeholder="Write each step as a sentence."
                            className={styles.textarea}
                            rows={8}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className={styles.formFooter}>
                    <button type="submit" className={styles.submitButton}>
                        <Save size={20} />
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
}