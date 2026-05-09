export const METHOD_VERSION = "RATH-GII-v0.6";

export const ROLES = {
  CEO: "CEO",
  ESG: "ESG Team",
  OPERATIONS: "Property Operations"
};

export const demoCredentials = [
  {
    email: "ceo@client.com",
    pin: "111111",
    role: ROLES.CEO,
    displayName: "CEO / Board",
    workspace: "Client Campus Pilot",
    defaultView: "value",
    summary: "Asset value, tenant impact, risk, carbon, water, and capital decisions."
  },
  {
    email: "esg@client.com",
    pin: "222222",
    role: ROLES.ESG,
    displayName: "ESG Team",
    workspace: "Client Campus Pilot",
    defaultView: "evidence",
    summary: "Evidence, nature-readiness, water, carbon, and claim-safe reporting support."
  },
  {
    email: "ops@client.com",
    pin: "333333",
    role: ROLES.OPERATIONS,
    displayName: "Property Operations",
    workspace: "Client Campus Pilot",
    defaultView: "control",
    summary: "Risk zones, maintenance actions, SLA proof, and intervention tracking."
  },
];

export function authenticateDemoUser(email, pin) {
  const normalized = String(email || "").trim().toLowerCase();
  return demoCredentials.find((user) => user.email.toLowerCase() === normalized && user.pin === String(pin || "")) || null;
}

export const dashboardCopy = {
  [ROLES.CEO]: {
    productName: "Green Infrastructure Value Dashboard",
    purpose: "Sell the vision.",
    hero: "Asset value, tenant impact, risk, carbon, water, and capital decisions from already-owned green infrastructure.",
  },
  [ROLES.ESG]: {
    productName: "Evidence & Resource Impact Studio",
    purpose: "Prove defensibility.",
    hero: "Evidence maturity, nature-readiness, water, carbon, data quality, and claim-safe ESG support.",
  },
  [ROLES.OPERATIONS]: {
    productName: "GreenOps Control Center",
    purpose: "Prove execution.",
    hero: "Risk zones, action queues, water stress, SLA proof, closure evidence, and replacement-risk control.",
  },
};

export const roleViews = {
  [ROLES.CEO]: [
    { key: "value", label: "Value Overview", description: "Board summary" },
    { key: "risk", label: "Risk Map", description: "High-risk green zones" },
    { key: "natureWater", label: "Nature + Water", description: "Nature radar and water-health" },
    { key: "carbonResource", label: "Carbon + Resource", description: "Carbon, water and leakage" },
    { key: "investment", label: "Investment Planner", description: "Cost vs impact prioritization" },
    { key: "boardPack", label: "Board Pack", description: "Forwardable executive evidence" },
  ],
  [ROLES.ESG]: [
    { key: "evidence", label: "Evidence Overview", description: "Evidence maturity and gaps" },
    { key: "carbonResource", label: "Carbon + Resource", description: "Contribution and claim boundary" },
    { key: "natureWater", label: "Nature + Water", description: "Nature and water evidence" },
    { key: "dataQuality", label: "Data Quality", description: "Completeness and gaps" },
    { key: "claimSafety", label: "Claim Safety", description: "Allowed vs blocked language" },
    { key: "methodology", label: "Methodology", description: "Assumptions and boundaries" },
    { key: "exports", label: "Exports", description: "PDF / CSV / Excel studio" },
  ],
  [ROLES.OPERATIONS]: [
    { key: "control", label: "Control Center", description: "Operating command view" },
    { key: "zoneHealth", label: "Risk Zones", description: "Where attention is needed" },
    { key: "tickets", label: "Tickets + SLA", description: "Open work and closure proof" },
    { key: "waterStress", label: "Water Stress", description: "Irrigation exceptions" },
    { key: "recurring", label: "Recurring Issues", description: "Repeat failures" },
    { key: "serviceReport", label: "Service Report", description: "Simple FM export" },
  ],
};

