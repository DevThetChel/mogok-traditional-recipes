import React from "react";
import { SearchBar } from "../components/SearchBar";
import getRecipes from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";
import { useTranslation } from "react-i18next";

export const Recipes = () => {
  const { t } = useTranslation();
  const { recipes, loading } = getRecipes();
  console.log(loading);

  return (
    <main className="min-h-[200vh] mt-0 bg-[var(--LIGHT-CREAM)]">
      <section className="pt-25">
        <h2 className="text-[1.7rem] md:text-3xl  text-center text-[var(--TITLE-COLOR)] mb-5">
          {t("recipes.mainTitle")}
        </h2>
        <SearchBar />
      </section>
      {/* Recipes Section  */}
      <section className="w-[70%] sm:w-[90%] md:w-[90%] lg:w-[85%] my-0 mx-auto min-h-[100vh]">
        {loading ? (
          <p className="text-2xl text-center mt-40">Loading...</p>
        ) : (
          <div className="bg-[var(--LIGHT-CREAM)] grid  gap-10 sm:gap-15 sm:grid-cols-2 md:grid-cols-3 md:gap-10  xl:grid-cols-4  lg:gap-14 mt-10 pb-50">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
