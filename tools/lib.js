/* Shared helpers + layout for the Bundle site generator. */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Bilingual element: t(en, ar, tag?, attrs?) */
function t(en, ar, tag = 'span', attrs = '') {
  const rich = /</.test(en) || /</.test(ar);
  return `<${tag}${attrs ? ' ' + attrs : ''} data-en="${esc(en)}" data-ar="${esc(ar)}"${rich ? ' data-html' : ''}>${en}</${tag}>`;
}

const ARROW = `<svg class="ico-arr" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const PLAY = `<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.8v10.4L12 7z" fill="currentColor"/></svg>`;
const STAR = `<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor"/></svg>`;

function btn(href, en, ar, cls = '') {
  const brief = href === 'contact.html' ? ' data-brief' : '';
  return `<a class="btn ${cls}" href="${href}"${brief}>${t(en, ar)}${ARROW}</a>`;
}

/* Brand geometry from the Bundle motion system: big circle, dot, dash-dot arc. */
const GEO = (cls = '') => `
  <div class="geo ${cls}" aria-hidden="true">
    <i class="geo-sun" data-speed="-0.12"></i>
    <i class="geo-dot" data-speed="0.25"></i>
    <svg class="geo-arc" data-speed="0.08" viewBox="0 0 400 400"><circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="22 10 3 10"/></svg>
  </div>`;

/* Real Bundle work — frames and films supplied by the agency. */
const PROJECTS = [
  { id: 'rr-desert', en: 'Rolls-Royce Cullinan', ar: 'رولز رويس كولينان', ken: 'Desert shoot · behind the scenes', kar: 'تصوير في الصحراء · الكواليس', dept: 'Production', dar: 'الإنتاج', o: 'v', poster: 'rr-desert' },
  { id: 'events-reel', en: 'Launch nights', ar: 'ليالي الإطلاق', ken: 'Rolls-Royce · Shell Helix · Level Up', kar: 'رولز رويس · شل هيلكس · Level Up', dept: 'Events', dar: 'الفعاليات', o: 'v', poster: 'car-stage' },
  { id: 'hayatt', en: 'Hayatt — “Their presence completes us”', ar: 'حياة — «وجودهم يكمّلنا»', ken: 'Campaign film & teaser', kar: 'فيلم الحملة والتيزر', dept: 'Creative', dar: 'الإبداع', o: 'l', poster: 'hayatt' },
  { id: 'alghanim', en: 'Ali Alghanim & Sons Automotive', ar: 'علي الغانم وأولاده للسيارات', ken: 'Mall stand · Alghanim Parts', kar: 'جناح في المول · الغانم للقطع', dept: 'Events', dar: 'الفعاليات', o: 'v', poster: 'alghanim-stand' },
  { id: 'argan', en: 'Argan Bedaya', ar: 'أرجان بداية', ken: 'Brand film', kar: 'فيلم العلامة', dept: 'Production', dar: 'الإنتاج', o: 'l', poster: 'argan' },
  { id: 'makes-bundle', en: 'What makes a Bundle?', ar: 'ما الذي يصنع Bundle؟', ken: 'Agency motion piece', kar: 'موشن جرافيك للوكالة', dept: 'Creative', dar: 'الإبداع', o: 'v', poster: 'makes-bundle' },
  { id: 'year-2024', en: '2024, on screen', ar: '٢٠٢٤ على الشاشة', ken: 'Year-in-review reel', kar: 'ريل حصاد السنة', dept: 'Production', dar: 'الإنتاج', o: 'l', poster: 'year-geely' },
];

function filmCard(p, i) {
  return `
      <article class="film film-${p.o}" data-film="assets/video/${p.id}.mp4" data-orient="${p.o}" data-cursor="Play" tabindex="0" role="button" aria-label="Play ${esc(p.en)}">
        <div class="film-media">
          <img src="assets/frames/${p.poster}.jpg" alt="${esc(p.en)}" loading="lazy">
          <video muted loop playsinline preload="none" data-prev="assets/video/prev-${p.id}.mp4"></video>
          <span class="film-play">${PLAY}</span>
          <span class="film-no">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <div class="film-cap">
          <span class="film-dept">${t(p.dept, p.dar)}</span>
          <h3>${t(p.en, p.ar)}</h3>
          <p>${t(p.ken, p.kar)}</p>
        </div>
      </article>`;
}

