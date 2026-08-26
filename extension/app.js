const sample = "{\"event\":\"payment_intent.succeeded\",\"amount\":4900}\n===SECRET===\nwhsec_test_secret_key_88921";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const algorithmEl = document.getElementById('algorithm');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

async function process() {
  const parts = inputEl.value.split(/===+SECRET===+/);
  const message = (parts[0] || '').trim();
  const secret = (parts[1] || '').trim();

  try {
    const hex = await HMACGen.compute(message, secret, algorithmEl.value);
    const label = algorithmEl.value === 'sha512' ? 'HMAC-SHA512' : 'HMAC-SHA256';
    outputEl.value = hex;
    if (statsEl) statsEl.textContent = `Computed ${label} signature`;
  } catch (error) {
    outputEl.value = '';
    if (statsEl) statsEl.textContent = `Error: ${error.message}`;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
algorithmEl.addEventListener('change', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied HMAC!'); });
process();
