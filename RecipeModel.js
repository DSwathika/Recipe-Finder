// src/models/RecipeModel.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  idMeal: String,  // Unique identifier from TheMealDB
  strMeal: String,
  strCategory: String,
  strArea: String,
  strInstructions: String,
  strMealThumb: String,
  strTags: [String],
  ingredients: [String],
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeModel;
