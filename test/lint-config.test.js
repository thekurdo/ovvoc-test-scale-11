const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) { try { fn(); passed++; } catch (e) { console.error(`FAIL: ${name} - ${e.message}`); failed++; } }
function assert(condition, msg) { if (!condition) throw new Error(msg || 'Assertion failed'); }

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

test('eslint is 8.x', () => assert(pkg.devDependencies.eslint.startsWith('8')));
test('root is true', () => assert(config.root === true));
test('has env config', () => assert(config.env && config.env.node));
test('extends recommended', () => assert(config.extends.includes('eslint:recommended')));
test('has overrides', () => assert(config.overrides.length >= 3));
test('has ignorePatterns', () => assert(config.ignorePatterns.length >= 2));
test('has rules', () => assert(Object.keys(config.rules).length >= 5));
test('8 source files', () => {
  const files = fs.readdirSync(path.join(__dirname, '..', 'src')).filter(f => f.endsWith('.js'));
  assert(files.length === 8, `Expected 8, got ${files.length}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
