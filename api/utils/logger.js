const { createLogger, format, transports } = require('winston')

const config = require('./config')

const myFormat = format.printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = createLogger({
  level: config.LOG_LEVEL,
  format: format.combine(
    format.timestamp(),
    myFormat
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.Console({ colorize: true }),
  ],
})

if (process.env.NODE_ENV === 'production') {
  // in prod I log errors to the file error.log
  logger.add(new transports.File({ filename: 'error.log', level: 'error' }))
}

exports.error = message => logger.log({ level: 'error', message })
exports.warn = message => logger.log({ level: 'warn', message })
exports.info = message => logger.log({ level: 'info', message })
exports.verbose = message => logger.log({ level: 'verbose', message })
exports.debug = message => logger.log({ level: 'debug', message })
