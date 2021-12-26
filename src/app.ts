import * as path from 'path'
import fastify from 'fastify'

import boardRouter from './resources/board/board.router'
import tasksRouter from './resources/tasks/task.router'
import usersRouter from './resources/users/user.router'
import { Logger } from './log/logger'

const app = fastify()

app.get('/', async () => ({ hello: 'world'}))

app.register(require('fastify-swagger'), {
  mode: 'static',
  specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
})

app.register(usersRouter)
app.register(boardRouter)
app.register(tasksRouter)
new Logger(app);

export default app
