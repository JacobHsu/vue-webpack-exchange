import axios from 'axios'
import i18n from '@/i18n'
// import { camelizeKeys } from '@/libs'
import isNil from 'lodash/isNil'
import { genProcessors } from '@/store/helper'
import { getAccessToken, getLoginInfo } from '@/libs/ls'

const API_HOST = process.env.API_HOST

export const ClearRequest = (store, type, options) => {
  return Request(store, type, options, genProcessors(store, type))
}

const Request = ({ commit }, type, options, cbs) => {
  if (cbs && cbs.processing) {
    cbs.processing()
  } else {
    commit(type.base, { type: type.processing, value: true })
  }

  return new Promise((resolve, reject) => {
    sendRequest(options)
      .then(response => {
        if (
          response.headers['x-web-is-disable'] &&
          response.headers['x-web-is-disable'].toLowerCase() === 'true'
        ) {
          window.localStorage.setItem(
            'maintain-url',
            response.headers['maintain-url']
          )
          throw new Error('shutdown')
        } else {
          if (
            options.auth &&
            getAccessToken() &&
            getLoginInfo().loginPeriod === '30'
          ) {
            const diff =
              (new Date().getTime() - Number(getLoginInfo().lastLogin)) / 1000
            if (diff / 60 > 30) {
              throw new Error('timeout')
            }
          }

          // const { data, message, status } = camelizeKeys(response.data)
          const data = response.data
          const message = 'success'
          const status = 0
          if (cbs && cbs.success) {
            cbs.success(response)
          } else {
            commit(type.base, {
              type: type.success,
              data,
              message,
              status
            })
          }
        }
        resolve(response)
      })
      .catch(error => {
        if (cbs && cbs.failure) {
          cbs.failure(error)
        } else {
          commit(type.base, {
            type: type.failure,
            error
          })
        }
        reject(error)
      })
  })
}

export default Request

function sendRequest(options) {
  const {
    url,
    method = 'GET',
    headers,
    auth = true,
    lang = true,
    body,
    qs,
    isLogin
  } = options
  const HEADER = {
    DeviceOSType: 'Web',
    NationID: 2,
    'Content-Type': isLogin
      ? 'application/x-www-form-urlencoded; charset=UTF-8'
      : 'application/json; charset=UTF-8',
    ...headers
  }
  const locale = `${i18n.locale.toLowerCase()}/`
  const langUrl = lang ? locale : ''
  const data = isLogin ? convertSimpleObjToQueryString(body) : body

  if (auth) HEADER.Authorization = `bearer ${getAccessToken()}`

  return axios({
    baseURL: API_HOST,
    url: `${langUrl}${url}`,
    method: isLogin ? 'POST' : method,
    headers: HEADER,
    params: qs,
    data: data
  })
}

function convertSimpleObjToQueryString(obj) {
  return Object.keys(obj)
    .filter(k => !isNil(obj[k]))
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
    .join('&')
}