/* Vertical frames pulled from the films for the strip. */
const STILLS = [
  ['rr-desert', 'PRODUCTION', 'Rolls-Royce Cullinan — desert shoot', 'رولز رويس كولينان — تصوير في الصحراء'],
  ['car-stage', 'EVENTS', 'Reveal stage, overhead', 'منصة الكشف من الأعلى'],
  ['alghanim-stand', 'EVENTS', 'Ali Alghanim & Sons — mall stand', 'علي الغانم وأولاده — جناح المول'],
  ['dj', 'EVENTS', 'Launch night, DJ booth', 'ليلة إطلاق، منصة الـ DJ'],
  ['rr-camera', 'PRODUCTION', 'A-cam on the dunes', 'الكاميرا على الكثبان'],
  ['levelup', 'EVENTS', 'Level Up — brand night', 'Level Up — ليلة العلامة'],
  ['rr-gala', 'EVENTS', 'Rolls-Royce gala dinner', 'عشاء رولز رويس'],
  ['alghanim-guests', 'EVENTS', 'Opening-day guests', 'ضيوف يوم الافتتاح'],
  ['shell-helix', 'EVENTS', 'Shell Helix — dealer event', 'شل هيلكس — فعالية الوكلاء'],
  ['rr-crew', 'PRODUCTION', 'Crew call at golden hour', 'الطاقم وقت الغروب'],
];

function filmStrip(reverse = false) {
  const frames = STILLS.map(([src, tag, en, ar], i) => `
      <figure class="frame">
        <span class="frame-no">${String(i * 7 + 12).padStart(4, '0')}</span>
        <img src="assets/frames/${src}.jpg" alt="${esc(en)}" width="540" height="960" loading="lazy">
        <figcaption><b>${tag}</b>${t(en, ar)}</figcaption>
      </figure>`).join('');
  return `
  <div class="strip${reverse ? ' is-rev' : ''}" aria-label="Production stills">
    <div class="strip-track">
      <div class="strip-set">${frames}</div>
      <div class="strip-set" aria-hidden="true">${frames}</div>
    </div>
  </div>`;
}

/* Brand stripe band (the diagonal yellow / indigo pattern). */
function stripeBand(en, ar) {
  return `
<section class="sband" aria-label="${esc(en)}">
  <div class="sband-edge" aria-hidden="true"></div>
  <p class="sband-text" data-r>${t(en, ar)}</p>
  <div class="sband-edge" aria-hidden="true"></div>
</section>`;
}

const NAV = [
  { href: 'creative.html', key: 'creative', en: 'Creative', ar: 'الإبداع' },
  { href: 'production.html', key: 'production', en: 'Production', ar: 'الإنتاج' },
  { href: 'events.html', key: 'events', en: 'Events', ar: 'الفعاليات' },
  { href: 'work.html', key: 'work', en: 'Work', ar: 'أعمالنا' },
];
const MENU = [
  { href: 'index.html', key: 'home', en: 'Home', ar: 'الرئيسية' },
  ...NAV,
  { href: 'about.html', key: 'about', en: 'Studio', ar: 'الاستوديو' },
  { href: 'contact.html', key: 'contact', en: 'Brief us', ar: 'أرسل فكرتك' },
];

const SOCIAL = `
  <div class="socials">
    <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg></a>
    <a href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.3v13.3a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.6 4.6 0 0 1-4.4-4.7z"/></svg></a>
    <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2s-.2-1.4-.8-2c-.75-.8-1.6-.8-2-.85C16 4.2 12 4.2 12 4.2s-4 0-6.8.2c-.4.05-1.25.05-2 .85-.6.6-.8 2-.8 2S2.2 8.8 2.2 10.5v1.6c0 1.6.2 3.3.2 3.3s.2 1.4.8 2c.75.8 1.75.77 2.2.86 1.6.15 6.8.2 6.8.2s4 0 6.8-.21c.4-.05 1.25-.05 2-.85.6-.6.8-2 .8-2s.2-1.65.2-3.3v-1.6c0-1.65-.2-3.3-.2-3.3zM9.9 14.1V8.4l5.15 2.86-5.15 2.84z"/></svg></a>
    <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6v5.4h-4v-4.8c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v4.9h-4z"/></svg></a>
  </div>`;

