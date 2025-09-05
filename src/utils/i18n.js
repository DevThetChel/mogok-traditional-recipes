import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./../locale/en/translation.json";
import mm from "./../locale/mm/translation.json";

const userLanguage = JSON.parse(localStorage.getItem("lang")) || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mm: { translation: mm },
  },
  fallbackLng: "en",
  lng: userLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
