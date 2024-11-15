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
    console.log(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="bg-[linear-gradient(to_right_bottom,_#eb984e,_#e67e22)] font-roboto min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 py-8 text-black">
        <h1 className="text-4xl font-bold text-center mb-8">
          Discover Tasty Treats
        </h1>
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for recipes..."
            className="text-black border-2 border-white rounded p-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#cf711f] w-1/2 mr-4"
          />
          <button
            type="submit"
            className="bg-[#fff] text-black py-3 px-6  rounded-lg text-lg  hover:bg-[#fdf2e9] transition duration-300 shadow-[inset_0_0_0_3px_#fff]"
          >
            Discover
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