function header(active) {
  return `
<a class="skip" href="#main">Skip to content</a>
<div class="loader" aria-hidden="true">
  <div class="loader-stripes"></div>
  <div class="loader-in">
    <img src="assets/brand/logo-tag.png" alt="" width="420" height="210">
    <div class="loader-bar"><i></i></div>
    <div class="loader-meta"><span>ALL CONNECTED</span><span class="loader-n">00</span></div>
  </div>
</div>
<div class="curtain" aria-hidden="true"><i></i></div>
<div class="grain" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><span class="cursor-dot"></span><span class="cursor-ring"><b></b></span></div>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="logo" href="index.html" aria-label="Bundle — home"><img src="assets/brand/logo-xl.png" alt="Bundle" width="100" height="40"></a>
    <div class="hdr-rec" aria-hidden="true"><i class="rec-dot"></i><span>REC</span><span class="tc" data-tc>00:00:00:00</span></div>
    <nav class="hdr-nav" aria-label="Primary">
      ${NAV.map((n) => `<a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${t(n.en, n.ar)}</a>`).join('\n      ')}
    </nav>
    <div class="hdr-tools">
      <button class="lang" type="button" data-lang-toggle aria-label="Switch language / تغيير اللغة"><span class="lang-en">EN</span><span class="lang-ar">ع</span></button>
      <a class="btn btn-sm hdr-cta" href="contact.html" data-brief>${t('Brief us', 'أرسل فكرتك')}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu"><i></i><i></i></button>
    </div>
  </div>
</header>

<div class="menu" id="menu" hidden>
  <div class="menu-beam" aria-hidden="true"></div>
  <div class="wrap menu-in">
    <nav class="menu-nav" aria-label="All pages">
      ${MENU.map((n, i) => `<a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}><i>${String(i + 1).padStart(2, '0')}</i>${t(n.en, n.ar)}</a>`).join('\n      ')}
    </nav>
    <aside class="menu-side">
      <p class="eyebrow">${t('Call the studio', 'اتصل بالاستوديو')}</p>
      <a class="menu-big" href="tel:+96597403924" dir="ltr">+965 9740 3924</a>
      <a class="menu-big" href="mailto:hello@bundleims.com">hello@bundleims.com</a>
      <p class="menu-note">${t('Kuwait City · Sun–Thu, 9:00–18:00', 'مدينة الكويت · الأحد–الخميس، ٩:٠٠–١٨:٠٠')}</p>
      ${SOCIAL}
    </aside>
  </div>
</div>`;
}

const chip = (en, ar, name, val) => `<label class="pchip"><input type="checkbox" name="${name}" value="${esc(val || en)}"><span>${t(en, ar)}</span></label>`;
const radio = (en, ar, name, val) => `<label class="pchip"><input type="radio" name="${name}" value="${esc(val || en)}"><span>${t(en, ar)}</span></label>`;

