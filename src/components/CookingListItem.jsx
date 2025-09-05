import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";

export default function CookingListItem({
  recipe,
  index,
  removeFromList,
  handleEditCookingDate,
  formateDate,
}) {
  const { language } = useContext(LanguageContext);
  const eng = language === "en";
  const navigate = useNavigate();
  return (
    <li
      className="group flex w-full justify-between items-center mb-13 px-6 py-4
                 bg-[var(--BG-BEIGE)] rounded"
      key={`${recipe.id}-${index}`}
    >
      <div className="flex items-center">
        <img
          src={recipe.image_url}
          className="rounded-full w-[40px] h-[40px] object-cover"
          alt=""
        />
        <div
          className="flex flex-col lg:flex-row ml-5 "
          onClick={() => navigate(`/recipes/${recipe.id}`)}
        >
          <span
            className="mb-1
            hover:underline
            hover:underline-offset-3 hover:cursor-pointer 
            "
          >{`${eng ? recipe.name.en : recipe.name.mm}`}</span>
          <span className="lg:ml-3"> {`( ${formateDate(recipe.date)} )`} </span>
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
            onClick={() => handleEditCookingDate(recipe.id)}
            icon={faEdit}
            className=" text-[0.8rem] lg:text-[1rem]"
          />
        </span>
      </div>
    </li>
  );
}
