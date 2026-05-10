import { E1_PATHWAY_TEXT, getDataQualityView, getESGReadiness, getFilteredSnapshot } from "../domain/engine.js";

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

function reportShell({ title, eyebrow, subtitle, metrics = "", body = "" }) {
  return `<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<title>${esc(title)}</title>
<style>
@page { size: A4; margin: 16mm; }
* { box-sizing: border-box; }
body { margin:0; color:#0f172a; font-family:Arial,Helvetica,sans-serif; line-height:1.4; }
.report { max-width:178mm; margin:0 auto; }
.toolbar { display:flex; justify-content:flex-end; padding:12px 0; }
button { border:0; border-radius:999px; background:#07130f; color:#fff; padding:10px 16px; font-weight:700; cursor:pointer; }
.eyebrow { letter-spacing:.22em; text-transform:uppercase; font-size:10px; color:#047857; font-weight:700; }
h1 { margin:8px 0 6px; font-size:26px; }
h2 { margin:18px 0 8px; font-size:16px; }
.sub { color:#475569; font-size:12px; }
.grid { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin:16px 0; }
.metric { border:1px solid #dbe7df; border-radius:14px; padding:10px; }
.metric .label { font-size:10px; color:#64748b; }
.metric .value { margin-top:8px; font-size:18px; font-weight:700; }
.card { border:1px solid #dbe7df; border-radius:16px; padding:14px; margin-top:14px; break-inside:avoid; }
table { width:100%; border-collapse:collapse; font-size:10px; }
th,td { text-align:left; vertical-align:top; border-bottom:1px solid #e2e8f0; padding:7px 6px; }
th { color:#64748b; text-transform:uppercase; letter-spacing:.06em; font-size:9px; }
.note { margin-top:12px; padding:10px 12px; border-radius:12px; background:#fffbeb; color:#92400e; font-size:11px; }
@media print { .toolbar { display:none; } .report { max-width:none; } }
</style>
</head>
<body>
<div class="report">
  <div class="toolbar"><button onclick="window.print()">Print / Save as PDF</button></div>
  <div class="eyebrow">${esc(eyebrow)}</div>
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(subtitle)}</p>
  ${metrics}
  ${body}
</div>
</body>
</html>`;
}

function metricGrid(cards) {
  return `<section class="grid">${cards
    .map((item) => `<div class="metric"><div class="label">${esc(item.label)}</div><div class="value">${esc(item.value)}</div></div>`)
    .join("")}</section>`;
}

export function openEsgEvidencePack(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const esg = getESGReadiness(periodKey, filters);
  const rows = esg.missingDataQueue.map((item) => `
    <tr><td>${esc(item.gap)}</td><td>${esc(item.impact)}</td><td>${esc(item.owner)}</td><td>${esc(item.requiredFor)}</td></tr>`).join("");
  const claimRows = esg.claimUpgradePath.map((item) => `
    <tr><td>${esc(item.topic)}</td><td>${esc(item.current)}</td><td>${esc(item.upgrade)}</td><td>${esc(item.status)}</td></tr>`).join("");
  const body = `
    <div class="card">
      <h2>Missing data action queue</h2>
      <table><thead><tr><th>Gap</th><th>Impact</th><th>Owner</th><th>Required for</th></tr></thead><tbody>${rows}</tbody></table>
    </div>
    <div class="card">
      <h2>Claim upgrade path</h2>
      <table><thead><tr><th>Topic</th><th>Current</th><th>Upgrade requirement</th><th>Status</th></tr></thead><tbody>${claimRows}</tbody></table>
    </div>
    <div class="note">Internal ESG use only. This pack separates internal estimates from stronger claim-ready evidence. ${esc(E1_PATHWAY_TEXT)}</div>`;
  openHtml(reportShell({
    title: "RATH ESG Evidence Pack",
    eyebrow: "Internal ESG Use",
    subtitle: `${data.siteName} · ${data.period} · ${data.scopeLabel} · ${data.evidenceLevel} evidence`,
    metrics: metricGrid(esg.cards),
    body,
  }), "RATH ESG Evidence Pack");
}

export function openClaimSafetyRegister(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const esg = getESGReadiness(periodKey, filters);
  const claimRows = data.claims.map((item) => `
    <tr><td>${esc(item.topic)}</td><td>${esc(item.allowed)}</td><td>${esc(item.blocked)}</td><td>${esc(item.risk)}</td></tr>`).join("");
  const upgradeRows = esg.claimUpgradePath.map((item) => `
    <tr><td>${esc(item.topic)}</td><td>${esc(item.current)}</td><td>${esc(item.upgrade)}</td><td>${esc(item.status)}</td></tr>`).join("");
  const body = `
    <div class="card">
      <h2>Allowed vs blocked language</h2>
      <table><thead><tr><th>Topic</th><th>Allowed</th><th>Blocked</th><th>Risk</th></tr></thead><tbody>${claimRows}</tbody></table>
    </div>
    <div class="card">
      <h2>Upgrade requirement register</h2>
      <table><thead><tr><th>Topic</th><th>Current state</th><th>Requirement to upgrade</th><th>Status</th></tr></thead><tbody>${upgradeRows}</tbody></table>
    </div>
    <div class="note">Claim-control principle: no carbon-credit, certified-biodiversity, or guaranteed-savings claim is created by this internal model.</div>`;
  openHtml(reportShell({
    title: "RATH Claim Safety Register",
    eyebrow: "Claim Control",
    subtitle: `${data.siteName} · ${data.period} · ${data.scopeLabel}`,
    metrics: metricGrid(esg.cards.slice(1, 5)),
    body,
  }), "RATH Claim Safety Register");
}

export function openDataQualityExceptionReport(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const quality = getDataQualityView(periodKey, filters);
  const rows = quality.allRows.map((item) => `
    <tr><td>${esc(item.area)}</td><td>${esc(item.score)}</td><td>${esc(item.status)}</td><td>${esc(item.gap)}</td></tr>`).join("");
  const exceptionRows = quality.exceptions.map((item) => `
    <tr><td>${esc(item.area)}</td><td>${esc(item.score)}</td><td>${esc(item.status)}</td><td>${esc(item.gap)}</td></tr>`).join("");
  const body = `
    <div class="card">
      <h2>Quality matrix</h2>
      <table><thead><tr><th>Area</th><th>Score</th><th>Status</th><th>Gap</th></tr></thead><tbody>${rows}</tbody></table>
    </div>
    <div class="card">
      <h2>Exception register</h2>
      <table><thead><tr><th>Area</th><th>Score</th><th>Status</th><th>Exception</th></tr></thead><tbody>${exceptionRows}</tbody></table>
    </div>
    <div class="note">This report isolates evidence-quality exceptions only; it is not a claim register.</div>`;
  openHtml(reportShell({
    title: "RATH Data Quality Exception Report",
    eyebrow: "Evidence Quality Control",
    subtitle: `${data.siteName} · ${data.period} · ${data.scopeLabel}`,
    metrics: metricGrid(quality.cards),
    body,
  }), "RATH Data Quality Exception Report");
}
