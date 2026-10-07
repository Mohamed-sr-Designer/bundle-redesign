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

  /* ---------- 15. Loader (once per session) ------------------------------ */
  var html = d.documentElement;
  function startLoader(done) {
    var ld = qs('.loader');
    if (!html.classList.contains('is-loading') || !ld) return done();
    var n = qs('.loader-n', ld), bar = qs('.loader-bar', ld), p = 0, t0 = performance.now(), dur = reduced ? 10 : 1900;
    (function step(now) {
      p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 2.4), v = Math.round(e * 100);
      n.textContent = (v < 10 ? '0' : '') + v; bar.style.setProperty('--p', v + '%');
      if (p < 1) return requestAnimationFrame(step);
      try { sessionStorage.setItem('bundle-seen', '1'); } catch (er) {}
      ld.classList.add('is-out');
      setTimeout(function () { html.classList.remove('is-loading'); }, 900);
      setTimeout(done, 250);
    })(t0);
  }

  /* ---------- 16. Page curtain ------------------------------------------- */
  var curtain = qs('.curtain');
  function uncover() {
    if (!html.classList.contains('is-covered') || !curtain) return;
    curtain.classList.add('is-out');
    html.classList.remove('is-covered');
    setTimeout(function () { curtain.classList.remove('is-out'); }, 750);
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || !curtain || reduced || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (a.hasAttribute('data-brief') || a.target === '_blank') return;
    var href = a.getAttribute('href');
    if (!/\.html(#.*)?$/.test(href) || /^https?:/.test(href)) return;
    if (a.pathname === location.pathname && a.hash) return;
    e.preventDefault();
    curtain.classList.add('is-in');
    try { sessionStorage.setItem('bundle-curtain', '1'); } catch (er) {}
    setTimeout(function () { location.href = a.href; }, 560);
  });
  w.addEventListener('pageshow', function (e) { if (e.persisted && curtain) { curtain.classList.remove('is-in'); html.classList.remove('is-covered'); } });

  /* ---------- 17. Brief popup ------------------------------------------- */
  var bm = qs('#brief'), lastFocus = null;
  if (bm) {
    var form = qs('.bm-form', bm), step = 1;
    var setStep = function (s) {
      step = s; bm.setAttribute('data-step', s); bm.style.setProperty('--step', Math.min(s, 3));
      qs('.bm-progress', bm).style.setProperty('--step', Math.min(s, 3));
      qs('.bm-take', bm).textContent = Math.min(s, 3);
      qsa('.bm-step', bm).forEach(function (f) { f.classList.toggle('is-on', +f.getAttribute('data-step') === s); f.classList.remove('has-err'); });
    };
    var valid = function (s) {
      var f = qs('[data-step="' + s + '"]', bm), ok = true;
      if (s === 1) ok = !!qs('input[name="dept"]:checked', f);
      if (s === 2) ok = qs('textarea', f).value.trim().length > 3;
      if (s === 3) ok = qs('#bm-name').value.trim() && qs('#bm-mail').checkValidity() && qs('#bm-mail').value.trim();
      f.classList.toggle('has-err', !ok);
      return ok;
    };
    var openBrief = function () {
      lastFocus = d.activeElement; setStep(1); bm.hidden = false; void bm.offsetWidth; bm.classList.add('is-open');
      d.body.style.overflow = 'hidden'; setMenu(false);
      setTimeout(function () { var c = qs('.pchip input', bm); if (c) c.focus(); }, 350);
    };
    var closeBrief = function () {
      bm.classList.remove('is-open'); d.body.style.overflow = '';
      setTimeout(function () { bm.hidden = true; if (step === 4) { form.reset(); setStep(1); } }, 450);
      if (lastFocus) lastFocus.focus();
    };
    d.addEventListener('click', function (e) {
      var t = e.target.closest('[data-brief]');
      if (t) { e.preventDefault(); openBrief(); return; }
      if (e.target.closest('[data-bm-close]')) closeBrief();
      if (e.target.closest('[data-bm-next]') && valid(step)) setStep(step + 1);
      if (e.target.closest('[data-bm-back]')) setStep(Math.max(1, step - 1));
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valid(3)) return;
      var fd = new FormData(form);
      var msg = [
        'Hi Bundle, new brief:',
        'Departments: ' + fd.getAll('dept').join(', '),
        'Timing: ' + (fd.get('when') || '-'),
        'Brief: ' + fd.get('msg'),
        'Name: ' + fd.get('name') + (fd.get('company') ? ' (' + fd.get('company') + ')' : ''),
        'Email: ' + fd.get('email') + (fd.get('phone') ? ' · ' + fd.get('phone') : '')
      ].join('\n');
      qs('[data-wa]', bm).href = 'https://wa.me/96597403924?text=' + encodeURIComponent(msg);
      setStep(4);
    });
    d.addEventListener('keydown', function (e) {
      if (bm.hidden) return;
      if (e.key === 'Escape') closeBrief();
      if (e.key === 'Tab') {
        var f = qsa('button, a[href], input, textarea', bm).filter(function (x) { return x.offsetParent; });
        if (!f.length) return;
        if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- 18. Films: hover preview + lightbox ------------------------ */
  var canHover = w.matchMedia('(hover: hover)').matches;
  qsa('.film').forEach(function (f) {
    var v = qs('video', f);
    if (!v || !canHover) return;
    f.addEventListener('pointerenter', function () {
      if (!v.src) v.src = v.getAttribute('data-prev');
      f.classList.add('is-prev'); var p = v.play(); if (p && p.catch) p.catch(function () {});
    });
    f.addEventListener('pointerleave', function () { f.classList.remove('is-prev'); v.pause(); });
  });
  var lb = qs('#lightbox');
  if (lb) {
    var lv = qs('video', lb);
    var openFilm = function (f) {
      lastFocus = f; lb.setAttribute('data-orient', f.getAttribute('data-orient'));
      lv.src = f.getAttribute('data-film'); lv.muted = false;
      lb.hidden = false; void lb.offsetWidth; lb.classList.add('is-open'); d.body.style.overflow = 'hidden';
      var p = lv.play(); if (p && p.catch) p.catch(function () {});
      qs('.lb-x', lb).focus();
    };
    var closeFilm = function () {
      lb.classList.remove('is-open'); lv.pause(); d.body.style.overflow = '';
      setTimeout(function () { lb.hidden = true; lv.removeAttribute('src'); lv.load(); }, 400);
      if (lastFocus) lastFocus.focus();
    };
    d.addEventListener('click', function (e) {
      var f = e.target.closest('[data-film]'); if (f) { e.preventDefault(); openFilm(f); }
      if (e.target.closest('[data-lb-close]')) closeFilm();
    });
    d.addEventListener('keydown', function (e) {
      var f = e.target.closest && e.target.closest('[data-film]');
      if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openFilm(f); }
      if (e.key === 'Escape' && !lb.hidden) closeFilm();
    });
  }

  /* ---------- 19. Circus tilt -------------------------------------------- */
  qsa('[data-tilt]').forEach(function (el) {
    if (!canHover || reduced) return;
    var sec = el.closest('section') || el;
    sec.addEventListener('pointermove', function (e) {
      var r = sec.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = 'perspective(900px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 8) + 'deg) translate(' + (x * 16) + 'px,' + (y * 12) + 'px)';
    });
    sec.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });

  /* ---------- 20. GSAP motion -------------------------------------------- */
  function motion() {
    var g = w.gsap, ST = w.ScrollTrigger;
    var marq = qsa('[data-marquee]');
    if (!g || !ST || reduced) {
      marq.forEach(function (m) { m.style.animation = 'marq 26s linear infinite'; });
      var fs = qs('.films-sec'); if (fs) fs.classList.add('no-pin');
      return;
    }
    g.registerPlugin(ST);
    var rtl = html.dir === 'rtl';

    /* hero: headline letters rise in, video drifts on scroll */
    var l1 = qs('.hero-l1');
    if (l1) {
      l1.innerHTML = l1.textContent.split(' ').map(function (w2) {
        return '<span style="display:inline-block;white-space:nowrap">' + (html.lang === 'ar' ? '<span class="ch">' + w2 + '</span>' : w2.split('').map(function (c) { return '<span class="ch">' + c + '</span>'; }).join('')) + '</span>';
      }).join(' ');
      var heroIn = [
        g.from(qsa('.ch', l1), { yPercent: 110, rotate: 8, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.035, delay: .15 }),
        g.from('.rot', { opacity: 0, y: 40, duration: 1, ease: 'expo.out', delay: .55 })
      ];
      /* never leave the headline hidden if frames are throttled (background tab) */
      setTimeout(function () { heroIn.forEach(function (tw) { if (tw.progress() < 1) tw.progress(1); }); }, 2600);
    }
    if (qs('.hero-video')) g.to('.hero-video video', { yPercent: 14, scale: 1.18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* crossed tickers: scroll-driven, speed + skew react to velocity */
    marq.forEach(function (m) {
      var dir = +m.getAttribute('data-marquee') * (rtl ? -1 : 1);
      var tw = dir > 0 ? g.fromTo(m, { xPercent: 0 }, { xPercent: -33.333, ease: 'none', duration: 22, repeat: -1 }) : g.fromTo(m, { xPercent: -33.333 }, { xPercent: 0, ease: 'none', duration: 22, repeat: -1 });
      ST.create({ trigger: m, start: 'top bottom', end: 'bottom top', onUpdate: function (s) {
        var v = s.getVelocity() / 300;
        g.to(tw, { timeScale: 1 + Math.min(Math.abs(v), 6), duration: .2, overwrite: true });
        g.to(tw, { timeScale: 1, duration: 1.2, delay: .2, overwrite: false });
        g.to(m.parentNode, { skewX: Math.max(-12, Math.min(12, v * 2)), duration: .4, overwrite: 'auto' });
      } });
    });

    /* outlined ghost word drifts across the manifesto */
    qsa('[data-drift]').forEach(function (el) {
      g.fromTo(el, { xPercent: 0 }, { xPercent: -45, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* parallax geometry */
    qsa('[data-speed]').forEach(function (el) {
      var s = parseFloat(el.getAttribute('data-speed'));
      g.to(el, { yPercent: s * 100, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* films: pinned horizontal reel */
    var fsec = qs('.films-sec'), track = qs('[data-hscroll]');
    if (fsec && track && w.innerWidth > 860) {
      var dist = function () { return Math.max(0, track.scrollWidth - w.innerWidth); };
      g.to(track, { x: function () { return (rtl ? 1 : -1) * dist(); }, ease: 'none',
        scrollTrigger: { trigger: fsec, start: 'top top', end: function () { return '+=' + dist(); }, pin: '.films-pin', scrub: 1, invalidateOnRefresh: true } });
      g.from('.films-h', { yPercent: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: fsec, start: 'top 70%' } });
      g.from('.geo-sun', { scale: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: fsec, start: 'top 70%' } });
    } else if (fsec) fsec.classList.add('no-pin');

    /* circus pops in */
    if (qs('.show-art')) {
      g.from('.show-art img', { scale: .6, rotate: -8, opacity: 0, ease: 'back.out(1.6)', duration: 1.3, scrollTrigger: { trigger: '.show', start: 'top 65%' } });
      g.from('.show-acts span', { y: 60, opacity: 0, rotate: 12, stagger: .08, duration: .9, ease: 'back.out(2)', scrollTrigger: { trigger: '.show-acts', start: 'top 90%' } });
    }

    /* stripe band text and section headings slide with weight */
    qsa('.h2').forEach(function (h) {
      h.removeAttribute('data-r'); h.classList.remove('is-in');
      g.from(h, { clipPath: 'inset(0 0 100% 0)', y: 50, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
    });

    /* big stills strip: skew with scroll velocity */
    qsa('.strip').forEach(function (s) {
      ST.create({ trigger: s, start: 'top bottom', end: 'bottom top', onUpdate: function (st) {
        g.to(qsa('.frame', s), { skewX: Math.max(-8, Math.min(8, st.getVelocity() / -250)), duration: .5, overwrite: 'auto' });
      } });
    });

    w.addEventListener('load', function () { ST.refresh(); });
  }

  /* ---------- boot ------------------------------------------------------- */
  var saved = 'en';
  try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  applyLang(saved);
  onScroll();
  startLoader(function () { uncover(); motion(); });
})();
