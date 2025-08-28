import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, get, child } from "firebase/database";

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "recipes"));
        if (snapshot.exists()) {
          setRecipes(snapshot.val());
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
        loading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
