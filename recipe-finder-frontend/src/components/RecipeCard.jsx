import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items || []);
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const handleFavoriteClick = () => {
    // Add or remove the recipe from favorites
    dispatch(toggleFavorite({ recipe }));
  };

  return (
    <div
      className="recipe-card"
      style={{
        position: "relative",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "10px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleFavoriteClick}
      >
        <FontAwesomeIcon
          icon={isFavorite ? solidHeart : regularHeart}
          style={{
            fontSize: "20px",
            color: isFavorite ? "red" : "#ccc", // Red if favorite
            transition: "color 0.3s ease",
          }}
        />
      </div>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
      />
      <div style={{ padding: "10px" }}>
        <h3 style={{ fontSize: "1.2rem", margin: "0 0 10px" }}>{recipe.strMeal}</h3>
        <p style={{ fontSize: "0.9rem", color: "#555" }}>
          {recipe.strInstructions?.slice(0, 100)}...
        </p>
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}
        >
          See Full Recipe
        </a>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCard;
