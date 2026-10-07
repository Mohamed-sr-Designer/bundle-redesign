const { t, btn, page } = require('../lib');

const floors = [
  ['ROOF', 'Strategy & account leads', 'الاستراتيجية وقادة الحسابات', 'Owns the brief, the plan and the report. The person you call.', 'يملك الموجز والخطة والتقرير. الشخص الذي تتصل به.'],
  ['L3', 'Creative', 'الإبداع', 'Writers, designers and PR — Arabic and English at the same desk.', 'كتّاب ومصممون وعلاقات عامة — العربي والإنجليزي على الطاولة نفسها.'],
  ['L2', 'Production', 'الإنتاج', 'Directors, camera, edit suites, grade and motion.', 'مخرجون، كاميرات، غرف مونتاج، ألوان وموشن.'],
  ['G', 'Events', 'الفعاليات', 'Producers, fabrication partners, crew and the run-of-show.', 'منتجون، شركاء تصنيع، طاقم وجدول الحفل.'],
];
const principles = [
  ['One building, no hand-offs', 'مبنى واحد، بلا تسليم', 'The strategist who writes the positioning sits beside the producer who films it and the crew who stages it. Nothing gets translated between companies, budgets or calendars.', 'الاستراتيجي الذي يكتب التموضع يجلس بجانب المنتج الذي يصوّره والفريق الذي ينفّذه. لا شيء يضيع بين الشركات أو الميزانيات أو الجداول.'],
  ["If we can't make it, we don't pitch it", 'لا نقدّم ما لا نستطيع تنفيذه', 'Production sits in the creative review, so ideas are tested against budget, permits and build time before they reach you.', 'الإنتاج حاضر في مراجعة الأفكار، فتُختبر مقابل الميزانية والتصاريح ووقت التنفيذ قبل أن تصلك.'],
  ['Arabic is a first language', 'العربية لغة أولى', 'Campaigns in this market are read in Arabic. We write them that way from the start.', 'الحملات في هذا السوق تُقرأ بالعربية. ونحن نكتبها هكذا من البداية.'],
  ['Agree the metric before the idea', 'نتفق على المؤشر قبل الفكرة', 'Awareness, footfall, sentiment or leads — pick one to lead on, and judge us against it.', 'الوعي، الزوار، الانطباع أو العملاء المحتملون — اختر واحداً، وحاسبنا عليه.'],
  ['Say the hard thing early', 'نقول الصعب مبكراً', 'If a date is unrealistic or a budget won’t carry the idea, you hear it in week one — not at the wrap.', 'إذا كان الموعد غير واقعي أو الميزانية لا تحمل الفكرة، تسمعها في الأسبوع الأول — لا في النهاية.'],
];

const body = `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow" data-r>${t('The studio — Kuwait, est. 2019', 'الاستوديو — الكويت، منذ ٢٠١٩')}</p>
    <h1 class="phero-h" data-r>${t('One building.<br><em>Zero hand-offs.</em>', 'مبنى واحد.<br><em>بلا تسليم.</em>')}</h1>
    <p class="phero-sub" data-r>${t('Bundle was founded in Kuwait in 2019 on a simple observation: most marketing fails in the gaps between agencies, not inside them. So we built one place where the idea, the camera and the stage share a floor plan.', 'تأسست Bundle في الكويت عام ٢٠١٩ على ملاحظة بسيطة: أغلب التسويق يفشل في الفجوات بين الوكالات، لا داخلها. فبنينا مكاناً واحداً تتشارك فيه الفكرة والكاميرا والمسرح المخطط نفسه.')}</p>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="building" data-r>
      <div class="roof"></div>
      ${floors.map(([lv, en, ar, den, dar]) => `
      <div class="floor"><span class="floor-lv">${lv}</span><div><h3>${t(en, ar)}</h3><p>${t(den, dar)}</p></div><div class="floor-win" aria-hidden="true">${'<i></i>'.repeat(8)}</div></div>`).join('')}
      <div class="ground"></div>
    </div>
  </div>
</section>

<section class="sec light">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Five house rules.', 'خمس قواعد للبيت.')}</h2>
      <p class="sec-side" data-r>${t('We argue about these internally so you don’t have to.', 'نتجادل حولها داخلياً حتى لا تضطر أنت لذلك.')}</p>
    </div>
    <div class="principles">
      ${principles.map(([en, ar, den, dar]) => `<div class="principle" data-r><h3>${t(en, ar)}</h3><p>${t(den, dar)}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="facts">
  <div class="wrap facts-row">
    <div class="fact" data-r><b>2019</b>${t('Founded in Kuwait', 'تأسست في الكويت')}</div>
    <div class="fact" data-r><b>30<small>+</small></b>${t('Brands served', 'علامة خدمناها')}</div>
    <div class="fact" data-r><b>7</b>${t('Sectors from the inside', 'قطاعات نعرفها من الداخل')}</div>
    <div class="fact" data-r><b>1</b>${t('Named lead, pitch to report', 'مسؤول واحد من العرض للتقرير')}</div>
  </div>
</section>

<section class="cta-scene">
  <div class="wrap cta-in">
    <h2 class="cta-h">${t('Come meet<br>the whole floor.', 'تعال تعرّف<br>على الفريق كله.')}</h2>
    <p>${t('The team in the pitch is the team on your account.', 'الفريق في العرض هو الفريق على حسابك.')}</p>
    <div class="hero-ctas">${btn('contact.html', 'Book a studio visit', 'احجز زيارة', 'btn-ink')}</div>
  </div>
</section>
`;

module.exports = page({
  active: 'about', bodyClass: 'pg-about',
  title: 'Studio — About Bundle | Creative, Production & Events, Kuwait',
  desc: 'Founded in Kuwait in 2019, Bundle puts creative, production and events teams in one building — one brief in, one story out.',
  body,
});
