// const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
const app = require('fastify')({logger: true})

app.get('/', async () => ({ hello: 'world'}))


// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use(express.json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.register(require('./resources/users/user.router'))
app.register(require('./resources/board/board.router'))
app.register(require('./resources/tasks/task.router'))

module.exports = app;
