export type EvidenceLevel = "E0" | "E1" | "E2" | "E3";
export type ReportingRight = "Confirmed" | "Unclear" | "Not Granted";
export type HealthCondition = "Healthy" | "Average" | "Stressed" | "Critical";
export type LightCondition = "Poor" | "Moderate" | "Good" | "Strong";
export type NativeStatus = "Native" | "Adaptive" | "Exotic" | "Invasive" | "Unknown";
export type MaturityStage = "Young" | "Semi-Mature" | "Mature" | "Old" | "Stressed";
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

export type WaterSource = "STP" | "HVAC Condensate" | "Potable" | "Tanker" | "Rainwater" | "Mixed";
export type MeasurementMethod = "Meter" | "Flow Test" | "Manual Log" | "Estimate";
export type TicketStatus = "Open" | "Assigned" | "In Progress" | "Evidence Uploaded" | "Review" | "Closed" | "Reopened";
export type Priority = "P1" | "P2" | "P3";

export interface Client { clientId: string; clientName: string; }
export interface Site {
  siteId: string;
  clientId: string;
  siteName: string;
  city: string;
  reportingPeriod: string;
  targetCarbonGapTco2e?: number;
  operationalFootprintKgCo2e?: number;
}
export interface Zone {
  zoneId: string;
  siteId: string;
  zoneName: string;
  isTenantFacing?: boolean;
  isHighFootfall?: boolean;
  isWaterSensitive?: boolean;
  isCriticalLandscape?: boolean;
}
export interface GreenAsset {
  assetId: string;
  siteId: string;
  zoneId: string;
  assetType: AssetType;
  speciesCommonName: string;
  speciesBotanicalName?: string;
  nativeStatus: NativeStatus;
  quantity: number;
  tier?: "T1" | "T2" | "T3";
  lightCondition?: LightCondition;
  girthCm?: number;
  heightM?: number;
  canopySpreadM?: number;
  woodDensity?: number;
  maturityStage?: MaturityStage;
  biomassKg?: number;
  areaSqm?: number;
  floweringOrPollinatorSupport?: boolean;
  canopyLayerPresent?: boolean;
  shrubLayerPresent?: boolean;
  groundcoverLayerPresent?: boolean;
  habitatFeaturePresent?: boolean;
  chemicalSensitivity?: "Low" | "Medium" | "High";
  monocultureRisk?: "Low" | "Medium" | "High";
  deadZoneRisk?: "Low" | "Medium" | "High";
  healthCondition: HealthCondition;
  waterDemandProfile?: "Low" | "Medium" | "High";
  ownershipStatus?: "Client Owned" | "Vendor Owned" | "Mixed";
  reportingRight: ReportingRight;
  evidenceLevel: EvidenceLevel;
  lastVerifiedDate?: string;
  replacementCostInr?: number;
}
export interface WaterEvent {
  eventId: string;
  siteId: string;
  zoneId: string;
  source: WaterSource;
  measurementMethod: MeasurementMethod;
  greenAreaSqm: number;
  baselineLitres: number;
  actualLitres: number;
  reusedLitres: number;
  freshwaterAvoidedLitres: number;
  stressFlags?: number;
  overwateringFlag?: boolean;
  underwateringFlag?: boolean;
}
export interface ItsmTicket {
  ticketId: string;
  siteId: string;
  zoneId: string;
  assetId?: string;
  issueType: string;
  priority: Priority;
  status: TicketStatus;
  createdAt: string;
  closedAt?: string;
  slaBreached: boolean;
  reopenCount: number;
  healthBefore?: HealthCondition;
  healthAfter?: HealthCondition;
  rootCause?: "Water" | "Light" | "Species mismatch" | "Pest" | "Vendor delay" | "Wear and tear" | "Unknown";
  estimatedCorrectiveCostInr?: number;
}
export interface TenantEngagementEvent {
  eventId: string;
  siteId: string;
  zoneId: string;
  tenantId?: string;
  qrScans: number;
  feedbackCount?: number;
  positiveFeedbackCount?: number;
  storyCardPublished?: boolean;
  natureTrailPoint?: boolean;
}

export const METHOD_VERSION = "RATH-IGACC-v0.1";
export const EvidenceConfidence: Record<EvidenceLevel, number> = { E0: 0.25, E1: 0.55, E2: 0.8, E3: 1.0 };
export const ReportingRightFactor: Record<ReportingRight, number> = { Confirmed: 1.0, Unclear: 0.5, "Not Granted": 0 };
export const HealthMultiplier: Record<HealthCondition, number> = { Healthy: 1.0, Average: 0.7, Stressed: 0.3, Critical: 0 };
export const HealthScore: Record<HealthCondition, number> = { Healthy: 90, Average: 65, Stressed: 35, Critical: 5 };
export const LightMultiplier: Record<LightCondition, number> = { Poor: 0.25, Moderate: 0.5, Good: 0.75, Strong: 1.0 };

export const CarbonConstants = {
  carbonFractionOfDryBiomass: 0.47,
  co2ToCarbonMassRatio: 44 / 12,
  defaultWoodDensity: 0.55,
  operationalFootprintDefaultKgCo2e: 0,
};
export const IndoorAnnualDryBiomassGrowthKg: Record<"T1" | "T2" | "T3", number> = { T1: 0.2, T2: 0.08, T3: 0.025 };
export const TreeGrowthRateByMaturity: Record<MaturityStage, number> = { Young: 0.04, "Semi-Mature": 0.02, Mature: 0.01, Old: 0.005, Stressed: 0 };
export const PalmGrowthRateByMaturity: Record<MaturityStage, number> = { Young: 0.03, "Semi-Mature": 0.015, Mature: 0.005, Old: 0.003, Stressed: 0 };
export const AreaAssetAnnualCo2eKgPerSqm: Partial<Record<AssetType, number>> = {
  Shrub: 0.35,
  Hedge: 0.45,
  Lawn: 0.08,
  Groundcover: 0.12,
  "Green Wall": 0.25,
  "Vertical Garden": 0.22,
};
export const CostDefaults = {
  slaBreachCostInr: 1200,
  repeatedIssueCostInr: 900,
  vendorDelayCostInrPerTicket: 700,
  waterCostPerLitreInr: 0.08,
  correctiveWorkDefaultInr: 1500,
  defaultReplacementCostInr: 450,
};

