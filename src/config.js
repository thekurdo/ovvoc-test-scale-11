const defaults = {
  PORT: '3000',
  NODE_ENV: 'development',
  LOG_LEVEL: 'info',
  DATABASE_URL: 'memory://localhost',
  SESSION_SECRET: 'change-me-in-production',
  MAX_REQUEST_SIZE: '1mb',
};

function get(key) {
  return process.env[key] || defaults[key] || null;
}

function getAll() {
  const merged = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (process.env[key]) {
      merged[key] = process.env[key];
    }
  }
  return merged;
}

module.exports = { get, getAll, defaults };
