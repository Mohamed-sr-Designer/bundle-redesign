const { t, btn, filmStrip, page } = require('../lib');

const caps = [
  ['TVCs & brand films', 'إعلانات وأفلام علامات', 'Scripted, cast, shot and finished in-house — so the hero film, the social cut-downs and the event screen all come from one master.', 'نكتبها ونختار ممثليها ونصوّرها وننهيها داخلياً — فيخرج الفيلم الرئيسي ومقاطع السوشيال وشاشة الحدث من نسخة أصلية واحدة.',
    [['Direction & cinematography', 'الإخراج والتصوير السينمائي'], ['Casting & locations', 'اختيار الممثلين والمواقع'], ['On-set art direction', 'الإخراج الفني في الموقع']]],
  ['Social-first content', 'محتوى للسوشيال أولاً', 'Short-form built for the thumb: vertical from the storyboard, hooks in the first second, subtitles burned in both languages.', 'محتوى قصير مصمم للإبهام: عمودي من الستوري بورد، جذب من أول ثانية، وترجمة مدمجة باللغتين.',
    [['Reels, TikTok & Shorts', 'ريلز وتيك توك وشورتس'], ['Creator & interview sets', 'استوديوهات المؤثرين والمقابلات'], ['Same-day event edits', 'مونتاج الحدث في نفس اليوم']]],
  ['Photography', 'التصوير الفوتوغرافي', 'Campaign, product, portrait and event photography — lit and art-directed to match the film, not as an afterthought.', 'تصوير الحملات والمنتجات والبورتريه والفعاليات — بإضاءة وإخراج فني يطابق الفيلم، لا كإضافة لاحقة.',
    [['Campaign & key visuals', 'صور الحملات والمرئيات'], ['Studio & gelled portraits', 'تصوير استوديو بإضاءة ملوّنة'], ['Automotive & product', 'السيارات والمنتجات']]],
  ['Motion & post', 'الموشن وما بعد الإنتاج', 'Edit, colour grade, sound mix, motion graphics and bilingual subtitling — finished under the same roof the footage was planned in.', 'مونتاج، تصحيح ألوان، مكساج صوت، موشن جرافيك وترجمة باللغتين — تُنجز تحت نفس السقف الذي خُطط فيه التصوير.',
    [['Offline & online edit', 'المونتاج الأولي والنهائي'], ['Grade & sound mix', 'الألوان والصوت'], ['2D motion & titles', 'موشن ثنائي الأبعاد وعناوين']]],
];

