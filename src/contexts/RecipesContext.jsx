import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, get, child } from "firebase/database";

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the value from localStorage and store it in a temporary variable
  const storedFavIds = localStorage.getItem("favoriteRecipeIds");

  // Check if the value exists before parsing it
  const favRecipeIds = storedFavIds ? JSON.parse(storedFavIds) : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "recipes"));
        if (snapshot.exists()) {
          const rawRecipes = snapshot.val();

          const recipesArray = Array.isArray(rawRecipes)
            ? rawRecipes
            : Object.values(rawRecipes);

          const mergedRecipes = recipesArray.map((recipe) => ({
            ...recipe,
            isFav: favRecipeIds.includes(recipe.id),
          }));

          setRecipes(mergedRecipes);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        loading,
        favRecipeIds,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
