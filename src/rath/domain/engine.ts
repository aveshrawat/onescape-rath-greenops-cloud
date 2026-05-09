export const METHOD_VERSION = "RATH-GII-v0.3";

export type EvidenceLevel = "E0" | "E1" | "E2" | "E3";
export type ReportingRight = "Confirmed" | "Unclear" | "Not Granted";
export type HealthCondition = "Healthy" | "Average" | "Stressed" | "Critical";
export type AssetType =
  | "Indoor Plant"
  | "Tree"
  | "Palm"
  | "Shrub"
  | "Hedge"
  | "Lawn"
  | "Groundcover"
  | "Green Wall"
  | "Vertical Garden";

type RiskStatus = "Stable" | "Watch" | "Intervention";

export interface GreenAsset {
  assetId: string;
  siteId: string;
  zoneId: string;
  assetType: AssetType;
  speciesCommonName: string;
  nativeStatus: "Native" | "Adaptive" | "Exotic" | "Invasive" | "Unknown";
  quantity: number;
  healthCondition: HealthCondition;
  reportingRight: ReportingRight;
  evidenceLevel: EvidenceLevel;
}

const sum = (values: number[]) => values.reduce((acc, value) => acc + (Number.isFinite(value) ? value : 0), 0);
const safeDiv = (n: number, d: number, fallback = 0) => (Number.isFinite(n) && Number.isFinite(d) && d !== 0 ? n / d : fallback);

const HealthScore: Record<HealthCondition, number> = {
  Healthy: 90,
  Average: 65,
  Stressed: 35,
  Critical: 5,
};

