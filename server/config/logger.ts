const configLogger = {
  appenders: {
    console: {
      type: 'console',
    },
    dateFile: {
      type: 'dateFile',
      filename: './logs/app.log',
      pattern: 'yyyy-MM-dd',
      encoding: 'utf-8',
    },
  },
  categories: {
    default: {
      appenders: ['dateFile', 'console'],
      level: 'debug',
    },
  },
}
export { configLogger }
