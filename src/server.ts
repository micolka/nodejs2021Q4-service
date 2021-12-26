import app from './app'
import appSettings from './common/config'
import { Logger } from './log/logger'

const { PORT } = appSettings
 
app.listen(PORT as string, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)

new Logger(app);

process.on('uncaughtException', Logger.logUncaughtException)

process.on('unhandledRejection', Logger.logUnhandledRejection)

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));
