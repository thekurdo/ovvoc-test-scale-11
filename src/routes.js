const database = require('./database');
const validators = require('./validators');
const utils = require('./utils');

function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: utils.formatUptime(process.uptime()) }));
  } else if (url.pathname === '/users' && req.method === 'GET') {
    const users = database.query('SELECT * FROM users');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}

module.exports = { handle };
