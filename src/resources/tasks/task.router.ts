import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { TTask } from './task.memory.repository'
import { addTask, deleteTask, getAll, getTask, updateTask } from './task.service'

const responseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ["string", "null"] },
    columnId: { type: ["string", "null"] },
    boardId: { type: ["string", "null"] },
  }
}

/**
 * Creates fastify plugin for tasks routes
 * @param fastify first term FastifyInstance
 * @param opts second term FastifyPluginOptions
 * @param done third term funcition
 * @returns void
 */
const tasksRouter = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {

  fastify.route<{ Params: {boardId: string} }>({
    method: 'GET',
    url: '/boards/:boardId/tasks',
    schema: {
      response: {
        200: {
          type: 'array',
        }
      }
    },
    handler: async (req, res) => {
      const { boardId } = req.params
      const tasks = await getAll(boardId)
      return res.send(tasks)
    }
  })

  fastify.route<{ Params: {boardId: string, id: string} }>({
    method: 'GET',
    url: '/boards/:boardId/tasks/:id',
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const { boardId, id } = req.params
      const task = await getTask(boardId, id)

      if (!task) return res.status(404).send(new Error('Task not found'))
      return res.send({...task})
    }
  })

  fastify.route<{ Params: {boardId: string}, Body: TTask }>({
    method: 'POST',
    url: '/boards/:boardId/tasks',
    schema: {
      response: {
        201: responseSchema
      }
    },
    handler: async (req, res) => {
      const { boardId } = req.params
      const task = await addTask(req.body, boardId)
      return res.status(201).send({...task})
    }
  })

  fastify.route<{ Params: {id: string}, Body: TTask }>({
    method: 'PUT',
    url: '/boards/:boardId/tasks/:id',
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const { id } = req.params
      const data = req.body
      const task = await updateTask(id, data)
      
      if (!task) return res.status(404).send(new Error('User not found'))
      return res.status(200).send(task)
    }
  })

  fastify.route<{ Params: {id: string} }>({
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:id',
    schema: {
      response: {
        204: {}
      }
    },
    handler: async (req, res) => {
      const { id } = req.params
      const user = await deleteTask(id)
      
      if (!user) return res.status(404).send(new Error('User not found'))
      return res.status(204).send()
    }
  })

  done()
}

export default tasksRouter
