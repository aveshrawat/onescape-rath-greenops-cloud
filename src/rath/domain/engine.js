export const METHOD_VERSION = "RATH-GII-v0.7.4";
export const E1_PATHWAY_TEXT = "E1 expert-review pathway initiated through the 30-day pilot engagement.";

export const ROLES = {
  CEO: "CEO",
  ESG: "ESG Team",
  IFM: "IFM Partner",
  PM: "Property Manager",
};

export const PERIODS = [
  { key: "30d", label: "30 Days", shortLabel: "30D" },
  { key: "quarter", label: "Quarter", shortLabel: "QTR" },
  { key: "6m", label: "6 Months", shortLabel: "6M" },
  { key: "9m", label: "9 Months", shortLabel: "9M" },
  { key: "12m", label: "12 Months", shortLabel: "12M" },
];

export const demoCredentials = [
  {
    email: "ceo@client.com",
    pin: "111111",
    role: ROLES.CEO,
    displayName: "Regional CEO / Board",
    workspace: "Global Technology Park, Bengaluru",
    defaultView: "portfolio",
  },
  {
    email: "esg@client.com",
    pin: "222222",
    role: ROLES.ESG,
    displayName: "ESG & Sustainability Lead",
    workspace: "Global Technology Park, Bengaluru",
    defaultView: "evidence",
  },
  {
    email: "ifm@partner.com",
    pin: "333333",
    role: ROLES.IFM,
    displayName: "Property Operations — IFM",
    workspace: "Global Technology Park, Bengaluru",
    defaultView: "control",
  },
  {
    email: "pm@client.com",
    pin: "444444",
    role: ROLES.PM,
    displayName: "Property Operations — Site",
    workspace: "Global Technology Park, Bengaluru",
    defaultView: "control",
  },
];

export function authenticateDemoUser(email, pin) {
  const normalized = String(email || "").trim().toLowerCase();
  const normalizedPin = String(pin || "").trim();
  return demoCredentials.find(
    (user) => user.email.toLowerCase() === normalized && user.pin === normalizedPin
  ) || null;
}

export const dashboardCopy = {
  [ROLES.CEO]: {
    productName: "Green Infrastructure Value Dashboard",
    purpose: "Portfolio decision view.",
    hero: "Asset value, tenant impact, risk, carbon, water, and capital decisions from already-owned green infrastructure.",
  },
  [ROLES.ESG]: {
    productName: "Evidence & Nature-Readiness Studio",
    purpose: "Disclosure readiness view.",
    hero: "Evidence maturity, claim safety, LEAP alignment, data quality, and export-ready ESG support.",
  },
  [ROLES.IFM]: {
    productName: "GreenOps Control Center",
    purpose: "Account control view.",
    hero: "SLA proof, vendor accountability, recurring issues, water stress, and service-report intelligence.",
  },
  [ROLES.PM]: {
    productName: "GreenOps Control Center",
    purpose: "Daily site control view.",
    hero: "Zone health, action queues, water stress, closure proof, and replacement-risk control.",
  },
};

export const roleViews = {
  [ROLES.CEO]: [
    { key: "portfolio", label: "Portfolio Intelligence", description: "Portfolio rollout lens" },
    { key: "value", label: "Value Overview", description: "Board summary" },
    { key: "risk", label: "Risk Map", description: "High-risk green zones" },
    { key: "natureWater", label: "Nature + Water", description: "Nature radar and water-health" },
    { key: "carbonResource", label: "Carbon + Resource", description: "Carbon, water, leakage" },
    { key: "investment", label: "Investment Planner", description: "Board-level capital logic" },
    { key: "boardPack", label: "Board Pack", description: "Board decision memo" },
  ],
  [ROLES.ESG]: [
    { key: "evidence", label: "Evidence Overview", description: "Evidence maturity and gaps" },
    { key: "leap", label: "LEAP Mapping", description: "Locate, Evaluate, Assess, Prepare" },
    { key: "dataQuality", label: "Data Quality", description: "Completeness and gaps" },
    { key: "claimSafety", label: "Claim Safety", description: "Allowed vs blocked language" },
    { key: "methodology", label: "Methodology", description: "Assumptions and boundaries" },
    { key: "exports", label: "Exports", description: "ESG evidence pack" },
  ],
  [ROLES.IFM]: [
    { key: "control", label: "Control Center", description: "Operating command view" },
    { key: "zoneHealth", label: "Zone Health", description: "Where attention is needed" },
    { key: "tickets", label: "Tickets + SLA", description: "Service proof" },
    { key: "waterStress", label: "Water Stress", description: "Water-health exceptions" },
    { key: "recurring", label: "Recurring Issues", description: "Root-cause leakage" },
    { key: "serviceReport", label: "Service Report", description: "Weekly FM-ready report" },
  ],
  [ROLES.PM]: [
    { key: "control", label: "Control Center", description: "Operating command view" },
    { key: "zoneHealth", label: "Zone Health", description: "Where attention is needed" },
    { key: "tickets", label: "Tickets + SLA", description: "Open work and closure proof" },
    { key: "waterStress", label: "Water Stress", description: "Irrigation exceptions" },
    { key: "recurring", label: "Recurring Issues", description: "Repeat failures" },
    { key: "serviceReport", label: "Service Report", description: "Simple FM export" },
  ],
};

const metricDefinitions = {
  greenInfrastructureValueScore: {
    label: "Green Infrastructure Value",
    sub: "Asset-value intelligence score",
    definition: "Composite board signal combining asset condition, tenant-facing quality, resource performance, and evidence maturity.",
    formula: "Weighted composite of nature-readiness, water-to-health, risk control, tenant readiness, and evidence quality.",
    source: "Green asset register, zone health logs, water ledger, ticket closure records, and evidence registry.",
    action: "Use this as the board-level north star; move into Investment Planner when score is below target.",
    evidence: "E0 internal model",
  },
  natureReadinessScore: {
    label: "Nature-Readiness",
    sub: "Pilot-level nature maturity",
    definition: "Internal readiness score across native/adaptive share, diversity, strata, pollinator support, habitat, water resilience, and health stability.",
    formula: "Weighted score of eight nature-readiness components; not a certification score.",
    source: "Species register, asset mapping, health scans, and field observations.",
    action: "Prioritise species diversity and water-resilience interventions before external biodiversity claims.",
    evidence: "E0 internal model",
  },
  waterToHealthScore: {
    label: "Water-to-Health",
    sub: "Water creating healthy output",
    definition: "Operational efficiency score showing whether landscape water use is translating into healthy plant outcomes.",
    formula: "Zone health outcome adjusted for water intensity, recycled-water share, and stress flags.",
    source: "Water ledger, irrigation logs, plant-health scans, and recycled-water source records.",
    action: "Use Watch zones to prioritise irrigation zoning and adaptive planting.",
    evidence: "Measured operational ledger + E0 model",
  },
  highRiskGreenZones: {
    label: "High-Risk Zones",
    sub: "Intervention required",
    definition: "Zones where combined health, water, heat, nature, or data-risk signals exceed the intervention threshold.",
    formula: "Weighted zone risk score across health, water, heat, nature weakness, and data gaps.",
    source: "Risk map, ticket history, water logs, and zone health records.",
    action: "Move intervention zones into the capital action queue and track closure proof.",
    evidence: "Operational evidence",
  },
  tenantGreenEngagementReadiness: {
    label: "Tenant Readiness",
    sub: "Tenant-facing green story",
    definition: "Readiness to translate green assets into tenant-facing communication without overclaiming ESG impact.",
    formula: "Composite of mapped stories, QR-ready zones, evidence quality, visibility, and nature-readiness.",
    source: "Green asset register, tenant trail content, QR scans, and evidence registry.",
    action: "Activate only zones with sufficient evidence quality; avoid decorative-only storytelling.",
    evidence: "Internal readiness indicator",
  },
  recommendedInvestmentActions: {
    label: "Investment Actions",
    sub: "Board-approved action candidates",
    definition: "Prioritised green infrastructure actions that improve resilience, tenant value, and evidence maturity.",
    formula: "Portfolio ranking by strategic impact, cost, feasibility, risk reduction, and tenant visibility.",
    source: "Risk map, action register, cost bands, and site observations.",
    action: "Review the Focused Resilience Programme in the Investment Planner.",
    evidence: "Management estimate",
  },
  carbonContribution: {
    label: "Annual Green Asset Contribution Estimate",
    sub: "Internal annual contribution estimate",
    definition: "Conservative annual internal green-asset contribution estimate after claim-control rules.",
    formula: "Plant contribution proxy × health multiplier × evidence factor × right-to-report factor.",
    source: "Green asset register, species tiers, health logs, and methodology versioning.",
    action: "Use only as internal planning support; do not label as credit generation.",
    evidence: "E0 internal model",
  },
  carbonStock: {
    label: "Carbon Stock Proxy",
    sub: "Existing outdoor biomass stock proxy",
    definition: "Estimated stock proxy for existing outdoor woody biomass; separate from annual sequestration flow.",
    formula: "Asset class × maturity band × conservative biomass proxy.",
    source: "Mapped outdoor assets, asset type, maturity stage, and methodology assumptions.",
    action: "Use for internal asset baseline and validation roadmap.",
    evidence: "E0 internal model",
  },
  waterReuseAvoidance: {
    label: "Water Reuse + Freshwater Avoidance",
    sub: "Reused water plus freshwater avoided ledger",
    definition: "Water ledger combining reused sources and avoided freshwater against baseline irrigation demand.",
    formula: "Measured reused water + baseline freshwater avoided estimate.",
    source: "STP/HVAC water logs, meter readings, and irrigation records.",
    action: "Add meter-level evidence to upgrade confidence.",
    evidence: "Measured ledger + estimate",
  },
  costLeakage: {
    label: "Cost Leakage Watch",
    sub: "Replacement, SLA, water, and corrective work leakage",
    definition: "Preventable operating leakage linked to repeat issues, SLA breaches, water inefficiency, and corrective work.",
    formula: "Repeat issue cost + SLA leakage + water inefficiency + corrective work estimate.",
    source: "Ticket history, SLA logs, water stress flags, and replacement register.",
    action: "Use recurring issue analysis to reduce leakage, not just report it.",
    evidence: "Management estimate",
  },
};

