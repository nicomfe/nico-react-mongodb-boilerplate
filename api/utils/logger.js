const { createLogger, format, transports } = require('winston')

const config = require('./config')

const myFormat = format.printf(info => `${info.level}: ${info.message}`)

const logger = createLogger({
  level: config.LOG_LEVEL,
  format: myFormat,
  transports: [new transports.Console({ colorize: true })],
})

exports.error = message => logger.log({ level: 'error', message })
exports.warn = message => logger.log({ level: 'warn', message })
exports.info = message => logger.log({ level: 'info', message })
exports.verbose = message => logger.log({ level: 'verbose', message })
exports.debug = message => logger.log({ level: 'debug', message })
