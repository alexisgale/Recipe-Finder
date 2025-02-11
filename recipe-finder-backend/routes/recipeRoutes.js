const express = require("express");
const axios = require("axios");

const router = express.Router();

// Get recipes by search term
router.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    res.json(response.data.meals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

module.exports = router;
