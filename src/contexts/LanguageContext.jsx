import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export function LanguageContextProvider({ children }) {
  const prevLanguage = JSON.parse(localStorage.getItem("lang")) || "en";

  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState(prevLanguage);

  const { i18n } = useTranslation();

  function handleLanguage(lang) {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setShowLanguages(false);
    localStorage.setItem("lang", JSON.stringify(lang));
  }
  return (
    <LanguageContext.Provider
      value={{
        language,
        handleLanguage,
        showLanguages,
        setShowLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