const periodProfiles = {
  "30d": {
    label: "30 Days",
    scores: {
      greenInfrastructureValueScore: 74,
      natureReadinessScore: 67,
      waterToHealthScore: 81,
      highRiskGreenZones: 1,
      tenantGreenEngagementReadiness: 62,
      recommendedInvestmentActions: 3,
      greenAssetMaturityLevel: 4,
      dataQualityScore: 82,
      costLeakageEstimateInr: 8800,
      carbonStockProxyTco2e: 50.14,
      annualSequestrationProxyTco2e: 0.732,
      eligibleInternalContributionTco2e: 0.183,
      waterReusedLitres: 37700,
      freshwaterAvoidedLitres: 37700,
      waterReuseAvoidanceTotalLitres: 75400,
      openTickets: 2,
      slaCompliance: 75,
      repeatIssues: 2,
    },
    trends: [
      { label: "W1", value: 65, nature: 61, water: 72, risk: 59, quality: 75, tenant: 54 },
      { label: "W2", value: 69, nature: 64, water: 76, risk: 54, quality: 78, tenant: 57 },
      { label: "W3", value: 72, nature: 66, water: 79, risk: 48, quality: 80, tenant: 60 },
      { label: "W4", value: 74, nature: 67, water: 81, risk: 43, quality: 82, tenant: 62 },
    ],
  },
  "quarter": {
    label: "Quarter",
    scores: {
      greenInfrastructureValueScore: 77,
      natureReadinessScore: 69,
      waterToHealthScore: 83,
      highRiskGreenZones: 1,
      tenantGreenEngagementReadiness: 66,
      recommendedInvestmentActions: 3,
      greenAssetMaturityLevel: 4,
      dataQualityScore: 85,
      costLeakageEstimateInr: 20500,
      carbonStockProxyTco2e: 50.14,
      annualSequestrationProxyTco2e: 0.732,
      eligibleInternalContributionTco2e: 0.183,
      waterReusedLitres: 113100,
      freshwaterAvoidedLitres: 113100,
      waterReuseAvoidanceTotalLitres: 226200,
      openTickets: 4,
      slaCompliance: 80,
      repeatIssues: 4,
    },
    trends: [
      { label: "M1", value: 68, nature: 63, water: 76, risk: 57, quality: 78, tenant: 56 },
      { label: "M2", value: 73, nature: 66, water: 80, risk: 49, quality: 82, tenant: 61 },
      { label: "M3", value: 77, nature: 69, water: 83, risk: 42, quality: 85, tenant: 66 },
    ],
  },
  "6m": {
    label: "6 Months",
    scores: {
      greenInfrastructureValueScore: 80,
      natureReadinessScore: 72,
      waterToHealthScore: 85,
      highRiskGreenZones: 1,
      tenantGreenEngagementReadiness: 71,
      recommendedInvestmentActions: 4,
      greenAssetMaturityLevel: 5,
      dataQualityScore: 87,
      costLeakageEstimateInr: 34900,
      carbonStockProxyTco2e: 50.14,
      annualSequestrationProxyTco2e: 0.732,
      eligibleInternalContributionTco2e: 0.183,
      waterReusedLitres: 226200,
      freshwaterAvoidedLitres: 226200,
      waterReuseAvoidanceTotalLitres: 452400,
      openTickets: 6,
      slaCompliance: 84,
      repeatIssues: 5,
    },
    trends: [
      { label: "M1", value: 65, nature: 61, water: 72, risk: 59, quality: 75, tenant: 54 },
      { label: "M2", value: 69, nature: 64, water: 76, risk: 54, quality: 78, tenant: 57 },
      { label: "M3", value: 73, nature: 66, water: 80, risk: 49, quality: 82, tenant: 61 },
      { label: "M4", value: 76, nature: 68, water: 82, risk: 45, quality: 84, tenant: 65 },
      { label: "M5", value: 78, nature: 70, water: 84, risk: 41, quality: 86, tenant: 68 },
      { label: "M6", value: 80, nature: 72, water: 85, risk: 38, quality: 87, tenant: 71 },
    ],
  },
  "9m": {
    label: "9 Months",
    scores: {
      greenInfrastructureValueScore: 82,
      natureReadinessScore: 74,
      waterToHealthScore: 86,
      highRiskGreenZones: 0,
      tenantGreenEngagementReadiness: 75,
      recommendedInvestmentActions: 4,
      greenAssetMaturityLevel: 5,
      dataQualityScore: 89,
      costLeakageEstimateInr: 44800,
      carbonStockProxyTco2e: 50.14,
      annualSequestrationProxyTco2e: 0.732,
      eligibleInternalContributionTco2e: 0.183,
      waterReusedLitres: 339300,
      freshwaterAvoidedLitres: 339300,
      waterReuseAvoidanceTotalLitres: 678600,
      openTickets: 7,
      slaCompliance: 87,
      repeatIssues: 6,
    },
    trends: [
      { label: "M1", value: 65, nature: 61, water: 72, risk: 59, quality: 75, tenant: 54 },
      { label: "M3", value: 73, nature: 66, water: 80, risk: 49, quality: 82, tenant: 61 },
      { label: "M5", value: 78, nature: 70, water: 84, risk: 41, quality: 86, tenant: 68 },
      { label: "M7", value: 81, nature: 73, water: 85, risk: 36, quality: 88, tenant: 73 },
      { label: "M9", value: 82, nature: 74, water: 86, risk: 34, quality: 89, tenant: 75 },
    ],
  },
  "12m": {
    label: "12 Months",
    scores: {
      greenInfrastructureValueScore: 85,
      natureReadinessScore: 78,
      waterToHealthScore: 88,
      highRiskGreenZones: 0,
      tenantGreenEngagementReadiness: 81,
      recommendedInvestmentActions: 5,
      greenAssetMaturityLevel: 6,
      dataQualityScore: 92,
      costLeakageEstimateInr: 53100,
      carbonStockProxyTco2e: 50.14,
      annualSequestrationProxyTco2e: 0.732,
      eligibleInternalContributionTco2e: 0.183,
      waterReusedLitres: 452400,
      freshwaterAvoidedLitres: 452400,
      waterReuseAvoidanceTotalLitres: 904800,
      openTickets: 8,
      slaCompliance: 90,
      repeatIssues: 7,
    },
    trends: [
      { label: "Q1", value: 69, nature: 64, water: 76, risk: 54, quality: 78, tenant: 57 },
      { label: "Q2", value: 76, nature: 68, water: 82, risk: 45, quality: 84, tenant: 65 },
      { label: "Q3", value: 82, nature: 74, water: 86, risk: 34, quality: 89, tenant: 75 },
      { label: "Q4", value: 85, nature: 78, water: 88, risk: 28, quality: 92, tenant: 81 },
    ],
  },
};

