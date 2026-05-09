function fallbackSummary(role, view, payload) {
  const s = payload?.summary || {};
  const zones = payload?.zones || [];
  const topRisk = zones.find((z) => z.status === "Intervention") || zones[0];
  const claimLine = `Claim boundary: ${payload?.evidenceLevel || "E0"} evidence; do not say carbon credits are generated, certified biodiversity is achieved, or ROI is guaranteed.`;

  if (role === "CEO") {
    return [
      "AI Board Summary",
      `Green Infrastructure Value is ${s.greenInfrastructureValueScore ?? "NA"}/100 with ${s.highRiskGreenZones ?? 0} high-risk zone(s) and ${s.recommendedInvestmentActions ?? 0} recommended investment action(s).`,
      topRisk ? `Immediate board-level priority: ${topRisk.name} — ${topRisk.recommendedAction}` : "Immediate board-level priority: complete zone risk baseline.",
      `Tenant Green Engagement Readiness is ${s.tenantGreenEngagementReadiness ?? "NA"}/100, which supports tenant-facing sustainability communication but is not proof of retention uplift.`,
      claimLine,
      "Decision ask: approve the pilot evidence pack and one P1 investment scenario for validation.",
    ].join("\n");
  }

  if (role === "ESG Team") {
    return [
      "AI ESG Summary",
      `Data Quality is ${s.dataQualityScore ?? "NA"}/100 and evidence level is ${payload?.evidenceLevel || "E0"}.`,
      "Priority gaps: water linkage, photo evidence, species verification, and maintenance-history completeness.",
      "Use the evidence maturity funnel to separate raw data, estimate, evidence, and reportable internal output.",
      claimLine,
      "Next step: upgrade from E0 internal model to E1 expert-reviewed methodology before stronger external claims.",
    ].join("\n");
  }

  if (role === "IFM Partner") {
    return [
      "AI IFM/QBR Summary",
      `Current operating view shows ${payload?.tickets?.filter((t) => t.status === "Open").length ?? 0} open tickets and one SLA breach in the demo dataset.`,
      "Use the zone risk map and recurring issue Pareto to show vendor accountability and QBR differentiation.",
      topRisk ? `Priority operating zone: ${topRisk.name}.` : "Priority operating zone: confirm risk baseline.",
      "Client value: fewer blind spots, stronger closure proof, and visible green operations governance.",
    ].join("\n");
  }

  return [
    "AI Property Manager Summary",
    `Focus today: ${payload?.tickets?.filter((t) => t.status === "Open").length ?? 0} open tickets, water stress watch zones, and recurring issue root causes.`,
    topRisk ? `First zone to inspect: ${topRisk.name}.` : "First task: complete zone inspection.",
    "Use photo closure and SLA status to keep vendor work objective.",
    "Avoid ESG-heavy language in site meetings; focus on action, proof, and closure.",
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
You create role-specific, claim-safe, executive-quality summaries.
Never say RATH generates carbon credits.
Never say scores are certified unless the evidence level says E3.
Use direct, concise bullets.
Separate internal estimates from externally validated claims.
Prioritize business action, evidence gaps, and next steps.`;

    const userPrompt = `Role: ${role}
View: ${view}
Payload:
${JSON.stringify(payload, null, 2)}

Write a role-specific summary with:
1. What matters
2. Concern areas
3. What not to claim
4. Next action`;

    const wantsOpenAI = (provider === "openai" || provider === "auto") && process.env.OPENAI_API_KEY;
    const wantsClaude = (provider === "anthropic" || provider === "auto") && process.env.ANTHROPIC_API_KEY && !wantsOpenAI;

    if (wantsOpenAI) {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
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

    if (wantsClaude) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
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
      warning: error instanceof Error ? error.message : "AI provider failed; used fallback.",
    });
  }
}
