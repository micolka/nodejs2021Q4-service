import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

const appSettings = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL,
}

export default appSettings
