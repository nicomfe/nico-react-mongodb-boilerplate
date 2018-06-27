const winston = require('winston')

const config = require('./config')

winston.level = config.LOG_LEVEL

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

exports.error = message => logger.log('error', message)
exports.warn = message => logger.log('warn', message)
exports.info = message => logger.log('info', message)
exports.verbose = message => logger.log('verbose', message)
exports.debug = message => logger.log('debug', message)
