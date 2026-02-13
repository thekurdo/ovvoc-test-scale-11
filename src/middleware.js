const crypto = require('crypto');
const logger = require('./logger');

function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

function requestId(req) {
  const id = crypto.randomUUID();
  req.requestId = id;
  logger.debug(`Request ${id}: ${req.method} ${req.url}`);
  return id;
}

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.writeHead(401);
    res.end('Unauthorized');
  }
}

module.exports = { cors, requestId, authenticate };
