import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipesContext";
import { useTranslation } from "react-i18next";
import LanguageContext from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import FavRecipeCard from "../components/FavRecipesCard";

export const Favorites = () => {
  const { favRecipeIds, recipes } = useContext(RecipeContext);
  // console.log(favRecipeIds);

  const { t } = useTranslation();

  const favRecipes = recipes.filter((recipe) => recipe.isFav === true);

  // console.log(favRecipes);

  const navigate = useNavigate();

  return (
    <main className="min-h-[150vh] mt-0 bg-[var(--LIGHT-CREAM)]">
      <section className="pt-25">
        <h2 className="text-[1.6rem] md:text-3xl  text-center text-[var(--TITLE-COLOR)] mb-5">
          {t("favRecipes.title")}
        </h2>
      </section>
      <section className="w-[90%] sm:w-[78%] md:w-[60%] lg:w-[77%] mt-20 mx-auto">
        {favRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-9 gap-y-15 lg:grid-cols-2">
            {favRecipes.map((recipe) => (
              <FavRecipeCard recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="mt-40 flex flex-col items-center ">
            <p className="text-xl  ">{t("favRecipes.notFound")}</p>
          </div>
        )}
      </section>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/recipes")}
          className="mt-20 inline px-5 py-3 bg-[var(--BUTTON-BROWN)] rounded-xl text-[var(--LIGHT-CREAM)] hover:text-white"
        >
          {t("favRecipes.addButton")}
        </button>
      </div>
    </main>
  );
};
