const { t, btn, PROJECTS, filmCard, page } = require('../lib');

const formats = [
  ['Launch', 'إطلاق', 'Product & model launches', 'إطلاق المنتجات والموديلات', 'Reveal nights, showroom openings and press previews — the moment the cover comes off is designed first.', 'ليالي الكشف، افتتاح المعارض والعروض الصحفية — لحظة إزالة الغطاء تُصمَّم أولاً.', 'L1'],
  ['Activation', 'تفعيل', 'Mall activations & roadshows', 'تفعيلات المولات والجولات', 'Stands, sampling and promoter teams in the places people already walk — trained on your message, not just your product.', 'منصات وتذوّق وفرق ترويج حيث يمشي الناس — مدرّبة على رسالتك، لا على منتجك فقط.', 'A2'],
  ['Exhibition', 'معرض', 'Exhibitions & stands', 'المعارض والأجنحة', 'Stand design, 3D visuals, fabrication and install — built to be photographed as much as visited.', 'تصميم الأجنحة، تصورات ثلاثية الأبعاد، التصنيع والتركيب — مبنية لتُصوَّر بقدر ما تُزار.', 'E3'],
  ['Press', 'إعلام', 'Conferences & press days', 'المؤتمرات والأيام الإعلامية', 'Stage, AV, guest lists and journalist briefings, with the press pack ready before guests leave.', 'المسرح والصوتيات وقوائم الضيوف وإحاطات الصحفيين، والملف الإعلامي جاهز قبل مغادرة الضيوف.', 'P4'],
  ['Pop-up', 'مؤقت', 'Pop-ups & brand spaces', 'المتاجر المؤقتة ومساحات العلامة', 'Short-run spaces with a long tail — designed for footfall on the day and content for the month after.', 'مساحات قصيرة المدة بأثر طويل — مصممة للزوار يوم الحدث وللمحتوى في الشهر الذي يليه.', 'U5'],
  ['Corporate', 'مؤسسي', 'Corporate & national occasions', 'المناسبات المؤسسية والوطنية', 'Annual gatherings, ceremonies and milestone events for organisations that answer to a lot of stakeholders.', 'تجمعات سنوية واحتفالات ومناسبات مفصلية لمؤسسات تخاطب جهات كثيرة.', 'C6'],
];

const ros = [
  ['14:00', 'Crew call & load-in', 'وصول الطاقم والتحميل', 'Stage, LED and AV in; fabrication on site; brand team walk-through.', 'المسرح والشاشات والصوتيات؛ التركيب في الموقع؛ جولة مع فريق العلامة.'],
  ['17:30', 'Tech rehearsal', 'البروفة التقنية', 'Cue-to-cue with lights, sound, presenters and the reveal mechanism.', 'بروفة كاملة على الإضاءة والصوت والمقدمين وآلية الكشف.'],
  ['19:00', 'Doors open', 'فتح الأبواب', 'Guest management, registration and hosts — content team already filming.', 'إدارة الضيوف والتسجيل والمضيفون — وفريق المحتوى يصوّر من البداية.'],
  ['20:15', 'The reveal', 'لحظة الكشف', 'The moment the whole night was built around. Three cameras on it.', 'اللحظة التي بُنيت حولها الليلة كلها. ثلاث كاميرات عليها.'],
  ['22:30', 'Highlights live', 'نشر الملخص', 'Same-night edit posted while guests are still talking about it.', 'مونتاج الليلة نفسها يُنشر والضيوف ما زالوا يتحدثون عنه.'],
  ['01:00', 'Load-out', 'الفك والتحميل', "Last truck leaves. Press pack and report land the next morning.", 'آخر شاحنة تغادر. الملف الإعلامي والتقرير يصلان صباح اليوم التالي.'],
];