export function clamp(value: number, min = 0, max = 1): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
export function safeDiv(numerator: number, denominator: number, fallback = 0): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return fallback;
  return numerator / denominator;
}
export function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + (Number.isFinite(v) ? v : 0), 0);
}
export function byZone<T extends { zoneId: string }>(items: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const existing = map.get(item.zoneId) ?? [];
    existing.push(item);
    map.set(item.zoneId, existing);
  }
  return map;
}

export interface EvidenceContext {
  evidenceLevel: EvidenceLevel;
  reportingRight: ReportingRight;
  methodVersion: string;
  confidenceFactor: number;
  reportingRightFactor: number;
  certificationStatus: "Not Certified" | "Expert Reviewed" | "Third-party Reviewed" | "Auditor Accepted";
}
export function getEvidenceContext(evidenceLevel: EvidenceLevel, reportingRight: ReportingRight): EvidenceContext {
  const certificationStatus: EvidenceContext["certificationStatus"] =
    evidenceLevel === "E3" ? "Auditor Accepted" :
    evidenceLevel === "E2" ? "Third-party Reviewed" :
    evidenceLevel === "E1" ? "Expert Reviewed" : "Not Certified";
  return { evidenceLevel, reportingRight, methodVersion: METHOD_VERSION, confidenceFactor: EvidenceConfidence[evidenceLevel], reportingRightFactor: ReportingRightFactor[reportingRight], certificationStatus };
}

export type KpiType = "carbon_stock" | "annual_sequestration" | "credit_dependency_planning" | "biodiversity_readiness" | "water_to_health" | "cost_leakage" | "tenant_engagement";
export interface ClaimDecision {
  kpi: KpiType;
  allowedLabel: string;
  prohibitedLabel: string;
  claimStatus: "Allowed" | "Restricted" | "Blocked";
  reason: string;
}
export function getClaimDecision(kpi: KpiType, evidenceLevel: EvidenceLevel): ClaimDecision {
  const lowEvidence = evidenceLevel === "E0" || evidenceLevel === "E1";
  const matrix: Record<KpiType, Omit<ClaimDecision, "kpi" | "claimStatus" | "reason">> = {
    carbon_stock: { allowedLabel: "Estimated internal carbon stock proxy", prohibitedLabel: "Certified carbon stock" },
    annual_sequestration: { allowedLabel: "Indicative annual sequestration proxy", prohibitedLabel: "Guaranteed carbon removal" },
    credit_dependency_planning: { allowedLabel: "External credit dependency planning estimate", prohibitedLabel: "Carbon credits reduced or generated" },
    biodiversity_readiness: { allowedLabel: "Internal biodiversity-readiness score", prohibitedLabel: "Certified biodiversity value" },
    water_to_health: { allowedLabel: "Water-to-health efficiency index", prohibitedLabel: "Certified water credit or guaranteed water saving" },
    cost_leakage: { allowedLabel: "Estimated cost leakage / savings opportunity", prohibitedLabel: "Guaranteed savings" },
    tenant_engagement: { allowedLabel: "Tenant green engagement evidence", prohibitedLabel: "Employee productivity proof" },
  };
  const base = matrix[kpi];
  return {
    kpi,
    ...base,
    claimStatus: lowEvidence ? "Restricted" : "Allowed",
    reason: lowEvidence
      ? "E0/E1 outputs are for internal planning and pilot-stage reporting only. Certified or guaranteed claims are blocked."
      : "Higher maturity evidence allows stronger language, subject to final legal/auditor review.",
  };
}

export interface CarbonResult {
  assetId: string;
  assetType: AssetType;
  carbonStockKgCo2e: number;
  annualSequestrationProxyKgCo2e: number;
  healthAdjustedAnnualSequestrationKgCo2e: number;
  eligibleAnnualContributionKgCo2e: number;
  evidence: EvidenceContext;
  methodNotes: string[];
}