export const baseData = {
  siteName: "Global Technology Park, Bengaluru",
  city: "Bengaluru",
  methodVersion: METHOD_VERSION,
  evidenceLevel: "E0",
  claimStatus: "Restricted",
  nature: {
    components: [
      { key: "nativeAdaptiveShare", label: "Native Adaptive Share", value: 13.8, max: 20, concern: "Increase native/adaptive ratio in high-footfall zones." },
      { key: "speciesDiversity", label: "Species Diversity", value: 4.5, max: 15, concern: "Low diversity weakens nature-readiness." },
      { key: "pollinatorSupport", label: "Pollinator Support", value: 10.4, max: 15, concern: "Good, can improve through flowering pockets." },
      { key: "canopyAndStrata", label: "Canopy + Strata", value: 15.0, max: 15, concern: "Strong layered structure." },
      { key: "habitatPotential", label: "Habitat Potential", value: 10.0, max: 10, concern: "Strong baseline for nature-trail story." },
      { key: "waterResilience", label: "Water Resilience", value: 0.2, max: 10, concern: "Critical weakness: water-sensitive mix and evidence gap." },
      { key: "healthStability", label: "Health Stability", value: 8.4, max: 10, concern: "Good field condition." },
      { key: "riskControl", label: "Risk Control", value: 5.0, max: 5, concern: "Controlled under current pilot assumptions." },
    ],
  },
  zones: [
    { id: "zone_lobby", name: "Lobby Atrium", healthRisk: 18, waterStressRisk: 14, heatExposureRisk: 10, natureWeaknessRisk: 34, dataGapRisk: 24, riskScore: 36, status: "Stable", tenantVisibility: "High", recommendedAction: "Maintain light-governance cadence and complete closure-proof continuity." },
    { id: "zone_rooftop", name: "Rooftop Terrace", healthRisk: 28, waterStressRisk: 55, heatExposureRisk: 72, natureWeaknessRisk: 40, dataGapRisk: 26, riskScore: 71, status: "Watch", tenantVisibility: "High", recommendedAction: "Improve adaptive planting and irrigation zoning before peak-heat months." },
    { id: "zone_podium", name: "Podium Landscape", healthRisk: 35, waterStressRisk: 62, heatExposureRisk: 55, natureWeaknessRisk: 42, dataGapRisk: 28, riskScore: 79, status: "Intervention", tenantVisibility: "High", recommendedAction: "Replace high-water lawn pockets with adaptive planting and irrigation zoning." },
    { id: "zone_arrival", name: "Arrival Plaza", healthRisk: 24, waterStressRisk: 32, heatExposureRisk: 85, natureWeaknessRisk: 36, dataGapRisk: 18, riskScore: 58, status: "Watch", tenantVisibility: "High", recommendedAction: "Add shade and soil-moisture governance at arrival frontage." },
    { id: "zone_peripheral", name: "Peripheral Green Belt", healthRisk: 10, waterStressRisk: 38, heatExposureRisk: 25, natureWeaknessRisk: 18, dataGapRisk: 34, riskScore: 32, status: "Stable", tenantVisibility: "Medium", recommendedAction: "Add water-linkage evidence and convert into a green-trail point." },
  ],
  water: [
    { zoneId: "zone_lobby", zone: "Lobby Atrium", index: 82, health: 72, waterIntensity: 5, source: "Manual", status: "Efficient" },
    { zoneId: "zone_rooftop", zone: "Rooftop Terrace", index: 75, health: 71, waterIntensity: 35, source: "STP", status: "Watch" },
    { zoneId: "zone_podium", zone: "Podium Landscape", index: 72, health: 65, waterIntensity: 28, source: "STP", status: "Watch" },
    { zoneId: "zone_arrival", zone: "Arrival Plaza", index: 82, health: 79, waterIntensity: 32, source: "STP", status: "Efficient" },
    { zoneId: "zone_peripheral", zone: "Peripheral Green Belt", index: 88, health: 89, waterIntensity: 29, source: "STP", status: "Efficient" },
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
    { area: "Species verification", score: 80, status: "Usable", gap: "Arrival plaza species confirmation" },
    { area: "Health scans", score: 100, status: "Complete", gap: "None" },
    { area: "Photo evidence", score: 80, status: "Usable", gap: "Lobby atrium closure photo set" },
    { area: "Water linkage", score: 80, status: "Usable", gap: "Peripheral green belt hose/meter link" },
    { area: "Maintenance history", score: 70, status: "Weak", gap: "Podium landscape maintenance history" },
  ],
  leap: [
    { stage: "Locate", score: 100, output: "Mapped site zones and green-asset locations." },
    { stage: "Evaluate", score: 76, output: "Nature, water, health, and tenant-facing value scored." },
    { stage: "Assess", score: 70, output: "Risk and opportunity areas identified." },
    { stage: "Prepare", score: 62, output: "Internal evidence pack possible; external claims restricted." },
  ],
  claims: [
    { topic: "Carbon", allowed: "Internal carbon stock / sequestration proxy", blocked: "Carbon credits generated or offset created", risk: "High if overclaimed" },
    { topic: "Nature", allowed: "Pilot-level nature-readiness score", blocked: "Certified biodiversity or TNFD score", risk: "Medium" },
    { topic: "Water", allowed: "Water-to-health efficiency index", blocked: "Certified water saving or water credit", risk: "Medium" },
    { topic: "Financial", allowed: "Estimated cost leakage / opportunity", blocked: "Guaranteed savings or ROI", risk: "Medium" },
  ],
  methodology: [
    { module: "Green Infrastructure Value Score", boundary: "Composite internal score", confidence: "E0", note: "Not a valuation certificate." },
    { module: "Nature-Readiness", boundary: "Readiness indicator", confidence: "E0", note: "Not certified biodiversity." },
    { module: "Water-to-Health", boundary: "Operational efficiency index", confidence: "E0", note: "Based on logs and health score." },
    { module: "Carbon Proxy", boundary: "Supporting internal estimate", confidence: "E0", note: "Not offset or carbon-credit issuance." },
  ],
  investments: [
    {
      id: "INV-001",
      zoneId: "zone_podium",
      action: "Replace high-water lawn pockets with adaptive planting",
      category: "Water resilience",
      costLow: 180000,
      costHigh: 320000,
      strategicValue: "Reduces water dependency and corrects the weakest nature-readiness signal.",
      expectedLift: "+4 value points",
      riskAvoided: "Water stress + corrective work",
      boardLogic: "Fastest route to reduce visible leakage and improve resilience.",
      score: 82,
      priority: "P1",
    },
    {
      id: "INV-002",
      zoneId: "zone_rooftop",
      action: "Add shade-tree layer near pedestrian spine",
      category: "Tenant experience",
      costLow: 350000,
      costHigh: 520000,
      strategicValue: "Improves heat comfort, visibility, and tenant-facing green narrative.",
      expectedLift: "+3 tenant-readiness points",
      riskAvoided: "Heat exposure",
      boardLogic: "High tenant visibility; supports retention narrative.",
      score: 79,
      priority: "P1",
    },
    {
      id: "INV-003",
      zoneId: "zone_peripheral",
      action: "Build tenant-facing biodiversity pocket",
      category: "Nature narrative",
      costLow: 120000,
      costHigh: 220000,
      strategicValue: "Creates evidence-backed tenant storytelling and nature-readiness uplift.",
      expectedLift: "+5 nature points",
      riskAvoided: "Weak tenant story",
      boardLogic: "Low capex, high communication value.",
      score: 76,
      priority: "P1",
    },
    {
      id: "INV-004",
      zoneId: "zone_arrival",
      action: "Soil, mulch, and irrigation zoning rehabilitation",
      category: "Operational resilience",
      costLow: 70000,
      costHigh: 140000,
      strategicValue: "Reduces repeated corrective work and vendor-dependency leakage.",
      expectedLift: "+2 water points",
      riskAvoided: "Repeat issues",
      boardLogic: "Low-cost hygiene investment that protects service quality.",
      score: 74,
      priority: "P2",
    },
  ],
  portfolioOptions: [
    {
      key: "defensive",
      name: "Defensive Control",
      capex: "₹2.5L–₹4.6L",
      targetScore: "78/100",
      riskReduction: "Moderate",
      tenantUpside: "Low",
      recommendation: "Only if the board wants minimum spend.",
    },
    {
      key: "focused",
      name: "Focused Resilience Programme",
      capex: "₹6.5L–₹10.6L",
      targetScore: "82/100",
      riskReduction: "High",
      tenantUpside: "High",
      recommendation: "Recommended board pathway.",
    },
    {
      key: "transform",
      name: "Transformative Green Asset Programme",
      capex: "₹12L–₹18L",
      targetScore: "86/100",
      riskReduction: "Very high",
      tenantUpside: "Very high",
      recommendation: "Use after pilot evidence matures.",
    },
  ],
  tickets: [
    { id: "TCK-1001", zone: "Lobby Atrium", issue: "Low light stress", priority: "P2", status: "Open", sla: "Within SLA", owner: "Supervisor", proof: "Pending" },
    { id: "TCK-1002", zone: "Podium Landscape", issue: "Dry patch", priority: "P2", status: "Closed", sla: "Met", owner: "Gardener", proof: "Photo uploaded" },
    { id: "TCK-1003", zone: "Rooftop Terrace", issue: "Pruning due", priority: "P3", status: "Open", sla: "Within SLA", owner: "Vendor", proof: "Pending" },
    { id: "TCK-1004", zone: "Arrival Plaza", issue: "Irrigation leak", priority: "P2", status: "Closed", sla: "Breached", owner: "Vendor", proof: "Photo uploaded" },
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
    { vendor: "Lobby Atrium Plant Crew", sla: 88, closure: 90, reopen: 6 },
  ],
};


