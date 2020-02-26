/**
 * anyproxy --intercept --ws-intercept --rule ./anyproxy/index.js
 */ 

const filepath = './conf'

module.exports = require('./common')(filepath)
