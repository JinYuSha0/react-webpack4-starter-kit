const ENV = String.prototype.trim.call(process.env.NODE_ENV)
let modal = null

switch (ENV) {
    case 'dev':
        modal = require('./webpack/webpack.dev.js')
        break
    case 'prod':
        modal = require('./webpack/webpack.prod.js')
        break
    default:
        break
}

module.exports = modal
