import Vue from 'vue'
import isNil from 'lodash/isNil'

var LOGIN_INFO = 'exLoginInfo'

export function getAccessToken() {
  var loginInfo = getLoginInfo()

  return (loginInfo && loginInfo['accessToken']) || ''
}

export function getLoginInfo() {
  return getter(LOGIN_INFO)
}

export function setLoginInfo(data) {
  return setter(LOGIN_INFO, data)
}

function getter(id) {
  var data = Vue.localStorage.get(id)

  if (isNil(data) || data === 'undefined') return {}

  return JSON.parse(data)
}

function setter(id, data) {
  Vue.localStorage.set(id, JSON.stringify(data))

  return true
}