const checks = [
  ['Venue sourcing & permits', 'اختيار الموقع والتصاريح'], ['Concept, 3D & floor plans', 'الفكرة والتصورات ومخططات الأرضية'],
  ['Fabrication & install', 'التصنيع والتركيب'], ['Staging, AV, lighting & LED', 'المسرح والصوتيات والإضاءة والشاشات'],
  ['Invitations, RSVP & registration', 'الدعوات والتأكيد والتسجيل'], ['Hosts & promoter teams', 'المضيفون وفرق الترويج'],
  ['Run-of-show & stage management', 'جدول الحفل وإدارة المسرح'], ['Content capture & same-night edit', 'تصوير المحتوى ومونتاج الليلة نفسها'],
];
const TICK = '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const body = `
<section class="phero ev-hero">
  <div class="ev-beams" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="ev-haze" aria-hidden="true"></div>
  <div class="wrap" style="position:relative">
    <p class="eyebrow" data-r>${t('Department 03 — Events & activations', 'القسم ٠٣ — الفعاليات والتفعيلات')}</p>
    <h1 class="phero-h" data-r>${t('Doors open<br>at <em>seven.</em>', 'الأبواب تُفتح<br><em>الساعة السابعة.</em>')}</h1>
    <div class="phero-row">
      <div>
        <p class="phero-sub" data-r>${t('Launches, activations and brand experiences — from the first concept board to the last truck leaving the venue. One producer owns the night.', 'إطلاقات وتفعيلات وتجارب علامة — من أول لوحة فكرة إلى آخر شاحنة تغادر الموقع. منتج واحد مسؤول عن الليلة كاملة.')}</p>
        <div class="countdown" data-countdown data-r aria-label="Countdown to doors">
          <div><b>00</b><small>${t('hrs', 'ساعة')}</small></div><div><b>00</b><small>${t('min', 'دقيقة')}</small></div><div><b>00</b><small>${t('sec', 'ثانية')}</small></div>
        </div>
      </div>
      ${btn('contact.html', 'Plan an event', 'خطط لفعاليتك')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Pick your <b>ticket.</b>', 'اختر <b>تذكرتك.</b>')}</h2>
      <p class="sec-side" data-r>${t('Six formats we run regularly. Most nights mix two or three of them.', 'ستة أنواع ننفذها باستمرار. أغلب الليالي تجمع اثنين أو ثلاثة منها.')}</p>
    </div>
    <div class="tickets">
      ${formats.map(([k, ka, en, ar, den, dar, code]) => `
      <article class="ticket" data-r>
        <div class="tk-main">
          <span class="tk-kind">${t('Admit one · ' + k, 'تذكرة · ' + ka)}</span>
          <div><h3>${t(en, ar)}</h3><p style="margin-top:10px">${t(den, dar)}</p></div>
        </div>
        <div class="tk-stub"><small>${t('Gate', 'بوابة')}</small><b>${code}</b><span class="barcode" aria-hidden="true"></span></div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="sec" style="background:var(--ink-2)">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('A launch night, <b>minute by minute.</b>', 'ليلة إطلاق، <b>دقيقة بدقيقة.</b>')}</h2>
      <p class="sec-side" data-r>${t('A typical run-of-show. Scroll and the playhead moves with you — this is the document your brand team gets a week before.', 'جدول حفل نموذجي. مرّر الصفحة وسيتحرك المؤشر معك — هذه الوثيقة يستلمها فريق علامتك قبل أسبوع.')}</p>
    </div>
    <div class="ros">
      <div class="ros-line"><i></i></div>
      ${ros.map(([tm, en, ar, den, dar]) => `
      <div class="ros-item"><span class="ros-time" dir="ltr">${tm}</span><div><h3>${t(en, ar)}</h3><p>${t(den, dar)}</p></div></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Everything on <b>the clipboard.</b>', 'كل شيء <b>على القائمة.</b>')}</h2>
      <p class="sec-side" data-r>${t('One contract, one producer, one phone number on the night.', 'عقد واحد، منتج واحد، ورقم هاتف واحد ليلة الحدث.')}</p>
    </div>
    <div class="checklist">
      ${checks.map(([en, ar]) => `<div class="chk"><span class="chk-box">${TICK}</span><h3>${t(en, ar)}</h3></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec" style="background:var(--ink-2)">
  <div class="wrap feature">
    <div class="feature-films">
      ${PROJECTS.filter((x) => ['events-reel', 'alghanim'].includes(x.id)).map(filmCard).join('')}
    </div>
    <div>
      <p class="eyebrow" data-r>${t('On the floor', 'على الأرض')}</p>
      <h2 class="h2" data-r style="margin-block:20px 24px">${t('Launch nights, <b>on repeat.</b>', 'ليالي إطلاق <b>لا تتوقف.</b>')}</h2>
      <p class="sec-side" data-r style="max-width:52ch">${t('Rolls-Royce dinners, Shell Helix dealer nights, a mall stand for Ali Alghanim & Sons Automotive — designed, built, staffed and filmed by the same crew. Press play for the cut.', 'عشاءات رولز رويس، ليالي وكلاء شل هيلكس، وجناح في المول لعلي الغانم وأولاده للسيارات — صمّمها وبناها وأدارها وصوّرها الفريق نفسه. اضغط تشغيل وشاهد.')}</p>
      <div style="margin-top:30px">${btn('work.html', 'More work', 'أعمال أخرى', 'btn-ghost')}</div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Seen from <b>the floor.</b>', 'من <b>قلب الحدث.</b>')}</h2>
      <p class="sec-side" data-r>${t('Frames from our own events — stands, stages, gala tables and the crowd.', 'لقطات من فعالياتنا — أجنحة، منصات، طاولات العشاء، والجمهور.')}</p>
    </div>
    <div class="collage">
      ${[['alghanim-stand', 'Ali Alghanim & Sons — mall stand', 'علي الغانم وأولاده — جناح المول'], ['rr-gala', 'Rolls-Royce gala dinner', 'عشاء رولز رويس'], ['dj', 'Launch night', 'ليلة الإطلاق'], ['shell-helix', 'Shell Helix dealer night', 'ليلة وكلاء شل هيلكس'], ['car-stage', 'The reveal, from the rig', 'لحظة الكشف من الأعلى'], ['levelup', 'Level Up brand night', 'ليلة Level Up'], ['alghanim-display', 'Product wall, Alghanim Parts', 'جدار المنتجات، الغانم للقطع'], ['alghanim-guests', 'Opening-day guests', 'ضيوف يوم الافتتاح']].map(([s, en, ar]) => `<figure data-r><img src="assets/frames/${s}.jpg" alt="${en}" loading="lazy"><figcaption>${t(en, ar)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="cta-scene">
  <div class="wrap cta-in">
    <h2 class="cta-h">${t('Got a date?<br>We have a crew.', 'عندك موعد؟<br>عندنا فريق.')}</h2>
    <p>${t('Event work is planned backwards from the venue date — the earlier we hear, the more we can build.', 'نخطط للفعاليات بالعكس من تاريخ الحدث — كل ما عرفنا أبكر، قدرنا نبني أكثر.')}</p>
    <div class="hero-ctas">${btn('contact.html', 'Plan an event', 'خطط لفعاليتك', 'btn-ink')}<a class="btn btn-line" href="tel:+96597403924"><span dir="ltr">+965 9740 3924</span></a></div>
  </div>
</section>
`;

module.exports = page({
  active: 'events', bodyClass: 'pg-events',
  title: 'Events — Launches, Activations & Exhibitions | Bundle Kuwait',
  desc: 'Bundle Events: product launches, mall activations, exhibitions, press days and pop-ups in Kuwait — concept, build, run-of-show and crew on the night.',
  body,
});
