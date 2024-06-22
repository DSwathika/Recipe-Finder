
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Recipe from './Recipe';
import SavedRecipes from './SavedRecipes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Recipe Finder</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/saved">Saved Recipes</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route path="/saved" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
