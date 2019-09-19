'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/particles.min.js');
} else {
  module.exports = require('./src/particles.js');
}