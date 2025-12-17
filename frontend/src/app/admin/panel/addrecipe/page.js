"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { Save, Type, Image as ImageIcon, FileText, List, AlignLeft } from 'lucide-react';
import styles from './styles.module.css';
import Cookies from 'js-cookie';

export default function AddRecipe() {
    const formRef = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const file = event.target.img.files[0]
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (!file || file.size > 2097152 || !allowedTypes.includes(file.type)){
            console.log("Check the form!")
            return {};
        }

        const token = Cookies.get("admin_token")

        if (!token){
            console.log("401");
            return {};
        }
        
        try {
            const res = await fetch('http://localhost:5170/api/recipes/addrecipe', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })
            if (!res.ok){
                throw new Error
            }

            formRef.current.reset()

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Add New Recipe</h1>
                <p className={styles.pageSubtitle}>To add a new recipe, fill out the form.</p>
            </header>

            <form ref={formRef} onSubmit={handleSubmit} className={styles.formCard}>

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
                            required
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
                            className="form-control w-25"
                            multiple={false}
                            type="file"
                            name="img"
                            id="image"
                        ></input>
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