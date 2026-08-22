# HMAC Generator — HMAC-SHA256 & HMAC-SHA512 Signer Online

> Generate HMAC-SHA256 and HMAC-SHA512 message authentication codes online. Securely sign API payloads, webhooks, and tokens offline.

[![Live Web App](https://img.shields.io/badge/Web_App-Live_Demo-3B82F6?style=flat-square)](https://cig13zs.github.io/hmac-gen/)
[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-10B981?style=flat-square)](https://github.com/cig13zs/hmac-gen/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero_Tracking-success?style=flat-square)](https://github.com/cig13zs)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy_me_a_coffee-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/jju1s)

---

## ⚡ Key Features

- **100% Client-Side & Offline:** Pure vanilla JavaScript runtime. Zero network uploads, zero telemetry, zero analytics tracking.
- **Instant Processing:** Zero dependencies or heavy frameworks for ultra-fast, lightweight execution.
- **Dual Delivery:** Use directly in your browser at [https://cig13zs.github.io/hmac-gen/](https://cig13zs.github.io/hmac-gen/) or install the offline Chrome Extension package.
- **Automated Test Suite:** Backed by unit tests (`node core.test.js`) ensuring reliable and accurate execution.

---

## 📖 How It Works

Provide a message payload and secret key separated by ===SECRET=== to compute cryptographically secure HMAC signatures.

---

## 🛠️ Offline Chrome Extension Installation

1. Download or clone this repository:
   ```bash
   git clone https://github.com/cig13zs/hmac-gen.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right toggle.
4. Click **Load unpacked** and select the `extension/` folder inside this repository.
5. The extension will be available in your browser toolbar, working 100% offline.

---

## 💡 Frequently Asked Questions (FAQ)

### Is my data uploaded to any server?
No. Everything executes locally inside your browser memory or extension sandbox. No telemetry, third-party scripts, or API requests are made.

### Can I use the core library in Node.js or JavaScript projects?
Yes! The core engine in `core.js` is exported as a standard Universal Module Definition (UMD), compatible with Node.js `require()`, ES modules, and browser `<script>` tags:

```javascript
const engine = require('./core');
// Use the core functions directly in your project
```

---

## 📄 License & Author

- **Author:** [jju1s](https://github.com/cig13zs)
- **License:** [MIT License](LICENSE)
- **Support:** If this tool saves you time, support development at [ko-fi.com/jju1s](https://ko-fi.com/jju1s).
