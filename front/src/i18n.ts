// import i18n from "i18next";
// import Backend from 'i18next-http-backend';
// import LanguageDetector from "i18next-browser-languagedetector";
// import {initReactI18next} from "react-i18next";

// i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
//     backend:{
//         loadPath:"/assets/i18n/{{ns}}/{{lng}}.json",
//     },
//     fallbackLng:"en",
//     debug:false,
//     ns:["common","home"],
//     interpolation:{
//         escapeValue:false,
//         formatSeparator:",",
//     },
//     react:{
//         wait:true,
//     },
// } as const,undefined);
// export default i18n;
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // translation file path
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    // disabled in production
    debug: false,
    // can have multiple namespaces, in case you want to divide a huge
    // translation into smaller pieces and load them on demand
    ns: [
      "common",
      "home",
      "profile",
      "chart",
      "navbar",
      "CategoryCard",
      "itemCard",
      "messageModal",
      "addItemModal",
      "addCategoryModal",
      "invoiceForm",
      "invoiceTable",
      "filterMenu",
      "invoice",
      "logreg",
      "validation",
      "serverResponse",
      "addImg",
    ],
  });

export default i18n;