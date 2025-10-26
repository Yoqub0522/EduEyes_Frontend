import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import uz from "./uz.json";

i18
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uz: { translation: uz },
    },
    fallbackLng: "uz",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18;
