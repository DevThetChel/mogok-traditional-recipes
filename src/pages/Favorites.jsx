import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipesContext";

export const Favorites = () => {
  const { favRecipeIds } = useContext(RecipeContext);
  console.log(favRecipeIds);

  return <div>Favorites</div>;
};
