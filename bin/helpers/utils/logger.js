const winston = require('winston');
const sentryLog = require('../components/sentry/sentry_log');

const logger = winston.createLogger({
  transports: [ new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  })
  ],
  exitOnError: false
});

const log = (context, message, scope) => {
  const obj = {
    context,
    scope,
    message: `${context}${message.toString()} ${scope}`
  };
  sentryLog.sendError(obj);
  logger.info(obj);
};

module.exports = {
  log
};
