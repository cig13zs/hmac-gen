const assert = require('assert');
const HMACGen = require('./core');

const hmac = HMACGen.compute('message_payload', 'secret_key', 'sha256');
assert.strictEqual(typeof hmac === 'string' && hmac.length === 64, true);
console.log('ok, all HMACGen assertions passed');
