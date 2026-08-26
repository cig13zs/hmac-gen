const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { webcrypto } = require('crypto');
const HMACGen = require('./core');

const message = 'The quick brown fox jumps over the lazy dog';
const expectedSha256 = 'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8';
const expectedSha512 = 'b42af09057bac1e2d41708e48a902e09b5ff7f12ab428a4fe86653c73dd248fb82f948a549f7b791a5b41915ee4d1ec3935357e4e2317250d0372afa2ebeeb3a';

function assertHex(value, length) {
  assert.strictEqual(typeof value, 'string');
  assert.strictEqual(value.length, length);
  assert.match(value, new RegExp('^[0-9a-f]{' + length + '}$'));
}

(async () => {
  const sha256 = await HMACGen.compute(message, 'key', 'sha256');
  assert.strictEqual(sha256, expectedSha256);
  assertHex(sha256, 64);

  const sha512 = await HMACGen.compute(message, 'key', 'sha512');
  assert.strictEqual(sha512, expectedSha512);
  assertHex(sha512, 128);

  await assert.rejects(
    () => HMACGen.compute(message, '', 'sha256'),
    /secret/i
  );

  const source = fs.readFileSync(path.join(__dirname, 'core.js'), 'utf8');
  const browserContext = vm.createContext({ TextEncoder, crypto: webcrypto, self: {} });
  vm.runInContext(source, browserContext);
  const browserHmac = await browserContext.self.HMACGen.compute(message, 'key', 'sha256');
  assert.strictEqual(browserHmac, expectedSha256);
  assertHex(browserHmac, 64);

  const unavailableContext = vm.createContext({ TextEncoder, self: {} });
  vm.runInContext(source, unavailableContext);
  await assert.rejects(
    () => unavailableContext.self.HMACGen.compute(message, 'key', 'sha256'),
    /Web Crypto/i
  );

  console.log('ok, all HMACGen assertions passed');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
