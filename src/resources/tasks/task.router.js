const tasksService = require('./task.service');

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

const tasksRouter = (fastify, opts, done) => {

  fastify.route({
    method: 'GET',
    url: '/boards/:boardId/tasks',
    preValidation: [fastify.onRequest],
    schema: {
      response: {
        200: {
          type: 'array',
        }
      }
    },
    handler: async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(boardId)
      return res.send(tasks)
    }
  })

  fastify.route({
    method: 'GET',
    url: '/boards/:boardId/tasks/:id',
    preValidation: [fastify.onRequest],
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const { boardId, id } = req.params;
      const task = await tasksService.getTask(boardId, id);

      if (!task) {
        return res.status(404).send(new Error('Task not found'));
      }

      console.log(task);

      return res.send({...task})
    }
  })

  fastify.route({
    method: 'POST',
    url: '/boards/:boardId/tasks',
    preValidation: [fastify.onRequest],
    schema: {
      response: {
        201: responseSchema
      }
    },
    handler: async (req, res) => {
      const { boardId } = req.params;
      const task = await tasksService.addTask(req.body, boardId);
      return res.status(201).send({...task});
    }
  })

  fastify.route({
    method: 'PUT',
    url: '/boards/:boardId/tasks/:id',
    preValidation: [fastify.onRequest],
    schema: {
      response: {
        200: responseSchema
      }
    },
    handler: async (req, res) => {
      const { boardId, id } = req.params;
      const data = req.body;
      const task = await tasksService.updateTask(boardId, id, data)
      
      if (!task) {
        return res.status(404).send(new Error('User not found'));
      }

      return res.status(200).send(task)
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:id',
    preValidation: [fastify.onRequest],
    schema: {
      response: {
        204: {}
      }
    },
    handler: async (req, res) => {
      const { boardId, id } = req.params;
      const user = await tasksService.deleteTask(boardId, id )
      if (!user) {
        return res.status(404).send(new Error('User not found'));
      }

      return res.status(204).send()
    }
  })

  done();
}

module.exports = tasksRouter;
