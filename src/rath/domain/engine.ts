/**
 * RATH GreenOps Cloud v3 — calculation engine
 * Internal green infrastructure intelligence only. No carbon-credit issuance.
 */

export type EvidenceLevel = "E0" | "E1" | "E2" | "E3";
export type HealthCondition = "Healthy" | "Average" | "Stressed" | "Critical";
export type AssetType = "Tree" | "Palm" | "Shrub" | "Hedge" | "Lawn" | "Groundcover" | "Vertical Garden" | "Indoor Plant";
export type NativeStatus = "Native" | "Adaptive" | "Exotic" | "Invasive" | "Unknown";

export const METHOD_VERSION = "RATH-GII-v0.3";

export const HealthScore: Record<HealthCondition, number> = {
  Healthy: 90,
  Average: 65,
  Stressed: 35,
  Critical: 5,
};

export const EvidenceConfidence: Record<EvidenceLevel, number> = {
  E0: 0.25,
  E1: 0.55,
  E2: 0.8,
  E3: 1.0,
};

export interface Zone {
  id: string;
  name: string;
  type: "Arrival" | "Pedestrian" | "Podium" | "Indoor" | "Amenity" | "Service";
  tenantVisible: boolean;
  highFootfall: boolean;
  critical: boolean;
  heatExposure: "Low" | "Medium" | "High";
  drainageRisk: "Low" | "Medium" | "High";
}

export interface Asset {
  id: string;
  zoneId: string;
  type: AssetType;
  species: string;
  nativeStatus: NativeStatus;
  quantity: number;
  health: HealthCondition;
  waterDemand: "Low" | "Medium" | "High";
  evidence: EvidenceLevel;
  reportingRight: "Confirmed" | "Unclear" | "Not Granted";
  speciesConfidence: "Low" | "Medium" | "High";
  hasPhoto: boolean;
  hasWaterLink: boolean;
  hasMaintenanceHistory: boolean;
  lastVerified?: string;
  pollinator?: boolean;
  canopy?: boolean;
  shrubLayer?: boolean;
  groundLayer?: boolean;
  habitat?: boolean;
  monocultureRisk?: "Low" | "Medium" | "High";
  girthCm?: number;
  woodDensity?: number;
  biomassKg?: number;
  areaSqm?: number;
  lightFactor?: number;
  replacementCost?: number;
}

export interface WaterLog {
  zoneId: string;
  source: "STP" | "HVAC" | "Freshwater" | "Rainwater" | "Mixed";
  baselineLitres: number;
  actualLitres: number;
  reusedLitres: number;
  freshwaterAvoidedLitres: number;
  greenAreaSqm: number;
  stressFlags?: number;
  overwatering?: boolean;
  underwatering?: boolean;
}

export interface Ticket {
  id: string;
  zoneId: string;
  assetId?: string;
  issue: string;
  status: "Open" | "Closed" | "In Progress" | "Reopened";
  slaBreached: boolean;
  reopenCount: number;
  estimatedCost: number;
}

export interface TenantEvent {
  zoneId: string;
  scans: number;
  feedback: number;
  storyCard: boolean;
  natureTrail: boolean;
}

export interface InvestmentAction {
  id: string;
  zoneId: string;
  name: string;
  type: "Water" | "Nature" | "Resilience" | "Tenant" | "Governance";
  costLow: number;
  costHigh: number;
  riskReduction: "Low" | "Medium" | "High";
  waterImpact: "Low" | "Medium" | "High";
  natureImpact: "Low" | "Medium" | "High";
  tenantImpact: "Low" | "Medium" | "High";
  evidenceUplift: "Low" | "Medium" | "High";
  feasibility: "Low" | "Medium" | "High";
  status: "Recommended" | "Approved" | "In Progress" | "Validated" | "Reported";
}

export const zones: Zone[] = [
  { id: "arrival", name: "Main Arrival Court", type: "Arrival", tenantVisible: true, highFootfall: true, critical: true, heatExposure: "High", drainageRisk: "Medium" },
  { id: "spine", name: "Pedestrian Spine", type: "Pedestrian", tenantVisible: true, highFootfall: true, critical: true, heatExposure: "High", drainageRisk: "Low" },
  { id: "podium", name: "Podium Lawn", type: "Podium", tenantVisible: true, highFootfall: false, critical: false, heatExposure: "Medium", drainageRisk: "High" },
  { id: "bio", name: "Biodiversity Pocket", type: "Amenity", tenantVisible: true, highFootfall: false, critical: false, heatExposure: "Low", drainageRisk: "Low" },
  { id: "indoor", name: "Workplace Green Cluster", type: "Indoor", tenantVisible: false, highFootfall: true, critical: false, heatExposure: "Low", drainageRisk: "Low" },
];

