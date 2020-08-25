import Vue from 'vue'
import Vuex from 'vuex'
import common from './Common'
import verify from './Verify'

Vue.use(Vuex)

const modules = { common, verify }

export default new Vuex.Store({
  modules
})
