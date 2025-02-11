import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Store favorite recipes here
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { recipe } = action.payload;
      const existingRecipeIndex = state.items.findIndex((item) => item.idMeal === recipe.idMeal);

      if (existingRecipeIndex !== -1) {
        // Remove from favorites if it already exists
        state.items.splice(existingRecipeIndex, 1);
      } else {
        // Add to favorites if it does not exist
        state.items.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
