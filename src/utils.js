function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) {
    return str;
  }
  return str.slice(0, maxLen - 3) + '...';
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = { formatUptime, slugify, truncate, deepClone };
