import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { toggleFavorite } from "../redux/favoritesSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = (recipe) => {
    dispatch(toggleFavorite(recipe)); // Add or remove recipe from favorites
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchRecipes(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px" }}>Recipe Finder</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for key press
          placeholder="Search for recipes..."
          style={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "250px",
          }}
        />
        <button
          onClick={searchRecipes}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onFavoriteClick={handleFavoriteClick}
              />
            ))
          : !loading && (
              <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
                Search for a recipe first. 🍳
              </p>
            )}
      </div>
    </div>
  );
};

export default HomePage;
