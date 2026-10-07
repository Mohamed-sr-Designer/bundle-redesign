const { t, btn, PROJECTS, filmCard, page } = require('../lib');

const caps = [
  ['Brand identity', 'هوية العلامة', 'Positioning, naming, identity systems and guidelines that make you recognisable before anyone reads a word.', 'التموضع، التسمية، أنظمة الهوية والأدلة الإرشادية — لتُعرف علامتك قبل أن يقرأ أحد كلمة.',
    [['Positioning & tone of voice', 'التموضع ونبرة الصوت'], ['Logo systems with bilingual lockups', 'شعارات بصيغ عربية وإنجليزية'], ['Brand book & asset library', 'دليل الهوية ومكتبة الملفات']]],
  ['Campaign ideas', 'أفكار الحملات', 'One idea, built to stretch across film, social, press and on-ground at the same time — with the media split mapped beside it.', 'فكرة واحدة تمتد على الفيلم والسوشيال والصحافة والأرض في الوقت نفسه — ومعها توزيع الوسائل.',
    [['Concept & key visual', 'الفكرة والمرئي الرئيسي'], ['Scripts & storyboards', 'السيناريو والستوري بورد'], ['Media & channel plan', 'خطة الوسائل والقنوات']]],
  ['Content & social', 'المحتوى والسوشيال', 'Always-on content and channel management planned as a strategy, not a posting schedule.', 'محتوى مستمر وإدارة قنوات مبنية كاستراتيجية، لا كجدول نشر.',
    [['Monthly content calendars', 'تقويم محتوى شهري'], ['Arabic-first copywriting', 'كتابة عربية أولاً'], ['Community management', 'إدارة المجتمع والتفاعل']]],
  ['PR & media', 'العلاقات العامة والإعلام', 'Media relations in Kuwait and the GCC, press material in both languages, spokesperson prep and issues management.', 'علاقات إعلامية في الكويت والخليج، مواد صحفية باللغتين، تجهيز المتحدثين وإدارة الأزمات.',
    [['Press releases & press days', 'بيانات وأيام صحفية'], ['Spokesperson training', 'تدريب المتحدثين'], ['Monitoring & sentiment reports', 'رصد وتقارير الانطباع']]],
];

