const axios = require("axios");

// Get the Spoonacular API key from environment variables
const API_KEY = process.env.SPOONACULAR_API_KEY;

const fetchRecipes = async (req, res) => {
  const { query } = req.query; // Recipe search query

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&number=10`
    );

    const recipes = response.data.results.map((recipe) => ({
      title: recipe.title,
      image: recipe.image,
      calories: recipe.nutrition ? recipe.nutrition.nutrients[0].amount : "N/A",
      url: `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-").toLowerCase()}-${
        recipe.id
      }`,
    }));

    res.json({ hits: recipes });
  } catch (error) {
    console.error("Error fetching from Spoonacular API:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

module.exports = { fetchRecipes };
