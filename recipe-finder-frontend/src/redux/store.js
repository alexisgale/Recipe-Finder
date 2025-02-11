import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Auth state
    favorites: favoritesReducer, // Favorites state
  },
});

export default store;
