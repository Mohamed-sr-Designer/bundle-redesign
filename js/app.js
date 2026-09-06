/* =========================================================================
   BUNDLE — site behaviour
   ========================================================================= */
(function () {
  'use strict';

  var d = document;
  var qs = function (s, c) { return (c || d).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- 1. Language (EN / AR) -------------------------------------- */
  var LANG_KEY = 'bundle-lang';

  function applyLang(lang) {
    var isAr = lang === 'ar';
    d.documentElement.lang = isAr ? 'ar' : 'en';
    d.documentElement.dir = isAr ? 'rtl' : 'ltr';

    qsa('[data-en]').forEach(function (el) {
      var val = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (val === null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    qsa('[data-en-ph]').forEach(function (el) {
      el.setAttribute('placeholder', isAr ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph'));
    });
    qsa('[data-en-label]').forEach(function (el) {
      el.setAttribute('aria-label', isAr ? el.getAttribute('data-ar-label') : el.getAttribute('data-en-label'));
    });

    qsa('.lang-toggle').forEach(function (t) {
      t.setAttribute('data-lang', lang);
      qsa('button', t).forEach(function (b) {
        b.classList.toggle('is-on', b.getAttribute('data-lang') === lang);
      });
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    d.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  var saved = 'en';
  try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  applyLang(saved);

  d.addEventListener('click', function (e) {
    var b = e.target.closest('.lang-toggle button');
    if (!b) return;
    applyLang(b.getAttribute('data-lang'));
  });

  /* ---------- 2. Header state -------------------------------------------- */
  var header = qs('.site-header');
  var bar = qs('.scroll-bar');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 40);
    if (bar) {
      var h = d.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Full-screen menu ---------------------------------------- */
  var menuBtn = qs('.menu-btn');
  var menu = qs('.menu-overlay');

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    d.body.style.overflow = open ? 'hidden' : '';
    qsa('.menu-nav a', menu).forEach(function (a, i) {
      a.style.transitionDelay = open ? (0.16 + i * 0.06) + 's' : '0s';
    });
    if (open) {
      menu.hidden = false;
      void menu.offsetWidth; /* force reflow so the open transition runs */
      menu.classList.add('is-open');
    } else {
      menu.classList.remove('is-open');
      setTimeout(function () {
        if (!menu.classList.contains('is-open')) menu.hidden = true;
      }, 780);
    }
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (menu) qsa('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- 4. Scroll reveal ------------------------------------------- */
  var revealables = qsa('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });

    /* Safety net: anything the viewport has already scrolled past (deep links,
       restored scroll positions, instant jumps) is shown without waiting. */
    var sweep = function () {
      revealables.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
          el.style.setProperty('--d', '0ms');
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    };
    window.addEventListener('load', sweep);
    setTimeout(sweep, 1200);
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* stagger children groups */
  qsa('[data-stagger-group]').forEach(function (group) {
    qsa('[data-reveal]', group).forEach(function (el, i) {
      el.style.setProperty('--d', i * 80 + 'ms');
    });
  });

  /* ---------- 5. Counters ------------------------------------------------ */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dur = 1400, t0 = null;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = qsa('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        animateCount(en.target);
        cio.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- 6. Marquee duplication ------------------------------------- */
  qsa('.marquee-track').forEach(function (track) {
    if (track.children.length === 1) {
      track.appendChild(track.firstElementChild.cloneNode(true));
    }
  });

  /* ---------- 7. Hero parallax blobs ------------------------------------- */
  var blobs = qsa('.blob');
  if (blobs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    window.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      blobs.forEach(function (b, i) {
        var k = (i + 1) * 14;
        b.style.transform = 'translate(' + (cx * k) + 'px,' + (cy * k) + 'px)';
      });
      raf = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(loop) : null;
    }
  }

  /* ---------- 8. Accordions ---------------------------------------------- */
  d.addEventListener('click', function (e) {
    var q = e.target.closest('.acc-q');
    if (!q) return;
    var item = q.closest('.acc-item');
    var open = item.classList.contains('is-open');
    var group = q.closest('.acc');
    if (group && !group.hasAttribute('data-multi')) {
      qsa('.acc-item', group).forEach(function (i) {
        i.classList.remove('is-open');
        var btn = qs('.acc-q', i);
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
    item.classList.toggle('is-open', !open);
    q.setAttribute('aria-expanded', !open ? 'true' : 'false');
  });

  /* ---------- 9. Work filters -------------------------------------------- */
  var filterBar = qs('[data-filters]');
  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var b = e.target.closest('.filter');
      if (!b) return;
      qsa('.filter', filterBar).forEach(function (f) { f.classList.remove('is-on'); });
      b.classList.add('is-on');
      var key = b.getAttribute('data-filter');
      qsa('[data-cat]').forEach(function (card) {
        var show = key === 'all' || card.getAttribute('data-cat').split(' ').indexOf(key) > -1;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }

  /* ---------- 10. Chips (multi-select) ------------------------------------ */
  d.addEventListener('click', function (e) {
    var c = e.target.closest('.chip');
    if (!c) return;
    c.classList.toggle('is-on');
    c.setAttribute('aria-pressed', c.classList.contains('is-on') ? 'true' : 'false');
  });

  /* ---------- 11. Contact form (static demo) ------------------------------ */
  qsa('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = qs('.form-ok', form);
      if (ok) { ok.classList.add('is-on'); ok.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      form.reset();
      qsa('.chip.is-on', form).forEach(function (c) { c.classList.remove('is-on'); });
    });
  });

  /* ---------- 12. Current year ------------------------------------------- */
  qsa('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