export const assets: Asset[] = [
  { id: "GAU-TR-001", zoneId: "spine", type: "Tree", species: "Rain Tree", nativeStatus: "Adaptive", quantity: 18, health: "Healthy", waterDemand: "Medium", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "High", hasPhoto: true, hasWaterLink: true, hasMaintenanceHistory: true, lastVerified: "2026-05-03", pollinator: true, canopy: true, girthCm: 125, woodDensity: 0.58, replacementCost: 8000 },
  { id: "GAU-TR-002", zoneId: "arrival", type: "Tree", species: "Tabebuia Rosea", nativeStatus: "Adaptive", quantity: 9, health: "Average", waterDemand: "Medium", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "Medium", hasPhoto: true, hasWaterLink: true, hasMaintenanceHistory: true, lastVerified: "2026-05-04", pollinator: true, canopy: true, girthCm: 65, woodDensity: 0.52, replacementCost: 5500 },
  { id: "GAU-PL-001", zoneId: "arrival", type: "Palm", species: "Foxtail Palm", nativeStatus: "Exotic", quantity: 12, health: "Healthy", waterDemand: "Medium", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "High", hasPhoto: true, hasWaterLink: true, hasMaintenanceHistory: true, lastVerified: "2026-05-04", canopy: true, biomassKg: 85, replacementCost: 4500 },
  { id: "GAU-SH-001", zoneId: "spine", type: "Shrub", species: "Mixed Adaptive Shrubs", nativeStatus: "Adaptive", quantity: 1, health: "Healthy", waterDemand: "Medium", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "Medium", hasPhoto: true, hasWaterLink: true, hasMaintenanceHistory: true, lastVerified: "2026-05-05", pollinator: true, shrubLayer: true, groundLayer: true, habitat: true, areaSqm: 420 },
  { id: "GAU-LN-001", zoneId: "podium", type: "Lawn", species: "Mexican Grass", nativeStatus: "Exotic", quantity: 1, health: "Average", waterDemand: "High", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "High", hasPhoto: true, hasWaterLink: true, hasMaintenanceHistory: false, lastVerified: "2026-05-02", groundLayer: true, areaSqm: 900, monocultureRisk: "Medium" },
  { id: "GAU-BIO-001", zoneId: "bio", type: "Shrub", species: "Native Flowering Mix", nativeStatus: "Native", quantity: 1, health: "Healthy", waterDemand: "Low", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "High", hasPhoto: true, hasWaterLink: false, hasMaintenanceHistory: true, lastVerified: "2026-05-06", pollinator: true, shrubLayer: true, groundLayer: true, habitat: true, areaSqm: 180 },
  { id: "GAU-IN-001", zoneId: "indoor", type: "Indoor Plant", species: "Areca Palm", nativeStatus: "Exotic", quantity: 24, health: "Healthy", waterDemand: "Medium", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "High", hasPhoto: true, hasWaterLink: true, hasMaintenanceHistory: true, lastVerified: "2026-05-06", biomassKg: 0.2, lightFactor: 0.75, replacementCost: 650 },
  { id: "GAU-IN-002", zoneId: "indoor", type: "Indoor Plant", species: "Aglaonema Mix", nativeStatus: "Exotic", quantity: 62, health: "Average", waterDemand: "Low", evidence: "E0", reportingRight: "Confirmed", speciesConfidence: "Medium", hasPhoto: false, hasWaterLink: true, hasMaintenanceHistory: true, lastVerified: "2026-05-03", biomassKg: 0.08, lightFactor: 0.5, replacementCost: 450 },
];

export const waterLogs: WaterLog[] = [
  { zoneId: "spine", source: "STP", baselineLitres: 16000, actualLitres: 12200, reusedLitres: 12200, freshwaterAvoidedLitres: 12200, greenAreaSqm: 420 },
  { zoneId: "podium", source: "STP", baselineLitres: 24000, actualLitres: 25000, reusedLitres: 25000, freshwaterAvoidedLitres: 25000, greenAreaSqm: 900, stressFlags: 1, overwatering: true },
  { zoneId: "indoor", source: "HVAC", baselineLitres: 1200, actualLitres: 780, reusedLitres: 500, freshwaterAvoidedLitres: 500, greenAreaSqm: 150 },
  { zoneId: "arrival", source: "STP", baselineLitres: 9800, actualLitres: 8200, reusedLitres: 8200, freshwaterAvoidedLitres: 8200, greenAreaSqm: 260 },
];