const AI_ACTIONS = {
  [ROLES.CEO]: [
    { key: "boardSummary", label: "Generate Board Summary" },
    { key: "currentRisk", label: "Explain Current Risk" },
    { key: "decisionMemo", label: "Draft Decision Memo" },
    { key: "periodMovement", label: "Show What Changed" },
  ],
  [ROLES.ESG]: [
    { key: "evidenceReview", label: "Generate Evidence Review" },
    { key: "missingData", label: "List Data Blocking E1" },
    { key: "claimSafeNote", label: "Draft Claim-Safe Note" },
    { key: "reportableToday", label: "Explain Reportable Today" },
  ],
  [ROLES.IFM]: [
    { key: "qbrSummary", label: "Generate QBR Summary" },
    { key: "rootCause", label: "Identify Root Causes" },
    { key: "clientEscalation", label: "Draft Client Escalation" },
    { key: "slaRisks", label: "Show SLA Risks" },
  ],
  [ROLES.PM]: [
    { key: "dailyAction", label: "Generate Daily Action List" },
    { key: "visitQueue", label: "Show Zones Needing Visit" },
    { key: "vendorFollowup", label: "Draft Vendor Follow-up" },
    { key: "openIssues", label: "Summarize Open Issues" },
  ],
};

const previousTrendPoint = (data) => data.trends[Math.max(0, data.trends.length - 2)] || data.trends[0];
const latestTrendPoint = (data) => data.trends[data.trends.length - 1] || data.trends[0];

function formatDelta(value, unit = "pts", invert = false) {
  if (value === 0) return { label: "Unchanged vs prior review", tone: "slate" };
  const positive = value > 0;
  const good = invert ? !positive : positive;
  return {
    label: `${positive ? "+" : ""}${value} ${unit} vs prior review`,
    tone: good ? "green" : "amber",
  };
}

export function getMetricDeltaMap(periodKey = "30d") {
  const data = getSnapshot(periodKey);
  const prior = previousTrendPoint(data);
  const latest = latestTrendPoint(data);
  return {
    greenInfrastructureValueScore: formatDelta(latest.value - prior.value),
    natureReadinessScore: formatDelta(latest.nature - prior.nature),
    waterToHealthScore: formatDelta(latest.water - prior.water),
    highRiskGreenZones: formatDelta(latest.risk - prior.risk, "risk pts", true),
    tenantGreenEngagementReadiness: formatDelta(latest.tenant - prior.tenant),
    recommendedInvestmentActions: {
      label: `${data.summary.recommendedInvestmentActions} active actions in queue`,
      tone: "slate",
    },
  };
}

export function getDecisionStrip(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const memo = getBoardDecisionMemo(periodKey, filters);
  return [
    {
      label: "Current state",
      value: `${data.summary.greenInfrastructureValueScore}/100`,
      detail: `Level ${data.summary.greenAssetMaturityLevel}/6 maturity`,
      tone: "green",
    },
    {
      label: "Principal risk",
      value: "Water resilience",
      detail: "Weakest strategic dimension",
      tone: "amber",
    },
    {
      label: "Recommended decision",
      value: "Focused Resilience Programme",
      detail: memo.capitalAsk,
      tone: "dark",
    },
    {
      label: "Expected lift",
      value: "82/100 target",
      detail: "Risk, tenant, evidence uplift",
      tone: "blue",
    },
  ];
}

export function getInvestmentScenarios(periodKey = "30d") {
  const data = getSnapshot(periodKey);
  return [
    {
      key: "maintain",
      name: "Maintain",
      capex: "₹0",
      outcome: "Current state maintained",
      riskIfChosen: "Water-resilience weakness and evidence delay persist",
      recommendation: "Not recommended",
      tone: "slate",
    },
    {
      key: "optimise",
      name: "Optimise",
      capex: data.portfolioOptions[1].capex,
      outcome: "Water stress falls; evidence quality improves; asset moves toward 82/100",
      riskIfChosen: "Requires controlled pilot execution",
      recommendation: "Recommended",
      tone: "green",
    },
    {
      key: "differentiate",
      name: "Differentiate",
      capex: data.portfolioOptions[2].capex,
      outcome: "Flagship tenant-facing nature asset plus stronger portfolio narrative",
      riskIfChosen: "Higher capital before E1 maturity",
      recommendation: "Strategic option after pilot validation",
      tone: "purple",
    },
  ];
}

export function getPortfolioIntelligence(periodKey = "30d") {
  const selectedProfile = periodProfiles[periodKey] || periodProfiles["30d"];
  const selectedScores = selectedProfile.scores;
  const portfolioPeriodOffsets = {
    "30d": { value: 0, nature: 0 },
    quarter: { value: 2, nature: 1 },
    "6m": { value: 4, nature: 3 },
    "9m": { value: 5, nature: 4 },
    "12m": { value: 7, nature: 6 },
  };
  const offset = portfolioPeriodOffsets[periodKey] || portfolioPeriodOffsets["30d"];
  const score = (base, delta) => Math.min(100, base + delta);
  const assets = [
    {
      name: "Vikhroli Business City, Mumbai",
      greenInfrastructureValueScore: score(78, offset.value),
      natureReadinessScore: score(72, offset.nature),
      primaryRisk: "Water-linkage continuity",
      esgReadiness: "Evidence pathway",
      capitalAction: "Standardise meter linkage",
      status: "Verified asset",
    },
    {
      name: "Asia Pacific Asset — Illustrative Rollout",
      greenInfrastructureValueScore: score(76, offset.value),
      natureReadinessScore: score(70, offset.nature),
      primaryRisk: "Portfolio baseline required",
      esgReadiness: "Illustrative",
      capitalAction: "Confirm baseline scope",
      status: "Illustrative",
      note: "Illustrative — subject to portfolio confirmation.",
    },
    {
      name: "Global Technology Park, Bengaluru",
      greenInfrastructureValueScore: selectedScores.greenInfrastructureValueScore,
      natureReadinessScore: selectedScores.natureReadinessScore,
      primaryRisk: "Water resilience",
      esgReadiness: "E0 active pilot",
      capitalAction: "Optimise resilience programme",
      status: "Active Pilot",
    },
    {
      name: "Global Infocity Park, Chennai",
      greenInfrastructureValueScore: score(71, offset.value),
      natureReadinessScore: score(64, offset.nature),
      primaryRisk: "Heat-exposure proxy",
      esgReadiness: "Baseline required",
      capitalAction: "Establish site baseline",
      status: "Verified asset",
    },
    {
      name: "Global Business City, Pune",
      greenInfrastructureValueScore: score(69, offset.value),
      natureReadinessScore: score(61, offset.nature),
      primaryRisk: "Species-mix resilience",
      esgReadiness: "Baseline required",
      capitalAction: "Prioritise adaptive planting",
      status: "Verified asset",
    },
  ]
    .sort((a, b) => b.greenInfrastructureValueScore - a.greenInfrastructureValueScore)
    .map((asset, index) => ({ ...asset, rank: index + 1 }));
  const aggregateValue = Math.round(assets.reduce((sum, asset) => sum + asset.greenInfrastructureValueScore, 0) / assets.length);
  const aggregateNature = Math.round(assets.reduce((sum, asset) => sum + asset.natureReadinessScore, 0) / assets.length);
  return {
    periodLabel: selectedProfile.label,
    aggregateValue,
    aggregateNature,
    activePilotCount: assets.filter((asset) => asset.status === "Active Pilot").length,
    rolloutCount: assets.length,
    assets,
    chart: assets.map((asset) => ({
      name: asset.name
        .replace(", Bengaluru", "")
        .replace(", Chennai", "")
        .replace(", Mumbai", "")
        .replace(", Pune", ""),
      value: asset.greenInfrastructureValueScore,
    })),
    caution: "Non-pilot scores are illustrative rollout values for portfolio planning until asset baselines are completed.",
  };
}


