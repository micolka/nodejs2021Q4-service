import app from './app'
import appSettings from './common/config'

const { PORT } = appSettings
 
app.listen(PORT as string, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)
