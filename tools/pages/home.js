const { t, btn, ARROW, PLAY, STAR, GEO, PROJECTS, filmCard, filmStrip, stripeBand, page } = require('../lib');

const rotEn = JSON.stringify(['show up.', 'go live.', 'get filmed.', 'sell out.', 'get talked about.']);
const rotAr = JSON.stringify(['حاضرة.', 'على الهواء.', 'أمام الكاميرا.', 'حديث الناس.', 'لا تُنسى.']);

const ticker = (en, ar) => `<span>${t(en, ar)}</span>${STAR}`;

const CREDITS = [
  ['Energy', 'الطاقة', ['Kuwait Oil Company', 'Shell']],
  ['Automotive', 'السيارات', ['Rolls-Royce', 'BMW', 'Porsche', 'Cadillac', 'Volvo', 'Geely', 'Haval', 'GWM Tank', 'Ali Alghanim & Sons']],
  ['Fashion & Luxury', 'الأزياء والفخامة', ['Michael Kors', 'Orlebar Brown', 'il gufo', "Harper's Bazaar Arabia", 'Alyasra Fashion', 'Boutiqaat']],
  ['Retail & Malls', 'التجزئة والمولات', ['The Avenues', 'The Gate Mall']],
  ['Research & Institutions', 'البحث والمؤسسات', ['KISR', 'The National Fund', 'Markaz', 'Australian University Kuwait']],
  ['Health & Community', 'الصحة والمجتمع', ['Roche', 'Hayatt', 'Argan']],
  ['FMCG & Services', 'السلع والخدمات', ['Kitco', 'Sara', 'Aqua Gulf', 'Alnasser', 'gig Kuwait', 'Cartoon Network']],
];
const creditsBlock = CREDITS.map(([en, ar, names]) => `
        <div class="cr-group">
          ${t(en, ar, 'p', 'class="cr-role"')}
          ${names.map((n) => `<p class="cr-name">${n}</p>`).join('')}
        </div>`).join('');

