const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  calories: { type: Number, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Recipe", recipeSchema);
