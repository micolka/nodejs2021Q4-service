const usersService = require('./user.service');

const responseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' }
  }
};

const usersRouter = (fastify, opts, done) => {

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

  fastify.route({
    method: 'GET',
    url: '/users/:id',
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const user = await usersService.getUser(req.params.id)

      if (!user) return res.status(404).send(new Error('User not found'));
      return res.send({...user})
    }
  })

  fastify.route({
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

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const user = await usersService.updateUser(id, data)
      
      if (!user) return res.status(404).send(new Error('User not found'));
      return res.status(200).send({...user})
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    schema: {
      response: {
        204: {}
      }
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const user = await usersService.deleteUser(id)
      
      if (!user) return res.status(404).send(new Error('User not found'));
      return res.status(204).send()
    }
  })

  done();
}

module.exports = usersRouter;
