// src/components/SavedRecipes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/recipes');
            setRecipes(response.data);
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    return (
        <div>
            <h1>Saved Recipes</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {recipes.map(recipe => (
                    <div key={recipe.idMeal} style={{ margin: '20px', textAlign: 'center' }}>
                        <h3>{recipe.strMeal}</h3>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '200px', height: '200px' }} />
                        <p>{recipe.strInstructions.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedRecipes;
