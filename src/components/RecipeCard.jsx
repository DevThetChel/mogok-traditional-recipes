import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";
import WarnTofu from "../../src/assets/images/home/tofu.jpeg";
import { useTranslation } from "react-i18next";
import Mixed from "../../src/assets/images/mixed.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const RecipeCard = ({ recipe }) => {
  const { language } = useContext(LanguageContext);

  const { id, image_url, ingredients, name, preparation, isFav } = recipe;

  // console.log(ingredients);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const eng = language === "en";
  return (
    <div className=" shadow border-2 border-[var(--LIGHT-CREAM)] rounded-2xl bg-[var(--BG-BEIGE)] p-5  transform transition duration-300 hover:scale-105 ">
      <figure className="relative mx-auto w-[95%] h-60 md:h-65 lg:h-60 overflow-hidden rounded-2xl mt-4">
        <img
          className="w-full h-full object-cover 
        "
          src={image_url}
          alt=""
        />
        <FontAwesomeIcon
          className={`${
            isFav ? "text-red-400" : "text-white"
          } absolute bottom-3 right-3 text-xl  drop-shadow-2xl drop-shadow-black`}
          icon={faHeart}
        />
      </figure>

      <p className="truncate text-[1.1rem] mt-5 pb-1">
        {eng ? name.en : name.mm}
      </p>
      <p className="line-clamp-1 mt-4 pb-1 leading-7">
        <span>{eng ? "Ingredients: " : "ပါဝင်ပစ္စည်းများ -"}</span>

        {Array.isArray(ingredients)
          ? ingredients.map((ingredient, index) =>
              eng
                ? ` ${ingredient.en}${
                    index < ingredients.length - 1 ? ", " : "."
                  }`
                : ` ${ingredient.mm}${
                    index < ingredients.length - 1 ? "၊ " : "။"
                  }`
            )
          : eng
          ? ingredients?.en || ""
          : ingredients?.mm || ""}
      </p>
      <p className="line-clamp-3 mt-3 pb-0.45 leading-6.5">
        {eng ? preparation.en : preparation.mm}
      </p>
      <button
        onClick={() => navigate(`/recipes/${id}`)}
        className="hover:text-white shadow bg-[var(--BUTTON-BROWN)] px-6 py-3 mt-5 rounded-2xl text-[var(--LIGHT-CREAM)]"
      >
        {t("home.popular.cardButton")}
      </button>
    </div>
  );
};
