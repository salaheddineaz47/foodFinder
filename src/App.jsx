import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const APP_ID = "73b47488";
  const APP_KEY = "cb99a2710fc5f1b98e146db967903b12";

  const fetchRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits.map((hit) => hit.recipe));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">
          Find Delicious Recipes
        </h1>
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for recipes..."
            className="border-2 border-white rounded p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/2 mr-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg text-lg shadow-md hover:bg-blue-500 transition duration-300"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