export const tickets: Ticket[] = [
  { id: "TCK-1001", zoneId: "indoor", assetId: "GAU-IN-002", issue: "Low light stress", status: "Open", slaBreached: false, reopenCount: 0, estimatedCost: 900 },
  { id: "TCK-1002", zoneId: "podium", assetId: "GAU-LN-001", issue: "Dry patch", status: "Closed", slaBreached: false, reopenCount: 1, estimatedCost: 1200 },
  { id: "TCK-1003", zoneId: "spine", assetId: "GAU-TR-001", issue: "Pruning due", status: "Open", slaBreached: false, reopenCount: 0, estimatedCost: 1500 },
  { id: "TCK-1004", zoneId: "arrival", assetId: "GAU-PL-001", issue: "Irrigation leak", status: "Closed", slaBreached: true, reopenCount: 1, estimatedCost: 2200 },
];

export const tenantEvents: TenantEvent[] = [
  { zoneId: "arrival", scans: 96, feedback: 8, storyCard: true, natureTrail: true },
  { zoneId: "spine", scans: 132, feedback: 12, storyCard: true, natureTrail: true },
  { zoneId: "podium", scans: 36, feedback: 3, storyCard: false, natureTrail: false },
  { zoneId: "bio", scans: 84, feedback: 10, storyCard: true, natureTrail: true },
];

export const investmentActions: InvestmentAction[] = [
  { id: "ACT-001", zoneId: "spine", name: "Add shade tree layer near pedestrian spine", type: "Resilience", costLow: 350000, costHigh: 520000, riskReduction: "High", waterImpact: "Medium", natureImpact: "High", tenantImpact: "High", evidenceUplift: "Medium", feasibility: "Medium", status: "Recommended" },
  { id: "ACT-002", zoneId: "podium", name: "Replace high-water lawn pockets with adaptive planting", type: "Water", costLow: 180000, costHigh: 320000, riskReduction: "High", waterImpact: "High", natureImpact: "Medium", tenantImpact: "Medium", evidenceUplift: "Medium", feasibility: "High", status: "Recommended" },
  { id: "ACT-003", zoneId: "bio", name: "Build tenant-facing biodiversity pocket", type: "Nature", costLow: 120000, costHigh: 220000, riskReduction: "Medium", waterImpact: "Low", natureImpact: "High", tenantImpact: "High", evidenceUplift: "High", feasibility: "High", status: "Approved" },
  { id: "ACT-004", zoneId: "arrival", name: "Soil, mulch, and irrigation zoning rehabilitation", type: "Governance", costLow: 70000, costHigh: 140000, riskReduction: "High", waterImpact: "High", natureImpact: "Medium", tenantImpact: "Low", evidenceUplift: "Medium", feasibility: "High", status: "In Progress" },
];

export function sum(values: number[]): number {
  return values.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
}
export function div(a: number, b: number, fallback = 0): number {
  return !b || !Number.isFinite(a) || !Number.isFinite(b) ? fallback : a / b;
}
export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}
export function impactScore(v: "Low" | "Medium" | "High"): number {
  return v === "High" ? 100 : v === "Medium" ? 60 : 25;
}

export function healthAverage(zoneAssets: Asset[]): number {
  const qty = Math.max(sum(zoneAssets.map((a) => a.quantity)), 1);
  return div(sum(zoneAssets.map((a) => HealthScore[a.health] * a.quantity)), qty);
}

export function dbhFromGirth(girthCm = 0): number {
  return div(girthCm, Math.PI, 0);
}

export function biomassToCo2e(biomassKg: number): number {
  return biomassKg * 0.47 * (44 / 12);
}

