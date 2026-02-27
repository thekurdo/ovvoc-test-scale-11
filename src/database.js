const config = require('./config');
const logger = require('./logger');

const store = new Map();

function connect() {
  const dbUrl = config.get('DATABASE_URL') || 'memory://localhost';
  logger.info(`Connecting to ${dbUrl}`);
  return { connected: true, url: dbUrl };
}

function query(sql) {
  logger.debug(`Executing: ${sql}`);
  return Array.from(store.values());
}

function insert(table, record) {
  const key = `${table}:${Date.now()}`;
  store.set(key, record);
  return { id: key, ...record };
}

function close() {
  store.clear();
  logger.info('Database connection closed');
}

module.exports = { connect, query, insert, close };