export function dbhCmFromGirthCm(girthCm: number): number {
  return safeDiv(girthCm, Math.PI, 0);
}
export function estimateTreeAboveGroundBiomassKg(asset: GreenAsset): number {
  const dbhCm = Math.max(dbhCmFromGirthCm(asset.girthCm ?? 0), 1);
  const rho = asset.woodDensity ?? CarbonConstants.defaultWoodDensity;
  const lnD = Math.log(dbhCm);
  return rho * Math.exp(-1.499 + 2.148 * lnD + 0.207 * Math.pow(lnD, 2) - 0.0281 * Math.pow(lnD, 3)) * asset.quantity;
}
export function biomassKgToCo2eKg(biomassKg: number): number {
  return biomassKg * CarbonConstants.carbonFractionOfDryBiomass * CarbonConstants.co2ToCarbonMassRatio;
}
export function calculateIndoorCarbon(asset: GreenAsset): CarbonResult {
  const tier = asset.tier ?? "T2";
  const dryBiomassGrowthKg = IndoorAnnualDryBiomassGrowthKg[tier] * asset.quantity;
  const grossAnnualKgCo2e = biomassKgToCo2eKg(dryBiomassGrowthKg);
  const lightFactor = LightMultiplier[asset.lightCondition ?? "Moderate"];
  const healthFactor = HealthMultiplier[asset.healthCondition];
  const evidence = getEvidenceContext(asset.evidenceLevel, asset.reportingRight);
  const healthAdjusted = grossAnnualKgCo2e * lightFactor * healthFactor;
  return {
    assetId: asset.assetId,
    assetType: asset.assetType,
    carbonStockKgCo2e: 0,
    annualSequestrationProxyKgCo2e: grossAnnualKgCo2e,
    healthAdjustedAnnualSequestrationKgCo2e: healthAdjusted,
    eligibleAnnualContributionKgCo2e: healthAdjusted * evidence.confidenceFactor * evidence.reportingRightFactor,
    evidence,
    methodNotes: ["Indoor potted plant contribution is an indicative annual biomass-growth proxy.", "Light and health multipliers are applied.", "Carbon stock is not claimed for indoor potted plants in v0.1."],
  };
}
export function calculateTreeCarbon(asset: GreenAsset): CarbonResult {
  const agbKg = estimateTreeAboveGroundBiomassKg(asset);
  const maturity = asset.maturityStage ?? "Mature";
  const growthRate = TreeGrowthRateByMaturity[maturity];
  const stockKgCo2e = biomassKgToCo2eKg(agbKg);
  const grossAnnualKgCo2e = biomassKgToCo2eKg(agbKg * growthRate);
  const healthAdjusted = grossAnnualKgCo2e * HealthMultiplier[asset.healthCondition];
  const evidence = getEvidenceContext(asset.evidenceLevel, asset.reportingRight);
  return {
    assetId: asset.assetId,
    assetType: asset.assetType,
    carbonStockKgCo2e: stockKgCo2e,
    annualSequestrationProxyKgCo2e: grossAnnualKgCo2e,
    healthAdjustedAnnualSequestrationKgCo2e: healthAdjusted,
    eligibleAnnualContributionKgCo2e: healthAdjusted * evidence.confidenceFactor * evidence.reportingRightFactor,
    evidence,
    methodNotes: ["Tree carbon stock uses pilot-level above-ground biomass proxy from girth/DBH and wood density.", "Annual sequestration proxy uses maturity-stage growth rate and health adjustment.", "Below-ground biomass and soil carbon are excluded in v0.1 for conservatism."],
  };
}
export function calculatePalmCarbon(asset: GreenAsset): CarbonResult {
  const biomassKg = (asset.biomassKg ?? 80) * asset.quantity;
  const maturity = asset.maturityStage ?? "Mature";
  const growthRate = PalmGrowthRateByMaturity[maturity];
  const stockKgCo2e = biomassKgToCo2eKg(biomassKg);
  const grossAnnualKgCo2e = biomassKgToCo2eKg(biomassKg * growthRate);
  const healthAdjusted = grossAnnualKgCo2e * HealthMultiplier[asset.healthCondition];
  const evidence = getEvidenceContext(asset.evidenceLevel, asset.reportingRight);
  return {
    assetId: asset.assetId,
    assetType: asset.assetType,
    carbonStockKgCo2e: stockKgCo2e,
    annualSequestrationProxyKgCo2e: grossAnnualKgCo2e,
    healthAdjustedAnnualSequestrationKgCo2e: healthAdjusted,
    eligibleAnnualContributionKgCo2e: healthAdjusted * evidence.confidenceFactor * evidence.reportingRightFactor,
    evidence,
    methodNotes: ["Palms use a separate biomass stock proxy because palm architecture differs from branching trees.", "Annual sequestration proxy uses maturity-stage palm growth rates."],
  };
}
export function calculateAreaAssetCarbon(asset: GreenAsset): CarbonResult {
  const areaSqm = asset.areaSqm ?? 0;
  const annualPerSqm = AreaAssetAnnualCo2eKgPerSqm[asset.assetType] ?? 0;
  const grossAnnualKgCo2e = areaSqm * annualPerSqm;
  const healthAdjusted = grossAnnualKgCo2e * HealthMultiplier[asset.healthCondition];
  const evidence = getEvidenceContext(asset.evidenceLevel, asset.reportingRight);
  return {
    assetId: asset.assetId,
    assetType: asset.assetType,
    carbonStockKgCo2e: 0,
    annualSequestrationProxyKgCo2e: grossAnnualKgCo2e,
    healthAdjustedAnnualSequestrationKgCo2e: healthAdjusted,
    eligibleAnnualContributionKgCo2e: healthAdjusted * evidence.confidenceFactor * evidence.reportingRightFactor,
    evidence,
    methodNotes: ["Area assets use conservative area-based annual contribution factors.", "Lawns and groundcovers are short-cycle biomass and carry lower confidence.", "Soil carbon is excluded in v0.1 unless physical sampling exists."],
  };
}
export function calculateAssetCarbon(asset: GreenAsset): CarbonResult {
  switch (asset.assetType) {
    case "Indoor Plant": return calculateIndoorCarbon(asset);
    case "Tree": return calculateTreeCarbon(asset);
    case "Palm": return calculatePalmCarbon(asset);
    default: return calculateAreaAssetCarbon(asset);
  }
}
export interface SiteCarbonSummary {
  carbonStockKgCo2e: number;
  grossAnnualSequestrationKgCo2e: number;
  netAnnualSequestrationKgCo2e: number;
  eligibleAnnualContributionKgCo2e: number;
  operationalFootprintDeductedKgCo2e: number;
  byAsset: CarbonResult[];
}
export function calculateSiteCarbonSummary(site: Site, assets: GreenAsset[]): SiteCarbonSummary {
  const byAsset = assets.filter((a) => a.siteId === site.siteId).map(calculateAssetCarbon);
  const stock = sum(byAsset.map((r) => r.carbonStockKgCo2e));
  const grossAnnual = sum(byAsset.map((r) => r.healthAdjustedAnnualSequestrationKgCo2e));
  const operational = site.operationalFootprintKgCo2e ?? CarbonConstants.operationalFootprintDefaultKgCo2e;
  const netAnnual = Math.max(grossAnnual - operational, 0);
  const eligibleBeforeOperational = sum(byAsset.map((r) => r.eligibleAnnualContributionKgCo2e));
  const operationalDiscountRatio = grossAnnual > 0 ? netAnnual / grossAnnual : 0;
  return {
    carbonStockKgCo2e: stock,
    grossAnnualSequestrationKgCo2e: grossAnnual,
    netAnnualSequestrationKgCo2e: netAnnual,
    eligibleAnnualContributionKgCo2e: eligibleBeforeOperational * operationalDiscountRatio,
    operationalFootprintDeductedKgCo2e: operational,
    byAsset,
  };
}

