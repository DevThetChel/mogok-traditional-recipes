import React, { useContext } from "react";
import { SearchBar } from "../components/SearchBar";
import { RecipeCard } from "../components/RecipeCard";
import { useTranslation } from "react-i18next";
import RecipeContext from "../contexts/RecipesContext";
import { useLocation } from "react-router-dom";

export const Recipes = () => {
  const { t } = useTranslation();
  const { recipes, loading } = useContext(RecipeContext);
  const location = useLocation();
  // console.log(loading);

  const searchRecipes = location.state?.searchRecipes;
  // console.log(searchRecipes);

  const recipesToDisplay = searchRecipes || recipes;

  return (
    <main className="min-h-[200vh] mt-0 bg-[var(--LIGHT-CREAM)]">
      <section className="pt-25">
        <h2 className="text-[1.6rem] md:text-3xl  text-center text-[var(--TITLE-COLOR)] mb-5">
          {t("recipes.mainTitle")}
        </h2>
        <SearchBar />
      </section>
      {/* Recipes Section  */}
      <section className="w-[87%] sm:w-[90%] md:w-[90%] lg:w-[85%] mt-20 mx-auto min-h-[100vh]">
        {loading ? (
          <p className="text-2xl text-center mt-40">Loading...</p>
        ) : (
          <>
            {recipesToDisplay.length > 0 ? (
              <div
                className="bg-[var(--LIGHT-CREAM)] grid  gap-10 sm:gap-15 sm:grid-cols-2 lg:grid-cols-3
    xl:grid-cols-4 md:gap-15   lg:gap-14 mt-10 pb-50"
              >
                {recipesToDisplay.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-2xl text-center mt-40">
                {t("recipes.notFound")}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
};
