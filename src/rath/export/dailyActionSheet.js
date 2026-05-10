import { getFilteredSnapshot, getPMExecutive } from "../domain/engine.js";

function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
function openHtml(html, name) { const win = window.open("", "_blank"); if (!win) return; win.opener = null; win.document.open(); win.document.write(html); win.document.close(); win.document.title = name; }
function css() { return `<style>@page{size:A4;margin:16mm}*{box-sizing:border-box}body{margin:0;color:#0f172a;font-family:Arial,Helvetica,sans-serif;line-height:1.4}.report{max-width:178mm;margin:0 auto}.toolbar{display:flex;justify-content:flex-end;padding:12px 0}button{border:0;border-radius:999px;background:#07130f;color:#fff;padding:10px 16px;font-weight:700;cursor:pointer}.eyebrow{letter-spacing:.22em;text-transform:uppercase;font-size:10px;color:#047857;font-weight:700}h1{margin:8px 0 6px;font-size:26px}h2{margin:18px 0 8px;font-size:16px}.sub{color:#475569;font-size:12px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px 0}.metric{border:1px solid #dbe7df;border-radius:14px;padding:10px}.metric .label{font-size:10px;color:#64748b}.metric .value{margin-top:8px;font-size:18px;font-weight:700}.card{border:1px solid #dbe7df;border-radius:16px;padding:14px;margin-top:14px}table{width:100%;border-collapse:collapse;font-size:10px}th,td{text-align:left;vertical-align:top;border-bottom:1px solid #e2e8f0;padding:7px 6px}th{color:#64748b;text-transform:uppercase;letter-spacing:.06em;font-size:9px}@media print{.toolbar{display:none}.report{max-width:none}}</style>`; }
function shell(title, eyebrow, subtitle, body) { return `<!doctype html><html><head><meta charset="UTF-8"/><title>${esc(title)}</title>${css()}</head><body><div class="report"><div class="toolbar"><button onclick="window.print()">Print / Save as PDF</button></div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p class="sub">${esc(subtitle)}</p>${body}</div></body></html>`; }
function metricGrid(cards) { return `<section class="grid">${cards.map((item) => `<div class="metric"><div class="label">${esc(item.label)}</div><div class="value">${esc(item.value)}</div></div>`).join("")}</section>`; }

export function openDailyActionSheet(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const pm = getPMExecutive(periodKey, filters);
  const actionRows = pm.dailyActionQueue.map((item) => `<tr><td>${esc(item.priority)}</td><td>${esc(item.task)}</td><td>${esc(item.reason)}</td><td>${esc(item.owner)}</td></tr>`).join("");
  const body = `${metricGrid(pm.cards)}<div class="card"><h2>Daily action queue</h2><table><thead><tr><th>Priority</th><th>Task</th><th>Reason</th><th>Owner</th></tr></thead><tbody>${actionRows}</tbody></table></div>`;
  openHtml(shell("RATH Daily Action Sheet", "Property Management", `${data.siteName} · ${data.period} · ${data.scopeLabel}`, body), "RATH Daily Action Sheet");
}

export function openZoneInspectionList(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const pm = getPMExecutive(periodKey, filters);
  const visitRows = pm.zoneVisitQueue.map((item) => `<tr><td>${esc(item.zone)}</td><td>${esc(item.reason)}</td><td>${esc(item.lastProof)}</td></tr>`).join("");
  const body = `<div class="card"><h2>Zone inspection list</h2><table><thead><tr><th>Zone</th><th>Reason</th><th>Last proof</th></tr></thead><tbody>${visitRows}</tbody></table></div>`;
  openHtml(shell("RATH Zone Inspection List", "Site Visit Control", `${data.siteName} · ${data.period} · ${data.scopeLabel}`, body), "RATH Zone Inspection List");
}

export function openOpenTicketTracker(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const rows = data.tickets.map((item) => `<tr><td>${esc(item.id)}</td><td>${esc(item.zone)}</td><td>${esc(item.issue)}</td><td>${esc(item.status)}</td><td>${esc(item.sla)}</td><td>${esc(item.proof)}</td></tr>`).join("");
  const body = `<div class="card"><h2>Open ticket tracker</h2><table><thead><tr><th>Ticket</th><th>Zone</th><th>Issue</th><th>Status</th><th>SLA</th><th>Proof</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  openHtml(shell("RATH Open Ticket Tracker", "Property Operations", `${data.siteName} · ${data.period} · ${data.scopeLabel}`, body), "RATH Open Ticket Tracker");
}