const body = `
<section class="phero cr-hero">
  <div class="cr-circus" aria-hidden="true" data-tilt><img src="assets/brand/circus.webp" alt="" width="762" height="830"></div>
  <div class="stickers" aria-hidden="true">
    <span class="sticker s1">${t('Big idea', 'فكرة كبيرة')}</span>
    <span class="sticker s2">${t('Arabic first', 'العربي أولاً')}</span>
    <span class="sticker s3">${t('No templates', 'بدون قوالب')}</span>
  </div>
  <div class="wrap">
    <p class="eyebrow" data-r>${t('Department 01 — Creative', 'القسم ٠١ — الإبداع')}</p>
    <h1 class="phero-h" data-r>${t('Ideas with<br>a <em>pulse.<svg class="underline-svg" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M4 26 C 90 6, 180 38, 260 18 S 370 10, 396 22" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg></em>', 'أفكار<br>فيها <em>نبض.<svg class="underline-svg" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M4 26 C 90 6, 180 38, 260 18 S 370 10, 396 22" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg></em>')}</h1>
    <div class="phero-row">
      <p class="phero-sub" data-r>${t('The writers, designers and strategists who decide what your brand says — and how it looks saying it. Every idea leaves this floor already knowing how it will be filmed and staged.', 'الكتّاب والمصممون والاستراتيجيون الذين يقررون ماذا تقول علامتك — وكيف تبدو وهي تقوله. كل فكرة تخرج من هذا الطابق وهي تعرف كيف ستُصوَّر وكيف ستُنفَّذ على الأرض.')}</p>
      ${btn('contact.html', 'Brief the creative team', 'أرسل الموجز لفريق الإبداع', 'btn-ink')}
    </div>
  </div>
</section>

<section class="sec light" style="padding-top:0">
  <div class="wrap">
    <div class="caps">
      ${caps.map(([en, ar, den, dar, list], i) => `
      <div class="cap" data-r>
        <span class="cap-no">0${i + 1}</span>
        <h3>${t(en, ar)}</h3>
        <p>${t(den, dar)}</p>
        <ul>${list.map(([a, b]) => `<li>${t(a, b)}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec light" style="background:var(--paper-2)">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Every idea has to pass <b>the set test.</b>', 'على كل فكرة أن تجتاز <b>اختبار موقع التصوير.</b>')}</h2>
      <p class="sec-side" data-r>${t("Our producers sit in the creative review. If an idea can't survive these three questions, it doesn't reach your inbox.", 'منتجونا يحضرون مراجعة الأفكار. أي فكرة لا تصمد أمام هذه الأسئلة الثلاثة لا تصل إلى بريدك.')}</p>
    </div>
    <div class="idea-test">
      <div class="test-card" data-r><span class="stamp">PASS</span><span class="eyebrow">Q.01</span>
        <div><p class="q">${t('Can we shoot it?', 'هل يمكن تصويرها؟')}</p><p>${t('Budget, permits, locations and talent checked before the concept is presented — not after it is approved.', 'الميزانية والتصاريح والمواقع والممثلون — نتحقق منها قبل عرض الفكرة، لا بعد اعتمادها.')}</p></div></div>
      <div class="test-card" data-r><span class="stamp">PASS</span><span class="eyebrow">Q.02</span>
        <div><p class="q">${t('Can we stage it?', 'هل يمكن تنفيذها على الأرض؟')}</p><p>${t('If the idea works on screen but dies in a mall atrium, it is only half an idea. We build for both.', 'إذا نجحت الفكرة على الشاشة وماتت في ساحة المول، فهي نصف فكرة. نحن نبني للاثنين.')}</p></div></div>
      <div class="test-card" data-r><span class="stamp">PASS</span><span class="eyebrow">Q.03</span>
        <div><p class="q">${t('Does it land in Arabic first?', 'هل تصل بالعربي أولاً؟')}</p><p>${t('Campaigns here are read in Arabic. If the line only works in English, we start again.', 'الحملات هنا تُقرأ بالعربي. إذا كانت الجملة تنجح بالإنجليزي فقط، نبدأ من جديد.')}</p></div></div>
    </div>
  </div>
</section>

<section class="sec" style="background:var(--ink-2)">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Ideas, <b>on screen.</b>', 'أفكار <b>على الشاشة.</b>')}</h2>
      <p class="sec-side" data-r>${t('A national awareness campaign for Hayatt, and the motion piece that explains Bundle in under a minute.', 'حملة توعية وطنية لـ«حياة»، وموشن جرافيك يشرح Bundle في أقل من دقيقة.')}</p>
    </div>
    <div class="film-grid">${PROJECTS.filter((x) => ['hayatt', 'makes-bundle'].includes(x.id)).map(filmCard).join('')}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Two languages. <b>Zero translation.</b>', 'لغتان. <b>بدون ترجمة.</b>')}</h2>
      <p class="sec-side" data-r>${t('Arabic and English are written as two original pieces by two writers, from the same brief — then art-directed together.', 'العربي والإنجليزي يُكتبان كقطعتين أصليتين بيد كاتبين، من الموجز نفسه — ثم يُخرجان فنياً معاً.')}</p>
    </div>
    <div class="bilingual">
      <div class="bi-card ar" data-r><span class="bi-glyph">ع</span><p>${t('Arabic copy is written first, by native writers who know how a headline sounds out loud in a Kuwaiti majlis.', 'النص العربي يُكتب أولاً، بيد كتّاب يعرفون كيف يُسمع العنوان في ديوانية كويتية.')}</p></div>
      <div class="bi-card en" data-r><span class="bi-glyph">Aa</span><p>${t('English is a parallel original — same idea, its own rhythm. Logos and layouts get bilingual lockups from day one.', 'الإنجليزي نسخة أصلية موازية — الفكرة نفسها بإيقاعها الخاص. والشعارات والتصاميم تُبنى باللغتين من اليوم الأول.')}</p></div>
    </div>
  </div>
</section>

<section class="cta-scene">
  <div class="wrap cta-in">
    <h2 class="cta-h">${t('Need an idea<br>that travels?', 'تحتاج فكرة<br>تعيش في كل مكان؟')}</h2>
    <p>${t('From a name to a national campaign — start with one page.', 'من اسم علامة إلى حملة وطنية — ابدأ بصفحة واحدة.')}</p>
    <div class="hero-ctas">${btn('contact.html', 'Brief us', 'أرسل فكرتك', 'btn-ink')}${btn('production.html', 'Next: Production', 'التالي: الإنتاج', 'btn-line')}</div>
  </div>
</section>
`;

module.exports = page({
  active: 'creative', bodyClass: 'pg-creative',
  title: 'Creative — Brand, Campaigns, Content & PR | Bundle Kuwait',
  desc: 'Bundle Creative: brand identity, campaign ideas, Arabic-first content and PR — ideas that already know how they will be filmed and staged.',
  body,
});
