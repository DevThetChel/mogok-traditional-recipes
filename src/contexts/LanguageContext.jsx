import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export function LanguageContextProvider({ children }) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState("en");

  const { i18n } = useTranslation();

  function handleLanguage(lang) {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setShowLanguages(false);
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
