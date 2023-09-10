import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// the translations
const resources = {
  en: {
    translation: {
      menu: {
        "link-1": "Home",
        "link-2": "Search",
        "link-3": "Report Item",
        "link-4": "Alert Me",
        "link-5": "Contact Us",
        "link-6": "Login",
        "link-7": "Sign Up",
        "lng-en": "English",
        "lng-fr": "Français",
        dev: "Developed by N.S",
      },

      document_id: "ID Card",
      document_passport: "Passport",
      document_license: "Driver License",
      document_credit: "Credit Card",
      slogan:
        "We have put smiles on Faces! TrackMyLost reunites you with your lost documents",
      homepage: {
        items_descr: "We support the following items",
        quote: "TrackMyLost reunites you with your lost documents",
        "btn-1": "Lost something? search now",
        "btn-2": "Found something? register it",
        "btn-3": "Wish to get notified ? set alert",
      },
      reportpage: {
        heading: "Found a lost document",
        subheading1: "Register it below",
        subheading2: "Register",
        howto: {
          id: "How it Works",
          step1: {
            id: "STEP 1",
            descr: "Fill out the form",
          },
          step2: {
            id: "STEP 2",
            descr: "Wait for owner to call you",
          },
        },
      },
      alertpage: {
        instruction: "Set an alert below",
        heading: "Need to know when we find your item",
      },
      form: {
        fullname: "Full names",
        "doc-type": "Type of document",
        "doc-choose": "Select document type",
        firstname: "First  Name",
        number: "Phone Number",
        othernames: "Other Names",
        password: "Password",
        reward: "Would you like a reward",
      },
    },
  },
  fr: {
    translation: {
      menu: {
        "link-1": "Accueil",
        "link-2": "Rechercher",
        "link-3": "Signaler l'élément",
        "link-4": "Avertissez-moi",
        "link-5": "Contactez-nous",
        "link-6": "connexion",
        "link-7": "S'inscrire",
        "lng-en": "English",
        "lng-fr": "Français",
        dev: "Développé par N.S",
      },

      document_id: "Carte d'identité",
      document_passport: "Passeport",
      document_license: "Permis de conduire",
      document_credit: "Cartes de crédit",

      slogan:
        "Nous avons mis des sourires sur les visages ! TrackMyLost vous réunit avec vos documents perdus",
      homepage: {
        items_descr: "Nous prenons en charge les éléments suivants",
        quote: "TrackMyLost vous réunit avec vos documents perdus",
        "btn-1": "Appuyez pour obtenir document",
        "btn-2": "Signaler une perte ici",
        "btn-3": "Placer une alerte de perte",
      },
      reportpage: {
        heading: "Document trouvé",
        subheading1: "Enregistrez-le ci-dessous",
        subheading2: "Enregistrez",
        howto: {
          id: "Comment ça fonctionne",
          step1: {
            id: "ÉTAPE 1",
            descr: "Remplissez le formulaire",
          },
          step2: {
            id: "ÉTAPE 1",
            descr: "Attendez que le propriétaire vous appelle",
          },
          step3: "",
        },
      },
      alertpage: {
        instruction: "Déclancher une alerte ci-dessous",
        heading: "",
      },
      form: {
        fullname: "Noms complets",
        "doc-type": "Genre de document",
        "doc-choose": "Veuillez choisir le type de document",
        firstname: "Prénom",
        number: "Votre numéro de téléphone",
        othernames: "Autres noms",
        password: "Mot de passe",
        reward: "Souhaitez-vous une récompense",
      },
    },
  },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    resources,
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
