// src/components/Recipe.js
import React, { useState } from 'react';
import axios from 'axios';

const Recipe = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [sortKey, setSortKey] = useState('strMeal');

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortRecipes = (key) => {
    setSortKey(key);
    setRecipes(recipes.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1)));
  };

  const saveRecipe = (recipe) => {
    axios.post('http://localhost:3001/api/recipes', recipe)
      .then(response => {
        alert('Recipe saved!');
      })
      .catch(error => {
        console.error('Error saving recipe:', error);
      });
  };

  // Function to render ingredients
  const renderIngredients = (recipe) => {
    return Object.keys(recipe)
      .filter(key => key.startsWith('strIngredient') && recipe[key])
      .map(key => <li key={key}>{recipe[key]}</li>);
  };

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={handleSearchInput} 
        placeholder="Enter a dish name..."
      />
      <button onClick={fetchRecipes}>Search</button>
      <button onClick={() => sortRecipes('strMeal')}>Sort by Name</button>
      <button onClick={() => sortRecipes('strCategory')}>Sort by Category</button>
      {recipes.length > 0 ? recipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <h1>{recipe.strMeal}</h1>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{width: '200px', height: '200px', objectFit: 'cover'}} />
          <p><strong>Instructions:</strong> {recipe.strInstructions.substring(0, 100)}...</p>
          <ul><strong>Ingredients:</strong> {renderIngredients(recipe)}</ul>
          <button onClick={() => saveRecipe(recipe)}>Save</button>
        </div>
      )) : <p>No recipes found. Please try another search.</p>}
    </div>
  );
}

export default Recipe;