const body = `
<!-- ============ HERO / VIEWFINDER ============ -->
<section class="hero" data-spot>
  <div class="hero-video" aria-hidden="true">
    <video autoplay muted loop playsinline preload="auto" poster="assets/frames/hero-poster.jpg"><source src="assets/video/hero.mp4" type="video/mp4"></video>
  </div>
  <div class="hero-spot" aria-hidden="true"></div>
  <div class="vf" aria-hidden="true">
    <i class="vf-c tl"></i><i class="vf-c tr"></i><i class="vf-c bl"></i><i class="vf-c br"></i>
    <i class="vf-cross"></i>
    <div class="vf-hud tl"><i class="rec-dot"></i> REC <span data-tc>00:00:00:00</span></div>
    <div class="vf-hud tr">4K · 25P · ISO 800 · <span class="vf-bat"><i></i></span></div>
    <div class="vf-hud bl">SC 01 · TK <span data-take>07</span> · KUWAIT CITY</div>
    <div class="vf-hud br">f/2.8 · 1/50 · 5600K</div>
  </div>

  <a class="badge" href="#films" data-cursor="Play" aria-label="Watch the films">
    <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="bcirc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#bcirc" textLength="486" lengthAdjust="spacing">Creative ✶ Production ✶ Events ✶ Kuwait ✶ </textPath></text></svg>
    <span class="badge-play">${PLAY}</span>
  </a>

  <div class="wrap hero-in">
    <p class="eyebrow hero-eyebrow" data-r>${t('Creative agency · Production house · Events company', 'وكالة إبداعية · بيت إنتاج · شركة فعاليات')}</p>
    <h1 class="hero-h">
      ${t('We make brands', 'نجعل علامتك', 'span', 'class="hero-l1" data-split')}
      <span class="rot" data-rot-en='${rotEn}' data-rot-ar='${rotAr}'><span class="rot-w">show up.</span></span>
    </h1>
    <div class="hero-foot" data-r>
      ${t('Bundle thinks it, shoots it and stages it — ideas, films and live events made by one crew under one roof in Kuwait. Since 2019.', 'في Bundle نفكّر في الفكرة ونصوّرها وننفّذها على الأرض — أفكار وأفلام وفعاليات حيّة يصنعها فريق واحد تحت سقف واحد في الكويت، منذ ٢٠١٩.', 'p', 'class="hero-sub"')}
      <div class="hero-ctas">
        ${btn('contact.html', 'Brief us', 'أرسل فكرتك')}
        <a class="btn btn-ghost" href="#films" data-cursor="Play">${PLAY}${t('Watch the films', 'شاهد الأفلام')}</a>
      </div>
    </div>
  </div>

  <nav class="hero-tabs wrap" aria-label="Departments">
    <a href="creative.html"><i>01</i>${t('Creative', 'الإبداع')}<small>${t('Ideas & campaigns', 'أفكار وحملات')}</small></a>
    <a href="production.html"><i>02</i>${t('Production', 'الإنتاج')}<small>${t('Film, photo & post', 'أفلام وتصوير ومونتاج')}</small></a>
    <a href="events.html"><i>03</i>${t('Events', 'الفعاليات')}<small>${t('Launches & activations', 'إطلاقات وتفعيلات')}</small></a>
  </nav>
</section>

<!-- ============ CROSSED TICKERS ============ -->
<div class="tickers" aria-hidden="true">
  <div class="ticker ticker-b"><div class="ticker-track" data-marquee="-1">${(ticker('Content & digital', 'المحتوى والرقمي') + ticker('PR & communications', 'العلاقات العامة') + ticker('Film & visuals', 'الأفلام والمرئيات') + ticker('Events & experiences', 'الفعاليات والتجارب')).repeat(3)}</div></div>
  <div class="ticker ticker-a"><div class="ticker-track" data-marquee="1">${(ticker('Think it', 'نفكّر فيها') + ticker('Shoot it', 'نصوّرها') + ticker('Stage it', 'ننفّذها') + ticker('Ship it', 'نطلقها')).repeat(3)}</div></div>
</div>

<!-- ============ MANIFESTO ============ -->
<section class="sec manifesto">
  <div class="ghost-word" aria-hidden="true" data-drift="-1">BUNDLE BUNDLE</div>
  <div class="wrap">
    <p class="eyebrow" data-r>${t('The pitch, in one paragraph', 'القصة في فقرة')}</p>
    ${t('Most brands hire one agency to think, a second to film, and a third to throw the party — then wonder why it all feels like three different brands. We put the writers, the camera crew and the stage managers in one building. One brief goes in. One story comes out: on screen, on stage, and in the room.',
      'أغلب العلامات تتعامل مع وكالة للأفكار، وثانية للتصوير، وثالثة للحفل — ثم تستغرب لماذا تبدو كثلاث علامات مختلفة. نحن جمعنا الكتّاب وفريق التصوير ومديري المسرح في مبنى واحد. موجز واحد يدخل، وقصة واحدة تخرج: على الشاشة، وعلى المسرح، وفي القاعة.',
      'p', 'class="mf-text" data-words')}
  </div>
</section>

<!-- ============ DEPARTMENTS ============ -->
<section class="sec depts-sec" id="departments">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Three departments. <b>One call sheet.</b>', 'ثلاثة أقسام. <b>جدول واحد.</b>')}</h2>
      <p class="sec-side" data-r>${t('Hover a door. Every department can run a job alone — they are better when the same brief runs through all three.', 'مرّر على أي باب. كل قسم قادر على تنفيذ المشروع وحده — لكن النتيجة أقوى عندما يمرّ الموجز نفسه على الأقسام الثلاثة.')}</p>
    </div>

    <div class="depts">
      <a class="dept dept-creative" href="creative.html" data-cursor="Open">
        <div class="dept-art" aria-hidden="true">
          <div class="glyphs"><span>A</span><span>ع</span><span>✶</span><span>B</span><span>“</span><span>ب</span></div>
          <svg class="scrawl" viewBox="0 0 300 120"><path d="M8 80 C 60 10, 110 120, 160 50 S 250 20, 292 70" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
        </div>
        <div class="dept-top"><i>01</i><span class="dept-go">${ARROW}</span></div>
        <div class="dept-body">
          <h3>${t('Creative', 'الإبداع')}</h3>
          <p>${t('Brand identity, campaign ideas, content, social and PR — written in Arabic and English from the first draft.', 'هوية العلامة، أفكار الحملات، المحتوى، السوشيال ميديا والعلاقات العامة — بالعربية والإنجليزية من أول مسودة.')}</p>
          <ul>${['Brand', 'Campaigns', 'Content', 'Social', 'PR'].map((x, i) => `<li>${t(x, ['الهوية', 'الحملات', 'المحتوى', 'السوشيال', 'العلاقات العامة'][i])}</li>`).join('')}</ul>
        </div>
      </a>

      <a class="dept dept-production" href="production.html" data-cursor="Roll">
        <div class="dept-art" aria-hidden="true">
          <svg class="clap" viewBox="0 0 200 160">
            <g class="clap-arm"><rect x="10" y="22" width="180" height="26" rx="3" fill="#F6F1E4"/><path d="M28 22l-14 26h22l14-26zM70 22l-14 26h22l14-26zM112 22l-14 26h22l14-26zM154 22l-14 26h22l14-26z" fill="#12152B"/></g>
            <rect x="10" y="54" width="180" height="96" rx="4" fill="#12152B" stroke="#F6F1E4" stroke-width="3"/>
            <path d="M10 66h180M28 54v12M70 54v12M112 54v12M154 54v12" stroke="#F6F1E4" stroke-width="2"/>
            <text x="22" y="92" fill="#F6F1E4" font-family="JetBrains Mono, monospace" font-size="11">PROD  BUNDLE</text>
            <text x="22" y="112" fill="#F6F1E4" font-family="JetBrains Mono, monospace" font-size="11">SCENE 01   TAKE 07</text>
            <text x="22" y="132" fill="#FCD535" font-family="JetBrains Mono, monospace" font-size="11">ROLL A004</text>
          </svg>
        </div>
        <div class="dept-top"><i>02</i><span class="dept-go">${ARROW}</span></div>
        <div class="dept-body">
          <h3>${t('Production', 'الإنتاج')}</h3>
          <p>${t('TVCs, brand films, social cut-downs, photography and motion — scripted, shot and finished in-house.', 'إعلانات تلفزيونية، أفلام للعلامات، مقاطع للسوشيال ميديا، تصوير فوتوغرافي وموشن — نكتبها ونصوّرها وننهيها داخلياً.')}</p>
          <ul>${['Film', 'Photo', 'Motion', 'Post', 'Live'].map((x, i) => `<li>${t(x, ['أفلام', 'تصوير', 'موشن', 'مونتاج', 'بث مباشر'][i])}</li>`).join('')}</ul>
        </div>
      </a>

      <a class="dept dept-events" href="events.html" data-cursor="Enter">
        <div class="dept-art" aria-hidden="true">
          <div class="beams"><i></i><i></i><i></i></div>
          <div class="stage-floor"></div>
        </div>
        <div class="dept-top"><i>03</i><span class="dept-go">${ARROW}</span></div>
        <div class="dept-body">
          <h3>${t('Events', 'الفعاليات')}</h3>
          <p>${t('Launches, mall activations, exhibitions and press days — concept, build, run-of-show and the crew on the night.', 'إطلاقات، تفعيلات في المولات، معارض وأيام إعلامية — من الفكرة والتنفيذ وجدول الحفل حتى الفريق في ليلة الحدث.')}</p>
          <ul>${['Launches', 'Activations', 'Exhibitions', 'Press days', 'Pop-ups'].map((x, i) => `<li>${t(x, ['إطلاقات', 'تفعيلات', 'معارض', 'أيام إعلامية', 'متاجر مؤقتة'][i])}</li>`).join('')}</ul>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- ============ FILMS — pinned horizontal reel ============ -->
<section class="films-sec" id="films">
  <div class="films-pin">
    ${GEO()}
    <div class="films-head wrap">
      <p class="eyebrow">${t('Now showing', 'يُعرض الآن')}</p>
      <h2 class="h2 films-h">${t('Bigger <b>work.</b>', 'شغل <b>أكبر.</b>')}</h2>
      <p class="films-sub">${t('Real films from the Bundle floor. Hover to preview, click to play.', 'أفلام حقيقية من استوديو Bundle. مرّر للمعاينة، واضغط للتشغيل.')}</p>
    </div>
    <div class="films-track" data-hscroll>
      ${PROJECTS.map(filmCard).join('')}
      <a class="film-more" href="work.html" data-cursor="All">
        <span>${t('All the <b>work</b>', 'كل <b>الأعمال</b>')}</span>${ARROW}
      </a>
    </div>
  </div>
</section>

<!-- ============ REEL STRIP ============ -->
<section class="sec reel-sec" id="reel">
  <div class="wrap sec-head">
    <h2 class="h2" data-r>${t('Shot, built and run <b>by us.</b>', 'صوّرناها وبنيناها <b>وأدرناها بأنفسنا.</b>')}</h2>
    <p class="sec-side" data-r>${t('Frames from our own sets — launch nights, mall stands and a Rolls-Royce in the desert at golden hour. No stock, no hand-offs.', 'لقطات من مواقع تصويرنا — ليالي إطلاق، أجنحة في المولات، ورولز رويس في الصحراء وقت الغروب. لا صور جاهزة ولا وسطاء.')}</p>
  </div>
  ${filmStrip()}
</section>

<!-- ============ RUN OF SHOW ============ -->
<section class="sec light ros-sec">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('How a job runs. <b>Call times included.</b>', 'كيف يسير المشروع. <b>بالمواعيد.</b>')}</h2>
      <p class="sec-side" data-r>${t('Every Bundle project runs on a call sheet — the same document a film set lives by. You always know what happens today and what lands next.', 'كل مشروع عندنا يسير على جدول تصوير — الوثيقة نفسها التي يعمل بها أي موقع تصوير. تعرف دائماً ما يحدث اليوم وما القادم.')}</p>
    </div>

    <div class="callsheet" data-r>
      <div class="cs-head">
        <span>BUNDLE / CALL SHEET</span><span>${t('Project: yours', 'المشروع: مشروعك')}</span><span>${t('Weather: always ready', 'الطقس: جاهزون دائماً')}</span>
      </div>
      ${[
        ['09:00', 'Brief', 'الموجز', 'We start with the business problem, not our service list. One call, one page, one metric we agree to be judged on.', 'نبدأ من مشكلتك التجارية لا من قائمة خدماتنا. مكالمة واحدة، صفحة واحدة، ومؤشر واحد نتفق أن نُقاس عليه.'],
        ['11:30', 'The big idea', 'الفكرة الكبيرة', 'One idea built to live on screen, on stage and on the feed at the same time — with the budget split mapped beside it.', 'فكرة واحدة مصمّمة لتعيش على الشاشة وعلى المسرح وفي المنصات في الوقت نفسه — ومعها توزيع الميزانية.'],
        ['14:00', 'Pre-production', 'ما قبل الإنتاج', 'Scripts, storyboards, venues, permits, casting, fabrication drawings. Everything signed off before a camera rolls.', 'سيناريو، ستوري بورد، مواقع، تصاريح، اختيار الممثلين، ورسومات التنفيذ. كل شيء معتمد قبل أن تدور الكاميرا.'],
        ['19:00', 'Showtime', 'وقت العرض', 'Shoot day, launch night or campaign live. Our crew on set, on stage and on the community inbox.', 'يوم التصوير أو ليلة الإطلاق أو انطلاق الحملة. فريقنا في الموقع وعلى المسرح وفي الرد على الجمهور.'],
        ['23:59', "That's a wrap", 'انتهى التصوير', 'Same-night highlights, next-day press pack, and a report against the metric we agreed at 09:00.', 'ملخص في الليلة نفسها، ملف إعلامي في اليوم التالي، وتقرير مقابل المؤشر الذي اتفقنا عليه الساعة ٩:٠٠.'],
      ].map(([time, en, ar, den, dar], i) => `
      <div class="cs-row" data-r>
        <span class="cs-time" dir="ltr">${time}</span>
        <span class="cs-no">0${i + 1}</span>
        <h3>${t(en, ar)}</h3>
        <p>${t(den, dar)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ============ CREDITS ============ -->
<section class="sec credits-sec">
  <div class="wrap credits-grid">
    <div>
      <p class="eyebrow" data-r>${t('Starring', 'بطولة')}</p>
      <h2 class="h2" data-r>${t('30+ brands <b>in the credits.</b>', 'أكثر من ٣٠ علامة <b>في التترات.</b>')}</h2>
      <p class="sec-side" data-r>${t('From national energy to global automotive and luxury fashion. Different rooms, different regulators — same crew.', 'من الطاقة الوطنية إلى السيارات العالمية والأزياء الفاخرة. قاعات مختلفة وجهات تنظيمية مختلفة — والفريق نفسه.')}</p>
      ${btn('work.html', 'The client list', 'قائمة العملاء', 'btn-ghost')}
    </div>
    <div class="credits" aria-label="Clients">
      <div class="credits-roll">
        ${creditsBlock}
        <div class="cr-group cr-end"><p class="cr-role">${t('Produced by', 'إنتاج')}</p><p class="cr-name cr-logo"><img src="assets/brand/logo-tag.png" alt="Bundle" width="200" height="100"></p></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FACTS ============ -->
<section class="facts">
  <div class="wrap facts-row">
    <div class="fact" data-r><b>2019</b>${t('Doors opened in Kuwait', 'بدأنا في الكويت')}</div>
    <div class="fact" data-r><b><span data-count="30">30</span>+</b>${t('Brands in the credits', 'علامة في التترات')}</div>
    <div class="fact" data-r><b>3<small>/1</small></b>${t('Departments, one building', 'أقسام في مبنى واحد')}</div>
    <div class="fact" data-r><b>AR<small>+</small>EN</b>${t('Written natively, never translated', 'كتابة أصلية لا ترجمة')}</div>
  </div>
</section>

<!-- ============ CTA ============ -->
<section class="cta-scene">
  <div class="cta-stripes" aria-hidden="true"></div>
  <div class="wrap cta-in">
    <svg class="cta-clap" viewBox="0 0 200 160" aria-hidden="true">
      <g class="clap-arm"><rect x="10" y="22" width="180" height="26" rx="3" fill="#12152B"/><path d="M28 22l-14 26h22l14-26zM70 22l-14 26h22l14-26zM112 22l-14 26h22l14-26zM154 22l-14 26h22l14-26z" fill="#FCD535"/></g>
      <rect x="10" y="54" width="180" height="96" rx="4" fill="#12152B"/>
      <text x="24" y="98" fill="#FCD535" font-family="JetBrains Mono, monospace" font-size="13">SCENE: YOURS</text>
      <text x="24" y="122" fill="#F6F1E4" font-family="JetBrains Mono, monospace" font-size="13">TAKE 01</text>
    </svg>
    <h2 class="cta-h">${t('Got a launch, a film<br>or a crazy idea?', 'عندك إطلاق، فيلم<br>أو فكرة مجنونة؟')}</h2>
    <p>${t('Send the brief. A producer calls you back within two working days.', 'أرسل الموجز، وسيتصل بك منتج من فريقنا خلال يومي عمل.')}</p>
    <div class="hero-ctas">
      ${btn('contact.html', 'Brief us', 'أرسل فكرتك', 'btn-ink')}
      <a class="btn btn-line" href="tel:+96597403924"><span dir="ltr">+965 9740 3924</span></a>
    </div>
  </div>
</section>
`;

module.exports = page({
  active: 'home',
  title: 'Bundle — Creative Agency, Production House & Events Company in Kuwait',
  desc: 'Bundle thinks it, shoots it and stages it: brand ideas, film and photo production, launches and activations — one crew under one roof in Kuwait since 2019.',
  bodyClass: 'pg-home',
  body,
});
