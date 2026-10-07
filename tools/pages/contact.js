const { t, esc, page } = require('../lib');

const opt = (en, ar, v = '') => `<option value="${esc(v || en)}" data-en="${esc(en)}" data-ar="${esc(ar)}">${en}</option>`;
const inp = (id, en, ar, phEn, phAr, type = 'text', req = true, full = false) => `
        <div class="fld${full ? ' full' : ''}">
          <label for="${id}">${t(en, ar)}</label>
          <input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''} placeholder="${esc(phEn)}" data-en-ph="${esc(phEn)}" data-ar-ph="${esc(phAr)}">
        </div>`;

const body = `
<section class="phero" style="padding-bottom:40px">
  <div class="wrap">
    <p class="eyebrow" data-r>${t('Brief us — take one', 'أرسل فكرتك — اللقطة الأولى')}</p>
    <h1 class="phero-h" data-r>${t("Let's make<br>a <em>scene.</em>", 'خلّنا نصنع<br><em>مشهد.</em>')}</h1>
    <p class="phero-sub" data-r>${t('Tell us what you need and when. A producer calls you back within two working days.', 'قل لنا ماذا تحتاج ومتى. منتج من فريقنا يتصل بك خلال يومي عمل.')}</p>
  </div>
</section>

<section class="sec" style="padding-top:20px">
  <div class="wrap brief">
    <div class="slate" data-r>
      <div class="slate-top" aria-hidden="true"></div>
      <form data-demo-form novalidate>
        ${inp('name', 'Your name', 'اسمك', 'Full name', 'الاسم الكامل')}
        ${inp('company', 'Brand / company', 'العلامة / الشركة', 'Who is it for?', 'لمن المشروع؟')}
        ${inp('email', 'Email', 'البريد الإلكتروني', 'name@company.com', 'name@company.com', 'email')}
        ${inp('phone', 'Phone', 'الهاتف', '+965', '+965', 'tel', false)}
        <div class="fld full">
          <span class="lbl">${t('Which departments?', 'أي الأقسام؟')}</span>
          <div class="chips">
            <button type="button" class="chip" aria-pressed="false">${t('Creative', 'الإبداع')}</button>
            <button type="button" class="chip" aria-pressed="false">${t('Production', 'الإنتاج')}</button>
            <button type="button" class="chip" aria-pressed="false">${t('Events', 'الفعاليات')}</button>
            <button type="button" class="chip" aria-pressed="false">${t('All three', 'الثلاثة')}</button>
          </div>
        </div>
        <div class="fld">
          <label for="when">${t('When is it live?', 'متى الانطلاق؟')}</label>
          <select id="when" name="when">${opt('Within a month', 'خلال شهر')}${opt('1–3 months', '١–٣ أشهر')}${opt('3+ months', 'أكثر من ٣ أشهر')}${opt('Not sure yet', 'غير محدد')}</select>
        </div>
        <div class="fld">
          <label for="type">${t('Kind of job', 'نوع المشروع')}</label>
          <select id="type" name="type">${opt('Campaign', 'حملة')}${opt('Film / shoot', 'فيلم / تصوير')}${opt('Launch / event', 'إطلاق / فعالية')}${opt('Brand identity', 'هوية علامة')}${opt('Monthly retainer', 'عقد شهري')}</select>
        </div>
        <div class="fld full">
          <label for="msg">${t('The brief', 'الموجز')}</label>
          <textarea id="msg" name="msg" required placeholder="What are you launching, who needs to see it, and what does success look like?" data-en-ph="What are you launching, who needs to see it, and what does success look like?" data-ar-ph="ماذا ستطلق، من يجب أن يراه، وكيف يبدو النجاح؟"></textarea>
        </div>
        <div class="fld full"><button class="btn" type="submit">${t("Send it — that's a take", 'أرسل — تم التصوير')}<svg class="ico-arr" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
        <p class="form-ok" role="status">${t('Got it. A producer will call you within two working days.', 'وصلنا. منتج من فريقنا سيتصل بك خلال يومي عمل.')}</p>
      </form>
    </div>

    <aside class="contact-side">
      <div class="cside y" data-r>
        <p class="eyebrow">${t('Call the studio', 'اتصل بالاستوديو')}</p>
        <a class="big" href="tel:+96597403924" dir="ltr">+965 9740 3924</a>
        <a class="big" href="https://wa.me/96597403924">${t('WhatsApp us', 'راسلنا واتساب')}</a>
      </div>
      <div class="cside" data-r>
        <p class="eyebrow">${t('Email', 'البريد')}</p>
        <a class="big" href="mailto:hello@bundleims.com">hello@bundleims.com</a>
      </div>
      <div class="cside" data-r>
        <p class="eyebrow">${t('Studio', 'الاستوديو')}</p>
        <p>${t('Kuwait City, Kuwait', 'مدينة الكويت، الكويت')}</p>
        <p>${t('Sunday – Thursday · 9:00 – 18:00', 'الأحد – الخميس · ٩:٠٠ – ١٨:٠٠')}</p>
      </div>
    </aside>
  </div>
</section>
`;

module.exports = page({
  active: 'contact', bodyClass: 'pg-contact',
  title: 'Brief Us — Contact Bundle | Kuwait',
  desc: 'Send Bundle your brief — campaigns, shoots, launches and events in Kuwait. A producer calls back within two working days.',
  body,
});
