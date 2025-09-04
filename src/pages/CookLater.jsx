import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RecipeContext from "../contexts/RecipesContext";
import LanguageContext from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CookingListContext from "../contexts/CookingListContext";

export const CookLater = () => {
  const { t } = useTranslation();
  const { recipes } = useContext(RecipeContext);
  const { cookingList, removeFromList } = useContext(CookingListContext);
  const navigate = useNavigate();

  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const { language } = useContext(LanguageContext);

  // console.log(prevCookingList);

  const eng = language === "en";

  useEffect(() => {
    const matchedItems = recipes.filter((recipe) =>
      cookingList.find((item) => Number(item.id) === recipe.id)
    );

    // console.log(matchedItems);

    const savedCookingList = matchedItems.map((recipe) => {
      const savedItem = cookingList.find(
        (item) => Number(item.id) === recipe.id
      );

      return { ...recipe, date: savedItem ? savedItem.date : null };
    });

    setDisplayedRecipes(savedCookingList);
  }, [recipes, cookingList]);

  const formateDate = (date) => {
    const rawDate = date;
    const [year, month, day] = rawDate.split("-");

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  return (
    <main className="min-h-[150vh] mt-0 bg-[var(--LIGHT-CREAM)]">
      <section className="pt-25">
        <h2 className="text-[1.6rem] md:text-3xl  text-center text-[var(--TITLE-COLOR)] mb-5">
          {t("cookLater.title")}
        </h2>
      </section>
      {displayedRecipes.length > 0 ? (
        <div className="mt-15 flex  justify-center">
          <ul className="w-[95%] md:w-[70%] lg:w-[55%] xl:w-[45%]">
            {displayedRecipes.map((recipe, index) => (
              <li
                className="group flex w-full justify-between items-center mb-10 px-6 py-4
                bg-[var(--BG-BEIGE)] rounded"
                key={`${recipe.id}-${index}`}
              >
                <div className="flex items-center">
                  <img
                    src={recipe.image_url}
                    className="rounded-full w-[40px] h-[40px] object-cover"
                    alt=""
                  />
                  <div className="flex flex-col lg:flex-row ml-5">
                    <span>{`${eng ? recipe.name.en : recipe.name.mm} `}</span>
                    <span className="lg:ml-3">
                      {" "}
                      {`( ${formateDate(recipe.date)} )`}{" "}
                    </span>
                  </div>
                </div>
                <div className="hidden group-hover:flex gap-5 lg:gap-7 lg:mr-4">
                  <span>
                    <FontAwesomeIcon
                      onClick={() => removeFromList(recipe.id)}
                      icon={faTrash}
                      className=" text-[0.8rem] lg:text-[1rem] "
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className=" text-[0.8rem] lg:text-[1rem]"
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-40 text-center text-xl">{t("cookLater.notFound")}</p>
      )}
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