export const snapshot = {
  siteName: "Client Campus Pilot",
  city: "Bengaluru",
  period: "May 2026",
  methodVersion: METHOD_VERSION,
  evidenceLevel: "E0",
  claimStatus: "Restricted",
  summary: {
    greenInfrastructureValueScore: 74,
    natureReadinessScore: 67,
    waterToHealthScore: 81,
    highRiskGreenZones: 1,
    tenantGreenEngagementReadiness: 62,
    recommendedInvestmentActions: 3,
    greenAssetMaturityLevel: 5,
    dataQualityScore: 82,
    costLeakageEstimateInr: 8800,
    carbonStockProxyTco2e: 50.14,
    annualSequestrationProxyTco2e: 0.732,
    registeredGreenAssets: 127,
    mappedTrees: 46,
    mappedShrubsAndPalms: 81,
    eligibleInternalContributionTco2e: 0.183,
    waterReusedLitres: 37700,
    freshwaterAvoidedLitres: 37700,
    openTickets: 2,
    slaCompliance: 75,
    repeatIssues: 2,
  },
  nature: {
    score: 67,
    components: [
      { key: "nativeAdaptiveShare", label: "Native Adaptive Share", value: 13.8, max: 20, concern: "Increase native/adaptive ratio in high-footfall zones." },
      { key: "speciesDiversity", label: "Species Diversity", value: 4.5, max: 15, concern: "Low diversity weakens nature-readiness." },
      { key: "pollinatorSupport", label: "Pollinator Support", value: 10.4, max: 15, concern: "Good, can improve through flowering pockets." },
      { key: "canopyAndStrata", label: "Canopy + Strata", value: 15.0, max: 15, concern: "Strong layered structure." },
      { key: "habitatPotential", label: "Habitat Potential", value: 10.0, max: 10, concern: "Strong baseline for nature trail story." },
      { key: "waterResilience", label: "Water Resilience", value: 0.2, max: 10, concern: "Critical weakness: water-sensitive mix and evidence gap." },
      { key: "healthStability", label: "Health Stability", value: 8.4, max: 10, concern: "Good field condition." },
      { key: "riskControl", label: "Risk Control", value: 5.0, max: 5, concern: "Controlled under current pilot assumptions." },
    ],
  },
  trends: [
    { month: "Jan", value: 58, nature: 48, water: 52, risk: 71, quality: 45, tenant: 42 },
    { month: "Feb", value: 62, nature: 55, water: 60, risk: 66, quality: 54, tenant: 48 },
    { month: "Mar", value: 67, nature: 61, water: 67, risk: 58, quality: 63, tenant: 53 },
    { month: "Apr", value: 72, nature: 68, water: 73, risk: 51, quality: 74, tenant: 58 },
    { month: "May", value: 74, nature: 67, water: 81, risk: 43, quality: 82, tenant: 62 },
  ],
  zones: [
    { id: "zone_podium", name: "Podium Lawn", healthRisk: 35, waterStressRisk: 62, heatExposureRisk: 55, natureWeaknessRisk: 42, dataGapRisk: 28, riskScore: 79, status: "Intervention", tenantVisibility: "High", recommendedAction: "Replace high-water lawn pockets with adaptive planting and irrigation zoning.", reason: "High water stress combined with tenant visibility and weaker nature score.", evidence: "Site photos, STP-water ledger, maintenance observations", costRange: "₹1.8L–₹3.2L", priority: "P1" },
    { id: "zone_arrival", name: "Main Arrival Court", healthRisk: 24, waterStressRisk: 32, heatExposureRisk: 85, natureWeaknessRisk: 36, dataGapRisk: 18, riskScore: 58, status: "Watch", tenantVisibility: "High", recommendedAction: "Add shade and soil-moisture governance at arrival corridor.", reason: "Heat exposure is high; current health and water indicators remain manageable.", evidence: "Heat exposure score, field walk-through, zone health scan", costRange: "₹3.5L–₹5.2L", priority: "P2" },
    { id: "zone_spine", name: "Pedestrian Spine", healthRisk: 12, waterStressRisk: 24, heatExposureRisk: 85, natureWeaknessRisk: 28, dataGapRisk: 12, riskScore: 42, status: "Stable", tenantVisibility: "High", recommendedAction: "Maintain current governance cadence and upgrade tenant-facing story cards.", reason: "Strong health and water position; heat remains a monitoring item.", evidence: "Health scan, maintenance log, visibility mapping", costRange: "₹0.8L–₹1.5L", priority: "P3" },
    { id: "zone_bio", name: "Biodiversity Pocket", healthRisk: 10, waterStressRisk: 38, heatExposureRisk: 25, natureWeaknessRisk: 18, dataGapRisk: 34, riskScore: 32, status: "Stable", tenantVisibility: "Medium", recommendedAction: "Add water linkage evidence and convert into green trail point.", reason: "Good nature baseline; data linkage should be improved before external storytelling.", evidence: "Species record, photo evidence, partial water linkage", costRange: "₹1.2L–₹2.2L", priority: "P3" },
  ],
  water: [
    { zone: "Spine", index: 88, health: 89, waterIntensity: 29, source: "STP", status: "Efficient" },
    { zone: "Podium", index: 72, health: 65, waterIntensity: 28, source: "STP", status: "Watch" },
    { zone: "Indoor", index: 82, health: 72, waterIntensity: 5, source: "HVAC", status: "Efficient" },
    { zone: "Arrival", index: 82, health: 79, waterIntensity: 32, source: "STP", status: "Efficient" },
  ],
  evidenceFunnel: [
    { stage: "Total green zones", count: 5, percent: 100 },
    { stage: "Mapped zones", count: 5, percent: 100 },
    { stage: "Species-verified zones", count: 4, percent: 80 },
    { stage: "Health-scanned zones", count: 5, percent: 100 },
    { stage: "Water-linked zones", count: 4, percent: 80 },
    { stage: "Photo-evidenced zones", count: 4, percent: 80 },
    { stage: "E1-ready zones", count: 2, percent: 40 },
    { stage: "Executive-reportable zones", count: 4, percent: 80 },
  ],
  dataQuality: [
    { area: "Inventory", score: 100, status: "Complete", gap: "None" },
    { area: "Species verification", score: 80, status: "Usable", gap: "Arrival species confirmation" },
    { area: "Health scans", score: 100, status: "Complete", gap: "None" },
    { area: "Photo evidence", score: 80, status: "Usable", gap: "Indoor cluster photo proof" },
    { area: "Water linkage", score: 80, status: "Usable", gap: "Biodiversity pocket hose/meter link" },
    { area: "Maintenance history", score: 70, status: "Weak", gap: "Podium maintenance history" },
  ],
  leap: [
    { stage: "Locate", score: 100, output: "Mapped site zones and green asset locations." },
    { stage: "Evaluate", score: 76, output: "Nature, water, health, and tenant-facing value scored." },
    { stage: "Assess", score: 70, output: "Risk and opportunity areas identified." },
    { stage: "Prepare", score: 62, output: "Internal evidence pack possible; external claims restricted." },
  ],
  claims: [
    { topic: "Carbon", allowed: "Internal carbon stock / sequestration proxy", blocked: "Carbon credits generated or offset created", risk: "High if overclaimed" },
    { topic: "Nature", allowed: "Pilot-level nature-readiness score", blocked: "Certified biodiversity or TNFD score", risk: "Medium" },
    { topic: "Water", allowed: "Water-to-health efficiency index", blocked: "Certified water saving or credit", risk: "Medium" },
    { topic: "Financial", allowed: "Estimated cost leakage / opportunity", blocked: "Guaranteed savings or ROI", risk: "Medium" },
  ],
  methodology: [
    { module: "Green Infrastructure Value Score", boundary: "Composite internal score", confidence: "E0", note: "Not a property valuation certificate." },
    { module: "Nature-Readiness", boundary: "Readiness indicator", confidence: "E0", note: "Not certified biodiversity." },
    { module: "Water-to-Health", boundary: "Operational efficiency index", confidence: "E0", note: "Based on logs and plant/zone health score." },
    { module: "Carbon Proxy", boundary: "Supporting internal estimate", confidence: "E0", note: "Not offset or carbon-credit issuance." },
  ],
  investments: [
    { action: "Replace high-water lawn pockets with adaptive planting", costLow: 180000, costHigh: 320000, esg: "Medium", tenant: "Medium", water: "High", risk: "High", score: 82, priority: "P1" },
    { action: "Add shade tree layer near pedestrian spine", costLow: 350000, costHigh: 520000, esg: "High", tenant: "High", water: "Medium", risk: "High", score: 79, priority: "P1" },
    { action: "Build tenant-facing biodiversity pocket", costLow: 120000, costHigh: 220000, esg: "High", tenant: "High", water: "Low", risk: "Medium", score: 76, priority: "P1" },
    { action: "Soil, mulch, and irrigation zoning rehabilitation", costLow: 70000, costHigh: 140000, esg: "Medium", tenant: "Low", water: "High", risk: "High", score: 74, priority: "P2" },
  ],
  tickets: [
    { id: "TCK-1001", zone: "Indoor Cluster", issue: "Low light stress", priority: "P2", status: "Open", sla: "Within SLA", owner: "Supervisor", proof: "Pending" },
    { id: "TCK-1002", zone: "Podium Lawn", issue: "Dry patch", priority: "P2", status: "Closed", sla: "Met", owner: "Gardener", proof: "Photo uploaded" },
    { id: "TCK-1003", zone: "Pedestrian Spine", issue: "Pruning due", priority: "P3", status: "Open", sla: "Within SLA", owner: "Vendor", proof: "Pending" },
    { id: "TCK-1004", zone: "Arrival Court", issue: "Irrigation leak", priority: "P2", status: "Closed", sla: "Breached", owner: "Vendor", proof: "Photo uploaded" },
  ],
  recurringIssues: [
    { rootCause: "Water imbalance", count: 4, leakageInr: 3200 },
    { rootCause: "Low light stress", count: 3, leakageInr: 1800 },
    { rootCause: "Vendor delay", count: 2, leakageInr: 2400 },
    { rootCause: "Species mismatch", count: 1, leakageInr: 1400 },
  ],
  vendorPerformance: [
    { vendor: "Landscape Ops", sla: 86, closure: 92, reopen: 8 },
    { vendor: "Irrigation Team", sla: 74, closure: 78, reopen: 14 },
    { vendor: "Indoor Plant Crew", sla: 88, closure: 90, reopen: 6 },
  ],
};

