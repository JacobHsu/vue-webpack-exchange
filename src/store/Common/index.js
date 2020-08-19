import matchesProperty from 'lodash/matchesProperty'
import find from 'lodash/find'
import { createTypes, createMutations, get } from '@/libs'
import { ClearRequest } from '@/api/request'

const types = createTypes(['GET_SYSTEM_SETTING'])

const state = {
  message: {},
  status: {},
  error: {}
}

const getValue = get('value', [])

function getSystemSetting(state) {
  return (state && state.getSystemSettingData) || []
}

function fromSystemSetting(source, target) {
  return getValue(find(getSystemSetting(source), matchesProperty('key', target)))
}

const getValueFromSetting = (fn) => {
  return function (src) {
    return function (key) {
      return fn(src, key)
    }
  }
}

const getters = {
  countriesList: state => getValueFromSetting(fromSystemSetting)(state)('countries')
}

const actions = {
  getSystemSetting(store) {
    return ClearRequest(store, types.GET_SYSTEM_SETTING, {
      url: 'Common/systemSettingEX'
    })
  }
}
const mutations = {
  ...createMutations(types)
}

export default {
  state,
  getters,
  actions,
  mutations
}
