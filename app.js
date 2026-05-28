// SoulVani — interactions

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

// ============ CHECKOUT MODAL ============
const editions = {
  deluxe: {
    name: 'Deluxe Edition',
    hindi: 'विशेष संस्करण',
    price: 2999,
    sub: 'Lyric booklet · Certificate · Album print · Digital access'
  },
  personal: {
    name: 'Personal Edition',
    hindi: 'निजी संस्करण',
    price: 4999,
    sub: 'Everything in Deluxe + Artist signature + Handwritten couplet'
  }
};

function openCheckout(kind) {
  const ed = editions[kind];
  if (!ed) return;
  const modal = $('#checkout-modal');
  $('#co-edition-name').textContent = ed.name;
  $('#co-edition-hindi').textContent = ed.hindi;
  $('#co-edition-sub').textContent = ed.sub;
  $('#co-total').textContent = '₹' + ed.price.toLocaleString('en-IN');
  $('#co-form-pane').style.display = '';
  $('#co-success').style.display = 'none';
  modal.classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  $('#checkout-modal').classList.remove('on');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const buyEl = e.target.closest('[data-buy]');
  if (buyEl) { e.preventDefault(); openCheckout(buyEl.dataset.buy); return; }
  if (e.target.matches('[data-close-modal]') || e.target === $('#checkout-modal')) {
    closeCheckout();
  }
  const pay = e.target.closest('.pay-opt');
  if (pay) {
    $$('.pay-opt').forEach(p => p.classList.remove('sel'));
    pay.classList.add('sel');
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.id === 'co-form') {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Processing…';
    btn.disabled = true;
    setTimeout(() => {
      $('#co-form-pane').style.display = 'none';
      $('#co-success').style.display = '';
      btn.innerHTML = orig; btn.disabled = false;
    }, 1100);
  }
  if (e.target.id === 'news-form') {
    e.preventDefault();
    e.target.querySelector('input').value = '';
    $('#news-thanks').classList.add('on');
    setTimeout(() => $('#news-thanks').classList.remove('on'), 4000);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCheckout();
});

// ============ PETALS ============
function spawnPetals(host, count = 14) {
  if (!host) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (-Math.random() * 30) + 'vh';
    p.style.animationDuration = (10 + Math.random() * 12) + 's';
    p.style.animationDelay = (-Math.random() * 12) + 's';
    p.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
    p.style.width = p.style.height = (8 + Math.random() * 14) + 'px';
    host.appendChild(p);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  spawnPetals($('.petals'));
});

// ============ TWEAKS (light) ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "romantic",
  "petals": true
}/*EDITMODE-END*/;

let tweaks = { ...TWEAK_DEFAULTS };

function applyTweaks() {
  document.body.classList.remove('theme-violet', 'theme-night');
  if (tweaks.theme === 'violet') document.body.classList.add('theme-violet');
  if (tweaks.theme === 'night')  document.body.classList.add('theme-night');
  const ph = $('.petals');
  if (ph) ph.style.display = tweaks.petals ? '' : 'none';
}

function setTweak(key, val) {
  tweaks = { ...tweaks, [key]: val };
  applyTweaks();
  try {
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: { [key]: val }}, '*');
  } catch(e) {}
  renderTweaksPanel();
}

function renderTweaksPanel() {
  const panel = $('#tweaks-panel');
  if (!panel) return;
  panel.innerHTML = `
    <div class="tw-head">
      <div class="tw-title">Tweaks</div>
      <button class="tw-close" aria-label="Close">×</button>
    </div>
    <div class="tw-body">
      <div class="tw-section">
        <div class="tw-label">Theme</div>
        <div class="tw-seg" data-key="theme">
          <button data-val="romantic" class="${tweaks.theme==='romantic'?'on':''}">Romantic</button>
          <button data-val="violet" class="${tweaks.theme==='violet'?'on':''}">Violet</button>
          <button data-val="night" class="${tweaks.theme==='night'?'on':''}">Night</button>
        </div>
      </div>
      <div class="tw-section">
        <div class="tw-label">Falling petals</div>
        <button class="tw-toggle ${tweaks.petals?'on':''}" data-key="petals">
          <span class="dot"></span>${tweaks.petals?'On':'Off'}
        </button>
      </div>
      <div class="tw-foot">Romantic & poetic — SoulVani</div>
    </div>
  `;
  panel.querySelector('.tw-close').addEventListener('click', deactivateTweaks);
  panel.querySelectorAll('.tw-seg button').forEach(b => {
    b.addEventListener('click', () => setTweak(b.parentElement.dataset.key, b.dataset.val));
  });
  panel.querySelector('.tw-toggle').addEventListener('click', (e) => {
    const k = e.currentTarget.dataset.key;
    setTweak(k, !tweaks[k]);
  });
}

function activateTweaks() {
  $('#tweaks-panel').classList.add('on');
  renderTweaksPanel();
}
function deactivateTweaks() {
  $('#tweaks-panel').classList.remove('on');
  try { window.parent.postMessage({type: '__edit_mode_dismissed'}, '*'); } catch(e) {}
}

window.addEventListener('message', (e) => {
  if (!e.data) return;
  if (e.data.type === '__activate_edit_mode') activateTweaks();
  if (e.data.type === '__deactivate_edit_mode') deactivateTweaks();
});

document.addEventListener('DOMContentLoaded', () => {
  applyTweaks();
  try { window.parent.postMessage({type: '__edit_mode_available'}, '*'); } catch(e) {}
});
