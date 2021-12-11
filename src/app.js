"use strict";
const path = require('path');
const app = require('fastify')({ logger: true });
app.get('/', async () => ({ hello: 'world' }));
app.register(require('fastify-swagger'), {
    mode: 'static',
    specification: {
        path: path.join(__dirname, '../doc/api.yaml'),
    },
    exposeRoute: true,
    routePrefix: '/doc',
});
app.register(require('./resources/users/user.router'));
app.register(require('./resources/board/board.router'));
app.register(require('./resources/tasks/task.router'));
module.exports = app;
