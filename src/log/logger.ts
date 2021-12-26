/* eslint-disable class-methods-use-this */
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fs from "fs"
import * as path from 'path'


export class Logger {
  constructor(app: FastifyInstance) {
    app.addHook('onResponse', (req, rep, done) => {
      this.logParams(req, rep)
      done()
    })
  }

  private logParams(req: FastifyRequest, rep: FastifyReply) {
    const { body, url, params } = req
    const { statusCode } = rep

    const outStr = `[time]: ${Date.now()}, [url]: ${url}, [params]: ${JSON.stringify(params)}, [code]: ${statusCode}, [body]: ${JSON.stringify(body)}\n`
    console.log(outStr)
    this.writeInfoToFile(outStr)
  }

  private writeInfoToFile(data: string) {
    fs.appendFileSync(path.join(__dirname, './log.txt'), data)    
  }
}