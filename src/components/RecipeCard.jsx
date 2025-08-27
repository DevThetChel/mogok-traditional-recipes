import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";
import WarnTofu from "../../src/assets/images/home/tofu.jpeg";
import { useTranslation } from "react-i18next";
import Mixed from "../../src/assets/images/mixed.jpg";

export const RecipeCard = ({ recipe }) => {
  const { language } = useContext(LanguageContext);

  const { id, image_url, ingredients, name, preparation, cooking_process } =
    recipe;

  const { t } = useTranslation();

  const eng = language === "en";
  return (
    <div className=" shadow border-2 border-[var(--LIGHT-CREAM)] rounded-2xl bg-[var(--BG-BEIGE)] p-5">
      <figure className="mx-auto w-[95%] h-55 overflow-hidden rounded-2xl mt-4">
        <img
          className="w-full h-full object-cover 
        "
          src="https://drive.google.com/file/d/1ZHIO5DWp6W7p8bVWuEpUi19WS-9nvwXZ/view?usp=drive_link"
          alt=""
        />
      </figure>

      <p className="text-[1.1rem] mt-5">{eng ? name.en : name.mm}</p>
      <p className="line-clamp-3 mt-3">
        {eng ? preparation.en : preparation.mm}
      </p>
      <button className="hover:text-white shadow bg-[var(--BUTTON-BROWN)] px-6 py-3 mt-5 rounded-2xl text-[var(--LIGHT-CREAM)]">
        {t("home.popular.cardButton")}
      </button>
    </div>
  );
};
