const http = require('http');
const routes = require('./routes');
const middleware = require('./middleware');
const config = require('./config');
const logger = require('./logger');

const server = http.createServer((req, res) => {
  middleware.cors(req, res);
  middleware.requestId(req);
  routes.handle(req, res);
});

const port = config.get('PORT') || 3000;
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

module.exports = server;
