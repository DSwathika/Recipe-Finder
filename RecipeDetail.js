// components/RecipeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  let { id } = useParams();
  return <h1>Details for Recipe {id}</h1>;
}

export default RecipeDetails;