const body = `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow" data-r>${t('Department 02 — Production', 'القسم ٠٢ — الإنتاج')}</p>
    <h1 class="phero-h" data-r>${t('Roll sound.<br><em>Roll camera.</em>', 'صوت.<br><em>كاميرا. أكشن.</em>')}</h1>
    <div class="phero-row">
      <p class="phero-sub" data-r>${t('Our in-house production floor: directors, DOPs, editors, colourists and motion designers. The concept is pressure-tested against the shoot before you see it — which is why the calendar holds.', 'طابق الإنتاج الداخلي: مخرجون، مديرو تصوير، مونتيرون، ملوّنون ومصممو موشن. الفكرة تُختبر مقابل يوم التصوير قبل أن تراها — ولهذا يلتزم الجدول.')}</p>
      ${btn('contact.html', 'Book a shoot', 'احجز تصوير')}
    </div>

    <div class="monitor" data-r aria-hidden="true">
      <div class="mon-screen"></div>
      <div class="mon-safe"></div>
      <div class="mon-word">
        <span>${t('Roll sound', 'صوت')}</span><span>${t('Speed', 'جاهز')}</span><span>${t('Mark it', 'سجّل')}</span><span>${t('Action!', 'أكشن!')}</span>
      </div>
      <div class="scrub"><i></i></div>
      <div class="mon-hud">
        <div class="a"><i class="rec-dot"></i> REC · A-CAM</div>
        <div class="b">2.39:1 · 4K DCI · 25P</div>
        <div class="c"><span data-tc>00:00:00:00</span></div>
        <div class="d"><div class="meters"><i></i><i></i><i></i><i></i></div></div>
      </div>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:clamp(40px,6vw,80px)">
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

<section class="sec" style="background:var(--ink-2)">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('One shoot. <em>Every frame size.</em>', 'تصوير واحد. <em>كل المقاسات.</em>')}</h2>
      <p class="sec-side" data-r>${t('We frame for every placement on the day, so the TV spot, the reel, the feed post and the mall screen are all native — never cropped in a panic.', 'نؤطّر لكل منصة في يوم التصوير نفسه، فيكون الإعلان التلفزيوني والريل والبوست وشاشة المول كلها أصلية — لا قص على عجل.')}</p>
    </div>
    <div class="ratios" data-r>
      <div class="ratio r169">16:9<small>${t('TV · YouTube · LED', 'تلفزيون · يوتيوب · شاشات')}</small></div>
      <div class="ratio r916">9:16<small>${t('Reels · TikTok', 'ريلز · تيك توك')}</small></div>
      <div class="ratio r45">4:5<small>${t('Feed', 'الفيد')}</small></div>
      <div class="ratio r11">1:1<small>${t('Feed · Ads', 'الفيد · إعلانات')}</small></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('Pre. Shoot. <em>Post.</em>', 'قبل. أثناء. <em>بعد.</em>')}</h2>
      <p class="sec-side" data-r>${t('Three phases, one producer from the first script note to the final delivery file.', 'ثلاث مراحل، ومنتج واحد من أول ملاحظة على السيناريو إلى آخر ملف تسليم.')}</p>
    </div>
    <div class="phases">
      <div class="phase" data-r><span class="tcode">TC 00:00 → ${t('PRE', 'ما قبل')}</span><h3>${t('Pre-production', 'ما قبل الإنتاج')}</h3>
        <ul><li>${t('Script, storyboard & shot list signed off', 'اعتماد السيناريو والستوري بورد وقائمة اللقطات')}</li><li>${t('Casting, wardrobe & location scouting', 'اختيار الممثلين والأزياء ومعاينة المواقع')}</li><li>${t('Permits, schedule & call sheet', 'التصاريح والجدول وورقة الاستدعاء')}</li></ul></div>
      <div class="phase" data-r><span class="tcode">TC 01:00 → ${t('SHOOT', 'تصوير')}</span><h3>${t('Shoot day', 'يوم التصوير')}</h3>
        <ul><li>${t('Director, DOP & full camera crew', 'مخرج ومدير تصوير وطاقم كامل')}</li><li>${t('Lighting, grip & on-set art', 'الإضاءة والمعدات والإخراج الفني')}</li><li>${t('Stills & BTS captured alongside', 'صور فوتوغرافية وكواليس بالتوازي')}</li></ul></div>
      <div class="phase" data-r><span class="tcode">TC 02:00 → ${t('POST', 'ما بعد')}</span><h3>${t('Post-production', 'ما بعد الإنتاج')}</h3>
        <ul><li>${t('Edit, grade & sound mix', 'المونتاج والألوان والصوت')}</li><li>${t('Motion graphics & titles', 'الموشن جرافيك والعناوين')}</li><li>${t('Arabic & English subtitles, every ratio', 'ترجمة عربية وإنجليزية، بكل المقاسات')}</li></ul></div>
    </div>
  </div>
</section>

<section class="sec reel-sec" style="padding-top:0">
  <div class="wrap sec-head">
    <h2 class="h2" data-r>${t('From the <em>camera roll.</em>', 'من <em>بكرة الكاميرا.</em>')}</h2>
    <p class="sec-side" data-r>${t('Real frames from Bundle sets — interview studios, location shoots and gelled portrait sessions.', 'لقطات حقيقية من مواقع تصوير Bundle — استوديوهات مقابلات، تصوير خارجي، وجلسات بإضاءة ملوّنة.')}</p>
  </div>
  ${filmStrip(true)}
</section>

<section class="cta-scene">
  <div class="wrap cta-in">
    <h2 class="cta-h">${t("Let's roll.", 'يلا نصوّر.')}</h2>
    <p>${t('Send the script, the brief or just the deadline.', 'أرسل السيناريو أو الموجز أو حتى الموعد النهائي فقط.')}</p>
    <div class="hero-ctas">${btn('contact.html', 'Book a shoot', 'احجز تصوير', 'btn-ink')}${btn('events.html', 'Next: Events', 'التالي: الفعاليات', 'btn-line')}</div>
  </div>
</section>
`;

module.exports = page({
  active: 'production', bodyClass: 'pg-production',
  title: 'Production — TVCs, Brand Films, Photo & Post | Bundle Kuwait',
  desc: 'Bundle Production: TVCs, brand films, social content, photography, motion and post-production — scripted, shot and finished in-house in Kuwait.',
  body,
});
