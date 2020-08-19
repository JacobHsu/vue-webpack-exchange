import Vue from 'vue'
import _ from 'lodash'
import camelCase from 'lodash/camelCase'

export function get(path, defaultValue) {
  return function(object) {
    return _.get(object, path, defaultValue)
  }
}

export const camelizeKeys = obj => {
  var output

  if (_.isArray(obj)) {
    output = _.map(obj, camelizeKeys)
  } else {
    output = _.fromPairs(
      _.map(_.toPairs(obj), pair => [camelCase(pair[0]), pair[1]])
    )
  }

  return output
}

function createType(type) {
  return {
    base: `${type}`,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`,
    processing: `${type}_PROCESSING`,
    processingKey: camelCase(`${type}Processing`),
    dataKey: camelCase(`${type}Data`),
    error: camelCase(`${type}Error`)
  }
}

export const createTypes = type => {
  if (_.isString(type)) return createType(type)

  if (_.isArray(type)) {
    return _.fromPairs(_.map(type, value => [value, createType(value)]))
  }

  return {}
}

/* eslint-disable no-param-reassign */
export const createMutations = types => {
  const mutation = {}
  Object.keys(types).forEach(key => {
    const type = types[key]
    const camelCaseType = camelCase(type.base)

    mutation[type.base] = (state, payload) => {
      switch (payload.type) {
        case type.processing:
          Vue.set(state, type.processingKey, payload.value)
          break
        case type.success:
          Vue.set(state, type.dataKey, payload.data)
          Vue.set(state.status, camelCaseType, payload.status)
          Vue.set(state.message, camelCaseType, payload.message)
          Vue.set(state, type.processingKey, false)
          break
        case type.failure:
          Vue.set(state.error, camelCaseType, payload.error)
          Vue.set(state, type.processingKey, false)
          break
        default:
          console.error('Please check the types!')
          break
      }
    }
  })
  return mutation
}