export interface BiodiversityScoreResult { score100: number; score10: number; components: Record<string, number>; flags: string[]; }
export function calculateBiodiversityReadiness(assets: GreenAsset[]): BiodiversityScoreResult {
  const validAssets = assets.filter((a) => a.assetType !== "Indoor Plant");
  const totalQty = Math.max(sum(validAssets.map((a) => a.quantity)), 1);
  const uniqueSpecies = new Set(validAssets.map((a) => a.speciesCommonName.toLowerCase())).size;
  const nativeAdaptiveQty = sum(validAssets.filter((a) => a.nativeStatus === "Native" || a.nativeStatus === "Adaptive").map((a) => a.quantity));
  const invasiveQty = sum(validAssets.filter((a) => a.nativeStatus === "Invasive").map((a) => a.quantity));
  const pollinatorQty = sum(validAssets.filter((a) => a.floweringOrPollinatorSupport).map((a) => a.quantity));
  const healthyAvg = safeDiv(sum(validAssets.map((a) => HealthScore[a.healthCondition] * a.quantity)), totalQty, 0);
  const hasCanopy = validAssets.some((a) => a.assetType === "Tree" || a.canopyLayerPresent);
  const hasShrub = validAssets.some((a) => a.assetType === "Shrub" || a.assetType === "Hedge" || a.shrubLayerPresent);
  const hasGround = validAssets.some((a) => a.assetType === "Lawn" || a.assetType === "Groundcover" || a.groundcoverLayerPresent);
  const hasHabitat = validAssets.some((a) => a.habitatFeaturePresent);
  const highMonocultureRisk = validAssets.some((a) => a.monocultureRisk === "High" || a.deadZoneRisk === "High");
  const highChemicalSensitivity = validAssets.some((a) => a.chemicalSensitivity === "High");
  const components = {
    nativeAdaptiveShare: clamp(safeDiv(nativeAdaptiveQty, totalQty), 0, 1) * 20,
    speciesDiversity: clamp(uniqueSpecies / 20, 0, 1) * 15,
    pollinatorSupport: clamp(safeDiv(pollinatorQty, totalQty), 0, 1) * 15,
    strataDiversity: (((hasCanopy ? 1 : 0) + (hasShrub ? 1 : 0) + (hasGround ? 1 : 0)) / 3) * 15,
    habitatFeatures: (hasHabitat ? 1 : 0) * 10,
    plantHealth: clamp(healthyAvg / 100, 0, 1) * 10,
    monocultureDeadZoneRisk: (highMonocultureRisk ? 0.35 : 1) * 10,
    invasiveChemicalRisk: (invasiveQty > 0 || highChemicalSensitivity ? 0.35 : 1) * 5,
  };
  const score100 = clamp(sum(Object.values(components)), 0, 100);
  const flags: string[] = [];
  if (components.nativeAdaptiveShare < 10) flags.push("Native/adaptive species share is weak.");
  if (components.pollinatorSupport < 7) flags.push("Pollinator/flowering support is low.");
  if (components.strataDiversity < 10) flags.push("Canopy/shrub/groundcover layering is incomplete.");
  if (highMonocultureRisk) flags.push("Monoculture or dead-zone risk detected.");
  if (invasiveQty > 0) flags.push("Invasive species presence detected.");
  return { score100, score10: score100 / 10, components, flags };
}

export interface WaterToHealthZoneResult {
  zoneId: string;
  waterIntensityLitresPerSqm: number;
  recycledWaterShare: number;
  freshwaterAvoidedShare: number;
  avgZoneHealthScore: number;
  waterToHealthIndex100: number;
  status: "Efficient" | "Watch" | "Inefficient";
  flags: string[];
}
export function calculateZoneHealthScore(zoneAssets: GreenAsset[]): number {
  const qty = Math.max(sum(zoneAssets.map((a) => a.quantity)), 1);
  return safeDiv(sum(zoneAssets.map((a) => HealthScore[a.healthCondition] * a.quantity)), qty, 0);
}
export function calculateWaterToHealthIndex(assets: GreenAsset[], waterEvents: WaterEvent[]): WaterToHealthZoneResult[] {
  const assetsByZone = byZone(assets);
  return waterEvents.map((event) => {
    const zoneAssets = assetsByZone.get(event.zoneId) ?? [];
    const zoneHealth = calculateZoneHealthScore(zoneAssets);
    const waterIntensity = safeDiv(event.actualLitres, event.greenAreaSqm, 0);
    const recycledShare = clamp(safeDiv(event.reusedLitres, event.actualLitres, 0), 0, 1);
    const freshwaterAvoidedShare = clamp(safeDiv(event.freshwaterAvoidedLitres, event.baselineLitres, 0), 0, 1);
    const targetLitresPerSqm = 40;
    const intensityScore = clamp(1 - Math.max(waterIntensity - targetLitresPerSqm, 0) / targetLitresPerSqm, 0, 1) * 35;
    const healthScoreComponent = clamp(zoneHealth / 100, 0, 1) * 40;
    const recycledBonus = recycledShare * 15;
    const freshwaterBonus = freshwaterAvoidedShare * 10;
    const stressPenalty = Math.min((event.stressFlags ?? 0) * 5, 20);
    const overUnderPenalty = (event.overwateringFlag ? 10 : 0) + (event.underwateringFlag ? 10 : 0);
    const index = clamp(healthScoreComponent + intensityScore + recycledBonus + freshwaterBonus - stressPenalty - overUnderPenalty, 0, 100);
    const flags: string[] = [];
    if (waterIntensity > targetLitresPerSqm * 1.25) flags.push("High water intensity for zone area.");
    if (zoneHealth < 60 && event.actualLitres > 0) flags.push("Landscape underperforming despite water use.");
    if (event.overwateringFlag) flags.push("Overwatering risk flagged.");
    if (event.underwateringFlag) flags.push("Under-watering risk flagged.");
    return {
      zoneId: event.zoneId,
      waterIntensityLitresPerSqm: waterIntensity,
      recycledWaterShare: recycledShare,
      freshwaterAvoidedShare,
      avgZoneHealthScore: zoneHealth,
      waterToHealthIndex100: index,
      status: index >= 75 ? "Efficient" : index >= 50 ? "Watch" : "Inefficient",
      flags,
    };
  });
}

