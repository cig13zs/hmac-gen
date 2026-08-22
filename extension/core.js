;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HMACGen = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function compute(message, secret, algo) {
    algo = algo || 'sha256';
    if (typeof require !== 'undefined') {
      const crypto = require('crypto');
      return crypto.createHmac(algo, secret).update(message).digest('hex');
    }
    return 'Web Crypto HMAC computed in UI';
  }

  return { compute: compute };
});
