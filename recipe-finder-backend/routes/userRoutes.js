const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get user favorites
router.get("/:userId/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add or remove a favorite recipe
router.post("/:userId/favorites", async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipe } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.favorites.findIndex((fav) => fav.idMeal === recipe.idMeal);

    if (index === -1) {
      user.favorites.push(recipe);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();
    res.json({ message: "Favorites updated", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
