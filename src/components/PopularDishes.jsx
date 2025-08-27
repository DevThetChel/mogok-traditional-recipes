import { useContext, useEffect, useState } from "react";

import LanguageContext from "../contexts/LanguageContext";
import { RecipeCard } from "./RecipeCard";
import { popularRecipes } from "../data/popularRecipes";
import getRecipes from "../data/recipes";

export const PopularDishes = () => {
  const { language } = useContext(LanguageContext);

  const recipes = getRecipes();
  console.log("recipes,", recipes);

  return (
    <div className="bg-[var(--LIGHT-CREAM)] grid  gap-10 sm:gap-15 sm:grid-cols-2 md:grid-cols-3 md:gap-10  xl:grid-cols-4  lg:gap-14 mt-10">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};
