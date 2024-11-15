import { useState } from "react";
import RecipeCard from "./RecipeCard";
import Error from "./Error";
import Footer from "./Footer";

import "react-loading-skeleton/dist/skeleton.css";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const APP_ID = "73b47488";
  const APP_KEY = "cb99a2710fc5f1b98e146db967903b12";

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(false);
    setRecipes([]);
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    if (data.count === 0) setError(true);
    const fetchedRecipes = data.hits.map((hit) => hit.recipe);
    setRecipes(fetchedRecipes);
    setAllRecipes(fetchedRecipes);
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);

    if (filter === "") setRecipes([...allRecipes]);
    else {
      const sortedRecipes = [...allRecipes].sort(
        (a, b) => a[filter] - b[filter]
      );
      setRecipes(sortedRecipes);
    }
  };
  return (
    <>
      <div className="bg-[linear-gradient(to_right_bottom,_#eb984e,_#e67e22)] font-roboto min-h-screen flex items-center justify-center">
        <div className="container mx-auto p-4 py-8 text-black">
          {/* <h1 className="text-4xl text-[#eee] font-bold text-center mb-8">
            Discover Tasty Treats
          </h1> */}
          <h1 className="text-5xl font-extrabold mb-4 text-center">
            <p>Discover Your Next</p>
            <p>
              Meal with
              <span className="text-[#eee]">Food Finder</span>
            </p>
          </h1>
          <p className="text-lg mb-8 text-center">
            Explore delicious recipes, find new dishes.
          </p>
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

          {recipes.length > 0 && (
            <div className="mb-4 flex justify-center items-center">
              <label htmlFor="filter" className="mr-4 text-lg font-medium">
                Filter By :
              </label>
              <select
                id="filter"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cf711f]"
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                <option value="">Select a filter...</option>
                <option value="totalTime">Total Time</option>
                <option value="totalWeight">Total Weight</option>
                <option value="calories">Calories</option>
              </select>
            </div>
          )}

          {error && <Error />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading && recipes.length === 0 && (
              <RecipeCardSkeleton cards={9} />
            )}

            {!error &&
              !isLoading &&
              recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
