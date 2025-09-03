import { faCheck, faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SaveRecipeButton({ id }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");
  const [hasDateInput, setHasDateInput] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const prevCookingList =
    JSON.parse(localStorage.getItem("cooking-list")) || [];
  const [cookingList, setCookingList] = useState(prevCookingList);

  const { t } = useTranslation();
  const handleCookLaterClick = () => {
    setShowCalendar(true);
  };

  function handleChange(e) {
    setDate(e.target.value);
    setHasDateInput(true);
  }

  function handleSave(id) {
    setShowCalendar(false);
    setHasDateInput(false);

    // Find if the item already exists in the list
    const existingItem = cookingList.find((item) => item.id === id);

    if (existingItem) {
      // If the item exists and the date is different, update the date
      if (existingItem.date !== date) {
        setCookingList(
          cookingList.map((item) => (item.id === id ? { ...item, date } : item))
        );
      }
    } else {
      // If the item does not exist, add it to the list
      setCookingList((prev) => [...prev, { id, date }]);
    }

    setShowPopUp(true);
  }

  useEffect(() => {
    localStorage.setItem("cooking-list", JSON.stringify(cookingList));
    console.log(cookingList);
  }, [cookingList]);

  useEffect(() => {
    if (showPopUp) {
      const timer = setTimeout(() => {
        setShowPopUp(false);
      }, 3000);

      // cleanup if the component unmounts or showPopUp changes
      return () => clearTimeout(timer);
    }
  }, [showPopUp]);

  return (
    <div className="mt-10">
      <button
        onClick={hasDateInput ? () => handleSave(id) : handleCookLaterClick}
        className="ml-3 bg-[var(--BUTTON-BROWN)] px-3 py-2 rounded text-[var(--LIGHT-CREAM)] hover:text-white"
      >
        {hasDateInput
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
        <div className="fixed top-20 left-1/3 md:left-1/2 -translate-x-1/3 md:-translate-x-1/2 py-6 pl-6 pr-9 bg-[var(--LIGHT-CREAM)] rounded">
          <p>
            {" "}
            <FontAwesomeIcon icon={faCheck} /> {t("recipeDetails.popUp")}
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
