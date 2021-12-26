import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import boardsService from './board.service'
import { TBoard } from "./board.memory.repository"

const respoceSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array' }
  }
} as const

/**
 * Creates fastify plugin for board routes
 * @param fastify first term FastifyInstance
 * @param opts second term FastifyPluginOptions
 * @param done third term funcition
 * @returns void
 */
const boardRouter = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {

  fastify.route({
    method: 'GET',
    url: '/boards',
    schema: {
      response: {
        200: {
          type: 'array',
        }
      }
    },
    handler: async (req, res) => {
      const boards = await boardsService.getAll()
      return res.send(boards)
    }
  })

  fastify.route<{ Params: {id: string} }>({
    method: 'GET',
    url: '/boards/:id',
    schema: {
      response: {
        200: respoceSchema
      }
    },
    handler: async (req, res) => {
      const board = await boardsService.getBoard(req.params.id)

      if (!board) return res.send(new Error('User not found'))
      return res.send({...board})
    }
  })

  fastify.route<{ Body: TBoard }>({
    method: 'POST',
    url: '/boards',
    schema: {
      response: {
        201: respoceSchema
      }
    },
    handler: async (req, res) => {
      const board = await boardsService.addBoard(req.body)
      return res.status(201).send({...board})
    }
  })

  fastify.route<{ Params: {id: string}, Body: TBoard }>({
    method: 'PUT',
    url: '/boards/:id',
    schema: {
      response: {
        200: respoceSchema
      }
    },
    handler: async (req, res) => {
      const { id } = req.params
      const data = req.body
      const board = await boardsService.updateBoard(id, data)
      
      if (!board) return res.send(new Error('Board not found'))
      return res.status(200).send({...board})
    }
  })

  fastify.route<{ Params: {id: string} }>({
    method: 'DELETE',
    url: '/boards/:id',
    schema: {
      response: {
        204: {}
      }
    },
    handler: async (req, res) => {
      const { id } = req.params
      const board = await boardsService.deleteBoard(id)
      
      if (!board) return res.send(new Error('Board not found'))
      return res.status(204).send()
    }
  })

  done()
}

export default boardRouter
