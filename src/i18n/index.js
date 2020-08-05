import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en-US.js'
import zhCN from './zh-CN.js'
import zhTW from './zh-TW.js'

Vue.use(VueI18n)

var i18n = new VueI18n({
  locale: 'en-US',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
    'zh-TW': zhTW
  },
  sync: false,
  silentTranslationWarn: process.env.NODE_ENV.indexOf('production') !== -1
})

export default i18n
