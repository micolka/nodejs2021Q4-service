const path = require('path');
const app = require('fastify')({logger: true})

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
app.register(require('./resources/board/board.router'))
app.register(require('./resources/tasks/task.router'))

app.register(require('fastify-jwt'), {
  secret: 'nodejs2021Q4-service-supersecret'
})

app.decorate("onRequest", async (request, reply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

app.post(
  '/login', 
  (req, reply) => {
  const { login, password } = req.body;
  const token = app.jwt.sign({ login, password })
  reply.send({ token })
})

module.exports = app;