const DEFAULT_FILTERS = {
  zoneId: "all",
  priority: "all",
  interventionOnly: false,
  evidenceStatus: "all",
  ticketStatus: "all",
  slaStatus: "all",
};

const zoneEvidenceProfiles = {
  zone_lobby: {
    reportabilityReadiness: 66,
    claimRiskExposure: "Moderate",
    greenInfrastructureValueScore: 71,
    natureReadinessScore: 62,
    tenantGreenEngagementReadiness: 78,
    dataQualityScore: 80,
    greenAssetMaturityLevel: 4,
    evidenceFlags: {
      mapped: true,
      speciesVerified: true,
      healthScanned: true,
      waterLinked: true,
      photoEvidenced: false,
      e1Ready: false,
      executiveReportable: true,
    },
    dataQuality: [
      { area: "Inventory", score: 100, status: "Complete", gap: "None" },
      { area: "Species verification", score: 90, status: "Usable", gap: "None" },
      { area: "Health scans", score: 95, status: "Usable", gap: "One low-light follow-up pending" },
      { area: "Photo evidence", score: 60, status: "Weak", gap: "Lobby atrium closure photo set incomplete" },
      { area: "Water linkage", score: 88, status: "Usable", gap: "None" },
      { area: "Maintenance history", score: 75, status: "Usable", gap: "One event missing supervisor confirmation" },
    ],
    leap: [
      { stage: "Locate", score: 100, output: "Tenant-facing indoor asset cluster mapped." },
      { stage: "Evaluate", score: 72, output: "Health and tenant-facing value visible; photo continuity incomplete." },
      { stage: "Assess", score: 64, output: "Low operational risk; evidence continuity suppresses reportability." },
      { stage: "Prepare", score: 58, output: "Internal tenant narrative possible; photo proof remains a dependency." },
    ],
  },
  zone_podium: {
    reportabilityReadiness: 54,
    claimRiskExposure: "Elevated",
    greenInfrastructureValueScore: 61,
    natureReadinessScore: 58,
    tenantGreenEngagementReadiness: 55,
    dataQualityScore: 72,
    greenAssetMaturityLevel: 3,
    evidenceFlags: {
      mapped: true,
      speciesVerified: true,
      healthScanned: true,
      waterLinked: false,
      photoEvidenced: true,
      e1Ready: false,
      executiveReportable: false,
    },
    dataQuality: [
      { area: "Inventory", score: 100, status: "Complete", gap: "None" },
      { area: "Species verification", score: 85, status: "Usable", gap: "One lawn-edge species to confirm" },
      { area: "Health scans", score: 100, status: "Complete", gap: "None" },
      { area: "Photo evidence", score: 80, status: "Usable", gap: "Current month proof adequate" },
      { area: "Water linkage", score: 45, status: "Weak", gap: "Meter / irrigation proof not linked" },
      { area: "Maintenance history", score: 60, status: "Weak", gap: "Corrective work history incomplete" },
    ],
    leap: [
      { stage: "Locate", score: 100, output: "Zone mapped with asset boundary and irrigation context." },
      { stage: "Evaluate", score: 66, output: "Water and health signals available; resource linkage weak." },
      { stage: "Assess", score: 58, output: "Water stress and corrective-work risk remain material." },
      { stage: "Prepare", score: 44, output: "Internal note possible; stronger claim blocked by water evidence." },
    ],
  },
  zone_arrival: {
    reportabilityReadiness: 63,
    claimRiskExposure: "Moderate",
    greenInfrastructureValueScore: 68,
    natureReadinessScore: 63,
    tenantGreenEngagementReadiness: 72,
    dataQualityScore: 78,
    greenAssetMaturityLevel: 4,
    evidenceFlags: {
      mapped: true,
      speciesVerified: false,
      healthScanned: true,
      waterLinked: true,
      photoEvidenced: true,
      e1Ready: false,
      executiveReportable: true,
    },
    dataQuality: [
      { area: "Inventory", score: 100, status: "Complete", gap: "None" },
      { area: "Species verification", score: 55, status: "Weak", gap: "Arrival plaza species confirmation pending" },
      { area: "Health scans", score: 100, status: "Complete", gap: "None" },
      { area: "Photo evidence", score: 85, status: "Usable", gap: "One close-out image pending" },
      { area: "Water linkage", score: 85, status: "Usable", gap: "None" },
      { area: "Maintenance history", score: 75, status: "Usable", gap: "One event missing root-cause tag" },
    ],
    leap: [
      { stage: "Locate", score: 100, output: "Tenant-facing green assets mapped." },
      { stage: "Evaluate", score: 72, output: "Heat exposure and tenant visibility assessed." },
      { stage: "Assess", score: 68, output: "High visibility; species validation remains a dependency." },
      { stage: "Prepare", score: 58, output: "Internal tenant narrative possible; species review pending." },
    ],
  },
  zone_rooftop: {
    reportabilityReadiness: 78,
    claimRiskExposure: "Low",
    greenInfrastructureValueScore: 83,
    natureReadinessScore: 78,
    tenantGreenEngagementReadiness: 85,
    dataQualityScore: 91,
    greenAssetMaturityLevel: 5,
    evidenceFlags: {
      mapped: true,
      speciesVerified: true,
      healthScanned: true,
      waterLinked: true,
      photoEvidenced: true,
      e1Ready: true,
      executiveReportable: true,
    },
    dataQuality: [
      { area: "Inventory", score: 100, status: "Complete", gap: "None" },
      { area: "Species verification", score: 95, status: "Complete", gap: "None" },
      { area: "Health scans", score: 100, status: "Complete", gap: "None" },
      { area: "Photo evidence", score: 95, status: "Complete", gap: "None" },
      { area: "Water linkage", score: 90, status: "Usable", gap: "Meter mapping complete" },
      { area: "Maintenance history", score: 88, status: "Usable", gap: "Minor tagging cleanup" },
    ],
    leap: [
      { stage: "Locate", score: 100, output: "Mapped and asset-tagged." },
      { stage: "Evaluate", score: 88, output: "Nature, water, health, and tenant signals mature." },
      { stage: "Assess", score: 84, output: "Low operating risk; strong tenant-facing opportunity." },
      { stage: "Prepare", score: 78, output: "Near E1-ready with limited cleanup." },
    ],
  },
  zone_peripheral: {
    reportabilityReadiness: 68,
    claimRiskExposure: "Moderate",
    greenInfrastructureValueScore: 74,
    natureReadinessScore: 76,
    tenantGreenEngagementReadiness: 69,
    dataQualityScore: 76,
    greenAssetMaturityLevel: 4,
    evidenceFlags: {
      mapped: true,
      speciesVerified: true,
      healthScanned: true,
      waterLinked: false,
      photoEvidenced: false,
      e1Ready: false,
      executiveReportable: true,
    },
    dataQuality: [
      { area: "Inventory", score: 100, status: "Complete", gap: "None" },
      { area: "Species verification", score: 90, status: "Usable", gap: "None" },
      { area: "Health scans", score: 90, status: "Usable", gap: "None" },
      { area: "Photo evidence", score: 60, status: "Weak", gap: "Seasonal proof set incomplete" },
      { area: "Water linkage", score: 50, status: "Weak", gap: "Peripheral green belt hose / meter link missing" },
      { area: "Maintenance history", score: 76, status: "Usable", gap: "Minor continuity gap" },
    ],
    leap: [
      { stage: "Locate", score: 100, output: "Peripheral green belt mapped and classified." },
      { stage: "Evaluate", score: 80, output: "Species and habitat potential scored." },
      { stage: "Assess", score: 74, output: "Strong opportunity; evidence gaps suppress confidence." },
      { stage: "Prepare", score: 58, output: "Good internal story; water/photo proof blocks stronger use." },
    ],
  },
};

