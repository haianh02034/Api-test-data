import i18n, { PostProcessorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { raw } from '@back-end/utils';

// const translations = {};

const renderHtmlMiddleware: PostProcessorModule = {
  name: 'html',
  type: 'postProcessor',

  process: (value: string) => {
    return raw(value).toString();
  },
};
i18n
  .use(Backend)
  .use(initReactI18next)
  .use(renderHtmlMiddleware)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: '/assets/translations/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    parseMissingKeyHandler: function (key) {
      const val = key
        .replace(/(?:^panm\.|^pamm\.|_|\.)/g, ' ')
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase());

      // Object.assign(translations, { [key]: val });
      // setTimeout(() => console.log(JSON.stringify(translations)), 1000);
      return val;
    },
  });

export default i18n;