export function assetCarbon(asset: Asset) {
  const healthFactor = HealthScore[asset.health] / 90;
  const evidenceFactor = EvidenceConfidence[asset.evidence];
  const reportingFactor = asset.reportingRight === "Confirmed" ? 1 : asset.reportingRight === "Unclear" ? 0.5 : 0;

  if (asset.type === "Tree") {
    const d = Math.max(dbhFromGirth(asset.girthCm), 1);
    const lnD = Math.log(d);
    const biomass = (asset.woodDensity ?? 0.55) * Math.exp(-1.499 + 2.148 * lnD + 0.207 * lnD ** 2 - 0.0281 * lnD ** 3) * asset.quantity;
    const stock = biomassToCo2e(biomass);
    const annual = biomassToCo2e(biomass * 0.015) * healthFactor;
    return { stock, annual, eligible: annual * evidenceFactor * reportingFactor };
  }

  if (asset.type === "Palm") {
    const biomass = (asset.biomassKg ?? 80) * asset.quantity;
    const stock = biomassToCo2e(biomass);
    const annual = biomassToCo2e(biomass * 0.012) * healthFactor;
    return { stock, annual, eligible: annual * evidenceFactor * reportingFactor };
  }

  if (asset.type === "Indoor Plant") {
    const annual = biomassToCo2e((asset.biomassKg ?? 0.08) * asset.quantity) * (asset.lightFactor ?? 0.5) * healthFactor;
    return { stock: 0, annual, eligible: annual * evidenceFactor * reportingFactor };
  }

  const perSqm: Record<string, number> = { Shrub: 0.35, Hedge: 0.45, Lawn: 0.08, Groundcover: 0.12, "Vertical Garden": 0.22 };
  const annual = (asset.areaSqm ?? 0) * (perSqm[asset.type] ?? 0) * healthFactor;
  return { stock: 0, annual, eligible: annual * evidenceFactor * reportingFactor };
}

export function carbonSummary() {
  const rows = assets.map((a) => ({ asset: a, ...assetCarbon(a) }));
  return {
    byAsset: rows,
    stockKg: sum(rows.map((r) => r.stock)),
    annualKg: sum(rows.map((r) => r.annual)),
    eligibleKg: sum(rows.map((r) => r.eligible)),
  };
}

export function natureReadiness() {
  const outdoor = assets.filter((a) => a.type !== "Indoor Plant");
  const qty = Math.max(sum(outdoor.map((a) => a.quantity)), 1);
  const speciesCount = new Set(outdoor.map((a) => a.species)).size;
  const nativeAdaptive = sum(outdoor.filter((a) => a.nativeStatus === "Native" || a.nativeStatus === "Adaptive").map((a) => a.quantity));
  const pollinator = sum(outdoor.filter((a) => a.pollinator).map((a) => a.quantity));
  const lowWater = sum(outdoor.filter((a) => a.waterDemand === "Low").map((a) => a.quantity));
  const hasCanopy = outdoor.some((a) => a.canopy);
  const hasShrub = outdoor.some((a) => a.shrubLayer || a.type === "Shrub" || a.type === "Hedge");
  const hasGround = outdoor.some((a) => a.groundLayer || a.type === "Lawn" || a.type === "Groundcover");
  const habitat = outdoor.some((a) => a.habitat);
  const health = healthAverage(outdoor);
  const riskPenalty = outdoor.some((a) => a.nativeStatus === "Invasive" || a.monocultureRisk === "High") ? 1.5 : 5;

  const components = {
    nativeAdaptiveShare: div(nativeAdaptive, qty) * 20,
    speciesDiversity: Math.min(speciesCount / 20, 1) * 15,
    pollinatorSupport: div(pollinator, qty) * 15,
    canopyAndStrata: ((hasCanopy ? 1 : 0) + (hasShrub ? 1 : 0) + (hasGround ? 1 : 0)) / 3 * 15,
    habitatPotential: habitat ? 10 : 0,
    waterResilience: div(lowWater, qty) * 10,
    healthStability: div(health, 100) * 10,
    riskControl: riskPenalty,
  };
  const score100 = clamp(sum(Object.values(components)));
  const flags = [
    components.nativeAdaptiveShare < 10 ? "Native/adaptive species share needs improvement." : "",
    components.pollinatorSupport < 7 ? "Pollinator support is low." : "",
    components.waterResilience < 5 ? "Water-resilient species mix is weak." : "",
  ].filter(Boolean);
  return { score100, score10: score100 / 10, components, flags };
}

