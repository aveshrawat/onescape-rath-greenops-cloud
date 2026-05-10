function fallbackSummary(role, view, payload) {
  const s = payload?.summary || {};
  const zones = payload?.zones || [];
  const topRisk = zones.find((z) => z.status === "Intervention") || zones[0];
  const boardMemo = payload?.boardMemo || {};
  const task = payload?.task || "";
  const claimLine = `Claim boundary: ${payload?.evidenceLevel || "E0"} evidence; do not say carbon credits are generated, certified biodiversity is achieved, or ROI is guaranteed.`;

  if (role === "CEO") {
    const taskLine =
      task === "currentRisk" ? "Principal risk: water resilience remains the weakest strategic dimension."
      : task === "decisionMemo" ? boardMemo.recommendation || "Recommended pathway: approve the focused resilience programme."
      : task === "periodMovement" ? "Period movement: value, water, and tenant readiness improved; risk trended down."
      : "Board summary requested.";
    return [
      "Board Advisor",
      `Current Green Infrastructure Value is ${s.greenInfrastructureValueScore ?? "NA"}/100 with ${s.highRiskGreenZones ?? 0} intervention zone(s).`,
      taskLine,
      topRisk ? `Immediate management focus: ${topRisk.name} — ${topRisk.recommendedAction}` : "Immediate management focus: complete the zone-risk baseline.",
      `Water-to-Health is ${s.waterToHealthScore ?? "NA"}/100; water resilience remains the highest-quality improvement lever.`,
      claimLine,
    ].join("\n");
  }

  if (role === "ESG Team") {
    const taskLine =
      task === "missingData" ? "Data blocking E1: water linkage, photo proof, species confirmation, and maintenance history."
      : task === "claimSafeNote" ? "Claim-safe note: outputs remain internal estimates until E1 review."
      : task === "reportableToday" ? "Reportable today: internal evidence pack, operational ledger, and readiness scores."
      : "Evidence review requested.";
    return [
      "AI Evidence Advisor",
      `Data Quality is ${s.dataQualityScore ?? "NA"}/100 at ${payload?.evidenceLevel || "E0"} evidence level.`,
      taskLine,
      "Use the evidence maturity funnel to separate raw data, estimates, and internally reportable outputs.",
      claimLine,
      "Recommended next action: close E0 gaps before moving into E1 expert review.",
    ].join("\n");
  }

  if (role === "IFM Partner") {
    const taskLine =
      task === "rootCause" ? "Recurring root causes: water imbalance, low light stress, vendor delay, and species mismatch."
      : task === "clientEscalation" ? "Escalation focus: Podium Lawn remains the tenant-visible watch zone."
      : task === "slaRisks" ? "SLA risk: proof quality varies by vendor and one breach remains visible."
      : "QBR summary requested.";
    return [
      "AI QBR Advisor",
      `Current operating view shows ${s.openTickets ?? 0} open tickets and ${s.slaCompliance ?? "NA"}% SLA compliance.`,
      taskLine,
      topRisk ? `Priority operating zone: ${topRisk.name}.` : "Priority operating zone: confirm risk baseline.",
      "Use recurring-issue intelligence to prove vendor accountability in QBRs, not just ticket closure.",
      "Recommended next action: close water-stress and repeat-issue clusters with photo proof.",
    ].join("\n");
  }

  const taskLine =
    task === "visitQueue" ? "Visit queue: Podium Lawn first, then Arrival Court."
    : task === "vendorFollowup" ? "Vendor follow-up: Arrival Court irrigation leak closure requires proof."
    : task === "openIssues" ? "Open issues: low-light stress, pruning due, and closure proof pending."
    : "Daily action list requested.";
  return [
    "AI Site Advisor",
    `Focus today: ${s.openTickets ?? 0} open tickets, ${s.highRiskGreenZones ?? 0} high-risk zone(s), and recurring issue root causes.`,
    taskLine,
    topRisk ? `First zone to inspect: ${topRisk.name}.` : "First task: complete zone inspection.",
    "Use photo closure and SLA status to keep vendor work objective.",
    "Recommended next action: review water-stress exceptions before routine rounds.",
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { role = "CEO", view = "value", payload = {}, provider = "auto" } = req.body || {};

    const systemPrompt = `You are the AI insight layer for RATH Green Infrastructure Intelligence.
Create role-specific, claim-safe, executive-quality summaries.
Never say RATH generates carbon credits.
Never say scores are certified unless evidence level is E3.
Use direct, concise bullets.
Separate internal estimates from externally validated claims.
Prioritize business action, concern areas, what not to claim, and next steps.
Adapt the answer to the requested task if one is provided.`;

    const userPrompt = `Role: ${role}
View: ${view}
Task: ${payload?.task || "general"}
Payload:
${JSON.stringify(payload, null, 2)}

Write:
1. What matters
2. Concern areas
3. What not to claim
4. Next action`;

    const useOpenAI = (provider === "openai" || provider === "auto") && process.env.OPENAI_API_KEY;
    const useAnthropic = (provider === "anthropic" || provider === "auto") && process.env.ANTHROPIC_API_KEY && !useOpenAI;

    if (useOpenAI) {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-5.5",
          input: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
        }),
      });

      if (!response.ok) throw new Error(`OpenAI error ${response.status}`);
      const data = await response.json();
      const summary =
        data.output_text ||
        data.output?.flatMap((item) => item.content || []).map((item) => item.text).filter(Boolean).join("\n") ||
        fallbackSummary(role, view, payload);
      res.status(200).json({ provider: "openai", summary });
      return;
    }

    if (useAnthropic) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
          max_tokens: 900,
          temperature: 0.2,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      if (!response.ok) throw new Error(`Anthropic error ${response.status}`);
      const data = await response.json();
      const summary = data.content?.map((item) => item.text).filter(Boolean).join("\n") || fallbackSummary(role, view, payload);
      res.status(200).json({ provider: "anthropic", summary });
      return;
    }

    res.status(200).json({ provider: "fallback", summary: fallbackSummary(role, view, payload) });
  } catch (error) {
    res.status(200).json({
      provider: "fallback",
      summary: fallbackSummary(req.body?.role || "CEO", req.body?.view || "value", req.body?.payload || {}),
      warning: error instanceof Error ? error.message : "AI provider failed; fallback summary used.",
    });
  }
}
