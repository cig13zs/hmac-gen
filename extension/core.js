;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HMACGen = factory(root);
})(typeof self !== 'undefined' ? self : this, function (root) {
  const hashes = {
    sha256: 'SHA-256',
    'sha-256': 'SHA-256',
    sha512: 'SHA-512',
    'sha-512': 'SHA-512',
  };

  function getWebCrypto() {
    const browserCrypto = (root && root.crypto) ||
      (typeof globalThis !== 'undefined' && globalThis.crypto);
    if (browserCrypto && browserCrypto.subtle) return browserCrypto;

    if (typeof require === 'function') {
      try {
        const nodeCrypto = require('crypto').webcrypto;
        if (nodeCrypto && nodeCrypto.subtle) return nodeCrypto;
      } catch (_) {
        // Fall through to the same honest error used by browsers.
      }
    }

    throw new Error('Web Crypto API is unavailable in this environment');
  }

  function resolveHash(algo) {
    const name = String(algo || 'sha256').toLowerCase().replace(/^hmac-/, '');
    const hash = hashes[name];
    if (!hash) throw new Error('Unsupported HMAC algorithm: ' + algo);
    return hash;
  }

  async function compute(message, secret, algo) {
    if (typeof secret !== 'string' || secret.length === 0) {
      throw new Error('Secret must not be empty');
    }

    const webCrypto = getWebCrypto();
    const hash = resolveHash(algo);
    const Encoder = (root && root.TextEncoder) ||
      (typeof TextEncoder !== 'undefined' && TextEncoder);
    if (typeof Encoder !== 'function') {
      throw new Error('Web Crypto HMAC requires TextEncoder');
    }

    const enc = new Encoder();
    const key = await webCrypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash },
      false,
      ['sign']
    );
    const signature = await webCrypto.subtle.sign(
      'HMAC',
      key,
      enc.encode(message)
    );

    return Array.from(new Uint8Array(signature))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  return { compute };
});
