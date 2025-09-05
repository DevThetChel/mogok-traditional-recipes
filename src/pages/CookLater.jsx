import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RecipeContext from "../contexts/RecipesContext";
import LanguageContext from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import CookingListContext from "../contexts/CookingListContext";
import CookingListItem from "../components/CookingListItem";

export const CookLater = () => {
  const { t } = useTranslation();
  const { recipes } = useContext(RecipeContext);
  const { cookingList, removeFromList, editCookingDate } =
    useContext(CookingListContext);
  const navigate = useNavigate();

  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const { language } = useContext(LanguageContext);

  const eng = language === "en";

  useEffect(() => {
    const matchedItems = recipes.filter((recipe) =>
      cookingList.find((item) => Number(item.id) === recipe.id)
    );

    const savedCookingList = matchedItems.map((recipe) => {
      const savedItem = cookingList.find(
        (item) => Number(item.id) === recipe.id
      );

      return { ...recipe, date: savedItem ? savedItem.date : null };
    });

    setDisplayedRecipes(savedCookingList);
  }, [recipes, cookingList]);

  const formateDate = (date) => {
    const dateObject = new Date(date);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthName = months[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    const formattedDate = `${monthName}-${day}-${year}`;
    return formattedDate;
  };
  function handleEditCookingDate(id) {
    setShowCalendar(true);
    setEditingRecipeId(id); // Store the ID of the recipe to be edited
  }

  function handleDateInput(e) {
    const newDateValue = e.target.value;
    setNewDate(newDateValue);
    // setShowCalendar(false);

    // Update the date in the context and local storage
    if (editingRecipeId) {
      editCookingDate(editingRecipeId, newDateValue);
      setEditingRecipeId(null); // Reset the editing ID
      setNewDate(""); // Reset the new date
    }
  }

  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  const todayCookingList = displayedRecipes.filter(
    (recipe) => recipe.date === getCurrentDate()
  );

  console.log(todayCookingList);

  return (
    <main className="relative min-h-[150vh] mt-0 bg-[var(--LIGHT-CREAM)]">
      {showCalendar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          onClick={() => setShowCalendar(false)}
        >
          <div
            className="fixed top-65 left-1/2 -translate-x-1/2 bg-amber-50 px-15 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="date"
              value={newDate}
              onChange={handleDateInput}
              min={getCurrentDate()}
            />
            <span
              onClick={() => setShowCalendar(false)}
              className="absolute top-2 right-2"
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        </div>
      )}

      {todayCookingList.length > 0 && (
        <>
          <section className="pt-25">
            <h2 className="text-[1.6rem] md:text-3xl text-center text-[var(--TITLE-COLOR)] mb-5">
              {t("cookLater.todayListTitle")}
            </h2>
          </section>
          <div className="mt-17 flex justify-center">
            <ul className="w-[95%] md:w-[70%] lg:w-[55%] xl:w-[45%]">
              {todayCookingList?.map((recipe, index) => (
                <CookingListItem
                  recipe={recipe}
                  index={index}
                  removeFromList={removeFromList}
                  handleEditCookingDate={handleEditCookingDate}
                  formateDate={formateDate}
                />
              ))}
            </ul>
          </div>
        </>
      )}

      <section className={todayCookingList.length > 0 ? "pt-5" : "pt-25"}>
        <h2 className="text-[1.6rem] md:text-3xl text-center text-[var(--TITLE-COLOR)] mb-5">
          {t("cookLater.title")}
        </h2>
      </section>
      {displayedRecipes.length > 0 ? (
        <div className="mt-17 flex justify-center">
          <ul className="w-[95%] md:w-[70%] lg:w-[55%] xl:w-[45%]">
            {displayedRecipes.map((recipe, index) => (
              <CookingListItem
                recipe={recipe}
                index={index}
                removeFromList={removeFromList}
                handleEditCookingDate={handleEditCookingDate}
                formateDate={formateDate}
              />
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