const missingDataQueueAll = [
  { zoneId: "zone_lobby", gap: "Lobby atrium closure photo set", impact: "Weakens closure evidence", owner: "Property Operations", requiredFor: "Evidence continuity" },
  { zoneId: "zone_peripheral", gap: "Peripheral green belt water linkage", impact: "Blocks stronger water claim", owner: "Site team", requiredFor: "E1 water evidence" },
  { zoneId: "zone_peripheral", gap: "Seasonal green-belt photo set", impact: "Weakens nature continuity", owner: "IFM", requiredFor: "Nature evidence continuity" },
  { zoneId: "zone_arrival", gap: "Arrival plaza species confirmation", impact: "Limits nature-score uplift", owner: "Horticulture expert", requiredFor: "Species validation" },
  { zoneId: "zone_podium", gap: "Podium landscape maintenance history", impact: "Weakens repeat-issue audit trail", owner: "Supervisor", requiredFor: "Operational proof" },
  { zoneId: "zone_podium", gap: "Podium landscape irrigation linkage", impact: "Blocks stronger water claim", owner: "Site team", requiredFor: "Meter-level evidence" },
];

function normalizeFilters(filters = {}) {
  return { ...DEFAULT_FILTERS, ...filters };
}

function getZoneProfile(zoneId) {
  return zoneEvidenceProfiles[zoneId] || null;
}

function buildEvidenceFunnelFromZones(zones) {
  const total = zones.length;
  const countByFlag = (flag) => zones.filter((zone) => getZoneProfile(zone.id)?.evidenceFlags?.[flag]).length;
  const pct = (count) => total ? Math.round((count / total) * 100) : 0;
  return [
    { stage: "Total green zones", count: total, percent: total ? 100 : 0 },
    { stage: "Mapped zones", count: countByFlag("mapped"), percent: pct(countByFlag("mapped")) },
    { stage: "Species-verified zones", count: countByFlag("speciesVerified"), percent: pct(countByFlag("speciesVerified")) },
    { stage: "Health-scanned zones", count: countByFlag("healthScanned"), percent: pct(countByFlag("healthScanned")) },
    { stage: "Water-linked zones", count: countByFlag("waterLinked"), percent: pct(countByFlag("waterLinked")) },
    { stage: "Photo-evidenced zones", count: countByFlag("photoEvidenced"), percent: pct(countByFlag("photoEvidenced")) },
    { stage: "E1-ready zones", count: countByFlag("e1Ready"), percent: pct(countByFlag("e1Ready")) },
    { stage: "Executive-reportable zones", count: countByFlag("executiveReportable"), percent: pct(countByFlag("executiveReportable")) },
  ];
}

function aggregateDataQuality(zones) {
  if (!zones.length) return baseData.dataQuality;
  if (zones.length === 1) return getZoneProfile(zones[0].id)?.dataQuality || baseData.dataQuality;
  const areas = baseData.dataQuality.map((item) => item.area);
  return areas.map((area) => {
    const rows = zones.map((zone) => getZoneProfile(zone.id)?.dataQuality?.find((item) => item.area === area)).filter(Boolean);
    const score = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length) : 0;
    const weakRows = rows.filter((row) => row.status === "Weak");
    const usableRows = rows.filter((row) => row.status === "Usable");
    const status = weakRows.length ? "Weak" : usableRows.length ? "Usable" : "Complete";
    const gap = weakRows[0]?.gap || usableRows.find((row) => row.gap !== "None")?.gap || "None";
    return { area, score, status, gap };
  });
}

function aggregateLeap(zones) {
  if (!zones.length) return baseData.leap;
  if (zones.length === 1) return getZoneProfile(zones[0].id)?.leap || baseData.leap;
  const stages = ["Locate", "Evaluate", "Assess", "Prepare"];
  return stages.map((stage) => {
    const rows = zones.map((zone) => getZoneProfile(zone.id)?.leap?.find((item) => item.stage === stage)).filter(Boolean);
    const score = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length) : 0;
    const output = stage === "Locate"
      ? "Mapped living-asset coverage across selected scope."
      : stage === "Evaluate"
        ? "Nature, water, health, and tenant signals scored for selected scope."
        : stage === "Assess"
          ? "Material risks and opportunities isolated for selected scope."
          : "Internal reporting readiness assessed; upgrade path identified.";
    return { stage, score, output };
  });
}

function filterDataQualityRows(rows, evidenceStatus = "all") {
  if (evidenceStatus === "all") return rows;
  return rows.filter((item) => item.status === evidenceStatus);
}

function filterMissingDataQueue(filters = {}) {
  const normalized = normalizeFilters(filters);
  return missingDataQueueAll.filter((item) => {
    const zoneMatch = normalized.zoneId === "all" || item.zoneId === normalized.zoneId;
    return zoneMatch;
  });
}

export function getSnapshot(periodKey = "30d") {
  const profile = periodProfiles[periodKey] || periodProfiles["30d"];
  return {
    ...baseData,
    period: profile.label,
    periodKey,
    summary: { ...profile.scores },
    trends: profile.trends,
    scopeLabel: "Asset-wide",
    activeFilters: DEFAULT_FILTERS,
  };
}

export function getFilteredSnapshot(periodKey = "30d", filters = {}) {
  const normalized = normalizeFilters(filters);
  const raw = getSnapshot(periodKey);
  let zones = raw.zones.filter((zone) => normalized.zoneId === "all" || zone.id === normalized.zoneId);
  if (normalized.interventionOnly) zones = zones.filter((zone) => zone.status === "Intervention");
  const scopeLabel = normalized.zoneId === "all"
    ? normalized.interventionOnly ? "Intervention zones" : "Asset-wide"
    : zones[0]?.name || "Selected scope";
  const dataQualityAll = aggregateDataQuality(zones.length ? zones : raw.zones);
  const dataQuality = filterDataQualityRows(dataQualityAll, normalized.evidenceStatus);
  const evidenceFunnel = buildEvidenceFunnelFromZones(zones.length ? zones : raw.zones);
  const leap = aggregateLeap(zones.length ? zones : raw.zones);
  const profile = zones.length === 1 ? getZoneProfile(zones[0].id) : null;
  const visibleZoneIds = new Set(zones.map((zone) => zone.id));
  const relatedInvestments = raw.investments.filter((item) => {
    const zoneMatch = normalized.zoneId === "all" || item.zoneId === normalized.zoneId;
    const interventionMatch = !normalized.interventionOnly || visibleZoneIds.has(item.zoneId);
    return zoneMatch && interventionMatch;
  });
  const ticketZoneMap = {
    "Lobby Atrium": "zone_lobby",
    "Podium Landscape": "zone_podium",
    "Arrival Plaza": "zone_arrival",
    "Rooftop Terrace": "zone_rooftop",
    "Peripheral Green Belt": "zone_peripheral",
  };
  const tickets = raw.tickets.filter((ticket) => {
    const ticketZoneId = ticketZoneMap[ticket.zone];
    const zoneMatch = normalized.zoneId === "all" || ticketZoneId === normalized.zoneId;
    const interventionMatch = !normalized.interventionOnly || visibleZoneIds.has(ticketZoneId);
    const statusMatch = normalized.ticketStatus === "all" || ticket.status === normalized.ticketStatus;
    const slaMatch = normalized.slaStatus === "all" || ticket.sla === normalized.slaStatus;
    return zoneMatch && interventionMatch && statusMatch && slaMatch;
  });
  const water = raw.water.filter((item) => {
    const zoneMatch = normalized.zoneId === "all" || item.zoneId === normalized.zoneId;
    const interventionMatch = !normalized.interventionOnly || visibleZoneIds.has(item.zoneId);
    return zoneMatch && interventionMatch;
  });
  const avg = (items, key) => items.length ? Math.round(items.reduce((sum, item) => sum + item[key], 0) / items.length) : 0;
  const summary = { ...raw.summary };
  if (zones.length === 1 && profile) {
    summary.greenInfrastructureValueScore = profile.greenInfrastructureValueScore;
    summary.natureReadinessScore = profile.natureReadinessScore;
    summary.tenantGreenEngagementReadiness = profile.tenantGreenEngagementReadiness;
    summary.dataQualityScore = profile.dataQualityScore;
    summary.greenAssetMaturityLevel = profile.greenAssetMaturityLevel;
    summary.highRiskGreenZones = zones[0].status === "Intervention" ? 1 : 0;
    summary.recommendedInvestmentActions = relatedInvestments.length;
    summary.openTickets = tickets.filter((ticket) => ticket.status === "Open").length;
    summary.waterToHealthScore = water[0]?.index ?? raw.summary.waterToHealthScore;
  } else if (zones.length > 0 && (normalized.interventionOnly || normalized.zoneId !== "all")) {
    summary.dataQualityScore = Math.round(dataQualityAll.reduce((sum, item) => sum + item.score, 0) / Math.max(1, dataQualityAll.length));
    summary.highRiskGreenZones = zones.filter((zone) => zone.status === "Intervention").length;
    summary.recommendedInvestmentActions = relatedInvestments.length;
    summary.openTickets = tickets.filter((ticket) => ticket.status === "Open").length;
    summary.waterToHealthScore = avg(water, "index") || raw.summary.waterToHealthScore;
  }
  return {
    ...raw,
    zones,
    water,
    tickets,
    investments: relatedInvestments,
    dataQuality,
    dataQualityAll,
    evidenceFunnel,
    leap,
    summary,
    scopeLabel,
    activeFilters: normalized,
  };
}

