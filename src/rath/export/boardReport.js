import { getSnapshot, getBoardDecisionMemo, getBoardNarrative } from "../domain/engine.js";

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildBoardPackHtml(periodKey = "30d", filters = {}) {
  const data = getSnapshot(periodKey);
  const memo = getBoardDecisionMemo(periodKey);
  const narrative = getBoardNarrative(periodKey);
  const s = data.summary;
  const periodLabel = data.period;
  const scopeLabel = filters.zoneId && filters.zoneId !== "all"
    ? data.zones.find((z) => z.id === filters.zoneId)?.name || "Selected Zone"
    : "Asset-wide";

  const investmentRows = data.investments
    .slice(0, 4)
    .map(
      (item) => `
      <tr>
        <td>${esc(item.action)}</td>
        <td>${esc(item.category)}</td>
        <td>₹${item.costLow.toLocaleString("en-IN")}–₹${item.costHigh.toLocaleString("en-IN")}</td>
        <td>${esc(item.expectedLift)}</td>
        <td>${esc(item.boardLogic)}</td>
      </tr>`
    )
    .join("");

  const claimRows = data.claims
    .map(
      (item) => `
      <tr>
        <td>${esc(item.topic)}</td>
        <td>${esc(item.allowed)}</td>
        <td>${esc(item.blocked)}</td>
      </tr>`
    )
    .join("");

  const narrativeRows = narrative
    .map((item, index) => `<li><span>${index + 1}</span>${esc(item)}</li>`)
    .join("");

  const nextRows = memo.next90Days
    .map((item) => `<li>${esc(item)}</li>`)
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>RATH Board Pack — ${esc(data.siteName)}</title>
  <style>
    @page { size: A4; margin: 16mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #0f172a;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.4;
      background: #fff;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 0;
      background: white;
    }
    .toolbar button {
      border: 0;
      border-radius: 999px;
      background: #07130f;
      color: white;
      padding: 10px 16px;
      font-weight: 700;
      cursor: pointer;
    }
    .report {
      max-width: 178mm;
      margin: 0 auto;
    }
    .eyebrow {
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-size: 10px;
      color: #047857;
      font-weight: 700;
    }
    h1 {
      margin: 8px 0 6px;
      font-size: 26px;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    h2 {
      margin: 0 0 10px;
      font-size: 16px;
    }
    h3 {
      margin: 0 0 6px;
      font-size: 12px;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    p { margin: 0; }
    .sub {
      color: #475569;
      font-size: 12px;
    }
    .header {
      border-bottom: 1px solid #dbe7df;
      padding-bottom: 14px;
      margin-bottom: 16px;
    }
    .meta {
      margin-top: 10px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .pill {
      border: 1px solid #dbe7df;
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 10px;
      font-weight: 700;
      color: #334155;
    }
    .pill.green { background: #ecfdf5; color: #047857; }
    .pill.amber { background: #fffbeb; color: #92400e; }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 16px 0;
    }
    .metric {
      border: 1px solid #dbe7df;
      border-radius: 14px;
      padding: 12px;
      min-height: 74px;
    }
    .metric .label { color: #64748b; font-size: 10px; }
    .metric .value { margin-top: 8px; font-size: 20px; font-weight: 700; }
    .two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 16px 0;
    }
    .card {
      border: 1px solid #dbe7df;
      border-radius: 16px;
      padding: 14px;
      break-inside: avoid;
    }
    .recommend {
      background: #07130f;
      color: white;
    }
    .recommend h2, .recommend h3 { color: white; }
    .recommend .sub { color: #cbd5e1; }
    ol.narrative {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    ol.narrative li {
      display: flex;
      gap: 10px;
      margin-bottom: 9px;
      font-size: 12px;
      color: #334155;
    }
    ol.narrative span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #d1fae5;
      color: #047857;
      font-weight: 700;
      flex: 0 0 auto;
    }
    ul {
      margin: 8px 0 0 18px;
      padding: 0;
      font-size: 12px;
      color: #334155;
    }
    li { margin-bottom: 6px; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-top: 8px;
    }
    th, td {
      text-align: left;
      vertical-align: top;
      border-bottom: 1px solid #e2e8f0;
      padding: 7px 6px;
    }
    th {
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: .06em;
      font-size: 9px;
    }
    .footer {
      margin-top: 16px;
      border-top: 1px solid #dbe7df;
      padding-top: 8px;
      font-size: 9px;
      color: #64748b;
    }
    .page-break { page-break-before: always; }
    @media print {
      .toolbar { display: none; }
      .report { max-width: none; }
    }
  </style>
</head>
<body>
  <div class="report">
    <div class="toolbar">
      <button onclick="window.print()">Print / Save as PDF</button>
    </div>

    <section class="header">
      <div class="eyebrow">Confidential · Internal Board Use</div>
      <h1>RATH Green Infrastructure Intelligence — Board Pack</h1>
      <p class="sub">${esc(data.siteName)} · ${esc(periodLabel)} · ${esc(scopeLabel)} scope</p>
      <div class="meta">
        <span class="pill green">Method ${esc(data.methodVersion)}</span>
        <span class="pill amber">${esc(data.evidenceLevel)} evidence</span>
        <span class="pill amber">Claim-controlled</span>
      </div>
    </section>

    <section class="grid">
      <div class="metric"><div class="label">Green Infrastructure Value</div><div class="value">${s.greenInfrastructureValueScore}/100</div></div>
      <div class="metric"><div class="label">Nature-Readiness</div><div class="value">${s.natureReadinessScore}/100</div></div>
      <div class="metric"><div class="label">Water-to-Health</div><div class="value">${s.waterToHealthScore}/100</div></div>
      <div class="metric"><div class="label">Tenant Readiness</div><div class="value">${s.tenantGreenEngagementReadiness}/100</div></div>
    </section>

    <section class="two">
      <div class="card recommend">
        <h3>Board recommendation</h3>
        <h2>${esc(memo.recommendation)}</h2>
        <p class="sub">Capital ask: <strong>${esc(memo.capitalAsk)}</strong></p>
        <p class="sub" style="margin-top:8px">${esc(memo.expectedOutcome)}</p>
      </div>
      <div class="card">
        <h3>Decision required</h3>
        <h2>${esc(memo.decisionRequired)}</h2>
        <p class="sub" style="margin-top:8px"><strong>Risk of inaction:</strong> ${esc(memo.riskOfInaction)}</p>
      </div>
    </section>

    <section class="two">
      <div class="card">
        <h3>Executive narrative</h3>
        <ol class="narrative">${narrativeRows}</ol>
      </div>
      <div class="card">
        <h3>Next 90 days</h3>
        <ul>${nextRows}</ul>
      </div>
    </section>

    <section class="card">
      <h3>Prioritised investment actions</h3>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Strategic pillar</th>
            <th>Capex range</th>
            <th>Expected lift</th>
            <th>Board logic</th>
          </tr>
        </thead>
        <tbody>${investmentRows}</tbody>
      </table>
    </section>

    <section class="card" style="margin-top:12px">
      <h3>Claim boundary</h3>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Allowed</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody>${claimRows}</tbody>
      </table>
    </section>

    <div class="footer">
      RATH does not issue carbon credits. Carbon, nature, and financial outputs remain internal supporting estimates unless upgraded through expert or third-party review.
    </div>
  </div>
</body>
</html>`;
}

export function openBoardPack(periodKey = "30d", filters = {}) {
  const html = buildBoardPackHtml(periodKey, filters);
  const reportWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!reportWindow) return false;
  reportWindow.document.open();
  reportWindow.document.write(html);
  reportWindow.document.close();
  return true;
}
