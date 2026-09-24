import { CONFIG } from './data.js';
import { t } from './i18n.js';
import { esc } from './format.js';
import { ICON, links, hoursGroups, external } from './util.js';

export function visitCardHTML({ extra = '' } = {}) {
  const d = t();
  const star = ICON.star();
  const hours = hoursGroups().map((g) => `<li><span>${esc(g.days)}</span><span class="${g.closed ? 'closed' : ''}">${esc(g.text)}</span></li>`).join('');
  return `<div class="visit" data-reveal="up">
    ${extra}
    <dl class="visit__list">
      <div class="visit__row"><dt>${star}${esc(d.common.address)}</dt><dd>${esc(CONFIG.address.street)}<br>${esc(CONFIG.address.postcode)} ${esc(CONFIG.address.city)}${CONFIG.transport ? `<br><span class="muted">${esc(CONFIG.transport)}</span>` : ''}</dd></div>
      <div class="visit__row"><dt>${star}${esc(d.common.hours)}</dt><dd><ul class="hours-mini">${hours}</ul></dd></div>
      <div class="visit__row"><dt>${star}${esc(d.common.phone)}</dt><dd><a href="${links.tel}">${esc(CONFIG.phone.display)}</a></dd></div>
    </dl>
    <div class="livebox" data-livebox></div>
    <div class="visit__actions">
      ${external(links.directions, '', 'btn', `${esc(d.common.directions)} ${ICON.arrow}`)}
      ${external(links.profile, '', 'link', `${esc(d.common.profile)} ${ICON.arrow}`)}
    </div>
  </div>`;
}