export interface CostLeakageResult {
  totalLeakageInr: number;
  replacementLeakageInr: number;
  repeatedIssueLeakageInr: number;
  slaLeakageInr: number;
  waterInefficiencyLeakageInr: number;
  correctiveWorkLeakageInr: number;
  topLeakageZones: Array<{ zoneId: string; leakageInr: number }>;
  flags: string[];
}
export function calculateCostLeakage(assets: GreenAsset[], tickets: ItsmTicket[], waterResults: WaterToHealthZoneResult[]): CostLeakageResult {
  const replacementLeakage = sum(assets.filter((a) => a.healthCondition === "Critical").map((a) => (a.replacementCostInr ?? CostDefaults.defaultReplacementCostInr) * a.quantity));
  const repeatedIssueLeakage = sum(tickets.map((t) => t.reopenCount * CostDefaults.repeatedIssueCostInr));
  const slaLeakage = tickets.filter((t) => t.slaBreached).length * CostDefaults.slaBreachCostInr;
  const correctiveWork = sum(tickets.map((t) => t.estimatedCorrectiveCostInr ?? (t.status !== "Closed" ? CostDefaults.correctiveWorkDefaultInr : 0)));
  const waterInefficiency = sum(waterResults.filter((w) => w.status === "Inefficient" || w.status === "Watch").map((w) => Math.max(w.waterIntensityLitresPerSqm - 40, 0) * CostDefaults.waterCostPerLitreInr * 30));
  const byZoneLeakage = new Map<string, number>();
  for (const ticket of tickets) {
    const current = byZoneLeakage.get(ticket.zoneId) ?? 0;
    byZoneLeakage.set(ticket.zoneId, current + (ticket.slaBreached ? CostDefaults.slaBreachCostInr : 0) + ticket.reopenCount * CostDefaults.repeatedIssueCostInr + (ticket.estimatedCorrectiveCostInr ?? 0));
  }
  for (const water of waterResults) {
    const current = byZoneLeakage.get(water.zoneId) ?? 0;
    const leakage = water.status === "Efficient" ? 0 : Math.max(water.waterIntensityLitresPerSqm - 40, 0) * CostDefaults.waterCostPerLitreInr * 30;
    byZoneLeakage.set(water.zoneId, current + leakage);
  }
  const total = replacementLeakage + repeatedIssueLeakage + slaLeakage + waterInefficiency + correctiveWork;
  const flags: string[] = [];
  if (replacementLeakage > 0) flags.push("Critical assets create replacement leakage.");
  if (slaLeakage > 0) flags.push("SLA breach leakage detected.");
  if (waterInefficiency > 0) flags.push("Water inefficiency leakage detected.");
  if (repeatedIssueLeakage > 0) flags.push("Repeated issue leakage detected.");
  return {
    totalLeakageInr: total,
    replacementLeakageInr: replacementLeakage,
    repeatedIssueLeakageInr: repeatedIssueLeakage,
    slaLeakageInr: slaLeakage,
    waterInefficiencyLeakageInr: waterInefficiency,
    correctiveWorkLeakageInr: correctiveWork,
    topLeakageZones: Array.from(byZoneLeakage.entries()).map(([zoneId, leakageInr]) => ({ zoneId, leakageInr })).sort((a, b) => b.leakageInr - a.leakageInr).slice(0, 3),
    flags,
  };
}

export interface LeapBaselineResult {
  locateScore100: number;
  evaluateScore100: number;
  assessScore100: number;
  prepareScore100: number;
  overallScore100: number;
  readinessStatus: "Nascent" | "Developing" | "Structured" | "Advanced";
  risks: string[];
  opportunities: string[];
  actionPlan: string[];
}
export function calculateLeapBaseline(zones: Zone[], assets: GreenAsset[], carbon: SiteCarbonSummary, biodiversity: BiodiversityScoreResult, waterResults: WaterToHealthZoneResult[], costLeakage: CostLeakageResult): LeapBaselineResult {
  const zoneCount = Math.max(zones.length, 1);
  const zonesWithAssets = new Set(assets.map((a) => a.zoneId)).size;
  const locateScore = clamp(zonesWithAssets / zoneCount, 0, 1) * 100;
  const carbonScore = clamp(carbon.eligibleAnnualContributionKgCo2e / 1000 / 1, 0, 1) * 25;
  const biodiversityComponent = biodiversity.score100 * 0.35;
  const waterAvg = safeDiv(sum(waterResults.map((w) => w.waterToHealthIndex100)), Math.max(waterResults.length, 1), 0) * 0.25;
  const healthAvg = calculateZoneHealthScore(assets) * 0.15;
  const evaluateScore = clamp(carbonScore + biodiversityComponent + waterAvg + healthAvg, 0, 100);
  const riskPenalty = clamp(costLeakage.totalLeakageInr / 100000, 0, 1) * 40;
  const waterRiskPenalty = waterResults.filter((w) => w.status === "Inefficient").length * 10;
  const biodiversityRiskPenalty = biodiversity.flags.length * 6;
  const assessScore = clamp(100 - riskPenalty - waterRiskPenalty - biodiversityRiskPenalty, 0, 100);
  const reportingReadyShare = safeDiv(assets.filter((a) => a.reportingRight === "Confirmed").length, Math.max(assets.length, 1), 0);
  const evidenceUpgradeShare = safeDiv(assets.filter((a) => a.evidenceLevel !== "E0").length, Math.max(assets.length, 1), 0);
  const prepareScore = clamp(reportingReadyShare * 70 + evidenceUpgradeShare * 30, 0, 100);
  const overall = locateScore * 0.25 + evaluateScore * 0.3 + assessScore * 0.25 + prepareScore * 0.2;
  const risks = [...biodiversity.flags, ...waterResults.flatMap((w) => w.flags.map((f) => `${w.zoneId}: ${f}`)), ...costLeakage.flags];
  return {
    locateScore100: locateScore,
    evaluateScore100: evaluateScore,
    assessScore100: assessScore,
    prepareScore100: prepareScore,
    overallScore100: overall,
    readinessStatus: overall >= 80 ? "Advanced" : overall >= 65 ? "Structured" : overall >= 45 ? "Developing" : "Nascent",
    risks,
    opportunities: ["Create tenant-facing green asset baseline pack.", "Use outdoor landscape as primary carbon stock/sequestration story.", "Upgrade E0 internal model to E1 expert-reviewed methodology."],
    actionPlan: ["Complete real baseline survey with photos, zones, girth bands, and water sources.", "Confirm reporting-right status for all client-owned green assets.", "Prioritize high-footfall zones for tenant-facing green engagement content.", "Resolve top cost leakage zones before quarterly evidence pack."],
  };
}