function overlays() {
  return `
<div class="bm" id="brief" role="dialog" aria-modal="true" aria-labelledby="bm-title" hidden>
  <div class="bm-scrim" data-bm-close></div>
  <div class="bm-panel">
    <div class="bm-stripes" aria-hidden="true"></div>
    <div class="bm-head">
      <div>
        <p class="eyebrow">${t('Brief us — take', 'أرسل فكرتك — لقطة')} <span dir="ltr"><b class="bm-take">1</b>/3</span></p>
        <h2 id="bm-title" class="bm-title">${t("Let's make a <b>scene.</b>", 'خلّنا نصنع <b>مشهد.</b>')}</h2>
      </div>
      <button class="bm-x" type="button" data-bm-close aria-label="Close"><i></i><i></i></button>
    </div>
    <div class="bm-progress" aria-hidden="true"><i></i></div>
    <form class="bm-form" novalidate>
      <fieldset class="bm-step is-on" data-step="1">
        <legend>${t('What do you need?', 'ماذا تحتاج؟')}</legend>
        <div class="pchips">
          ${chip('Creative', 'الإبداع', 'dept')}${chip('Production', 'الإنتاج', 'dept')}${chip('Events', 'الفعاليات', 'dept')}${chip('All three', 'الثلاثة معاً', 'dept')}
        </div>
        <legend class="mt">${t('When does it go live?', 'متى الانطلاق؟')}</legend>
        <div class="pchips">
          ${radio('This month', 'هذا الشهر', 'when')}${radio('1–3 months', '١–٣ أشهر', 'when')}${radio('Later', 'لاحقاً', 'when')}${radio('Not sure', 'غير محدد', 'when')}
        </div>
        <p class="bm-err" data-err>${t('Pick at least one department.', 'اختر قسماً واحداً على الأقل.')}</p>
      </fieldset>
      <fieldset class="bm-step" data-step="2">
        <legend>${t('Tell us the story', 'احكِ لنا القصة')}</legend>
        <div class="fld full">
          <label for="bm-msg">${t('The brief', 'الموجز')}</label>
          <textarea id="bm-msg" name="msg" required placeholder="What are you launching, who needs to see it, and what does success look like?" data-en-ph="What are you launching, who needs to see it, and what does success look like?" data-ar-ph="ماذا ستطلق، ومن يجب أن يراه، وكيف يبدو النجاح؟"></textarea>
        </div>
        <p class="bm-err" data-err>${t('A line or two is enough.', 'سطر أو سطران يكفيان.')}</p>
      </fieldset>
      <fieldset class="bm-step" data-step="3">
        <legend>${t('Who do we call back?', 'بمن نتصل؟')}</legend>
        <div class="bm-grid">
          <div class="fld"><label for="bm-name">${t('Your name', 'اسمك')}</label><input id="bm-name" name="name" required autocomplete="name"></div>
          <div class="fld"><label for="bm-co">${t('Brand / company', 'العلامة / الشركة')}</label><input id="bm-co" name="company" autocomplete="organization"></div>
          <div class="fld"><label for="bm-mail">${t('Email', 'البريد الإلكتروني')}</label><input id="bm-mail" name="email" type="email" required autocomplete="email"></div>
          <div class="fld"><label for="bm-tel">${t('Phone', 'الهاتف')}</label><input id="bm-tel" name="phone" type="tel" autocomplete="tel" dir="ltr"></div>
        </div>
        <p class="bm-err" data-err>${t('Name and a valid email, please.', 'الاسم وبريد إلكتروني صحيح من فضلك.')}</p>
      </fieldset>
      <div class="bm-step bm-done" data-step="4">
        <svg class="bm-clap" viewBox="0 0 200 160" aria-hidden="true"><g class="clap-arm"><rect x="10" y="22" width="180" height="26" rx="3" fill="#FCD535"/><path d="M28 22l-14 26h22l14-26zM70 22l-14 26h22l14-26zM112 22l-14 26h22l14-26zM154 22l-14 26h22l14-26z" fill="#4D5C9E"/></g><rect x="10" y="54" width="180" height="96" rx="4" fill="#FCD535"/><text x="24" y="98" fill="#12152B" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">THAT'S A TAKE</text><text x="24" y="124" fill="#12152B" font-family="JetBrains Mono, monospace" font-size="12">SCENE 01 · ROLL A</text></svg>
        <h3>${t("That's a take.", 'تم التصوير.')}</h3>
        <p>${t('A producer will call you within two working days. Want to skip the queue?', 'منتج من فريقنا سيتصل بك خلال يومي عمل. تريد أن تختصر الوقت؟')}</p>
        <a class="btn" href="https://wa.me/96597403924" target="_blank" rel="noopener" data-wa>${t('Send it on WhatsApp', 'أرسله على واتساب')}${ARROW}</a>
      </div>
      <div class="bm-nav">
        <button type="button" class="btn btn-ghost" data-bm-back>${t('Back', 'رجوع')}</button>
        <button type="button" class="btn" data-bm-next>${t('Next take', 'اللقطة التالية')}${ARROW}</button>
        <button type="submit" class="btn" data-bm-send>${t('Send the brief', 'أرسل الموجز')}${ARROW}</button>
      </div>
    </form>
  </div>
</div>

<div class="lb" id="lightbox" role="dialog" aria-modal="true" aria-label="Film player" hidden>
  <div class="lb-scrim" data-lb-close></div>
  <div class="lb-frame">
    <video controls playsinline preload="none"></video>
    <button class="bm-x lb-x" type="button" data-lb-close aria-label="Close"><i></i><i></i></button>
  </div>
</div>`;
}

