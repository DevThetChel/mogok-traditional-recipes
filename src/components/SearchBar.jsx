import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeContext from "../contexts/RecipesContext";
import LanguageContext from "../contexts/LanguageContext";

export const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { recipes, loading } = useContext(RecipeContext);

  const { language } = useContext(LanguageContext);

  function handleSearch(e) {
    e.preventDefault();

    const normalizeText = (text) =>
      text ? text.normalize("NFC").toLowerCase().trim() : "";

    const trimmedSearchItem = normalizeText(searchItem);

    if (!trimmedSearchItem) {
      navigate("/recipes");
      return;
    }

    const searchRecipes = recipes.filter((recipe) => {
      if (language === "mm") {
        return normalizeText(recipe.name.mm).includes(trimmedSearchItem);
      } else {
        return normalizeText(recipe.name.en).includes(trimmedSearchItem);
      }
    });

    console.log("Search Results", searchRecipes);

    navigate("/recipes", { state: { searchRecipes } });
    setSearchItem("");
  }

  const handleReset = () => {
    setSearchItem("");
    if (location.pathname === "/recipes" && location.state?.searchRecipes) {
      navigate("/recipes", { replace: true });
    }
  };

  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSearch}
      action=""
      className="flex relative w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto"
    >
      <FontAwesomeIcon
        className="absolute top-[41px] left-5 z-2"
        icon={faSearch}
      />
      <input
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        type="text"
        placeholder={t("search.placeholder")}
        className="block w-full mt-7 bg-[var(--BG-BEIGE)] px-12 py-2 rounded-2xl mx-[auto] my-0 shadow-lg"
      />
      {searchItem || location.state?.searchRecipes ? (
        <button
          type="button"
          className=" p-1  bg-transparent absolute top-[33px] right-3"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : null}
    </form>
  );
};