export interface TenantEngagementPackResult {
  totalQrScans: number;
  engagementScore100: number;
  mostEngagedZones: Array<{ zoneId: string; scans: number }>;
  storyCards: Array<{ zoneId: string; title: string; body: string }>;
  recommendedTenantMessages: string[];
}
export function calculateTenantEngagementPack(events: TenantEngagementEvent[], zones: Zone[], biodiversity: BiodiversityScoreResult, waterResults: WaterToHealthZoneResult[], carbon: SiteCarbonSummary): TenantEngagementPackResult {
  const totalScans = sum(events.map((e) => e.qrScans));
  const byZoneScans = new Map<string, number>();
  for (const event of events) byZoneScans.set(event.zoneId, (byZoneScans.get(event.zoneId) ?? 0) + event.qrScans);
  const mostEngagedZones = Array.from(byZoneScans.entries()).map(([zoneId, scans]) => ({ zoneId, scans })).sort((a, b) => b.scans - a.scans).slice(0, 5);
  const storyCardCount = events.filter((e) => e.storyCardPublished).length;
  const trailCount = events.filter((e) => e.natureTrailPoint).length;
  const scanScore = clamp(totalScans / 500, 0, 1) * 35;
  const biodiversityScore = biodiversity.score100 * 0.25;
  const waterScore = safeDiv(sum(waterResults.map((w) => w.waterToHealthIndex100)), Math.max(waterResults.length, 1), 0) * 0.2;
  const contentScore = clamp((storyCardCount + trailCount) / 10, 0, 1) * 20;
  const storyCards = zones.filter((z) => z.isTenantFacing).slice(0, 5).map((zone) => ({
    zoneId: zone.zoneId,
    title: `${zone.zoneName} Green Asset Snapshot`,
    body: "This zone is part of the campus green asset register and contributes to internal sustainability visibility through greenery, water-use evidence, and nature-readiness tracking.",
  }));
  return {
    totalQrScans: totalScans,
    engagementScore100: scanScore + biodiversityScore + waterScore + contentScore,
    mostEngagedZones,
    storyCards,
    recommendedTenantMessages: [
      `The site maintains a tracked green asset register with ${Math.round(carbon.eligibleAnnualContributionKgCo2e)} kg CO₂e/year eligible internal contribution estimate at current evidence level.`,
      "Landscape water use is being connected to health outcomes, not just consumption logs.",
      "Tenant-facing green zones can be converted into monthly sustainability snapshots and green trail content.",
    ],
  };
}

export interface ItsmSummary {
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
  slaCompliancePct: number;
  repeatIssueCount: number;
  topIssueZones: Array<{ zoneId: string; count: number }>;
  healthImprovementEvents: number;
}
export function calculateItsmSummary(tickets: ItsmTicket[]): ItsmSummary {
  const total = tickets.length;
  const closed = tickets.filter((t) => t.status === "Closed").length;
  const slaMet = tickets.filter((t) => !t.slaBreached).length;
  const repeat = sum(tickets.map((t) => t.reopenCount));
  const byZoneCount = new Map<string, number>();
  for (const t of tickets) byZoneCount.set(t.zoneId, (byZoneCount.get(t.zoneId) ?? 0) + 1);
  const healthImprovementEvents = tickets.filter((t) => HealthScore[t.healthAfter ?? "Critical"] > HealthScore[t.healthBefore ?? "Healthy"]).length;
  return {
    totalTickets: total,
    openTickets: total - closed,
    closedTickets: closed,
    slaCompliancePct: safeDiv(slaMet, Math.max(total, 1), 1) * 100,
    repeatIssueCount: repeat,
    topIssueZones: Array.from(byZoneCount.entries()).map(([zoneId, count]) => ({ zoneId, count })).sort((a, b) => b.count - a.count).slice(0, 3),
    healthImprovementEvents,
  };
}

export interface CalculationSnapshot {
  snapshotId: string;
  clientId: string;
  siteId: string;
  period: string;
  methodVersion: string;
  totalGreenAssets: number;
  carbonStockEstimateKgCo2e: number;
  annualSequestrationProxyKgCo2e: number;
  eligibleInternalContributionKgCo2e: number;
  externalCreditDependencyPlanningTco2e?: number;
  waterReusedLitres: number;
  freshwaterAvoidedLitres: number;
  biodiversityReadinessScore10: number;
  leapReadinessScore100: number;
  leapReadinessStatus: string;
  waterToHealthIndex100: number;
  costLeakageEstimateInr: number;
  tenantEngagementScore100: number;
  evidenceLevel: EvidenceLevel;
  claimStatus: "Allowed" | "Restricted" | "Blocked";
  generatedAt: string;
  details: {
    carbon: SiteCarbonSummary;
    biodiversity: BiodiversityScoreResult;
    waterToHealth: WaterToHealthZoneResult[];
    costLeakage: CostLeakageResult;
    leap: LeapBaselineResult;
    tenantPack: TenantEngagementPackResult;
    itsm: ItsmSummary;
    claims: ClaimDecision[];
  };
}
export interface BuildSnapshotInput {
  client: Client;
  site: Site;
  zones: Zone[];
  assets: GreenAsset[];
  waterEvents: WaterEvent[];
  tickets: ItsmTicket[];
  tenantEvents: TenantEngagementEvent[];
}
export function buildCalculationSnapshot(input: BuildSnapshotInput): CalculationSnapshot {
  const siteAssets = input.assets.filter((a) => a.siteId === input.site.siteId);
  const siteWater = input.waterEvents.filter((w) => w.siteId === input.site.siteId);
  const siteTickets = input.tickets.filter((t) => t.siteId === input.site.siteId);
  const siteTenantEvents = input.tenantEvents.filter((e) => e.siteId === input.site.siteId);
  const carbon = calculateSiteCarbonSummary(input.site, siteAssets);
  const biodiversity = calculateBiodiversityReadiness(siteAssets);
  const waterToHealth = calculateWaterToHealthIndex(siteAssets, siteWater);
  const costLeakage = calculateCostLeakage(siteAssets, siteTickets, waterToHealth);
  const leap = calculateLeapBaseline(input.zones, siteAssets, carbon, biodiversity, waterToHealth, costLeakage);
  const tenantPack = calculateTenantEngagementPack(siteTenantEvents, input.zones, biodiversity, waterToHealth, carbon);
  const itsm = calculateItsmSummary(siteTickets);
  const evidenceRank: Record<EvidenceLevel, number> = { E0: 0, E1: 1, E2: 2, E3: 3 };
  const avgEvidenceRank = safeDiv(sum(siteAssets.map((a) => evidenceRank[a.evidenceLevel])), Math.max(siteAssets.length, 1), 0);
  const evidenceLevel: EvidenceLevel = avgEvidenceRank >= 2.5 ? "E3" : avgEvidenceRank >= 1.5 ? "E2" : avgEvidenceRank >= 0.5 ? "E1" : "E0";
  const claims: ClaimDecision[] = [
    getClaimDecision("carbon_stock", evidenceLevel),
    getClaimDecision("annual_sequestration", evidenceLevel),
    getClaimDecision("credit_dependency_planning", evidenceLevel),
    getClaimDecision("biodiversity_readiness", evidenceLevel),
    getClaimDecision("water_to_health", evidenceLevel),
    getClaimDecision("cost_leakage", evidenceLevel),
    getClaimDecision("tenant_engagement", evidenceLevel),
  ];
  const mostRestrictiveClaim = claims.some((c) => c.claimStatus === "Blocked") ? "Blocked" : claims.some((c) => c.claimStatus === "Restricted") ? "Restricted" : "Allowed";
  return {
    snapshotId: `snap_${input.site.siteId}_${input.site.reportingPeriod}_${METHOD_VERSION}`,
    clientId: input.client.clientId,
    siteId: input.site.siteId,
    period: input.site.reportingPeriod,
    methodVersion: METHOD_VERSION,
    totalGreenAssets: sum(siteAssets.map((a) => a.quantity)),
    carbonStockEstimateKgCo2e: carbon.carbonStockKgCo2e,
    annualSequestrationProxyKgCo2e: carbon.netAnnualSequestrationKgCo2e,
    eligibleInternalContributionKgCo2e: carbon.eligibleAnnualContributionKgCo2e,
    externalCreditDependencyPlanningTco2e: input.site.targetCarbonGapTco2e !== undefined ? Math.max(input.site.targetCarbonGapTco2e - carbon.eligibleAnnualContributionKgCo2e / 1000, 0) : undefined,
    waterReusedLitres: sum(siteWater.map((w) => w.reusedLitres)),
    freshwaterAvoidedLitres: sum(siteWater.map((w) => w.freshwaterAvoidedLitres)),
    biodiversityReadinessScore10: biodiversity.score10,
    leapReadinessScore100: leap.overallScore100,
    leapReadinessStatus: leap.readinessStatus,
    waterToHealthIndex100: safeDiv(sum(waterToHealth.map((w) => w.waterToHealthIndex100)), Math.max(waterToHealth.length, 1), 0),
    costLeakageEstimateInr: costLeakage.totalLeakageInr,
    tenantEngagementScore100: tenantPack.engagementScore100,
    evidenceLevel,
    claimStatus: mostRestrictiveClaim,
    generatedAt: new Date().toISOString(),
    details: { carbon, biodiversity, waterToHealth, costLeakage, leap, tenantPack, itsm, claims },
  };
}