export function getRoleMetrics(role) {
  const s = snapshot.summary;
  if (role === ROLES.CEO) {
    return [
      { label: "Green Infrastructure Value", value: `${s.greenInfrastructureValueScore}/100`, sub: "Asset-value intelligence score", tone: "green" },
      { label: "Nature-Readiness", value: `${s.natureReadinessScore}/100`, sub: "Pilot-level nature maturity", tone: "green" },
      { label: "Water-to-Health", value: `${s.waterToHealthScore}/100`, sub: "Water creating healthy output", tone: "blue" },
      { label: "High-Risk Zones", value: `${s.highRiskGreenZones}`, sub: "Intervention required", tone: "amber" },
      { label: "Tenant Readiness", value: `${s.tenantGreenEngagementReadiness}/100`, sub: "Tenant-facing green story", tone: "purple" },
      { label: "Investment Actions", value: `${s.recommendedInvestmentActions}`, sub: "P1/P2 recommended actions", tone: "amber" },
    ];
  }
  if (role === ROLES.ESG) {
    return [
      { label: "Evidence Level", value: snapshot.evidenceLevel, sub: "Current methodology maturity", tone: "amber" },
      { label: "Data Quality", value: `${s.dataQualityScore}/100`, sub: "Evidence completeness", tone: "purple" },
      { label: "LEAP Prepare", value: "62/100", sub: "Internal evidence readiness", tone: "blue" },
      { label: "Claim Status", value: snapshot.claimStatus, sub: "Language guardrail active", tone: "amber" },
    ];
  }
  return [
    { label: "Open Tickets", value: `${s.openTickets}`, sub: "Action queue", tone: "blue" },
    { label: "SLA Compliance", value: `${s.slaCompliance}%`, sub: "Current service proof", tone: "green" },
    { label: "Risk Zones", value: `${s.highRiskGreenZones}`, sub: "Site attention required", tone: "amber" },
    { label: "Leakage Watch", value: `₹${Math.round(s.costLeakageEstimateInr / 1000)}K`, sub: "Preventable leakage estimate", tone: "amber" },
  ];
}

