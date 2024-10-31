import Vue from 'vue';
import VueI18n from 'vue-i18n';
import translations from "../resources/translations";

Vue.use(VueI18n);



const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: translations, // set locale messages
    silentTranslationWarn: true

});



export default i18n;