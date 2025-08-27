import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";

export const LanguageIcon = () => {
  const { showLanguages, setShowLanguages, handleLanguage } =
    useContext(LanguageContext);

  const { language } = useContext(LanguageContext);

  return (
    <div
      className="relative pb-2  inline"
      onMouseEnter={() => setShowLanguages(true)}
      onMouseLeave={() => setShowLanguages(false)}
    >
      <FontAwesomeIcon
        className="text-[var(--TITLE-COLOR)] ml-4"
        icon={faLanguage}
      />
      {showLanguages ? (
        <ul className="absolute top-6.5 left-[-10px] text-center">
          <li
            onClick={() => {
              handleLanguage("en");
            }}
            className={` ${
              language === "en" && "bg-[var(--BROWN)] "
            }hover:cursor-pointer hover:bg-[var(--BROWN)] border-1 px-3 py-2`}
          >
            English
          </li>
          <li
            onClick={() => {
              handleLanguage("mm");
            }}
            className={`${
              language === "mm" && "bg-[var(--BROWN)] "
            }hover:cursor-pointer  hover:bg-[var(--BROWN)] border-b-1 border-x-1 border-[var(--TITLE-COLOR)] px-3 py-2`}
          >
            မြန်မာ
          </li>
        </ul>
      ) : null}
    </div>
  );
};
