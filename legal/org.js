// Данные организатора — единственное место, где их нужно вписать.
// Отсюда они попадают в условия, возврат, конфиденциальность, английскую версию и низ главной страницы.
// Ссылки на условия и блок «Контакты» на сайте появляются сами, когда заполнены name и email.
// Название и адрес должны совпадать с тем, что указано в аккаунте Stripe.
window.ORG = {
  name: '',        // как в Stripe: имя частного лица или название компании, например «ИП Иванов И. И.» / «Bemen Co., Ltd.»
  nameEn: '',      // то же латиницей (для английской версии); пусто — берём name
  reg: '',         // регистрационный или налоговый номер, если есть; пусто — строка не показывается
  address: '',     // адрес в Таиланде, как в Stripe
  email: '',       // почта для покупателей
  phone: '',       // телефон для покупателей, с кодом страны: +66 ...
  telegram: 'elena_izmerova90'
};

// Ссылка Stripe Payment Link (https://buy.stripe.com/...). Пусто — «Купить билет» ведёт в Telegram к организатору.
window.PAY_LINK = '';

(function () {
  const O = window.ORG;
  O.ready = !!(O.name && O.email);
  const val = k => (k === 'nameEn' ? (O.nameEn || O.name) : O[k]) || '';
  function fill() {
    document.querySelectorAll('[data-org]').forEach(el => {
      const k = el.dataset.org, v = val(k);
      if (!v) return;                                   // пусто — остаётся заметная пометка «заполнить»
      if (k === 'email') { el.innerHTML = ''; const a = document.createElement('a'); a.href = 'mailto:' + v; a.textContent = v; el.append(a); }
      else if (k === 'phone') { el.innerHTML = ''; const a = document.createElement('a'); a.href = 'tel:' + v.replace(/[^+\d]/g, ''); a.textContent = v; el.append(a); }
      else el.textContent = v;
    });
    // части текста, которые показываем только если поле заполнено (например, рег. номер)
    document.querySelectorAll('[data-org-if]').forEach(el => { el.hidden = !val(el.dataset.orgIf); });
    document.querySelectorAll('[data-org-ready]').forEach(el => { el.hidden = !O.ready; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
})();
