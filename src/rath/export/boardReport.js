import { E1_PATHWAY_TEXT, getBoardDecisionMemo, getBoardNarrative, getFilteredSnapshot, getInvestmentScenarios } from "../domain/engine.js";

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function openHtml(html, name) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.opener = null;
  win.document.open();
  win.document.write(html);
  win.document.close();
  win.document.title = name;
}

function styles() {
  return `<style>
@page { size:A4; margin:16mm; }
* { box-sizing:border-box; }
body { margin:0; color:#0f172a; font-family:Arial,Helvetica,sans-serif; line-height:1.4; }
.report { max-width:178mm; margin:0 auto; }
.toolbar { display:flex; justify-content:flex-end; padding:12px 0; }
button { border:0; border-radius:999px; background:#07130f; color:#fff; padding:10px 16px; font-weight:700; cursor:pointer; }
.eyebrow { letter-spacing:.22em; text-transform:uppercase; font-size:10px; color:#047857; font-weight:700; }
h1 { margin:8px 0 6px; font-size:26px; }
h2 { margin:18px 0 8px; font-size:16px; }
h3 { margin:0 0 6px; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:#334155; }
.sub { color:#475569; font-size:12px; }
.grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin:16px 0; }
.metric { border:1px solid #dbe7df; border-radius:14px; padding:10px; }
.metric .label { font-size:10px; color:#64748b; }
.metric .value { margin-top:8px; font-size:18px; font-weight:700; }
.card { border:1px solid #dbe7df; border-radius:16px; padding:14px; margin-top:14px; break-inside:avoid; }
.dark { background:#07130f; color:#fff; }
.dark h2 { color:#fff; }
table { width:100%; border-collapse:collapse; font-size:10px; }
th,td { text-align:left; vertical-align:top; border-bottom:1px solid #e2e8f0; padding:7px 6px; }
th { color:#64748b; text-transform:uppercase; letter-spacing:.06em; font-size:9px; }
ol, ul { margin:8px 0 0 18px; padding:0; font-size:12px; }
@media print { .toolbar { display:none; } .report { max-width:none; } }
</style>`;
}

function shell(title, eyebrow, subtitle, body) {
  return `<!doctype html><html><head><meta charset="UTF-8"/><title>${esc(title)}</title>${styles()}</head><body><div class="report"><div class="toolbar"><button onclick="window.print()">Print / Save as PDF</button></div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p class="sub">${esc(subtitle)}</p>${body}</div></body></html>`;
}

function metrics(data) {
  const s = data.summary;
  return `<section class="grid">
    <div class="metric"><div class="label">Green Infrastructure Value</div><div class="value">${s.greenInfrastructureValueScore}/100</div></div>
    <div class="metric"><div class="label">Nature-Readiness</div><div class="value">${s.natureReadinessScore}/100</div></div>
    <div class="metric"><div class="label">Water-to-Health</div><div class="value">${s.waterToHealthScore}/100</div></div>
    <div class="metric"><div class="label">Tenant Readiness</div><div class="value">${s.tenantGreenEngagementReadiness}/100</div></div>
  </section>`;
}

export function openBoardPack(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const memo = getBoardDecisionMemo(periodKey, filters);
  const narrative = getBoardNarrative(periodKey, filters);
  const scenarios = getInvestmentScenarios(periodKey);
  const scenarioRows = scenarios.map((scenario) => `
    <tr><td>${esc(scenario.name)}</td><td>${esc(scenario.capex)}</td><td>${esc(scenario.outcome)}</td><td>${esc(scenario.recommendation)}</td></tr>`).join("");
  const body = `<div class="card dark"><h2>Portfolio context</h2><p>${esc(memo.portfolioContext)}</p></div>
    ${metrics(data)}
    <div class="card dark"><h2>Decision requested</h2><p>${esc(memo.decisionRequired)}</p><h2>Executive recommendation</h2><p>${esc(memo.recommendation)}</p></div>
    <div class="card"><h2>Capital scenarios</h2><table><thead><tr><th>Scenario</th><th>Capital</th><th>Return logic</th><th>Board view</th></tr></thead><tbody>${scenarioRows}</tbody></table></div>
    <div class="card"><h2>Board narrative</h2><ol>${narrative.map((item) => `<li>${esc(item)}</li>`).join("")}</ol></div>
    <div class="card"><h2>Next 90 days</h2><ul>${memo.next90Days.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
    <div class="card"><h2>90-day scale outcome</h2><p>${esc(memo.pilotOutcome90Day)}</p></div>
    <div class="card"><h2>Claim boundary</h2><p>RATH does not issue carbon credits. Carbon, nature, and financial outputs remain internal supporting estimates unless upgraded through expert or third-party review.</p><p><strong>${esc(E1_PATHWAY_TEXT)}</strong></p></div>`;
  openHtml(shell("RATH Board Decision Memo", "Confidential · Internal Board Use", `${data.siteName} · ${data.period} · ${data.scopeLabel}`, body), "RATH Board Decision Memo");
}
export function openInvestmentScenarioPack(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const scenarios = getInvestmentScenarios(periodKey);
  const rows = scenarios.map((item) => `<tr><td>${esc(item.name)}</td><td>${esc(item.capex)}</td><td>${esc(item.outcome)}</td><td>${esc(item.riskIfChosen)}</td><td>${esc(item.recommendation)}</td></tr>`).join("");
  const body = `${metrics(data)}
    <div class="card"><h2>Capital scenario comparison</h2><table><thead><tr><th>Scenario</th><th>Capex</th><th>Outcome</th><th>Risk if chosen</th><th>Recommendation</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="card dark"><h2>Management recommendation</h2><p>Approve the Optimise pathway now; hold the Differentiate pathway until the expert-review pathway has been initiated.</p></div>`;
  openHtml(shell("RATH Investment Scenario Pack", "Capital Allocation", `${data.siteName} · ${data.period} · ${data.scopeLabel}`, body), "RATH Investment Scenario Pack");
}

export function openAssetIntelligenceSummary(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const rows = data.zones.map((zone) => `<tr><td>${esc(zone.name)}</td><td>${esc(zone.status)}</td><td>${esc(zone.riskScore)}</td><td>${esc(zone.tenantVisibility)}</td><td>${esc(zone.recommendedAction)}</td></tr>`).join("");
  const body = `${metrics(data)}
    <div class="card"><h2>Asset intelligence summary</h2><table><thead><tr><th>Zone</th><th>Status</th><th>Risk score</th><th>Visibility</th><th>Recommended action</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  openHtml(shell("RATH Asset Intelligence Summary", "Portfolio Intelligence", `${data.siteName} · ${data.period} · ${data.scopeLabel}`, body), "RATH Asset Intelligence Summary");
}
