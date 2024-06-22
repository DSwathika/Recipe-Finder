// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Recipe = require('./RecipeModel'); // Ensure this path matches your project structure

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/recipeFinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('MongoDB connection error:', err));

// POST endpoint to save a recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const existingRecipe = await Recipe.findOne({ idMeal: req.body.idMeal });
    if (existingRecipe) {
      return res.status(409).send('Recipe already exists');
    }

    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all recipes
app.get('/api/recipes', async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Server Listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
