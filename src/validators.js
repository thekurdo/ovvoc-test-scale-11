function isEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function isNonEmpty(value) {
  if (typeof value !== 'string') {
    return false;
  }
  return value.trim().length > 0;
}

function isPositiveInt(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}

function validate(schema, data) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !isNonEmpty(data[field])) {
      errors.push(`${field} is required`);
    }
  }
  return errors;
}

module.exports = { isEmail, isNonEmpty, isPositiveInt, validate };
