import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import log4js from 'log4js'
import morgan from 'morgan'
import helmet from 'helmet'
import { configLogger } from './config'
import router from './routes'
import { handleError } from './utils/handle-error'

log4js.configure(configLogger)

const logger = log4js.getLogger('App')

const PORT = process.env.PORT || 4000

export class App {
  server: import('http').Server<typeof import('http').IncomingMessage, typeof import('http').ServerResponse>

  constructor() {
    const app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('tiny'))
    app.use(cors())
    app.use(helmet())
    app.use('/api', router)
    app.use(handleError)

    this.server = app.listen(PORT, () => {
      logger.info(`The application is listening on port ${PORT}...`)
    })
  }

  getApp() {
    return this.server
  }
}
