import { useContext, useEffect, useState } from "react";

import LanguageContext from "../contexts/LanguageContext";
import { RecipeCard } from "./RecipeCard";
import { popularRecipes } from "../data/popularRecipes";
import RecipeContext from "../contexts/RecipesContext";

export const PopularDishes = () => {
  const { recipes, loading } = useContext(RecipeContext);
  // console.log(recipes);

  const popularDishes = recipes.filter((recipe) => recipe.is_popular);

  // console.log("popularRecipes", popularRecipes);

  return loading ? (
    <p className="text-2xl text-center mt-40">Loading...</p>
  ) : (
    <div
      className="bg-[var(--LIGHT-CREAM)] grid  gap-10 sm:gap-15 sm:grid-cols-2 lg:grid-cols-3
    xl:grid-cols-4 md:gap-15   lg:gap-14 mt-10 pb-50"
    >
      {popularDishes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};
