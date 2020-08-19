import Vue from 'vue'
import Vuex from 'vuex'
import common from './Common'

Vue.use(Vuex)

const modules = {common}

export default new Vuex.Store({
  modules
})