export function waterToHealth() {
  return waterLogs.map((w) => {
    const zoneAssets = assets.filter((a) => a.zoneId === w.zoneId);
    const health = healthAverage(zoneAssets);
    const intensity = div(w.actualLitres, w.greenAreaSqm);
    const recycledShare = div(w.reusedLitres, w.actualLitres);
    const freshwaterAvoidedShare = div(w.freshwaterAvoidedLitres, w.baselineLitres);
    const intensityScore = clamp(1 - Math.max(intensity - 40, 0) / 40, 0, 1) * 35;
    const healthScore = div(health, 100) * 40;
    const recycledBonus = recycledShare * 15;
    const freshwaterBonus = freshwaterAvoidedShare * 10;
    const penalty = (w.stressFlags ?? 0) * 5 + (w.overwatering ? 10 : 0) + (w.underwatering ? 10 : 0);
    const score100 = clamp(healthScore + intensityScore + recycledBonus + freshwaterBonus - penalty);
    return {
      zoneId: w.zoneId,
      zoneName: zones.find((z) => z.id === w.zoneId)?.name ?? w.zoneId,
      health,
      intensity,
      recycledShare,
      freshwaterAvoidedShare,
      score100,
      status: score100 >= 75 ? "Efficient" : score100 >= 50 ? "Watch" : "Inefficient",
      flags: [
        intensity > 50 ? "High water intensity." : "",
        health < 60 ? "Landscape underperforming despite water input." : "",
        w.overwatering ? "Overwatering risk." : "",
      ].filter(Boolean),
    };
  });
}

export function dataQuality() {
  return zones.map((z) => {
    const za = assets.filter((a) => a.zoneId === z.id);
    const total = Math.max(za.length, 1);
    const inventory = za.length > 0 ? 100 : 0;
    const species = div(za.filter((a) => a.speciesConfidence === "High").length, total) * 100;
    const freshness = div(za.filter((a) => a.lastVerified).length, total) * 100;
    const photo = div(za.filter((a) => a.hasPhoto).length, total) * 100;
    const water = Math.max(waterLogs.some((w) => w.zoneId === z.id) ? 100 : 0, div(za.filter((a) => a.hasWaterLink).length, total) * 100);
    const maintenance = div(za.filter((a) => a.hasMaintenanceHistory).length, total) * 100;
    const evidence = div(sum(za.map((a) => EvidenceConfidence[a.evidence] * 100)), total);
    const score100 = clamp(inventory * 0.2 + species * 0.15 + freshness * 0.15 + photo * 0.15 + water * 0.15 + maintenance * 0.1 + evidence * 0.1);
    return {
      zoneId: z.id,
      zoneName: z.name,
      inventory,
      species,
      freshness,
      photo,
      water,
      maintenance,
      evidence,
      score100,
      status: score100 >= 75 ? "Report-ready" : score100 >= 50 ? "Usable" : "Weak evidence",
    };
  });
}

export function costLeakage() {
  const replacement = sum(assets.filter((a) => a.health === "Critical").map((a) => (a.replacementCost ?? 450) * a.quantity));
  const sla = tickets.filter((t) => t.slaBreached).length * 1200;
  const repeat = sum(tickets.map((t) => t.reopenCount * 900));
  const corrective = sum(tickets.map((t) => t.estimatedCost));
  const waterIneff = sum(waterToHealth().filter((w) => w.status !== "Efficient").map((w) => Math.max(w.intensity - 40, 0) * 0.08 * 30));
  return { replacement, sla, repeat, corrective, waterIneff, total: replacement + sla + repeat + corrective + waterIneff };
}

export function riskMap() {
  const nature = natureReadiness();
  const water = waterToHealth();
  const quality = dataQuality();

  return zones.map((z) => {
    const za = assets.filter((a) => a.zoneId === z.id);
    const healthRisk = 100 - healthAverage(za);
    const waterRisk = 100 - (water.find((w) => w.zoneId === z.id)?.score100 ?? 45);
    const heatRisk = z.heatExposure === "High" ? 85 : z.heatExposure === "Medium" ? 55 : 25;
    const natureRisk = 100 - nature.score100;
    const zoneTickets = tickets.filter((t) => t.zoneId === z.id);
    const recurringRisk = clamp(zoneTickets.length * 12 + sum(zoneTickets.map((t) => t.reopenCount)) * 15 + zoneTickets.filter((t) => t.slaBreached).length * 20);
    const dataGapRisk = 100 - (quality.find((q) => q.zoneId === z.id)?.score100 ?? 40);
    const riskScore = clamp(healthRisk * 0.25 + waterRisk * 0.2 + heatRisk * 0.15 + natureRisk * 0.15 + recurringRisk * 0.15 + dataGapRisk * 0.1);
    const multiplier = (z.tenantVisible ? 1.2 : z.highFootfall ? 1.1 : 0.9) * (z.critical ? 1.15 : 1);
    const priorityScore = clamp(riskScore * multiplier);
    return {
      ...z,
      healthRisk,
      waterRisk,
      heatRisk,
      natureRisk,
      recurringRisk,
      dataGapRisk,
      riskScore,
      priorityScore,
      status: priorityScore >= 70 ? "Intervention" : priorityScore >= 45 ? "Watch" : "Stable",
      recommendedAction: priorityScore >= 70 ? "Immediate green infrastructure intervention plan" : priorityScore >= 45 ? "Targeted improvement and monitoring" : "Maintain governance cadence",
    };
  });
}

