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
  return `<a class="btn ${cls}" href="${href}">${t(en, ar)}${ARROW}</a>`;
}

/* Stills from the original bundleims.com — the only photography on the site. */
const STILLS = [
  { src: 'assets/work/geely-starray.png', en: 'Geely Starray — mall launch stand', ar: 'جيلي ستاري — منصة إطلاق في المول', tag: 'EVENTS', w: 233, h: 435 },
  { src: 'assets/work/interview-set.png', en: 'Branded interview set', ar: 'استوديو مقابلات بهوية العلامة', tag: 'PRODUCTION', w: 194, h: 387 },
  { src: 'assets/work/gmc-yukon.png', en: 'Location shoot — full-size SUV', ar: 'تصوير خارجي — سيارة دفع رباعي', tag: 'PRODUCTION', w: 206, h: 339 },
  { src: 'assets/work/sports-shoot.png', en: 'Gelled studio portrait', ar: 'جلسة تصوير بإضاءة ملوّنة', tag: 'PRODUCTION', w: 206, h: 339 },
  { src: 'assets/work/be-epic.png', en: 'Fitness brand film — on location', ar: 'فيلم علامة رياضية — تصوير خارجي', tag: 'CREATIVE', w: 194, h: 387 },
];

function filmStrip(reverse = false) {
  const frames = STILLS.map((s, i) => `
      <figure class="frame">
        <span class="frame-no">${String(i * 7 + 12).padStart(4, '0')}</span>
        <img src="${s.src}" alt="${esc(s.en)}" width="${s.w}" height="${s.h}" loading="lazy">
        <figcaption><b>${s.tag}</b>${t(s.en, s.ar)}</figcaption>
      </figure>`).join('');
  return `
  <div class="strip${reverse ? ' is-rev' : ''}" aria-label="Production stills">
    <div class="strip-track">
      <div class="strip-set">${frames}</div>
      <div class="strip-set" aria-hidden="true">${frames}</div>
    </div>
  </div>`;
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
<div class="grain" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><span class="cursor-dot"></span><span class="cursor-ring"><b></b></span></div>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="logo" href="index.html" aria-label="Bundle — home"><img src="assets/logo-yellow-bundle.png" alt="Bundle" width="122" height="34"></a>
    <div class="hdr-rec" aria-hidden="true"><i class="rec-dot"></i><span>REC</span><span class="tc" data-tc>00:00:00:00</span></div>
    <nav class="hdr-nav" aria-label="Primary">
      ${NAV.map((n) => `<a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${t(n.en, n.ar)}</a>`).join('\n      ')}
    </nav>
    <div class="hdr-tools">
      <button class="lang" type="button" data-lang-toggle aria-label="Switch language"><span class="lang-en">EN</span><span class="lang-ar">ع</span></button>
      <a class="btn btn-sm hdr-cta" href="contact.html">${t('Brief us', 'أرسل فكرتك')}</a>
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

function footer() {
  const roll = `<span>${t("Let's make a scene", 'خلّنا نصنع مشهد')}</span>${STAR}`;
  return `
<footer class="ftr">
  <a class="ftr-roll" href="contact.html" aria-label="Brief us">
    <div class="ftr-track">${roll.repeat(4)}</div>
    <div class="ftr-track" aria-hidden="true">${roll.repeat(4)}</div>
  </a>
  <div class="wrap ftr-grid">
    <div class="ftr-brand">
      <img src="assets/logo-yellow-bundle.png" alt="Bundle" width="140" height="39">
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
      <a href="contact.html">${t('Brief us', 'أرسل فكرتك')}</a>
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
    <a href="#top" class="ftr-top">${t('Rewind to top', 'ارجع للبداية')} ↑</a>
  </div>
</footer>`;
}

function page({ file, active, title, desc, body, bodyClass = '' }) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#0A0A0C">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<link rel="icon" href="assets/logo-yellow-bundle.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Alexandria:wght@300..900&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body class="${bodyClass}" id="top">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="js/app.js"></script>
</body>
</html>
`;
}

module.exports = { t, esc, btn, ARROW, PLAY, STAR, STILLS, filmStrip, page };
