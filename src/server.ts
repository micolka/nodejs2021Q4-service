import app from './app'
import appSettings from './common/config'
import { Logger } from './log/logger'

const { PORT } = appSettings
 
app.listen(PORT as string, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)
process.on('uncaughtException', Logger.logUncaughtException)

// throw Error('Oops!');

process.on('unhandledRejection', Logger.logUnhandledRejection)

// Promise.reject(Error('Oops!'));