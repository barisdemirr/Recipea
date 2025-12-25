"use client";

import React, { useState, useRef } from 'react';
import { Save, Type, Image as ImageIcon, FileText, List, AlignLeft } from 'lucide-react';
import styles from './styles.module.css';
import Cookies from 'js-cookie';
import {AddRecipeService} from "@/services/recipes"

export default function AddRecipe() {
    const formRef = useRef(null)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const file = event.target.img.files[0]
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (!file || file.size > 2097152 || !allowedTypes.includes(file.type)){
            setError("Check the image!")
            return {};
        }

        const token = Cookies.get("admin_token")

        if (!token){
            setError("Authentication failed!")
            return {};
        }
        
        try {
            
            const res = await AddRecipeService(formData, token)
            console.log(res)

            if (!res.ok){
                throw new Error("Server connection failed!")
            }

            formRef.current.reset()

        } catch (err) {
            console.log(err)
            setError(err.message)
        }   
    };



    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Add New Recipe</h1>
                <p className={styles.pageSubtitle}>To add a new recipe, fill out the form.</p>
            </header>

            {error && <div className={styles.errorMessage}>{error}</div>}

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