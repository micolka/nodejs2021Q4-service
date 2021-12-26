import { FastifyInstance } from "fastify"

export class Logger {
  constructor(app: FastifyInstance) {
    app.addHook('onResponse', (req, rep, done) => {
      const { body, url, params } = req
      const { statusCode } = rep
      console.log(`${url} params: ${JSON.stringify(params)} ${statusCode} body: ${JSON.stringify(body)}`);
      done()
    })
  }
}