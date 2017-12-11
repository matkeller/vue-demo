var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"https://dev.ca.com:8443/vue"'
  //API_HOST: '"https://api.poc.la.gov/permits"'
  
  
})
