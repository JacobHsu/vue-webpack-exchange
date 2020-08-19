'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const devEnv = {
  NODE_ENV: '"development"'
}

const devEnvs = {
  development: {
    API_HOST: '"http://localhost:8080"',//  mock
  }
}

module.exports = merge(prodEnv, devEnv, devEnvs.development)

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })
