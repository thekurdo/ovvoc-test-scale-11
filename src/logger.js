const config = require('./config');

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function getLevel() {
  const env = config.get('LOG_LEVEL') || 'info';
  return LEVELS[env] || LEVELS.info;
}

function log(level, message) {
  if (LEVELS[level] >= getLevel()) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    if (level === 'error') {
      process.stderr.write(line + '\n');
    } else {
      process.stdout.write(line + '\n');
    }
  }
}

module.exports = {
  debug: (msg) => log('debug', msg),
  info: (msg) => log('info', msg),
  warn: (msg) => log('warn', msg),
  error: (msg) => log('error', msg),
};
