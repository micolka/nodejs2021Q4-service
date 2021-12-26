/* eslint-disable class-methods-use-this */
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fs from "fs"
import * as path from 'path'


export class Logger {
  constructor(app: FastifyInstance) {
    app.addHook('onResponse', (request, reply, done) => {
      this.logParams(request, reply)
      done()
    })

    app.setErrorHandler((error, req, rep) => {
      const { body, url, params } = req
      const { statusCode } = rep

      const outStr = `WARN [message]: ${error.message}, [time]: ${Date.now()}, [url]: ${url}, [params]: ${JSON.stringify(params)}, [code]: ${statusCode}, [body]: ${JSON.stringify(body)}\n`
      console.warn(outStr)
      this.writeInfoToFile(outStr)
      rep.status(404).send({ ok: false })
    })
  }

  private logParams(req: FastifyRequest, rep: FastifyReply) {
    const { body, url, params } = req
    const { statusCode } = rep

    const outStr = `LOG [time]: ${Date.now()}, [url]: ${url}, [params]: ${JSON.stringify(params)}, [code]: ${statusCode}, [body]: ${JSON.stringify(body)}\n`
    console.log(outStr)
    this.writeInfoToFile(outStr)
  }

  private writeInfoToFile(data: string) {
    fs.appendFileSync(path.join(__dirname, './log.txt'), data)    
  }
}