export function tenantPack() {
  const scans = sum(tenantEvents.map((e) => e.scans));
  const stories = tenantEvents.filter((e) => e.storyCard).length;
  const trails = tenantEvents.filter((e) => e.natureTrail).length;
  const score100 = clamp(Math.min(scans / 500, 1) * 35 + natureReadiness().score100 * 0.25 + div(sum(waterToHealth().map((w) => w.score100)), waterToHealth().length) * 0.2 + Math.min((stories + trails) / 10, 1) * 20);
  return { scans, stories, trails, score100 };
}

export function investmentPlanner() {
  const rows = investmentActions.map((a) => {
    const score100 = clamp(
      impactScore(a.riskReduction) * 0.25 +
      impactScore(a.waterImpact) * 0.2 +
      impactScore(a.natureImpact) * 0.2 +
      impactScore(a.tenantImpact) * 0.15 +
      impactScore(a.evidenceUplift) * 0.1 +
      impactScore(a.feasibility) * 0.1
    );
    return {
      ...a,
      avgCost: (a.costLow + a.costHigh) / 2,
      score100,
      priority: score100 >= 75 ? "P1" : score100 >= 55 ? "P2" : "P3",
    };
  }).sort((a, b) => b.score100 - a.score100);
  return {
    actions: rows,
    p1Count: rows.filter((r) => r.priority === "P1").length,
    totalLow: sum(rows.map((r) => r.costLow)),
    totalHigh: sum(rows.map((r) => r.costHigh)),
  };
}

export function evidenceFunnel() {
  const total = Math.max(zones.length, 1);
  const stage = (name: string, count: number) => ({ name, count, percent: div(count, total) * 100 });
  return [
    stage("Total green zones", zones.length),
    stage("Mapped zones", new Set(assets.map((a) => a.zoneId)).size),
    stage("Species-verified zones", new Set(assets.filter((a) => a.speciesConfidence === "High").map((a) => a.zoneId)).size),
    stage("Health-scanned zones", new Set(assets.filter((a) => a.lastVerified).map((a) => a.zoneId)).size),
    stage("Water-linked zones", new Set([...waterLogs.map((w) => w.zoneId), ...assets.filter((a) => a.hasWaterLink).map((a) => a.zoneId)]).size),
    stage("Photo-evidenced zones", new Set(assets.filter((a) => a.hasPhoto).map((a) => a.zoneId)).size),
    stage("E1-ready zones", new Set(assets.filter((a) => a.hasPhoto && a.lastVerified && a.speciesConfidence === "High" && a.hasWaterLink).map((a) => a.zoneId)).size),
    stage("Executive-reportable zones", new Set(assets.filter((a) => a.reportingRight === "Confirmed" && a.hasPhoto).map((a) => a.zoneId)).size),
  ];
}