export function getMetricCards(periodKey = "30d", filters = {}) {
  const normalized = normalizeFilters(filters);
  const data = getFilteredSnapshot(periodKey, normalized);
  const s = data.summary;
  const isFiltered = Object.entries(normalized).some(([key, value]) => value !== DEFAULT_FILTERS[key]);
  const deltas = isFiltered
    ? {
        greenInfrastructureValueScore: { label: `${data.scopeLabel} scope`, tone: "slate" },
        natureReadinessScore: { label: `${data.scopeLabel} scope`, tone: "slate" },
        waterToHealthScore: { label: `${data.scopeLabel} scope`, tone: "slate" },
        highRiskGreenZones: { label: `${data.scopeLabel} scope`, tone: "slate" },
        tenantGreenEngagementReadiness: { label: `${data.scopeLabel} scope`, tone: "slate" },
        recommendedInvestmentActions: { label: `${data.investments.length} actions in selected scope`, tone: "slate" },
      }
    : getMetricDeltaMap(periodKey);
  return [
    { key: "greenInfrastructureValueScore", value: `${s.greenInfrastructureValueScore}/100`, tone: "green" },
    { key: "natureReadinessScore", value: `${s.natureReadinessScore}/100`, tone: "green" },
    { key: "waterToHealthScore", value: `${s.waterToHealthScore}/100`, tone: "blue" },
    { key: "highRiskGreenZones", value: `${s.highRiskGreenZones}`, tone: "amber" },
    { key: "tenantGreenEngagementReadiness", value: `${s.tenantGreenEngagementReadiness}/100`, tone: "purple" },
    { key: "recommendedInvestmentActions", value: `${s.recommendedInvestmentActions}`, tone: "amber" },
  ].map((item) => ({ ...metricDefinitions[item.key], ...item, key: item.key, delta: deltas[item.key] }));
}

export function getCarbonMetrics(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const s = data.summary;
  return [
    { key: "carbonContribution", value: `${s.eligibleInternalContributionTco2e.toFixed(3)} tCO₂e`, tone: "green" },
    { key: "carbonStock", value: `${s.carbonStockProxyTco2e.toFixed(2)} tCO₂e`, tone: "slate" },
    { key: "waterReuseAvoidance", value: `${s.waterReuseAvoidanceTotalLitres.toLocaleString("en-IN")} L`, tone: "blue" },
    { key: "costLeakage", value: `₹${s.costLeakageEstimateInr.toLocaleString("en-IN")}`, tone: "amber" },
  ].map((item) => ({ ...metricDefinitions[item.key], ...item, key: item.key }));
}

export function getRoleMetrics(role, periodKey = "30d", filters = {}) {
  if (role === ROLES.CEO) return getMetricCards(periodKey, filters);
  if (role === ROLES.ESG) return getESGReadiness(periodKey, filters).cards;
  if (role === ROLES.IFM) return getIFMExecutive(periodKey, filters).cards;
  return getPMExecutive(periodKey, filters).cards;
}

export function filterZones(data, { zoneId = "all", query = "", interventionOnly = false } = {}) {
  const normalizedQuery = query.trim().toLowerCase();
  return data.zones.filter((zone) => {
    const zoneMatch = zoneId === "all" || zone.id === zoneId;
    const queryMatch = !normalizedQuery || zone.name.toLowerCase().includes(normalizedQuery);
    const interventionMatch = !interventionOnly || zone.status === "Intervention";
    return zoneMatch && queryMatch && interventionMatch;
  });
}

export function filterInvestments(data, { zoneId = "all", priority = "all" } = {}) {
  return data.investments.filter((item) => {
    const zoneMatch = zoneId === "all" || item.zoneId === zoneId;
    const priorityMatch = priority === "all" || item.priority === priority;
    return zoneMatch && priorityMatch;
  });
}

export function filterTickets(data, { query = "", ticketStatus = "all", slaStatus = "all" } = {}) {
  const q = query.trim().toLowerCase();
  return data.tickets.filter((ticket) => {
    const queryMatch = !q || [ticket.id, ticket.zone, ticket.issue, ticket.owner, ticket.status]
      .join(" ")
      .toLowerCase()
      .includes(q);
    const statusMatch = ticketStatus === "all" || ticket.status === ticketStatus;
    const slaMatch = slaStatus === "all" || ticket.sla === slaStatus;
    return queryMatch && statusMatch && slaMatch;
  });
}

export function getBoardNarrative(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const s = data.summary;
  return [
    `Global Technology Park, Bengaluru is the first site in a proposed Mapletree India green asset intelligence rollout.`,
    `The asset currently sits at Level ${s.greenAssetMaturityLevel}/6: measurable green infrastructure intelligence exists, but external evidence maturity is not yet reached.`,
    `Green Infrastructure Value is ${s.greenInfrastructureValueScore}/100 with ${s.highRiskGreenZones} intervention zone${s.highRiskGreenZones === 1 ? "" : "s"} and ${s.recommendedInvestmentActions} recommended capital actions.`,
    `Water-to-Health is ${s.waterToHealthScore}/100, while water resilience remains the clearest quality gap and therefore the highest-value improvement lever.`,
    `Carbon remains supporting evidence only: ${s.carbonStockProxyTco2e.toFixed(2)} tCO₂e stock proxy and ${s.eligibleInternalContributionTco2e.toFixed(3)} tCO₂e/year eligible internal contribution estimate at ${data.evidenceLevel} evidence level.`,
  ];
}

export function getBoardDecisionMemo(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const s = data.summary;
  return {
    portfolioContext: "Global Technology Park, Bengaluru is the first site in a proposed Mapletree India green asset intelligence rollout.",
    recommendation: "Approve the Focused Resilience Programme as the pilot-to-scale capital pathway.",
    capitalAsk: "₹6.5L–₹10.6L",
    expectedOutcome: `Move the asset from ${s.greenInfrastructureValueScore}/100 toward 82/100 by addressing water resilience, heat comfort, and tenant-facing evidence.`,
    riskOfInaction: "Continued leakage in water-sensitive zones, weaker tenant differentiation, and delayed evidence maturity.",
    decisionRequired: "Approve pilot validation, capital envelope, and expert-review pathway.",
    pilotOutcome60Day: "At the 60-day scale review, management should have a repeatable site baseline, zone-level risk register, water-to-health proof, claim-safe ESG evidence pack, and a portfolio-comparable capital prioritisation view.",
    next60Days: [
      "Close water-linkage and photo-evidence gaps.",
      "Execute P1 adaptive-planting and shade-layer actions.",
      "Prepare an E1 expert-review-ready pack and tenant-facing green snapshot.",
    ],
  };
}

export function getESGReadiness(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const queue = filterMissingDataQueue(filters);
  const profile = data.zones.length === 1 ? getZoneProfile(data.zones[0].id) : null;
  const reportability = profile?.reportabilityReadiness ?? 62;
  const claimRisk = profile?.claimRiskExposure ?? "Moderate";
  return {
    cards: [
      { label: "Reportability Readiness", value: `${reportability}/100`, sub: data.scopeLabel === "Asset-wide" ? "Internal use; external claims restricted" : `${data.scopeLabel} scope`, tone: "blue" },
      { label: "Evidence Maturity", value: data.evidenceLevel, sub: "Internal model", tone: "amber" },
      { label: "Data Quality", value: `${data.summary.dataQualityScore}/100`, sub: "Operational completeness", tone: "purple" },
      { label: "Claim Risk Exposure", value: claimRisk, sub: "Carbon remains high-risk if overclaimed", tone: "amber" },
      { label: "E1 Upgrade Path", value: `${queue.length} gap${queue.length === 1 ? "" : "s"}`, sub: "Must close before expert review", tone: "green" },
    ],
    missingDataQueue: queue,
    claimUpgradePath: [
      { topic: "Carbon", current: "Internal estimate", upgrade: "Expert review + documented right-to-report", status: "Blocked for external claim" },
      { topic: "Nature", current: "Pilot readiness score", upgrade: "Species verification + external review", status: "Internal only" },
      { topic: "Water", current: "Operational index", upgrade: "Meter-level evidence + baseline sign-off", status: "Conditional" },
      { topic: "Financial", current: "Estimated leakage", upgrade: "Finance-approved cost model", status: "Conditional" },
    ],
  };
}