function footer() {
  const roll = `<span>${t("Let's make a scene", 'خلّنا نصنع مشهد')}</span>${STAR}`;
  return `
<footer class="ftr">
  <a class="ftr-roll" href="contact.html" data-brief aria-label="Brief us">
    <div class="ftr-track">${roll.repeat(4)}</div>
    <div class="ftr-track" aria-hidden="true">${roll.repeat(4)}</div>
  </a>
  <div class="wrap ftr-grid">
    <div class="ftr-brand">
      <img src="assets/brand/logo-tag.png" alt="Bundle — Where Integration Happens" width="200" height="100">
      <p>${t('Creative, production and events — one building, one crew, Kuwait. Est. 2019.', 'إبداع وإنتاج وفعاليات — مبنى واحد وفريق واحد، الكويت. منذ ٢٠١٩.')}</p>
    </div>
    <div class="ftr-col">
      <p class="eyebrow">${t('Departments', 'الأقسام')}</p>
      <a href="creative.html">${t('Creative', 'الإبداع')}</a>
      <a href="production.html">${t('Production', 'الإنتاج')}</a>
      <a href="events.html">${t('Events', 'الفعاليات')}</a>
    </div>
    <div class="ftr-col">
      <p class="eyebrow">${t('Studio', 'الاستوديو')}</p>
      <a href="work.html">${t('Work', 'أعمالنا')}</a>
      <a href="about.html">${t('About', 'من نحن')}</a>
      <a href="contact.html">${t('Contact', 'تواصل معنا')}</a>
    </div>
    <div class="ftr-col">
      <p class="eyebrow">${t('Call sheet', 'بيانات التواصل')}</p>
      <a href="tel:+96597403924" dir="ltr">+965 9740 3924</a>
      <a href="mailto:hello@bundleims.com">hello@bundleims.com</a>
      ${SOCIAL}
    </div>
  </div>
  <div class="wrap ftr-base">
    <span>© <span data-year>2026</span> Bundle IMS · ${t('Kuwait', 'الكويت')}</span>
    <span class="ftr-tc" aria-hidden="true"><i class="rec-dot"></i> <span data-tc>00:00:00:00</span></span>
    <a href="#top" class="ftr-top">${t('Rewind to top ↑', 'العودة للأعلى ↑')}</a>
  </div>
</footer>`;
}

function page({ active, title, desc, body, bodyClass = '' }) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#12152B">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/frames/hero-poster.jpg">
<link rel="icon" href="assets/logo-yellow-bundle.png">
<script>try{var L=localStorage.getItem('bundle-lang');if(L==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl'}if(!sessionStorage.getItem('bundle-seen'))document.documentElement.classList.add('is-loading');if(sessionStorage.getItem('bundle-curtain')){document.documentElement.classList.add('is-covered');sessionStorage.removeItem('bundle-curtain')}}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Alexandria:wght@200..900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body class="${bodyClass}" id="top">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
${overlays()}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="js/app.js" defer></script>
</body>
</html>
`;
}

module.exports = { t, esc, btn, ARROW, PLAY, STAR, GEO, PROJECTS, filmCard, filmStrip, stripeBand, page };
