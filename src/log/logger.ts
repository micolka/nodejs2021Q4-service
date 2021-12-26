import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fs from "fs"
import * as path from 'path'
import appSettings from '../common/config'

const { LOG_LEVEL = 0 } = appSettings

const writeInfoToFile = (fileName: string, data: string) => {
  fs.appendFileSync(path.join(__dirname, `./${fileName}`), data)    
}

export class Logger {
  constructor(app: FastifyInstance) {
    
    app.addHook('onResponse', (request, reply, done) => {
      this.logParams(request, reply)
      done()
    })

    app.setErrorHandler(this.logErrors)
  }

  private logErrors(error: FastifyError, req: FastifyRequest, rep: FastifyReply) {
    if (+LOG_LEVEL > 0) {    
      const { body, url, params } = req
      const { statusCode } = rep

      const outStr = `WARN [message]: ${error.message}, [time]: ${Date.now()}, [url]: ${url}, [params]: ${JSON.stringify(params)}, [code]: ${statusCode}, [body]: ${JSON.stringify(body)}\n`
      console.warn(outStr)
      writeInfoToFile('log.txt', outStr)
    }

    rep.status(404).send({ ok: false })
  }

  private logParams(req: FastifyRequest, rep: FastifyReply) {
    if (+LOG_LEVEL > 1) {  
      const { body, url, params } = req
      const { statusCode } = rep

      const outStr = `LOG [time]: ${Date.now()}, [url]: ${url}, [params]: ${JSON.stringify(params)}, [code]: ${statusCode}, [body]: ${JSON.stringify(body)}\n`
      console.log(outStr)
      writeInfoToFile('log.txt', outStr)
    }
  }

  static logUncaughtException(err: Error, origin: NodeJS.UncaughtExceptionOrigin) {
    const outStr = `ERROR [time]: ${Date.now()}, [Caught exception]: ${err}, [Exception origin]: ${origin}\n`
    console.error(outStr)
    writeInfoToFile('error-log.txt', outStr)
    process.exit(0)
  }

  static logUnhandledRejection(reason: unknown, promise: Promise<unknown>) {
    const outStr = `ERROR [time]: ${Date.now()}, [Unhandled Rejection at]: ${promise}, [reason]: ${reason}\n`
    console.error(outStr)
    writeInfoToFile('error-log.txt', outStr)
    process.exit(0)
  }
}