export function maturityPathway() {
  const nature = natureReadiness();
  const waterAvg = div(sum(waterToHealth().map((w) => w.score100)), waterToHealth().length);
  const dataAvg = div(sum(dataQuality().map((d) => d.score100)), dataQuality().length);
  const tenant = tenantPack().score100;
  const maintenance = div(assets.filter((a) => a.hasMaintenanceHistory).length, assets.length) * 100;
  const levels = [
    { level: 0, label: "Decorative landscape", score: 100, achieved: true },
    { level: 1, label: "Mapped green asset inventory", score: assets.length ? 100 : 0, achieved: assets.length > 0 },
    { level: 2, label: "Health + maintenance governance", score: maintenance, achieved: maintenance >= 60 },
    { level: 3, label: "Water-linked performance", score: waterAvg, achieved: waterAvg >= 60 },
    { level: 4, label: "Nature-readiness indicators", score: nature.score100, achieved: nature.score100 >= 60 },
    { level: 5, label: "Tenant-facing green intelligence", score: tenant, achieved: tenant >= 60 },
    { level: 6, label: "Third-party-reviewed ESG-ready evidence", score: dataAvg, achieved: false },
  ];
  const current = Math.max(...levels.filter((l) => l.achieved).map((l) => l.level));
  return { current, next: levels.find((l) => l.level === Math.min(current + 1, 6))?.label ?? levels[current].label, levels };
}

export function claimControl() {
  const labels = [
    ["carbon_stock", "Estimated internal carbon stock proxy", "Certified carbon stock"],
    ["annual_sequestration", "Indicative annual sequestration proxy", "Guaranteed carbon removal"],
    ["credit_dependency", "External credit dependency planning estimate", "Carbon credits reduced or generated"],
    ["nature_readiness", "Pilot-level nature-readiness score", "Certified biodiversity or TNFD score"],
    ["water_to_health", "Water-to-health efficiency index", "Certified water credit or guaranteed water saving"],
    ["investment", "Green infrastructure investment priority estimate", "Guaranteed ROI or valuation uplift"],
  ];
  return labels.map(([kpi, allowed, blocked]) => ({
    kpi,
    allowed,
    blocked,
    status: "Restricted",
    reason: "E0 outputs are pilot-stage internal planning estimates.",
  }));
}

export function snapshot() {
  const carbon = carbonSummary();
  const nature = natureReadiness();
  const water = waterToHealth();
  const quality = dataQuality();
  const costs = costLeakage();
  const risk = riskMap();
  const tenant = tenantPack();
  const investments = investmentPlanner();
  const maturity = maturityPathway();
  const totalAssets = sum(assets.map((a) => a.quantity));
  const evidenceLevel: EvidenceLevel = "E0";

  return {
    client: "Mapletree Demo",
    site: "GTP Pilot Asset",
    methodVersion: METHOD_VERSION,
    evidenceLevel,
    claimStatus: "Restricted",
    totalAssets,
    greenAssetMaturityLevel: maturity.current,
    natureReadinessScore10: nature.score10,
    waterToHealthIndex100: div(sum(water.map((w) => w.score100)), water.length),
    highRiskZoneCount: risk.filter((r) => r.status === "Intervention").length,
    dataQualityScore100: div(sum(quality.map((q) => q.score100)), quality.length),
    p1InvestmentActionCount: investments.p1Count,
    carbonStockTco2e: carbon.stockKg / 1000,
    annualSequestrationTco2e: carbon.annualKg / 1000,
    eligibleContributionTco2e: carbon.eligibleKg / 1000,
    waterReusedLitres: sum(waterLogs.map((w) => w.reusedLitres)),
    freshwaterAvoidedLitres: sum(waterLogs.map((w) => w.freshwaterAvoidedLitres)),
    costLeakageInr: costs.total,
    tenantEngagementScore100: tenant.score100,
    details: { carbon, nature, water, quality, costs, risk, tenant, investments, maturity, funnel: evidenceFunnel(), claims: claimControl() },
  };
}

export const demoSnapshot = snapshot();

export function executiveNarrative() {
  return [
    `The pilot asset has ${demoSnapshot.totalAssets} registered green assets across mapped zones.`,
    `Current maturity is Level ${demoSnapshot.greenAssetMaturityLevel}/6, with the next target being ${demoSnapshot.details.maturity.next}.`,
    `Nature-readiness is ${demoSnapshot.natureReadinessScore10.toFixed(1)}/10 and water-to-health efficiency is ${demoSnapshot.waterToHealthIndex100.toFixed(0)}/100.`,
    `There are ${demoSnapshot.highRiskZoneCount} intervention zones and ${demoSnapshot.p1InvestmentActionCount} P1 green infrastructure actions.`,
    `Carbon remains a supporting estimate: ${demoSnapshot.carbonStockTco2e.toFixed(2)} tCO₂e stock proxy and ${demoSnapshot.annualSequestrationTco2e.toFixed(3)} tCO₂e/year annual proxy at ${demoSnapshot.evidenceLevel}.`,
  ];
}