export const demoClient: Client = { clientId: "client_mapletree_demo", clientName: "Mapletree Demo" };
export const demoSite: Site = { siteId: "site_gtp_demo", clientId: demoClient.clientId, siteName: "Sample Campus - Bengaluru", city: "Bengaluru", reportingPeriod: "2026-05", targetCarbonGapTco2e: 1000, operationalFootprintKgCo2e: 0 };
export const demoZones: Zone[] = [
  { zoneId: "zone_entrance", siteId: demoSite.siteId, zoneName: "Main Entrance", isTenantFacing: true, isHighFootfall: true, isCriticalLandscape: true },
  { zoneId: "zone_central", siteId: demoSite.siteId, zoneName: "Central Avenue", isTenantFacing: true, isHighFootfall: true },
  { zoneId: "zone_podium", siteId: demoSite.siteId, zoneName: "Podium Lawn", isTenantFacing: true, isWaterSensitive: true },
  { zoneId: "zone_floor_a", siteId: demoSite.siteId, zoneName: "Work Floor A" },
];
export const demoAssets: GreenAsset[] = [
  { assetId: "GAU-TR-001", siteId: demoSite.siteId, zoneId: "zone_central", assetType: "Tree", speciesCommonName: "Rain Tree", nativeStatus: "Adaptive", quantity: 18, girthCm: 125, heightM: 9, canopySpreadM: 8, woodDensity: 0.58, maturityStage: "Mature", healthCondition: "Healthy", floweringOrPollinatorSupport: true, canopyLayerPresent: true, waterDemandProfile: "Medium", ownershipStatus: "Client Owned", reportingRight: "Confirmed", evidenceLevel: "E0", replacementCostInr: 8000 },
  { assetId: "GAU-TR-002", siteId: demoSite.siteId, zoneId: "zone_entrance", assetType: "Tree", speciesCommonName: "Tabebuia Rosea", nativeStatus: "Adaptive", quantity: 9, girthCm: 65, heightM: 5, canopySpreadM: 4, woodDensity: 0.52, maturityStage: "Semi-Mature", healthCondition: "Average", floweringOrPollinatorSupport: true, canopyLayerPresent: true, waterDemandProfile: "Medium", ownershipStatus: "Client Owned", reportingRight: "Confirmed", evidenceLevel: "E0", replacementCostInr: 5500 },
  { assetId: "GAU-PL-001", siteId: demoSite.siteId, zoneId: "zone_entrance", assetType: "Palm", speciesCommonName: "Foxtail Palm", nativeStatus: "Exotic", quantity: 12, biomassKg: 85, maturityStage: "Semi-Mature", healthCondition: "Healthy", canopyLayerPresent: true, waterDemandProfile: "Medium", ownershipStatus: "Client Owned", reportingRight: "Confirmed", evidenceLevel: "E0", replacementCostInr: 4500 },
  { assetId: "GAU-SH-001", siteId: demoSite.siteId, zoneId: "zone_central", assetType: "Shrub", speciesCommonName: "Mixed Shrubs", nativeStatus: "Adaptive", quantity: 1, areaSqm: 420, healthCondition: "Healthy", floweringOrPollinatorSupport: true, shrubLayerPresent: true, groundcoverLayerPresent: true, habitatFeaturePresent: true, waterDemandProfile: "Medium", ownershipStatus: "Client Owned", reportingRight: "Confirmed", evidenceLevel: "E0" },
  { assetId: "GAU-LN-001", siteId: demoSite.siteId, zoneId: "zone_podium", assetType: "Lawn", speciesCommonName: "Mexican Grass", nativeStatus: "Exotic", quantity: 1, areaSqm: 900, healthCondition: "Average", groundcoverLayerPresent: true, waterDemandProfile: "High", ownershipStatus: "Client Owned", reportingRight: "Confirmed", evidenceLevel: "E0", monocultureRisk: "Medium" },
  { assetId: "GAU-IN-001", siteId: demoSite.siteId, zoneId: "zone_floor_a", assetType: "Indoor Plant", speciesCommonName: "Areca Palm", nativeStatus: "Exotic", quantity: 24, tier: "T1", lightCondition: "Good", healthCondition: "Healthy", waterDemandProfile: "Medium", ownershipStatus: "Vendor Owned", reportingRight: "Confirmed", evidenceLevel: "E0", replacementCostInr: 650 },
  { assetId: "GAU-IN-002", siteId: demoSite.siteId, zoneId: "zone_floor_a", assetType: "Indoor Plant", speciesCommonName: "Aglaonema Mix", nativeStatus: "Exotic", quantity: 62, tier: "T2", lightCondition: "Moderate", healthCondition: "Average", waterDemandProfile: "Low", ownershipStatus: "Vendor Owned", reportingRight: "Confirmed", evidenceLevel: "E0", replacementCostInr: 450 },
];
export const demoWaterEvents: WaterEvent[] = [
  { eventId: "W-001", siteId: demoSite.siteId, zoneId: "zone_central", source: "STP", measurementMethod: "Meter", greenAreaSqm: 420, baselineLitres: 16000, actualLitres: 12200, reusedLitres: 12200, freshwaterAvoidedLitres: 12200 },
  { eventId: "W-002", siteId: demoSite.siteId, zoneId: "zone_podium", source: "STP", measurementMethod: "Meter", greenAreaSqm: 900, baselineLitres: 24000, actualLitres: 25000, reusedLitres: 25000, freshwaterAvoidedLitres: 25000, stressFlags: 1, overwateringFlag: true },
  { eventId: "W-003", siteId: demoSite.siteId, zoneId: "zone_floor_a", source: "HVAC Condensate", measurementMethod: "Flow Test", greenAreaSqm: 150, baselineLitres: 1200, actualLitres: 780, reusedLitres: 500, freshwaterAvoidedLitres: 500 },
];
export const demoTickets: ItsmTicket[] = [
  { ticketId: "TCK-1001", siteId: demoSite.siteId, zoneId: "zone_floor_a", assetId: "GAU-IN-002", issueType: "Low light stress", priority: "P2", status: "Open", createdAt: "2026-05-01", slaBreached: false, reopenCount: 0, healthBefore: "Stressed", healthAfter: "Average", rootCause: "Light", estimatedCorrectiveCostInr: 900 },
  { ticketId: "TCK-1002", siteId: demoSite.siteId, zoneId: "zone_podium", assetId: "GAU-LN-001", issueType: "Dry patch", priority: "P2", status: "Closed", createdAt: "2026-05-03", closedAt: "2026-05-04", slaBreached: false, reopenCount: 1, healthBefore: "Average", healthAfter: "Healthy", rootCause: "Water", estimatedCorrectiveCostInr: 1200 },
  { ticketId: "TCK-1003", siteId: demoSite.siteId, zoneId: "zone_central", assetId: "GAU-TR-001", issueType: "Pruning due", priority: "P3", status: "Open", createdAt: "2026-05-05", slaBreached: false, reopenCount: 0, healthBefore: "Healthy", healthAfter: "Healthy", rootCause: "Wear and tear", estimatedCorrectiveCostInr: 1500 },
  { ticketId: "TCK-1004", siteId: demoSite.siteId, zoneId: "zone_entrance", assetId: "GAU-PL-001", issueType: "Irrigation leak", priority: "P2", status: "Closed", createdAt: "2026-05-06", closedAt: "2026-05-08", slaBreached: true, reopenCount: 1, healthBefore: "Average", healthAfter: "Healthy", rootCause: "Vendor delay", estimatedCorrectiveCostInr: 2200 },
];
export const demoTenantEvents: TenantEngagementEvent[] = [
  { eventId: "TE-001", siteId: demoSite.siteId, zoneId: "zone_entrance", qrScans: 96, feedbackCount: 8, positiveFeedbackCount: 7, storyCardPublished: true, natureTrailPoint: true },
  { eventId: "TE-002", siteId: demoSite.siteId, zoneId: "zone_central", qrScans: 132, feedbackCount: 12, positiveFeedbackCount: 10, storyCardPublished: true, natureTrailPoint: true },
  { eventId: "TE-003", siteId: demoSite.siteId, zoneId: "zone_podium", qrScans: 36, feedbackCount: 3, positiveFeedbackCount: 2, storyCardPublished: false, natureTrailPoint: false },
];
export const demoSnapshot = buildCalculationSnapshot({ client: demoClient, site: demoSite, zones: demoZones, assets: demoAssets, waterEvents: demoWaterEvents, tickets: demoTickets, tenantEvents: demoTenantEvents });

