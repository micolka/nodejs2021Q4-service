const boardsService = require('./board.service');

const boardRouter = (fastify, opts, done) => {

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

  fastify.route({
    method: 'GET',
    url: '/boards/:id',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            columns: { type: 'array' }
          }
        }
      }
    },
    handler: async (req, res) => {
      const board = await boardsService.getBoard(req.params.id)

      if (!board) {
        return res.status(404).send(new Error('User not found'));
      }

      return res.send({...board})
    }
  })

  fastify.route({
    method: 'POST',
    url: '/boards',
    schema: {
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            columns: { type: 'array' }
          }
        }
      }
    },
    handler: async (req, res) => {
      const board = await boardsService.addBoard(req.body)
      return res.status(201).send({...board})
    }
  })

  fastify.route({
    method: 'PUT',
    url: '/boards/:id',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            columns: { type: 'array' }
          }
        }
      }
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const board = await boardsService.updateBoard(id, data)
      
      if (!board) {
        return res.status(404).send(new Error('Board not found'));
      }

      return res.status(200).send({...board})
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/boards/:id',
    schema: {
      response: {
        204: {}
      }
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.deleteBoard(id)
      if (!board) {
        return res.status(404).send(new Error('Board not found'));
      }

      return res.status(204).send()
    }
  })

  done();
}

module.exports = boardRouter;
