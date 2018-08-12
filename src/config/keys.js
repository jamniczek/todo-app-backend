if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');// eslint-disable-line
} else {
  module.exports = require('./dev');// eslint-disable-line
}