export function selectCeoDashboard(snapshot: CalculationSnapshot) {
  return {
    internalGreenAssetContributionTco2e: snapshot.eligibleInternalContributionKgCo2e / 1000,
    carbonStockEstimateTco2e: snapshot.carbonStockEstimateKgCo2e / 1000,
    annualSequestrationProxyTco2e: snapshot.annualSequestrationProxyKgCo2e / 1000,
    externalCreditDependencyPlanningTco2e: snapshot.externalCreditDependencyPlanningTco2e,
    waterReusedLitres: snapshot.waterReusedLitres,
    freshwaterAvoidedLitres: snapshot.freshwaterAvoidedLitres,
    biodiversityReadinessScore10: snapshot.biodiversityReadinessScore10,
    leapReadinessScore100: snapshot.leapReadinessScore100,
    leapReadinessStatus: snapshot.leapReadinessStatus,
    waterToHealthIndex100: snapshot.waterToHealthIndex100,
    costLeakageEstimateInr: snapshot.costLeakageEstimateInr,
    tenantEngagementScore100: snapshot.tenantEngagementScore100,
    evidenceLevel: snapshot.evidenceLevel,
    claimStatus: snapshot.claimStatus,
    methodVersion: snapshot.methodVersion,
  };
}
export function selectMapletreePilotNarrative(snapshot: CalculationSnapshot): string[] {
  const dashboard = selectCeoDashboard(snapshot);
  return [
    `The site has ${snapshot.totalGreenAssets} registered green assets in the current pilot dataset.`,
    `RATH estimates ${dashboard.carbonStockEstimateTco2e.toFixed(3)} tCO₂e internal carbon stock proxy and ${dashboard.annualSequestrationProxyTco2e.toFixed(3)} tCO₂e/year annual sequestration proxy at ${snapshot.evidenceLevel} evidence level.`,
    `Water ledger shows ${Math.round(dashboard.waterReusedLitres).toLocaleString("en-IN")} L reused and ${Math.round(dashboard.freshwaterAvoidedLitres).toLocaleString("en-IN")} L freshwater avoided in the sample period.`,
    `Biodiversity-readiness score is ${dashboard.biodiversityReadinessScore10.toFixed(1)}/10 and LEAP-aligned nature baseline status is ${dashboard.leapReadinessStatus}.`,
    `Claim-control status is ${snapshot.claimStatus}. Outputs are internal planning estimates, not certified carbon credits or formal offsets.`,
  ];
}
