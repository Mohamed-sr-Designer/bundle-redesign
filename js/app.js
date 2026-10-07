/* =========================================================================
   BUNDLE — site behaviour
   ========================================================================= */
(function () {
  'use strict';

  var d = document, w = window;
  var qs = function (s, c) { return (c || d).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduced = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'en';

  /* ---------- 1. Language (EN / AR) -------------------------------------- */
  var LANG_KEY = 'bundle-lang';

  function applyLang(next) {
    lang = next === 'ar' ? 'ar' : 'en';
    var isAr = lang === 'ar';
    d.documentElement.lang = lang;
    d.documentElement.dir = isAr ? 'rtl' : 'ltr';
    qsa('[data-en]').forEach(function (el) {
      var val = el.getAttribute(isAr ? 'data-ar' : 'data-en');
      if (val === null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    qsa('[data-en-ph]').forEach(function (el) {
      el.setAttribute('placeholder', el.getAttribute(isAr ? 'data-ar-ph' : 'data-en-ph'));
    });
    qsa('option[data-en]').forEach(function (o) { o.textContent = o.getAttribute(isAr ? 'data-ar' : 'data-en'); });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    splitWords();
    resetRotators();
  }

  d.addEventListener('click', function (e) {
    if (e.target.closest('[data-lang-toggle]')) applyLang(lang === 'en' ? 'ar' : 'en');
  });

  /* ---------- 2. Timecode (25 fps) --------------------------------------- */
  var tcEls = qsa('[data-tc]');
  var t0 = performance.now() - Math.random() * 600000;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function tick(now) {
    var ms = now - t0, f = Math.floor(ms / 40) % 25, s = Math.floor(ms / 1000);
    var str = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60) + ':' + pad(f);
    for (var i = 0; i < tcEls.length; i++) tcEls[i].textContent = str;
    requestAnimationFrame(tick);
  }
  if (tcEls.length) requestAnimationFrame(tick);

  /* ---------- 3. Word rotator -------------------------------------------- */
  var rotTimers = [];
  function resetRotators() {
    rotTimers.forEach(clearInterval); rotTimers = [];
    qsa('.rot').forEach(function (rot) {
      var words; try { words = JSON.parse(rot.getAttribute('data-rot-' + lang)); } catch (e) { return; }
      var el = qs('.rot-w', rot), i = 0;
      el.className = 'rot-w'; el.textContent = words[0];
      var takeEl = qs('[data-take]');
      if (reduced) return;
      rotTimers.push(setInterval(function () {
        el.classList.add('out');
        setTimeout(function () {
          i = (i + 1) % words.length;
          el.textContent = words[i];
          el.className = 'rot-w pre';
          void el.offsetWidth;
          el.className = 'rot-w';
          if (takeEl) takeEl.textContent = pad(7 + i);
        }, 520);
      }, 2400));
    });
  }

  /* ---------- 4. Header -------------------------------------------------- */
  var hdr = qs('.hdr'), lastY = 0;
  function onScroll() {
    var y = w.scrollY;
    if (hdr) {
      hdr.classList.toggle('is-stuck', y > 30);
      hdr.classList.toggle('is-hidden', y > 500 && y > lastY && !d.body.classList.contains('menu-open'));
    }
    lastY = y;
    litWords(); rosProgress();
  }
  w.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 5. Menu ---------------------------------------------------- */
  var burger = qs('.burger'), menu = qs('.menu');
  function setMenu(open) {
    if (!menu || !burger) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    d.body.classList.toggle('menu-open', open);
    d.body.style.overflow = open ? 'hidden' : '';
    qsa('.menu-nav a', menu).forEach(function (a, i) { a.style.transitionDelay = open ? (0.25 + i * 0.05) + 's' : '0s'; });
    if (open) { menu.hidden = false; void menu.offsetWidth; menu.classList.add('is-open'); }
    else { menu.classList.remove('is-open'); setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 800); }
  }
  if (burger) burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  if (menu) qsa('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- 6. Reveal -------------------------------------------------- */
  var rv = qsa('[data-r]');
  qsa('.depts, .tickets, .idea-test, .facts-row, .checklist, .callsheet').forEach(function (g) {
    qsa('[data-r], .chk', g).forEach(function (el, i) { el.style.setProperty('--d', i * 90 + 'ms'); });
  });
  if ('IntersectionObserver' in w) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    rv.concat(qsa('.chk')).forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('is-in'); });

  /* ---------- 7. Manifesto words lit by scroll --------------------------- */
  var HI = /^(one|three|brief|story|screen|stage|room|building|واحد|واحدة|ثلاث|مبنى|قصة|الشاشة|المسرح|القاعة)/i;
  function splitWords() {
    qsa('[data-words]').forEach(function (el) {
      var txt = el.textContent.trim().split(/\s+/);
      el.innerHTML = txt.map(function (wd) {
        var clean = wd.replace(/[.,:;—]/g, '');
        return '<span class="w' + (HI.test(clean) ? ' hi' : '') + '">' + wd + '</span>';
      }).join(' ');
    });
    litWords();
  }
  function litWords() {
    qsa('[data-words]').forEach(function (el) {
      var r = el.getBoundingClientRect(), vh = w.innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var ws = el.children, n = Math.round(p * ws.length);
      for (var i = 0; i < ws.length; i++) ws[i].classList.toggle('on', reduced || i < n);
    });
  }

  /* ---------- 8. Run-of-show playhead ------------------------------------ */
  function rosProgress() {
    qsa('.ros').forEach(function (ros) {
      var r = ros.getBoundingClientRect(), vh = w.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
      ros.style.setProperty('--p', (p * 100) + '%');
      var line = qs('.ros-line', ros);
      if (line) line.style.setProperty('--p', (p * 100) + '%');
      qsa('.ros-item', ros).forEach(function (it) {
        it.classList.toggle('is-live', it.getBoundingClientRect().top < vh * 0.6);
      });
    });
  }

  /* ---------- 9. Hero spotlight ------------------------------------------ */
  qsa('[data-spot]').forEach(function (hero) {
    if (reduced) return;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 10. Custom cursor ------------------------------------------ */
  var cur = qs('.cursor');
  if (cur && w.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    d.documentElement.classList.add('has-cursor');
    var dot = qs('.cursor-dot', cur), ring = qs('.cursor-ring', cur), lab = qs('b', ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    w.addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    d.addEventListener('pointerover', function (e) {
      var labelled = e.target.closest('[data-cursor]');
      var link = e.target.closest('a, button, .chip, .filter, input, textarea, select');
      cur.classList.toggle('is-label', !!labelled);
      cur.classList.toggle('is-link', !!link && !labelled);
      if (labelled) lab.textContent = labelled.getAttribute('data-cursor');
    });
    d.addEventListener('pointerleave', function () { mx = my = -100; });
  }

  /* ---------- 11. Counters ----------------------------------------------- */
  qsa('[data-count]').forEach(function (el) {
    if (!('IntersectionObserver' in w) || reduced) return;
    var target = +el.getAttribute('data-count');
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      var s = null;
      (function f(ts) { if (!s) s = ts; var p = Math.min((ts - s) / 1300, 1); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(performance.now());
    }, { threshold: .6 });
    o.observe(el);
  });

  /* ---------- 12. Work filters + peek ------------------------------------ */
  var fbar = qs('[data-filters]');
  if (fbar) fbar.addEventListener('click', function (e) {
    var b = e.target.closest('.filter'); if (!b) return;
    qsa('.filter', fbar).forEach(function (f) { f.classList.toggle('is-on', f === b); f.setAttribute('aria-pressed', f === b); });
    var k = b.getAttribute('data-filter');
    qsa('[data-cat]').forEach(function (c) { c.classList.toggle('is-hidden', k !== 'all' && c.getAttribute('data-cat').split(' ').indexOf(k) < 0); });
  });
  var peek = qs('.case-peek');
  if (peek && w.matchMedia('(hover: hover)').matches) {
    var pimg = qs('img', peek);
    qsa('.case[data-img]').forEach(function (c) {
      c.addEventListener('pointerenter', function () { pimg.src = c.getAttribute('data-img'); peek.classList.add('is-on'); });
      c.addEventListener('pointerleave', function () { peek.classList.remove('is-on'); });
      c.addEventListener('pointermove', function (e) { peek.style.left = (e.clientX + 140) + 'px'; peek.style.top = e.clientY + 'px'; });
    });
  }

  /* ---------- 13. Countdown to "doors" ----------------------------------- */
  var cd = qs('[data-countdown]');
  if (cd) {
    var cells = qsa('b', cd);
    var target = new Date(); target.setHours(19, 0, 0, 0);
    if (target < new Date()) target.setDate(target.getDate() + 1);
    (function cdTick() {
      var diff = Math.max(0, target - new Date()), s = Math.floor(diff / 1000);
      cells[0].textContent = pad(Math.floor(s / 3600));
      cells[1].textContent = pad(Math.floor(s / 60) % 60);
      cells[2].textContent = pad(s % 60);
      setTimeout(cdTick, 1000);
    })();
  }

  /* ---------- 14. Chips + demo form -------------------------------------- */
  d.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    c.classList.toggle('is-on'); c.setAttribute('aria-pressed', c.classList.contains('is-on'));
  });
  qsa('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = qs('.form-ok', form); if (ok) { ok.classList.add('is-on'); ok.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      form.reset(); qsa('.chip.is-on', form).forEach(function (c) { c.classList.remove('is-on'); });
    });
  });

  qsa('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- boot ------------------------------------------------------- */
  var saved = 'en';
  try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  applyLang(saved);
  onScroll();
})();