export function getDataQualityView(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const rows = data.dataQualityAll || data.dataQuality;
  const proofCoverage = Math.round(rows
    .filter((item) => ["Photo evidence", "Water linkage", "Maintenance history"].includes(item.area))
    .reduce((sum, item, _, arr) => sum + item.score / arr.length, 0));
  const strongest = [...rows].sort((a, b) => b.score - a.score)[0];
  const weakest = [...rows].sort((a, b) => a.score - b.score)[0];
  const exceptions = rows.filter((item) => item.status !== "Complete");
  return {
    cards: [
      { label: "Data Quality Score", value: `${data.summary.dataQualityScore}/100`, sub: data.scopeLabel, tone: "purple" },
      { label: "Proof Coverage", value: `${proofCoverage}/100`, sub: "Photo, water, maintenance proof", tone: "blue" },
      { label: "Strongest Dimension", value: strongest?.area || "—", sub: strongest ? `${strongest.score}/100` : "No data", tone: "green" },
      { label: "Weakest Dimension", value: weakest?.area || "—", sub: weakest ? `${weakest.score}/100` : "No data", tone: "amber" },
      { label: "Open Exceptions", value: `${exceptions.length}`, sub: "Rows below complete", tone: "red" },
    ],
    rows: data.dataQuality,
    allRows: rows,
    exceptions,
  };
}

export function getLeapExecutiveView(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  const stageDetails = data.leap.map((item) => {
    const detailMap = {
      Locate: {
        evidence: "Zone map, asset register, irrigation footprint",
        managementQuestion: "Do we know where every living asset sits?",
        nextAction: item.score >= 90 ? "Maintain register discipline" : "Close mapping gaps",
        reportingUse: "System of record",
      },
      Evaluate: {
        evidence: "Species mix, water logs, health scans, tenant visibility",
        managementQuestion: "What value and ecosystem signals exist?",
        nextAction: item.score >= 80 ? "Move to opportunity framing" : "Complete nature and water scoring",
        reportingUse: "Internal baseline",
      },
      Assess: {
        evidence: "Risk map, leakage watch, hotspot analysis",
        managementQuestion: "Where is risk or upside material?",
        nextAction: item.score >= 75 ? "Prioritise capital scenarios" : "Resolve material risk gaps",
        reportingUse: "Decision support",
      },
      Prepare: {
        evidence: "Evidence pack, claim boundary, upgrade path",
        managementQuestion: "What can be reported responsibly?",
        nextAction: item.score >= 75 ? "Prepare E1 review" : "Close missing proof before stronger claims",
        reportingUse: "Claim control",
      },
    };
    return { ...item, ...detailMap[item.stage] };
  });
  return {
    stages: stageDetails,
    materialSignals: [
      { title: "Strongest current asset", value: "Located green-asset register", detail: "The system of record is already mature enough to support downstream analysis." },
      { title: "Primary constraint", value: "Prepare remains weakest", detail: "The limiting factor is not mapping; it is claim-grade evidence continuity." },
      { title: "Highest-value next move", value: "Close water + photo proof gaps", detail: "This unlocks stronger readiness without overbuilding the model." },
    ],
  };
}

export function getIFMExecutive(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  return {
    cards: [
      { label: "SLA Integrity", value: `${data.summary.slaCompliance}%`, sub: "Service commitments met", tone: "green" },
      { label: "Open Risk Exposure", value: `${data.summary.openTickets}`, sub: "Unresolved work items", tone: "blue" },
      { label: "Repeat-Issue Burden", value: `${data.summary.repeatIssues}`, sub: "Root-cause repeats", tone: "amber" },
      { label: "Proof-of-Closure Rate", value: "92%", sub: "Photo-backed closures", tone: "green" },
      { label: "Client Escalation Watch", value: data.zones.some((zone) => zone.status === "Intervention") ? "1 zone" : "0 zones", sub: "Tenant-visible risk", tone: "amber" },
      { label: "QBR Readiness", value: "81/100", sub: "Executive pack completeness", tone: "purple" },
    ],
    escalationWatch: [
      { zone: "Podium Landscape", trigger: "Water stress + repeat corrective work", owner: "Irrigation Team", nextAction: "Close zoning correction with proof" },
      { zone: "Arrival Plaza", trigger: "Heat exposure in tenant-facing zone", owner: "Landscape Ops", nextAction: "Confirm shade-layer proposal" },
    ].filter((item) => data.scopeLabel === "Asset-wide" || data.zones.some((zone) => zone.name === item.zone || item.zone.includes(zone.name))),
    qbrTalkingPoints: [
      "One intervention zone remains; root cause is already isolated.",
      "SLA is in control, but proof quality varies by vendor.",
      "Focused resilience actions convert reactive work into preventive value.",
    ],
  };
}

export function getPMExecutive(periodKey = "30d", filters = {}) {
  const data = getFilteredSnapshot(periodKey, filters);
  return {
    cards: [
      { label: "Today’s Action Queue", value: `${data.summary.openTickets}`, sub: "Open operational tasks", tone: "blue" },
      { label: "Zones Needing Visit", value: `${Math.min(2, data.zones.length || 0)}`, sub: "Site attention today", tone: "amber" },
      { label: "Overdue Closures", value: `${data.tickets.filter((item) => item.sla === "Breached").length}`, sub: "Needs follow-up", tone: "red" },
      { label: "Water Stress Exceptions", value: `${data.water.filter((item) => item.status === "Watch").length}`, sub: "Irrigation watch", tone: "amber" },
    ],
    dailyActionQueue: [
      { zoneId: "zone_podium", priority: "P1", task: "Inspect Podium Landscape dry patch", reason: "Water-stress watch zone", owner: "Supervisor" },
      { zoneId: "zone_arrival", priority: "P1", task: "Follow up on Arrival Court irrigation leak closure", reason: "SLA breach", owner: "Vendor" },
      { zoneId: "zone_rooftop", priority: "P2", task: "Rescan Rooftop Terrace pruning line", reason: "Closure proof pending", owner: "Gardener" },
    ].filter((item) => data.activeFilters.zoneId === "all" || item.zoneId === data.activeFilters.zoneId),
    zoneVisitQueue: [
      { zoneId: "zone_podium", zone: "Podium Landscape", reason: "High-risk + water-stress", lastProof: "2 days ago" },
      { zoneId: "zone_arrival", zone: "Arrival Plaza", reason: "Tenant-facing + SLA breach", lastProof: "Pending closure" },
    ].filter((item) => data.activeFilters.zoneId === "all" || item.zoneId === data.activeFilters.zoneId),
  };
}

export function getAiActions(role) {
  return AI_ACTIONS[role] || AI_ACTIONS[ROLES.CEO];
}

export function buildAiPayload(role, view, periodKey, filters, task = "") {
  const data = getFilteredSnapshot(periodKey, filters);
  return {
    role,
    view,
    task,
    period: data.period,
    scope: data.scopeLabel,
    filters: data.activeFilters,
    methodVersion: METHOD_VERSION,
    claimStatus: data.claimStatus,
    evidenceLevel: data.evidenceLevel,
    summary: data.summary,
    zones: data.zones,
    dataQuality: data.dataQuality,
    claims: data.claims,
    investments: data.investments,
    tickets: data.tickets,
    boardMemo: getBoardDecisionMemo(periodKey, filters),
    esg: getESGReadiness(periodKey, filters),
    dataQualityView: getDataQualityView(periodKey, filters),
    leap: getLeapExecutiveView(periodKey, filters),
    ifm: getIFMExecutive(periodKey, filters),
    propertyManager: getPMExecutive(periodKey, filters),
  };
}

export { metricDefinitions, DEFAULT_FILTERS };
