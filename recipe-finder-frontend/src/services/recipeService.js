export const getRecipes = async (query) => {
  try {
    const response = await fetch(`http://localhost:5000/api/recipes?query=${query}`);
    if (!response.ok) throw new Error("Failed to fetch recipes");

    const data = await response.json();
    console.log("Fetched data:", data); // Debug log
    return data.hits || [];
  } catch (error) {
    console.error("Error in getRecipes:", error);
    throw error; // Re-throw to handle in App.jsx
  }
};
