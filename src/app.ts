import * as path from 'path';
import fastify from 'fastify';

import boardRouter from './resources/board/board.router'

const app = fastify({logger: true})

app.get('/', async () => ({ hello: 'world'}))

app.register(require('fastify-swagger'), {
  mode: 'static',
  specification: {
      path: path.join(__dirname, '../doc/api.yaml'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
})

app.register(require('./resources/users/user.router'))

app.register(boardRouter)
app.register(require('./resources/tasks/task.router'))

export default app;