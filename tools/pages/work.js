const { t, btn, filmStrip, page } = require('../lib');

const D = { c: ['Creative', 'إبداع'], p: ['Production', 'إنتاج'], e: ['Events', 'فعاليات'] };
const cases = [
  ['Model launches that fill the showroom floor', 'إطلاقات موديلات تملأ صالة العرض', 'BMW · Porsche · Cadillac', 'c p e', ''],
  ['Challenger marques in a crowded market', 'علامات صاعدة في سوق مزدحم', 'Geely · Haval · GWM Tank', 'c p e', 'assets/work/geely-starray.png'],
  ['Corporate stories for national energy', 'قصص مؤسسية لقطاع الطاقة الوطني', 'Kuwait Oil Company · Shell', 'c p e', ''],
  ['Press days and editorial partnerships', 'أيام صحفية وشراكات تحريرية', "Michael Kors · Orlebar Brown · il gufo · Harper's Bazaar Arabia", 'c e', ''],
  ['Seasonal campaigns built for footfall', 'حملات موسمية مبنية للزوار', 'The Avenues · The Gate Mall', 'c p e', ''],
  ['Creator-led content for online retail', 'محتوى بقيادة المؤثرين للتجارة الإلكترونية', 'Boutiqaat · Alyasra Fashion', 'c p', 'assets/work/interview-set.png'],
  ['Making scientific work legible', 'تبسيط العمل العلمي للجمهور', 'KISR · The National Fund · Markaz', 'c p', ''],
  ['Health communication that clears the regulator', 'تواصل صحي يجتاز الجهات التنظيمية', 'Roche · Hayatt · Argan', 'c p e', ''],
  ['Admissions campaigns for a full intake', 'حملات قبول لدفعة مكتملة', 'Australian University Kuwait', 'c p', ''],
  ['Sampling and shelf presence nationwide', 'تذوّق وحضور على الرفوف في كل الكويت', 'Kitco · Sara · Aqua Gulf · Alnasser', 'p e', 'assets/work/be-epic.png'],
  ['Retail calendars for dealer networks', 'تقويمات تجزئة لشبكات الوكلاء', 'Volvo · Ali Alghanim & Sons', 'c e', 'assets/work/gmc-yukon.png'],
];
const logos = ['kuwait-oil','shell','kisr','markaz','national-fund','australian-university','roche','hayatt','argan-bedaya','argan-riaya','gig-kuwait','cartoon-network','alnasser','aqua-gulf','sara','kitco','bmw','cadillac','porsche','geely','gwm-tank','haval','volvo','alghanim','boutiqaat','alyasra','orlebar-brown','michael-kors','il-gufo','bazaar','gate-mall','the-avenues'];

const body = `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow" data-r>${t('Work — the case files', 'الأعمال — الملفات')}</p>
    <h1 class="phero-h" data-r>${t('The <em>case files.</em>', '<em>ملفات</em> الأعمال.')}</h1>
    <p class="phero-sub" data-r>${t('Eleven kinds of job, seven sectors, one crew. Filter by department to see which floors each one ran through.', 'أحد عشر نوعاً من المشاريع، سبعة قطاعات، وفريق واحد. صفِّ حسب القسم لترى أي الطوابق مرّ بها كل مشروع.')}</p>
    <div class="filters" data-filters role="group" aria-label="Filter">
      <button class="filter is-on" data-filter="all" aria-pressed="true">${t('All', 'الكل')}</button>
      <button class="filter" data-filter="c" aria-pressed="false">${t('Creative', 'الإبداع')}</button>
      <button class="filter" data-filter="p" aria-pressed="false">${t('Production', 'الإنتاج')}</button>
      <button class="filter" data-filter="e" aria-pressed="false">${t('Events', 'الفعاليات')}</button>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="cases">
      ${cases.map(([en, ar, cl, cats, img], i) => `
      <article class="case" data-cat="${cats}"${img ? ` data-img="${img}" data-cursor="Peek"` : ''}>
        <span class="case-no">${String(i + 1).padStart(2, '0')}</span>
        <h3>${t(en, ar)}</h3>
        <p class="case-cl">${cl}</p>
        <div class="case-tags">${cats.split(' ').map((k) => `<span class="c">${t(D[k][0], D[k][1])}</span>`).join('')}</div>
      </article>`).join('')}
    </div>
    <p class="sec-side" style="margin-top:30px">${t('Full case studies are shared in the credentials deck — ask for it with your brief.', 'دراسات الحالة الكاملة موجودة في ملف التعريف — اطلبه مع موجزك.')}</p>
  </div>
  <div class="case-peek" aria-hidden="true"><img src="assets/work/geely-starray.png" alt=""></div>
</section>

<section class="sec reel-sec" style="padding-top:0">${filmStrip()}</section>

<section class="sec light">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2" data-r>${t('The full <em>client list.</em>', 'قائمة <em>العملاء.</em>')}</h2>
      <p class="sec-side" data-r>${t('Thirty-two brands since 2019 — hover to bring the colour back.', 'اثنان وثلاثون علامة منذ ٢٠١٩ — مرّر لتعود الألوان.')}</p>
    </div>
    <div class="logo-wall" data-r>${logos.map((l) => `<div><img src="assets/clients/${l}.png" alt="${l.replace(/-/g, ' ')}" loading="lazy"></div>`).join('')}</div>
  </div>
</section>

<section class="cta-scene">
  <div class="wrap cta-in">
    <h2 class="cta-h">${t('Your brand,<br>next on the list.', 'علامتك،<br>التالية في القائمة.')}</h2>
    <div class="hero-ctas">${btn('contact.html', 'Brief us', 'أرسل فكرتك', 'btn-ink')}</div>
  </div>
</section>
`;

module.exports = page({
  active: 'work', bodyClass: 'pg-work',
  title: 'Work — Case Files & Clients | Bundle Kuwait',
  desc: 'Campaigns, films and events Bundle has made for 30+ brands in Kuwait — energy, automotive, fashion, retail, research, health and FMCG.',
  body,
});