export const demoAssets: GreenAsset[] = [
  { assetId: "GAU-TR-001", siteId: "site_pilot", zoneId: "zone_spine", assetType: "Tree", speciesCommonName: "Rain Tree", nativeStatus: "Adaptive", quantity: 18, healthCondition: "Healthy", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-TR-002", siteId: "site_pilot", zoneId: "zone_arrival", assetType: "Tree", speciesCommonName: "Tabebuia Rosea", nativeStatus: "Adaptive", quantity: 9, healthCondition: "Average", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-PL-001", siteId: "site_pilot", zoneId: "zone_arrival", assetType: "Palm", speciesCommonName: "Foxtail Palm", nativeStatus: "Exotic", quantity: 12, healthCondition: "Healthy", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-SH-001", siteId: "site_pilot", zoneId: "zone_spine", assetType: "Shrub", speciesCommonName: "Mixed Adaptive Shrubs", nativeStatus: "Adaptive", quantity: 1, healthCondition: "Healthy", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-LN-001", siteId: "site_pilot", zoneId: "zone_podium", assetType: "Lawn", speciesCommonName: "Mexican Grass", nativeStatus: "Exotic", quantity: 1, healthCondition: "Average", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-BIO-001", siteId: "site_pilot", zoneId: "zone_bio", assetType: "Shrub", speciesCommonName: "Native Flowering Mix", nativeStatus: "Native", quantity: 1, healthCondition: "Healthy", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-IN-001", siteId: "site_pilot", zoneId: "zone_indoor", assetType: "Indoor Plant", speciesCommonName: "Areca Palm", nativeStatus: "Exotic", quantity: 24, healthCondition: "Healthy", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-IN-002", siteId: "site_pilot", zoneId: "zone_indoor", assetType: "Indoor Plant", speciesCommonName: "Aglaonema Mix", nativeStatus: "Exotic", quantity: 62, healthCondition: "Average", reportingRight: "Confirmed", evidenceLevel: "E0" },
];

export const demoSnapshot = {
  snapshotId: "snap_site_pilot_2026_05_RATH_GII_v03",
  clientId: "client_demo",
  siteId: "site_pilot",
  period: "2026-05",
  methodVersion: METHOD_VERSION,
  totalGreenAssets: 128,
  carbonStockEstimateKgCo2e: 50143,
  annualSequestrationProxyKgCo2e: 732,
  eligibleInternalContributionKgCo2e: 183,
  externalCreditDependencyPlanningTco2e: 999.817,
  waterReusedLitres: 37700,
  freshwaterAvoidedLitres: 37700,
  natureReadinessScore10: 7.6,
  leapReadinessScore100: 82,
  leapReadinessStatus: "Advanced",
  waterToHealthIndex100: 81,
  costLeakageEstimateInr: 8800,
  tenantEngagementScore100: 62,
  dataQualityScore100: 82,
  greenAssetMaturityLevel: 4,
  highRiskZoneCount: 1,
  p1InvestmentActionCount: 3,
  evidenceLevel: "E0" as EvidenceLevel,
  claimStatus: "Restricted" as const,
  generatedAt: new Date().toISOString(),
  details: {
    nature: {
      score100: 76,
      score10: 7.6,
      components: {
        nativeAdaptiveShare: 16,
        speciesDiversity: 9,
        pollinatorSupport: 12,
        canopyAndStrata: 13,
        habitatPotential: 10,
        waterResilience: 6,
        healthStability: 8,
        riskPenaltyControl: 2,
      },
      flags: ["Low water-resilience mix.", "Some exotic-heavy zones require adaptive species improvement."],
    },
    riskMap: [
      {
        zoneId: "zone_podium",
        zoneName: "Podium Lawn",
        healthRisk: 35,
        waterStressRisk: 62,
        heatExposureRisk: 55,
        natureWeaknessRisk: 42,
        recurringFailureRisk: 55,
        dataGapRisk: 28,
        zoneRiskScore100: 55,
        strategicPriorityScore100: 79,
        status: "Intervention" as RiskStatus,
        recommendedAction: "Replace high-water lawn pockets with adaptive planting and irrigation zoning.",
        tenantVisibility: "High" as const,
      },
      {
        zoneId: "zone_arrival",
        zoneName: "Main Arrival Court",
        healthRisk: 24,
        waterStressRisk: 32,
        heatExposureRisk: 85,
        natureWeaknessRisk: 36,
        recurringFailureRisk: 38,
        dataGapRisk: 18,
        zoneRiskScore100: 41,
        strategicPriorityScore100: 58,
        status: "Watch" as RiskStatus,
        recommendedAction: "Add shade and soil-moisture governance at arrival corridor.",
        tenantVisibility: "High" as const,
      },
      {
        zoneId: "zone_spine",
        zoneName: "Pedestrian Spine",
        healthRisk: 12,
        waterStressRisk: 24,
        heatExposureRisk: 85,
        natureWeaknessRisk: 28,
        recurringFailureRisk: 18,
        dataGapRisk: 12,
        zoneRiskScore100: 30,
        strategicPriorityScore100: 42,
        status: "Stable" as RiskStatus,
        recommendedAction: "Maintain current governance cadence and upgrade tenant-facing story cards.",
        tenantVisibility: "High" as const,
      },
      {
        zoneId: "zone_bio",
        zoneName: "Biodiversity Pocket",
        healthRisk: 10,
        waterStressRisk: 38,
        heatExposureRisk: 25,
        natureWeaknessRisk: 18,
        recurringFailureRisk: 8,
        dataGapRisk: 34,
        zoneRiskScore100: 24,
        strategicPriorityScore100: 32,
        status: "Stable" as RiskStatus,
        recommendedAction: "Add water linkage evidence and convert into green trail point.",
        tenantVisibility: "High" as const,
      },
    ],
    waterToHealth: [
      { zoneId: "zone_spine", waterIntensityLitresPerSqm: 29, recycledWaterShare: 1, freshwaterAvoidedShare: 0.76, avgZoneHealthScore: 89, waterToHealthIndex100: 88, status: "Efficient" as const, flags: [] },
      { zoneId: "zone_podium", waterIntensityLitresPerSqm: 28, recycledWaterShare: 1, freshwaterAvoidedShare: 1, avgZoneHealthScore: 65, waterToHealthIndex100: 72, status: "Watch" as const, flags: ["Overwatering risk flagged."] },
      { zoneId: "zone_indoor", waterIntensityLitresPerSqm: 5, recycledWaterShare: 0.64, freshwaterAvoidedShare: 0.42, avgZoneHealthScore: 72, waterToHealthIndex100: 82, status: "Efficient" as const, flags: [] },
      { zoneId: "zone_arrival", waterIntensityLitresPerSqm: 32, recycledWaterShare: 1, freshwaterAvoidedShare: 0.84, avgZoneHealthScore: 79, waterToHealthIndex100: 82, status: "Efficient" as const, flags: [] },
    ],
    dataQuality: [
      { zoneId: "zone_spine", score100: 88, status: "Report-ready" as const, missing: [] },
      { zoneId: "zone_arrival", score100: 84, status: "Report-ready" as const, missing: ["species confirmation"] },
      { zoneId: "zone_podium", score100: 70, status: "Usable" as const, missing: ["maintenance history"] },
      { zoneId: "zone_bio", score100: 74, status: "Usable" as const, missing: ["water linkage"] },
      { zoneId: "zone_indoor", score100: 72, status: "Usable" as const, missing: ["photo evidence"] },
    ],
    costLeakage: {
      totalLeakageInr: 8800,
      replacementLeakageInr: 0,
      repeatedIssueLeakageInr: 1800,
      slaLeakageInr: 1200,
      waterInefficiencyLeakageInr: 600,
      correctiveWorkLeakageInr: 5200,
      topLeakageZones: [
        { zoneId: "zone_arrival", leakageInr: 3400 },
        { zoneId: "zone_podium", leakageInr: 2100 },
      ],
      flags: ["SLA breach leakage detected.", "Repeated issue leakage detected."],
    },
    maturityPathway: {
      currentLevel: 4,
      targetLevel: 6,
      currentLabel: "Nature-readiness indicators",
      nextLabel: "Tenant-facing green intelligence",
      levels: [
        { level: 0, label: "Decorative landscape", achieved: true, score: 100 },
        { level: 1, label: "Mapped green asset inventory", achieved: true, score: 100 },
        { level: 2, label: "Health + maintenance governance", achieved: true, score: 78 },
        { level: 3, label: "Water-linked performance", achieved: true, score: 81 },
        { level: 4, label: "Nature-readiness indicators", achieved: true, score: 76 },
        { level: 5, label: "Tenant-facing green intelligence", achieved: false, score: 62 },
        { level: 6, label: "Third-party-reviewed ESG-ready evidence", achieved: false, score: 0 },
      ],
    },
    evidenceFunnel: [
      { stage: "Total green zones", count: 5, percentOfTotal: 100 },
      { stage: "Mapped zones", count: 5, percentOfTotal: 100 },
      { stage: "Species-verified zones", count: 4, percentOfTotal: 80 },
      { stage: "Health-scanned zones", count: 5, percentOfTotal: 100 },
      { stage: "Water-linked zones", count: 4, percentOfTotal: 80 },
      { stage: "Photo-evidenced zones", count: 4, percentOfTotal: 80 },
      { stage: "E1-ready zones", count: 2, percentOfTotal: 40 },
      { stage: "Executive-reportable zones", count: 4, percentOfTotal: 80 },
    ],
    tenantPack: {
      totalQrScans: 348,
      engagementScore100: 62,
      mostEngagedZones: [
        { zoneId: "zone_spine", scans: 132 },
        { zoneId: "zone_arrival", scans: 96 },
      ],
      storyCards: [
        { zoneId: "zone_arrival", title: "Main Arrival Court Green Asset Snapshot", body: "Tenant-facing green asset zone with water and nature-readiness tracking." },
      ],
      recommendedTenantMessages: [
        "Campus greenery is being converted into a measurable green asset register.",
        "Landscape water use is linked to health outcomes, not just consumption.",
      ],
    },
    investmentPlanner: {
      totalLowInr: 720000,
      totalHighInr: 1200000,
      p1Count: 3,
      actions: [
        {
          actionId: "ACT-002",
          siteId: "site_pilot",
          zoneId: "zone_podium",
          actionName: "Replace high-water lawn pockets with adaptive planting",
          actionType: "Water",
          costLowInr: 180000,
          costHighInr: 320000,
          riskReductionImpact: "High",
          waterImpact: "High",
          natureImpact: "Medium",
          tenantImpact: "Medium",
          evidenceUplift: "Medium",
          feasibility: "High",
          status: "Recommended",
          avgCostInr: 250000,
          priorityScore100: 82,
          priority: "P1" as const,
          valueNarrative: "High-priority action with strong water, risk, and operating value.",
        },
        {
          actionId: "ACT-001",
          siteId: "site_pilot",
          zoneId: "zone_spine",
          actionName: "Add shade tree layer near pedestrian spine",
          actionType: "Resilience",
          costLowInr: 350000,
          costHighInr: 520000,
          riskReductionImpact: "High",
          waterImpact: "Medium",
          natureImpact: "High",
          tenantImpact: "High",
          evidenceUplift: "Medium",
          feasibility: "Medium",
          status: "Recommended",
          avgCostInr: 435000,
          priorityScore100: 79,
          priority: "P1" as const,
          valueNarrative: "High-priority action with tenant and resilience value.",
        },
        {
          actionId: "ACT-003",
          siteId: "site_pilot",
          zoneId: "zone_bio",
          actionName: "Build tenant-facing biodiversity pocket",
          actionType: "Nature",
          costLowInr: 120000,
          costHighInr: 220000,
          riskReductionImpact: "Medium",
          waterImpact: "Low",
          natureImpact: "High",
          tenantImpact: "High",
          evidenceUplift: "High",
          feasibility: "High",
          status: "Approved",
          avgCostInr: 170000,
          priorityScore100: 76,
          priority: "P1" as const,
          valueNarrative: "High-priority tenant and nature engagement action.",
        },
      ],
    },
    claims: [
      { kpi: "nature_readiness", allowedLabel: "Pilot-level nature-readiness score", prohibitedLabel: "Certified biodiversity or TNFD score", claimStatus: "Restricted" as const, reason: "E0 internal model." },
      { kpi: "water_to_health", allowedLabel: "Water-to-health efficiency index", prohibitedLabel: "Certified water credit", claimStatus: "Restricted" as const, reason: "E0 internal model." },
      { kpi: "credit_dependency_planning", allowedLabel: "External credit dependency planning estimate", prohibitedLabel: "Carbon credits reduced or generated", claimStatus: "Restricted" as const, reason: "E0 internal model." },
    ],
    itsm: {
      totalTickets: 4,
      openTickets: 2,
      closedTickets: 2,
      slaCompliancePct: 75,
      repeatIssueCount: 2,
      topIssueZones: [{ zoneId: "zone_arrival", count: 1 }],
      healthImprovementEvents: 2,
    },
  },
};

export function selectCeoDashboard(snapshot: typeof demoSnapshot) {
  return {
    greenAssetMaturityLevel: snapshot.greenAssetMaturityLevel,
    natureReadinessScore10: snapshot.natureReadinessScore10,
    waterToHealthIndex100: snapshot.waterToHealthIndex100,
    highRiskZoneCount: snapshot.highRiskZoneCount,
    dataQualityScore100: snapshot.dataQualityScore100,
    evidenceLevel: snapshot.evidenceLevel,
    p1InvestmentActionCount: snapshot.p1InvestmentActionCount,
    internalGreenAssetContributionTco2e: snapshot.eligibleInternalContributionKgCo2e / 1000,
    carbonStockEstimateTco2e: snapshot.carbonStockEstimateKgCo2e / 1000,
    annualSequestrationProxyTco2e: snapshot.annualSequestrationProxyKgCo2e / 1000,
    externalCreditDependencyPlanningTco2e: snapshot.externalCreditDependencyPlanningTco2e,
    waterReusedLitres: snapshot.waterReusedLitres,
    freshwaterAvoidedLitres: snapshot.freshwaterAvoidedLitres,
    leapReadinessScore100: snapshot.leapReadinessScore100,
    leapReadinessStatus: snapshot.leapReadinessStatus,
    costLeakageEstimateInr: snapshot.costLeakageEstimateInr,
    tenantEngagementScore100: snapshot.tenantEngagementScore100,
    claimStatus: snapshot.claimStatus,
    methodVersion: snapshot.methodVersion,
  };
}

export function selectExecutiveNarrative(snapshot: typeof demoSnapshot): string[] {
  const dashboard = selectCeoDashboard(snapshot);
  return [
    `The pilot asset has ${snapshot.totalGreenAssets} registered green assets across mapped zones.`,
    `Current green asset maturity is Level ${dashboard.greenAssetMaturityLevel}/6, with the next target being ${snapshot.details.maturityPathway.nextLabel}.`,
    `Nature-readiness is ${dashboard.natureReadinessScore10.toFixed(1)}/10 and water-to-health efficiency is ${dashboard.waterToHealthIndex100.toFixed(0)}/100.`,
    `There are ${dashboard.highRiskZoneCount} intervention zones and ${dashboard.p1InvestmentActionCount} P1 green infrastructure actions in the current plan.`,
    `Carbon figures remain supporting estimates: ${dashboard.carbonStockEstimateTco2e.toFixed(2)} tCO₂e stock proxy and ${dashboard.annualSequestrationProxyTco2e.toFixed(3)} tCO₂e/year annual sequestration proxy at ${snapshot.evidenceLevel}.`,
  ];
}
