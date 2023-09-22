import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from './spanishMessages';

const i18nProvider = polyglotI18nProvider(
    () => spanishMessages, 'es'
    );

export { i18nProvider };