export function getBoardNarrative() {
  const s = snapshot.summary;
  return [
    `The pilot asset has reached Level ${s.greenAssetMaturityLevel}/6: nature-readiness indicators are now visible, but third-party evidence maturity is not yet reached.`,
    `Green infrastructure value is ${s.greenInfrastructureValueScore}/100 with ${s.highRiskGreenZones} intervention zone and ${s.recommendedInvestmentActions} recommended investment actions.`,
    `Water-to-health is ${s.waterToHealthScore}/100, but water resilience inside nature-readiness remains weak; this is the highest-quality improvement opportunity.`,
    `Carbon remains supporting evidence only: ${s.carbonStockProxyTco2e} tCO₂e stock proxy and ${s.eligibleInternalContributionTco2e} tCO₂e/year eligible internal contribution estimate at E0 evidence level.`,
  ];
}

export function buildAiPayload(role, view) {
  return {
    role,
    view,
    methodVersion: METHOD_VERSION,
    claimStatus: snapshot.claimStatus,
    evidenceLevel: snapshot.evidenceLevel,
    summary: snapshot.summary,
    zones: snapshot.zones,
    evidenceFunnel: snapshot.evidenceFunnel,
    dataQuality: snapshot.dataQuality,
    claims: snapshot.claims,
    investments: snapshot.investments,
    tickets: snapshot.tickets,
  };
}
