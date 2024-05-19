/**
 * Vuetify3 Plugin
 */
import { createVuetify, type VuetifyOptions } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { fa } from 'vuetify/iconsets/fa';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as labsComponents from 'vuetify/labs/components';
// Translations provided by Vuetify
import { en } from 'vuetify/locale';

import { custom } from '@/assets/customSvgs';
import '@mdi/font/css/materialdesignicons.css';
// import "@fortawesome/fontawesome-free/css/all.css";
// Misc
import { loadFonts } from '@/plugins/webfontloader';

// Styles
import 'vuetify/styles';

await loadFonts();

let vuetifyConfig: VuetifyOptions = {
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en },
  },
  theme: {
    defaultTheme: 'light',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
      advance: custom,
    },
  },
};

if (import.meta.env.DEV) {
  vuetifyConfig = {
    components: { components, labsComponents },
    directives,
    ...vuetifyConfig,
  };
}
// export default createVuetify(vuetifyConfig);

const vuetify = createVuetify(vuetifyConfig);

export default vuetify;

export { components, directives };
