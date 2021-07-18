const mongoose = require('mongoose')
const config = require('./index')
const log = require('../utils/logger');

mongoose.connect(config.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', () => {
  log.error('*** error ***')
})

db.on('open', () => {
  log.info('*** open 123 ***')
})
