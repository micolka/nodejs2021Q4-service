import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { TUser } from './user.memory.repository'
import usersService from './user.service'

const responseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' }
  }
}

/**
 * Creates fastify plugin for userstasks routes
 * @param fastify first term FastifyInstance
 * @param opts second term FastifyPluginOptions
 * @param done third term funcition
 * @returns void
 */
const usersRouter = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {

  fastify.route({
    method: 'GET',
    url: '/users',
    schema: {
      response: {
        200: {
          type: 'array',
        }
      }
    },
    handler: async (req, res) => {
      const users = await usersService.getAll()
      return res.send(users)
    }
  })

  fastify.route<{ Params: {id: string} }>({
    method: 'GET',
    url: '/users/:id',
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const user = await usersService.getUser(req.params.id)

      if (!user) return res.send(new Error('User not found'));
      return res.send({...user})
    }
  })

  fastify.route<{ Body: TUser }>({
    method: 'POST',
    url: '/users',
    schema: {
      response: {
        201: responseSchema
      }
    },
    handler: async (req, res) => {
      const user = await usersService.addUser(req.body)
           
      return res.status(201).send({...user})
    }
  })

  fastify.route<{ Params: {id: string}, Body: TUser }>({
    method: 'PUT',
    url: '/users/:id',
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const { id } = req.params
      const data = req.body
      const user = await usersService.updateUser(id, data)
      
      if (!user) return res.send(new Error('User not found'));
      return res.status(200).send({...user})
    }
  })

  fastify.route<{ Params: {id: string} }>({
    method: 'DELETE',
    url: '/users/:id',
    schema: {
      response: {
        204: {}
      }
    },
    handler: async (req, res) => {
      const { id } = req.params
      const user = await usersService.deleteUser(id)
      
      if (!user) return res.send(new Error('User not found'))
      return res.status(204).send()
    }
  })

  done()
}

export default usersRouter
