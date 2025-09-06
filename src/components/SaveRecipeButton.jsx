// SaveRecipeButton.jsx
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import CookingListContext from "../contexts/CookingListContext"; // Import the new context

export default function SaveRecipeButton({ id }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");
  const [hasDateInput, setHasDateInput] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  const { cookingList, addToList, removeFromList } =
    useContext(CookingListContext); // Use context here

  const isAlreadyInTheList = cookingList.some(
    (item) => Number(item.id) === Number(id)
  );

  const { t } = useTranslation();

  const handleCookLaterClick = () => {
    setShowCalendar(true);
  };

  function handleChange(e) {
    setDate(e.target.value);
    setHasDateInput(true);
  }

  function handleSave() {
    setShowCalendar(false);
    setHasDateInput(false);
    addToList(id, date); // Use context function
    setShowPopUp(true);
    setPopUpMessage(t("recipeDetails.popUpAdded"));
  }

  function handleRemove() {
    console.log(`removed ${id}`);
    removeFromList(id); // Use context function
    setPopUpMessage(t("recipeDetails.popUpRemoved"));
    setShowPopUp(true);
  }

  useEffect(() => {
    if (showPopUp) {
      const timer = setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopUp]);

  return (
    <div className="mt-10">
      <button
        onClick={
          isAlreadyInTheList
            ? handleRemove
            : hasDateInput
            ? handleSave
            : handleCookLaterClick
        }
        className="ml-3 text-center bg-[var(--BUTTON-BROWN)] px-3 py-2 rounded text-[var(--LIGHT-CREAM)] hover:text-white"
      >
        {isAlreadyInTheList
          ? t("recipeDetails.saveRecipeButton.remove")
          : hasDateInput
          ? t("recipeDetails.saveRecipeButton.save")
          : t("recipeDetails.saveRecipeButton.cookLater")}
      </button>

      {showCalendar && (
        <>
          <input
            type="date"
            onChange={handleChange}
            value={date}
            className="ml-5"
          />
        </>
      )}

      {showPopUp && (
        <div className="fixed top-20   left-1/2 -translate-x-1/2 py-6 pl-6 pr-9 bg-[var(--LIGHT-CREAM)] rounded">
          <p>
            <FontAwesomeIcon icon={faCheck} /> {popUpMessage}
          </p>
          <div onClick={() => setShowPopUp(false)}>
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-3 right-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
