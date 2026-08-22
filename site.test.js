// node site.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const slug = "hmac-gen";
const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'extension', 'manifest.json'), 'utf8'));
const popup = fs.readFileSync(path.join(__dirname, 'extension', 'popup.html'), 'utf8');

assert.ok(index.includes('https://cig13zs.github.io/' + slug + '/'), 'page metadata uses this repository URL');
assert.ok(readme.includes('github.com/cig13zs/' + slug) || readme.includes('cig13zs.github.io/' + slug), 'README points to this repository');
assert.ok(new RegExp('<title>[^<]*' + escapeRegExp(manifest.action.default_title), 'i').test(popup), 'popup title matches the manifest');
assert.strictEqual(findInlineScripts(popup).length, 0, 'extension popup has no inline JavaScript');
assert.strictEqual(findUnsafeBlankLinks(index).length, 0, 'page blank-target links use noopener');
assert.strictEqual(findUnsafeBlankLinks(popup).length, 0, 'popup blank-target links use noopener');
assert.ok(/aria-live=["']polite["']/.test(popup), 'popup announces result changes');
assert.ok(fs.existsSync(path.join(__dirname, 'LICENSE')), 'LICENSE exists');
const manifestIconPaths = new Set([
  ...Object.values(manifest.icons || {}),
  ...Object.values((manifest.action && manifest.action.default_icon) || {}),
]);
for (const iconPath of manifestIconPaths) {
  assert.ok(fs.existsSync(path.join(__dirname, 'extension', iconPath)), 'manifest icon is missing: ' + iconPath);
}
const backgroundPath = path.join(__dirname, 'extension', 'background.js');
assert.ok(
  !fs.existsSync(backgroundPath) || (manifest.background && manifest.background.service_worker === 'background.js'),
  'unreferenced extension/background.js should not ship'
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findInlineScripts(html) {
  return html.match(/<script(?![^>]*\bsrc=)(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi) || [];
}

function findUnsafeBlankLinks(html) {
  const links = html.match(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi) || [];
  return links.filter((tag) => !/\brel=["'][^"']*\bnoopener\b/i.test(tag));
}

console.log('ok, site identity and extension CSP checks passed');
