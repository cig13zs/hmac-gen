const sample = "{\"event\":\"payment_intent.succeeded\",\"amount\":4900}\n===SECRET===\nwhsec_test_secret_key_88921";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

async function process() {
  const parts = inputEl.value.split(/===+SECRET===+/);
  const message = (parts[0] || '').trim();
  const secret = (parts[1] || '').trim() || 'default_secret';

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');

  outputEl.value = hex;
  if (statsEl) statsEl.textContent = 'Computed HMAC-SHA256 signature';
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied HMAC!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
process();
