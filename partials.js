// Inject shared chrome: nav, footer, checkout modal, tweaks panel.
// Use data-page to mark current nav link.

(function() {
  const page = document.body.dataset.page || 'home';
  const base = window.__assetBase || '';   // '../' on album pages, '' on home
  const albumPrefix = 'albums/';

  // ============ NAV ============
  const navHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="${base}index.html" class="nav-logo">
          <img src="${base}assets/logo.png" alt="SoulVani">
          <span class="word">SoulVani</span>
        </a>
        <div class="nav-links">
          <a href="${base}index.html#music" class="${page==='home'?'current':''}">Music</a>
          <a href="${base}index.html#editions" class="${page==='editions'?'current':''}">Editions</a>
          <a href="${base}index.html#story">Story</a>
          <a href="${base}index.html#listen">Listen</a>
        </div>
        <a href="${base}index.html#editions" data-buy="deluxe" class="nav-cta">Buy the Edition</a>
      </div>
    </nav>
  `;

  // ============ MODAL ============
  const modalHTML = `
    <div class="modal-back" id="checkout-modal" aria-hidden="true">
      <div class="modal" role="dialog">
        <div class="modal-head">
          <div class="brand">
            <img src="${base}assets/logo.png" alt=""><span>SoulVani Checkout</span>
          </div>
          <button class="close" data-close-modal aria-label="Close">×</button>
        </div>

        <div id="co-form-pane">
          <div class="modal-body">
            <div class="modal-summary">
              <div>
                <div class="label">Ordering</div>
                <div class="name" id="co-edition-name">Deluxe Edition</div>
                <div style="font-family: var(--ui); font-size: 11px; color: var(--ink-mute); letter-spacing: 0.04em; margin-top: 6px;" id="co-edition-sub"></div>
                <div style="font-family: var(--hindi); color: var(--rose-deep); font-size: 14px; margin-top: 4px;" id="co-edition-hindi">विशेष संस्करण</div>
              </div>
              <div style="text-align: right;">
                <div class="label">Total</div>
                <div class="total" id="co-total">₹2,999</div>
              </div>
            </div>

            <form class="modal-section" id="co-form">
              <span class="label">Contact</span>
              <input class="modal-input" placeholder="Email address" type="email" required style="margin-bottom: 8px;">
              <div class="modal-row">
                <input class="modal-input" placeholder="Full name" required>
                <input class="modal-input" placeholder="Mobile · +91" required>
              </div>

              <div style="margin: 18px 0 10px;">
                <span class="label">Pay with</span>
              </div>
              <div class="modal-pay-options">
                <button type="button" class="pay-opt sel">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/></svg>
                  <span>Card</span>
                </button>
                <button type="button" class="pay-opt">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                  <span>UPI</span>
                </button>
                <button type="button" class="pay-opt">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7l3-3h12l3 3v10l-3 3H6l-3-3z"/><path d="M8 12h8"/></svg>
                  <span>Netbank</span>
                </button>
              </div>

              <div style="margin-top: 16px;">
                <input class="modal-input" placeholder="Card number" style="margin-bottom: 8px;">
                <div class="modal-row">
                  <input class="modal-input" placeholder="MM / YY">
                  <input class="modal-input" placeholder="CVV">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-foot">
            <button class="btn btn-primary" type="submit" form="co-form">
              Complete order <span class="arrow">→</span>
            </button>
            <div class="secure">🔒 Secured by Razorpay · Test mode</div>
          </div>
        </div>

        <div id="co-success" class="modal-success" style="display:none;">
          <div class="check">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>Thank you</h3>
          <div class="hindi">शुक्रिया दिल से</div>
          <p>Your copy is being numbered and prepared. We'll email you within 24 hours with a tracking link and your digital access card.</p>
          <button class="btn btn-ghost" data-close-modal style="margin-top: 20px;">Close</button>
        </div>
      </div>
    </div>
  `;

  // ============ FOOTER ============
  const footHTML = `
    <footer class="foot">
      <div class="foot-inner">
        <div class="foot-top">
          <div class="foot-brand">
            <div class="word">SoulVani</div>
            <div class="hindi">सोलवाणी · आत्मा की वाणी</div>
            <div class="tag">A Hindi neo-soul project. Slow, written, sung — for the moments love refuses to behave.</div>
          </div>
          <div class="foot-col">
            <h4>Music</h4>
            <a href="${base}${albumPrefix}ishq-beqarar.html">इश्क़ बेक़रार</a>
            <a href="${base}${albumPrefix}tu-hai-yahin.html">तू है यहीं</a>
            <a href="${base}${albumPrefix}adhure-lamhein.html">अधूरे लम्हें</a>
          </div>
          <div class="foot-col">
            <h4>Editions</h4>
            <a href="${base}index.html#editions" data-buy="deluxe">Deluxe — ₹2,999</a>
            <a href="${base}index.html#editions" data-buy="personal">Personal — ₹4,999</a>
            <a href="${base}index.html#editions">What's included</a>
          </div>
          <div class="foot-col">
            <h4>Find us</h4>
            <a href="https://instagram.com/soulvani" target="_blank">Instagram @soulvani</a>
            <a href="https://facebook.com/soulvani" target="_blank">Facebook @soulvani</a>
            <a href="https://open.spotify.com/" target="_blank">Spotify · SoulVani</a>
            <a href="https://music.apple.com/" target="_blank">Apple Music · SoulVani</a>
            <a href="https://youtube.com/@soulvani" target="_blank">YouTube · SoulVani</a>
          </div>
        </div>
        <div class="foot-bot">
          <div>© 2026 SoulVani · All songs written, composed & produced under SoulVani.</div>
          <div class="dom">soulvanimusic.com</div>
        </div>
      </div>
    </footer>
  `;

  const tweaksHTML = `<div id="tweaks-panel"></div>`;

  // Mount
  const navMount = document.getElementById('nav-mount');
  const modalMount = document.getElementById('modal-mount');
  const footMount = document.getElementById('foot-mount');

  if (navMount) navMount.outerHTML = navHTML;
  if (modalMount) modalMount.outerHTML = modalHTML;
  if (footMount) footMount.outerHTML = footHTML + tweaksHTML;
})();
