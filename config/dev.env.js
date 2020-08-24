'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const utils = require('../build/utils')

// const devEnv = {
//   NODE_ENV: '"development"'
// }

const devEnv = process.env.NODE_ENV

const devEnvs = {
  development: {
    API_HOST: '"http://localhost:8080"',//  mock
    APP_NAME: '"development"'
  },
  'dev-uat': {
    API_HOST: '"http://localhost:8080"',
  },
}

const newEnvs = utils.assignAppName(devEnvs)

// { API_HOST: '"http://localhost:8080"', APP_NAME: '"dev"' }
module.exports = merge(prodEnv, devEnv ? newEnvs[devEnv] : devEnvs.development)

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })
