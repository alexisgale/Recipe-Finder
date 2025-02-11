const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ✅ Get user favorites (on login or refresh)
router.get("/:userId/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favorites: user.favorites || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Toggle favorite (Add/Remove)
router.post("/:userId/favorites", async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipe } = req.body;

    if (!recipe || !recipe.idMeal) {
      return res.status(400).json({ message: "Invalid recipe data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already in favorites
    const index = user.favorites.findIndex((fav) => fav.idMeal === recipe.idMeal);

    if (index === -1) {
      user.favorites.push(recipe); // Add to favorites
    } else {
      user.favorites.splice(index, 1); // Remove from favorites
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
