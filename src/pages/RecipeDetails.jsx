import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeContext from "../contexts/RecipesContext";
import LanguageContext from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import SaveRecipeButton from "../components/SaveRecipeButton";

export const RecipeDetails = () => {
  const { id } = useParams();
  const idNumber = Number(id);

  const { recipes, setRecipes, loading } = useContext(RecipeContext);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const eng = language === "en";

  const recipeToShow = recipes.find((recipe) => recipe.id === idNumber);

  if (loading) {
    return (
      <p className="mt-80 text-2xl text-center">Loading recipe details...</p>
    );
  }

  if (!recipeToShow) {
    return (
      <p className="mt-80 text-2xl text-center">
        Sorry, that recipe was not found.
      </p>
    );
  }

  const { name, cooking_process, image_url, ingredients, preparation, isFav } =
    recipeToShow;

  // Function to update and save favorites in localStorage
  function updateFavorites(recipeId, isFavorite) {
    // Get current favorites, or an empty array if none exist
    const favorites = JSON.parse(
      localStorage.getItem("favoriteRecipeIds") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      // Add the recipeId if it's not already in the array
      newFavorites = [...new Set([...favorites, recipeId])];
    } else {
      // Remove the recipeId from the array
      newFavorites = favorites.filter((id) => id !== recipeId);
    }

    // Save the updated array to localStorage
    localStorage.setItem("favoriteRecipeIds", JSON.stringify(newFavorites));
  }

  function handleFav() {
    const newFavStatus = !isFav;

    // Update the local state first
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === idNumber ? { ...recipe, isFav: newFavStatus } : recipe
      )
    );

    // Then update localStorage
    updateFavorites(idNumber, newFavStatus);
  }

  return (
    <main
      className="mt-30 w-[80%] sm:w-[70%] md:w-[65%] lg:w-[80%] mx-auto block lg:flex lg:gap-10 xl:gap-15
    "
    >
      <section className="name-and-photo lg:w-[35%] ">
        <p className="text-3xl">{eng ? name.en : name.mm}</p>
        <figure className="relative mt-10 w-[80%] md:w-[80%]  h-[330px]  lg:w-full md:h-[400px] xl:h-[450px] rounded-xl mx-0 md:mx-0 lg:mx-auto overflow-hidden ">
          <img className="w-full h-full object-cover" src={image_url} alt="" />
          <FontAwesomeIcon
            onClick={handleFav}
            className={`${
              isFav ? "text-red-400" : "text-white"
            } absolute bottom-5 right-5 text-2xl  drop-shadow-2xl drop-shadow-black`}
            icon={faHeart}
          />
        </figure>
        <SaveRecipeButton id={id} />
      </section>

      <section className="pb-30 details lg:w-[60%] xl:w-[60%]">
        <p className="text-xl mb-5 mt-10">
          {t("recipeDetails.ingredientsTitle")}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {ingredients.length > 0 &&
            ingredients.map((ingredient, index) => (
              <li
                key={`${ingredient.id}-${index}`}
                className="flex items-start"
              >
                <span className="flex-shrink-0">•</span>
                <span className="ml-2">
                  {eng ? ingredient.en : ingredient.mm}
                </span>
              </li>
            ))}
        </ul>
        <p className="mt-10 mb-5 text-xl">
          {t("recipeDetails.preparationTitle")}
        </p>
        <p>{eng ? preparation.en : preparation.mm}</p>
        <p className="mt-10 mb-5 text-xl">
          {t("recipeDetails.cookingProcessTitle")}
        </p>
        <p>{eng ? cooking_process.en : cooking_process.mm}</p>
      </section>
    </main>
  );
};
