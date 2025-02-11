import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import RecipeCard from "../components/RecipeCard";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.items || []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px" }}>
        Your Favorite Recipes
      </h1>
      {favorites.length === 0 ? (
        <p style={{ fontSize: "1.2rem", color: "#555", textAlign: "center", marginTop: "20px" }}>
          No favorite recipes yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              style={{
                width: "calc(33.33% - 15px)",
                marginBottom: "15px",
                boxSizing: "border-box",
              }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FavoritesPage.propTypes = {
  userId: PropTypes.string, // No longer required strictly
};

export default FavoritesPage;
