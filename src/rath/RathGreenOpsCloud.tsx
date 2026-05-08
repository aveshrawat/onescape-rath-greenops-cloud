import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  Camera,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  Droplets,
  Eye,
  FileCheck2,
  FileText,
  Gauge,
  Layers3,
  Leaf,
  Lock,
  MapPin,
  Network,
  Plus,
  QrCode,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trees,
  Upload,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  demoSnapshot,
  selectCeoDashboard,
  selectMapletreePilotNarrative,
  METHOD_VERSION,
  demoAssets,
  demoTickets,
  type AssetType,
  type EvidenceLevel,
  type HealthCondition,
  type ReportingRight,
} from "./domain/engine";

type TabKey = "command" | "assets" | "methodology" | "field" | "evidence" | "tenant";

type Tone = "slate" | "green" | "blue" | "amber" | "red" | "purple" | "dark" | "white";

type IconComponent = React.ComponentType<{ className?: string }>;

const trendData = [
  { month: "Jan", contribution: 0.11, readiness: 54, leakage: 68 },
  { month: "Feb", contribution: 0.13, readiness: 60, leakage: 61 },
  { month: "Mar", contribution: 0.15, readiness: 67, leakage: 54 },
  { month: "Apr", contribution: 0.16, readiness: 73, leakage: 47 },
  { month: "May", contribution: 0.18, readiness: 81, leakage: 41 },
  { month: "Jun", contribution: 0.2, readiness: 86, leakage: 34 },
];

const moduleReadiness = [
  { label: "Baseline", value: 92 },
  { label: "Capture", value: 78 },
  { label: "Calculate", value: 83 },
  { label: "Claim Check", value: 100 },
  { label: "Report", value: 72 },
];

const assetPortfolio = [
  { type: "Trees", value: 27 },
  { type: "Palms", value: 12 },
  { type: "Shrubs", value: 420 },
  { type: "Lawn m²", value: 900 },
  { type: "Indoor", value: 86 },
];

function cn(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

function num(value: number | undefined, decimals = 1) {
  if (value === undefined || !Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

function int(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

function inr(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return "₹0";
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: Tone }) {
  const tones: Record<Tone, string> = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    purple: "bg-purple-50 text-purple-700 ring-purple-200",
    dark: "bg-slate-900 text-white ring-slate-800",
    white: "bg-white/10 text-white ring-white/15",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tones[tone])}>{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]", className)}>{children}</div>;
}

function SoftCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[28px] border border-slate-200 bg-slate-50/80", className)}>{children}</div>;
}

function ProgressBar({ value, tone = "emerald" }: { value: number; tone?: "emerald" | "blue" | "amber" | "purple" | "red" }) {
  const fills = {
    emerald: "bg-emerald-600",
    blue: "bg-blue-600",
    amber: "bg-amber-500",
    purple: "bg-purple-600",
    red: "bg-red-500",
  };
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={cn("h-full rounded-full", fills[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>
        <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-slate-950 lg:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

function MetricTile({ label, value, sub, icon: Icon, tone = "green", badge }: { label: string; value: string; sub: string; icon: IconComponent; tone?: "green" | "blue" | "amber" | "purple" | "slate" | "red"; badge?: string }) {
  const iconStyles = {
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-50 text-red-700",
  };
  const badgeTone = tone === "slate" ? "dark" : tone;
  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-1 text-sm leading-5 text-slate-500">{sub}</p>
          </div>
          <div className={cn("rounded-2xl p-3", iconStyles[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
      {badge && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-3">
          <span className="text-xs text-slate-500">Method controlled</span>
          <Badge tone={badgeTone as Tone}>{badge}</Badge>
        </div>
      )}
    </Card>
  );
}

function TextField({ label, value, onChange, type = "text" }: { label: string; value: string | number; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TopSignal({ icon: Icon, title, body }: { icon: IconComponent; title: string; body: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-emerald-50/65">{body}</p>
    </div>
  );
}

export default function RathGreenOpsCloud() {
  const dashboard = selectCeoDashboard(demoSnapshot);
  const narrative = selectMapletreePilotNarrative(demoSnapshot);
  const [activeTab, setActiveTab] = useState<TabKey>("command");
  const [persona, setPersona] = useState("CEO");
  const [carbonGap, setCarbonGap] = useState(1000);
  const [draftAsset, setDraftAsset] = useState({
    zone: "Tower A Drop-off",
    assetType: "Tree" as AssetType,
    species: "Tabebuia Rosea",
    quantity: 10,
    health: "Healthy" as HealthCondition,
    evidence: "E0" as EvidenceLevel,
    reportingRight: "Confirmed" as ReportingRight,
  });

  const updatedExternalCredits = Math.max(carbonGap - dashboard.internalGreenAssetContributionTco2e, 0);

  const assetMix = useMemo(() => {
    const groups = new Map<string, number>();
    for (const assetResult of demoSnapshot.details.carbon.byAsset) {
      groups.set(assetResult.assetType, (groups.get(assetResult.assetType) ?? 0) + assetResult.eligibleAnnualContributionKgCo2e / 1000);
    }
    return Array.from(groups.entries()).map(([type, value]) => ({ type, value: Number(value.toFixed(4)) }));
  }, []);

  const tabs: Array<{ key: TabKey; label: string; icon: IconComponent }> = [
    { key: "command", label: "Command", icon: Gauge },
    { key: "assets", label: "Assets", icon: Layers3 },
    { key: "methodology", label: "Methodology", icon: Database },
    { key: "field", label: "Field", icon: ScanLine },
    { key: "evidence", label: "Evidence", icon: FileCheck2 },
    { key: "tenant", label: "Tenant Pack", icon: Users },
  ];

  const personaCopy: Record<string, string> = {
    CEO: "Asset value, risk control, tenant retention, and portfolio-level sustainability visibility.",
    ESG: "Evidence level, reporting boundary, claim safety, and exportable internal evidence pack.",
    Workplace: "Operational health, tickets, water-to-health efficiency, and zone-level action clarity.",
    IFM: "Tender differentiation, QBR depth, SLA proof, and premium managed-service expansion.",
  };

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-slate-950">
      <div className="relative overflow-hidden bg-[#07130f]">
        <div className="absolute left-[-12rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[-14rem] top-20 h-[36rem] w-[36rem] rounded-full bg-lime-300/10 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <header className="relative mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-emerald-300 text-emerald-950 shadow-xl shadow-emerald-950/20">
              <Leaf className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-white">RATH GreenOps Cloud</h1>
                <Badge tone="white">CEO Demo</Badge>
              </div>
              <p className="mt-1 text-sm text-emerald-50/60">Green asset intelligence · carbon · water · biodiversity · evidence</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="white">{METHOD_VERSION}</Badge>
            <Badge tone="white">{dashboard.evidenceLevel} Evidence</Badge>
            <Badge tone="white">Not carbon credit issuance</Badge>
          </div>
        </header>

        <section className="relative mx-auto grid max-w-[1500px] gap-5 px-5 pb-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge tone="white">Mapletree-ready narrative</Badge>
              <Badge tone="white">CBRE IFM differentiation</Badge>
              <Badge tone="white">Claim-controlled outputs</Badge>
            </div>
            <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Resource & Asset Traceability Hub</p>
                <h2 className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
                  Turn campus greenery into governed asset intelligence.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/70">
                  RATH connects field operations, green asset records, water logs, biodiversity-readiness, and carbon methodology into one executive-grade evidence layer.
                </p>
              </div>
              <div className="rounded-[30px] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">CEO Readout</p>
                  <Badge tone="white">Live snapshot</Badge>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white/8 p-4">
                    <p className="text-xs text-emerald-50/60">Internal contribution</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{num(dashboard.internalGreenAssetContributionTco2e, 3)}</p>
                    <p className="text-xs text-emerald-200">tCO₂e/year</p>
                  </div>
                  <div className="rounded-3xl bg-white/8 p-4">
                    <p className="text-xs text-emerald-50/60">LEAP readiness</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{num(dashboard.leapReadinessScore100, 0)}</p>
                    <p className="text-xs text-emerald-200">/100 · {dashboard.leapReadinessStatus}</p>
                  </div>
                  <div className="rounded-3xl bg-white/8 p-4">
                    <p className="text-xs text-emerald-50/60">Water tracked</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{int(dashboard.waterReusedLitres)}</p>
                    <p className="text-xs text-emerald-200">litres reused</p>
                  </div>
                  <div className="rounded-3xl bg-white/8 p-4">
                    <p className="text-xs text-emerald-50/60">Claim status</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{dashboard.claimStatus}</p>
                    <p className="text-xs text-emerald-200">guardrail active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <TopSignal icon={Building2} title="For asset owners" body="Convert landscape maintenance into asset value, tenant narrative, and internal sustainability intelligence." />
            <TopSignal icon={WalletCards} title="For P&L owners" body="Expose water inefficiency, recurring mortality, SLA leakage, and avoidable corrective cost." />
            <TopSignal icon={ShieldCheck} title="For ESG teams" body="Every output carries evidence level, claim boundary, and methodology version." />
          </div>
        </section>
      </div>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-5 py-5 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-5 rounded-[30px] border border-slate-200 bg-white p-3 shadow-sm">
            <div className="px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Workspace</p>
              <p className="mt-2 text-base font-semibold text-slate-950">Sample Campus</p>
              <p className="mt-1 text-xs text-slate-500">Bengaluru · Demo data</p>
            </div>
            <div className="mt-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn("flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition", active ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950")}>
                    <span className="flex items-center gap-3"><Icon className="h-4 w-4" />{tab.label}</span>
                    {active && <ArrowRight className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 rounded-3xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-950">Pilot boundary</p>
              <p className="mt-1 text-xs leading-5 text-emerald-800">Internal estimates only. Certified carbon-credit or offset claims are blocked.</p>
            </div>
          </div>
        </aside>

        <section>
          <nav className="mb-5 flex gap-2 overflow-x-auto rounded-[26px] border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur-xl lg:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn("flex min-w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition", activeTab === tab.key ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100")}>
                  <Icon className="h-4 w-4" />{tab.label}
                </button>
              );
            })}
          </nav>

          {activeTab === "command" && (
            <div>
              <SectionHeader
                eyebrow="Executive Command Center"
                title="One screen for asset value, ESG performance, tenant retention, and operational leakage."
                description="The CEO view is built around business outcomes. Each number is tied to methodology, evidence maturity, and claim-control rules."
                action={<div className="flex flex-wrap gap-2">{["CEO", "ESG", "Workplace", "IFM"].map((item) => <button key={item} onClick={() => setPersona(item)} className={cn("rounded-full px-4 py-2 text-sm font-semibold transition", persona === item ? "bg-slate-950 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50")}>{item}</button>)}</div>}
              />

              <Card className="mb-5 p-5">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div><p className="text-sm font-semibold text-slate-950">{persona} lens</p><p className="mt-1 text-sm leading-6 text-slate-600">{personaCopy[persona]}</p></div>
                  <div className="flex flex-wrap gap-2"><Badge tone="amber">{dashboard.evidenceLevel} · Internal model</Badge><Badge tone="green">Right-to-report enabled</Badge><Badge tone="blue">Snapshot controlled</Badge></div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricTile label="Eligible Internal Contribution" value={`${num(dashboard.internalGreenAssetContributionTco2e, 3)} tCO₂e`} sub="Annual green asset contribution estimate" icon={Trees} tone="green" badge="E0 model" />
                <MetricTile label="Carbon Stock Proxy" value={`${num(dashboard.carbonStockEstimateTco2e, 2)} tCO₂e`} sub="Existing outdoor biomass stock proxy" icon={Cloud} tone="slate" badge="Internal" />
                <MetricTile label="Water Reuse + Avoidance" value={`${int(dashboard.waterReusedLitres + dashboard.freshwaterAvoidedLitres)} L`} sub="Reused + freshwater avoided ledger" icon={Droplets} tone="blue" badge="Measured" />
                <MetricTile label="Cost Leakage Watch" value={inr(dashboard.costLeakageEstimateInr)} sub="Replacement, SLA, water, corrective work" icon={WalletCards} tone="amber" badge="P&L" />
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <Card className="p-5">
                  <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div><p className="text-base font-semibold text-slate-950">Performance trajectory</p><p className="mt-1 text-sm text-slate-500">Contribution, readiness, and leakage movement.</p></div>
                    <Badge tone="green">Snapshot feed</Badge>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={trendData} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
                        <defs><linearGradient id="contributionFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.22} /><stop offset="95%" stopColor="#059669" stopOpacity={0.02} /></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Area type="monotone" dataKey="contribution" stroke="#059669" strokeWidth={3} fill="url(#contributionFill)" name="Eligible tCO₂e" />
                        <Line type="monotone" dataKey="readiness" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} name="Readiness" />
                        <Line type="monotone" dataKey="leakage" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Leakage risk" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <div className="space-y-5">
                  <Card className="p-5">
                    <div className="flex items-center justify-between"><p className="text-base font-semibold text-slate-950">Credit dependency planning</p><Badge tone="amber">Careful use</Badge></div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Planning view only. This does not claim credits are generated or reduced.</p>
                    <div className="mt-5"><TextField label="Target gap / external credit plan (tCO₂e)" type="number" value={carbonGap} onChange={(v) => setCarbonGap(Number(v))} /></div>
                    <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Planning equation</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm"><span>{num(carbonGap, 1)}</span><span>−</span><span>{num(dashboard.internalGreenAssetContributionTco2e, 3)}</span><span>=</span><span className="font-semibold text-emerald-300">{num(updatedExternalCredits, 1)}</span></div>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <p className="text-base font-semibold text-slate-950">CEO narrative</p>
                    <div className="mt-4 space-y-3">
                      {narrative.slice(0, 4).map((line, index) => <div key={line} className="flex gap-3 rounded-2xl bg-slate-50 p-3"><div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</div><p className="text-sm leading-6 text-slate-700">{line}</p></div>)}
                    </div>
                  </Card>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <Card className="p-5"><p className="text-sm font-semibold text-slate-950">Biodiversity-readiness</p><p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">{num(dashboard.biodiversityReadinessScore10, 1)}/10</p><ProgressBar value={dashboard.biodiversityReadinessScore10 * 10} tone="emerald" /><p className="mt-3 text-sm text-slate-500">Native/adaptive share, pollinator support, strata, habitat, and monoculture risk.</p></Card>
                <Card className="p-5"><p className="text-sm font-semibold text-slate-950">Water-to-health index</p><p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">{num(dashboard.waterToHealthIndex100, 0)}/100</p><ProgressBar value={dashboard.waterToHealthIndex100} tone="blue" /><p className="mt-3 text-sm text-slate-500">Connects litres used to actual green asset condition by zone.</p></Card>
                <Card className="p-5"><p className="text-sm font-semibold text-slate-950">Tenant engagement</p><p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">{num(dashboard.tenantEngagementScore100, 0)}/100</p><ProgressBar value={dashboard.tenantEngagementScore100} tone="purple" /><p className="mt-3 text-sm text-slate-500">QR scans, green zone stories, and tenant-facing sustainability pack readiness.</p></Card>
              </div>
            </div>
          )}

          {activeTab === "assets" && (
            <div>
              <SectionHeader eyebrow="Green Asset Register" title="A living system of record for every tree, palm, lawn, green wall, and indoor plant cluster." description="This is the database layer that creates continuity, switching cost, reporting lineage, and asset intelligence from owned greenery." />
              <div className="mb-5 grid gap-4 md:grid-cols-5">{assetPortfolio.map((item) => <SoftCard key={item.type} className="p-4"><p className="text-sm font-medium text-slate-500">{item.type}</p><p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{int(item.value)}</p></SoftCard>)}</div>
              <Card className="overflow-hidden">
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center"><div><p className="text-base font-semibold text-slate-950">Registered green assets</p><p className="mt-1 text-sm text-slate-500">Demo data · replace after actual GTP survey.</p></div><div className="flex flex-wrap gap-2"><Badge tone="green">{demoAssets.length} rows</Badge><Badge tone="blue">{int(demoSnapshot.totalGreenAssets)} units</Badge></div></div>
                <div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Asset ID</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Species</th><th className="px-5 py-4">Health</th><th className="px-5 py-4">Evidence</th><th className="px-5 py-4">Reporting</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{demoAssets.map((asset) => <tr key={asset.assetId} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-950">{asset.assetId}</td><td className="px-5 py-4 text-slate-600">{asset.assetType}</td><td className="px-5 py-4 text-slate-600">{asset.speciesCommonName}</td><td className="px-5 py-4"><Badge tone={asset.healthCondition === "Healthy" ? "green" : "amber"}>{asset.healthCondition}</Badge></td><td className="px-5 py-4"><Badge tone="amber">{asset.evidenceLevel}</Badge></td><td className="px-5 py-4"><Badge tone={asset.reportingRight === "Confirmed" ? "green" : "amber"}>{asset.reportingRight}</Badge></td></tr>)}</tbody></table></div>
              </Card>
            </div>
          )}

          {activeTab === "methodology" && (
            <div>
              <SectionHeader eyebrow="Methodology Engine" title="The formulas stay behind the glass. The outputs stay visible, versioned, and claim-controlled." description="The backend calculation engine separates raw site inputs, calculation snapshots, evidence maturity, and allowed claims." />
              <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <Card className="p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-base font-semibold text-slate-950">Eligible contribution by asset class</p><p className="mt-1 text-sm text-slate-500">Outdoor assets carry the serious carbon story. Indoor remains indicative.</p></div><Badge tone="green">{METHOD_VERSION}</Badge></div>
                  <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={assetMix} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="type" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} /><Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} /><Bar dataKey="value" name="Eligible tCO₂e" radius={[10, 10, 0, 0]}>{assetMix.map((_, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#059669" : "#2563eb"} />)}</Bar></BarChart></ResponsiveContainer></div>
                </Card>
                <div className="space-y-5">
                  <Card className="p-5"><p className="text-base font-semibold text-slate-950">Evidence maturity</p><div className="mt-4 space-y-3">{[["E0", "Internal Model", "Pilot-grade, internal planning only", 25], ["E1", "Expert Reviewed", "Technical review by domain expert", 55], ["E2", "Third-party Reviewed", "External methodology review", 80], ["E3", "Auditor Accepted", "Formal reporting acceptance path", 100]].map(([code, label, body, pct]) => <div key={String(code)} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-950">{code} · {label}</p><Badge tone={code === "E0" ? "amber" : code === "E3" ? "green" : "blue"}>{pct}%</Badge></div><p className="mt-1 text-xs text-slate-500">{body}</p><div className="mt-3"><ProgressBar value={Number(pct)} tone={code === "E0" ? "amber" : "emerald"} /></div></div>)}</div></Card>
                  <Card className="p-5"><p className="text-base font-semibold text-slate-950">Claim-control matrix</p><div className="mt-4 space-y-3">{demoSnapshot.details.claims.slice(0, 4).map((claim) => <div key={claim.kpi} className="rounded-2xl bg-slate-50 p-3"><p className="text-sm font-semibold capitalize text-slate-950">{claim.kpi.replaceAll("_", " ")}</p><p className="mt-1 text-xs leading-5 text-slate-600">Allowed: {claim.allowedLabel}</p><p className="mt-1 text-xs leading-5 text-red-700">Blocked: {claim.prohibitedLabel}</p></div>)}</div></Card>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-5">{moduleReadiness.map((item) => <Card key={item.label} className="p-4"><p className="text-sm font-semibold text-slate-950">{item.label}</p><p className="mt-2 text-2xl font-semibold text-slate-950">{item.value}%</p><ProgressBar value={item.value} tone={item.value > 80 ? "emerald" : item.value > 60 ? "blue" : "amber"} /></Card>)}</div>
            </div>
          )}

          {activeTab === "field" && (
            <div>
              <SectionHeader eyebrow="Field Capture" title="The gardener sees a simple form. The backend gets enterprise-grade data." description="Field users do not see ESG complexity. They scan, select, upload, and submit." />
              <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
                <Card className="overflow-hidden"><div className="bg-slate-950 p-5 text-white"><div className="flex items-center justify-between"><p className="text-base font-semibold">Mobile capture</p><Badge tone="white">Field mode</Badge></div><p className="mt-2 text-sm leading-6 text-white/65">Scan. Select. Upload. Submit.</p></div><div className="space-y-4 p-5"><div className="grid grid-cols-3 gap-2"><button className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-xs font-bold text-slate-700"><QrCode className="mx-auto mb-1 h-4 w-4" />Scan</button><button className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-xs font-bold text-slate-700"><Camera className="mx-auto mb-1 h-4 w-4" />Photo</button><button className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-xs font-bold text-slate-700"><Upload className="mx-auto mb-1 h-4 w-4" />Upload</button></div><TextField label="Zone" value={draftAsset.zone} onChange={(v) => setDraftAsset((d) => ({ ...d, zone: v }))} /><SelectField label="Asset Type" value={draftAsset.assetType} onChange={(v) => setDraftAsset((d) => ({ ...d, assetType: v as AssetType }))} options={["Indoor Plant", "Tree", "Palm", "Shrub", "Hedge", "Lawn", "Groundcover", "Green Wall", "Vertical Garden"]} /><TextField label="Species / Common Name" value={draftAsset.species} onChange={(v) => setDraftAsset((d) => ({ ...d, species: v }))} /><TextField label="Quantity" type="number" value={draftAsset.quantity} onChange={(v) => setDraftAsset((d) => ({ ...d, quantity: Number(v) }))} /><SelectField label="Health Condition" value={draftAsset.health} onChange={(v) => setDraftAsset((d) => ({ ...d, health: v as HealthCondition }))} options={["Healthy", "Average", "Stressed", "Critical"]} /><SelectField label="Evidence Level" value={draftAsset.evidence} onChange={(v) => setDraftAsset((d) => ({ ...d, evidence: v as EvidenceLevel }))} options={["E0", "E1", "E2", "E3"]} /><SelectField label="Reporting Right" value={draftAsset.reportingRight} onChange={(v) => setDraftAsset((d) => ({ ...d, reportingRight: v as ReportingRight }))} options={["Confirmed", "Unclear", "Not Granted"]} /><button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"><Plus className="h-4 w-4" /> Add field record</button></div></Card>
                <div className="space-y-5"><Card className="p-5"><p className="text-base font-semibold text-slate-950">Operational queue</p><div className="mt-4 grid gap-3 md:grid-cols-2">{[["Scan pending assets", "17 QR tags pending field confirmation", QrCode, "amber"], ["Upload closure photos", "2 tickets need after-service images", Camera, "amber"], ["Water reading due", "STP mainline monthly reading due", Droplets, "blue"], ["Health inspection", "Work Floor A low-light cluster", Leaf, "green"]].map(([title, body, Icon, tone]) => <div key={String(title)} className="rounded-3xl border border-slate-100 bg-slate-50 p-4"><div className="mb-3 flex items-center gap-3"><div className="rounded-2xl bg-white p-2 text-slate-700"><Icon className="h-4 w-4" /></div><Badge tone={tone as Tone}>{String(title)}</Badge></div><p className="text-sm leading-6 text-slate-600">{String(body)}</p></div>)}</div></Card><Card className="overflow-hidden"><div className="border-b border-slate-100 p-5"><p className="text-base font-semibold text-slate-950">ITSM evidence feed</p><p className="mt-1 text-sm text-slate-500">Support layer: SLA, ticket status, root cause, and photo evidence.</p></div><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Ticket</th><th className="px-5 py-4">Issue</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">SLA</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{demoTickets.map((ticket) => <tr key={ticket.ticketId}><td className="px-5 py-4 font-semibold text-slate-950">{ticket.ticketId}</td><td className="px-5 py-4 text-slate-600">{ticket.issueType}</td><td className="px-5 py-4"><Badge tone={ticket.status === "Closed" ? "green" : "amber"}>{ticket.status}</Badge></td><td className="px-5 py-4"><Badge tone={ticket.slaBreached ? "red" : "green"}>{ticket.slaBreached ? "Breached" : "Met / Running"}</Badge></td></tr>)}</tbody></table></div></Card></div>
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div>
              <SectionHeader eyebrow="Evidence Studio" title="Basic ESG homework gets automated, but senior ESG review stays in control." description="This is not an uncontrolled chatbot. It is a bounded evidence workflow: missing data, claim checks, summaries, recommendations, and export." />
              <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
                <Card className="p-5"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-3"><div className="rounded-2xl bg-purple-50 p-3 text-purple-700"><Bot className="h-5 w-5" /></div><div><p className="text-base font-semibold text-slate-950">Readiness and claim check</p><p className="text-sm text-slate-500">Generated from structured site records.</p></div></div><Badge tone="purple">Controlled workflow</Badge></div><div className="space-y-3">{narrative.map((finding) => <div key={finding} className="flex items-start gap-3 rounded-3xl bg-slate-50 p-4">{finding.includes("not certified") ? <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" /> : <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />}<p className="text-sm leading-6 text-slate-700">{finding}</p></div>)}</div><div className="mt-5 grid gap-3 md:grid-cols-4">{[[Sparkles, "Generate Summary"], [ShieldCheck, "Check Claims"], [Zap, "Recommend"], [Download, "Export Pack"]].map(([Icon, label]) => <button key={String(label)} className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"><Icon className="h-4 w-4" /> {String(label)}</button>)}</div></Card>
                <div className="space-y-5"><Card className="p-5"><p className="text-base font-semibold text-slate-950">Evidence note</p><p className="mt-3 text-sm leading-6 text-slate-600">During the reporting period, the site maintained {int(demoSnapshot.totalGreenAssets)} registered green assets. Based on {METHOD_VERSION}, the site recorded an eligible internal green asset contribution estimate of {num(dashboard.internalGreenAssetContributionTco2e, 3)} tCO₂e/year at {dashboard.evidenceLevel} evidence level.</p><div className="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">This is an internal planning estimate and not a certified carbon credit or formal offset.</div></Card><Card className="p-5"><div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4"><ShieldAlert className="mt-0.5 h-5 w-5 text-amber-700" /><p className="text-sm leading-6 text-amber-900">Prohibited: “RATH generated carbon credits.” Allowed: “RATH estimated internal green asset contribution, subject to validation and auditor acceptance.”</p></div></Card></div>
              </div>
            </div>
          )}

          {activeTab === "tenant" && (
            <div>
              <SectionHeader eyebrow="Tenant Green Engagement Pack" title="Turn landscape from background aesthetics into tenant-facing sustainability communication." description="This supports retention by giving occupiers visible proof of green asset activity, QR-enabled stories, nature walk points, and monthly snapshots." />
              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <Card className="p-5"><p className="text-base font-semibold text-slate-950">Tenant engagement score</p><p className="mt-3 text-6xl font-semibold tracking-tight text-slate-950">{num(dashboard.tenantEngagementScore100, 0)}</p><p className="mt-1 text-sm text-slate-500">/100 · QR, story cards, green trail points</p><div className="mt-5"><ProgressBar value={dashboard.tenantEngagementScore100} tone="purple" /></div><div className="mt-5 grid grid-cols-2 gap-3"><SoftCard className="p-4"><p className="text-xs text-slate-500">QR scans</p><p className="mt-2 text-2xl font-semibold text-slate-950">{int(demoSnapshot.details.tenantPack.totalQrScans)}</p></SoftCard><SoftCard className="p-4"><p className="text-xs text-slate-500">Story cards</p><p className="mt-2 text-2xl font-semibold text-slate-950">{demoSnapshot.details.tenantPack.storyCards.length}</p></SoftCard></div></Card>
                <Card className="p-5"><p className="text-base font-semibold text-slate-950">Tenant-facing story cards</p><div className="mt-4 grid gap-3 md:grid-cols-2">{demoSnapshot.details.tenantPack.storyCards.map((card) => <div key={card.zoneId} className="rounded-3xl border border-slate-100 bg-slate-50 p-4"><div className="mb-3 flex items-center gap-2"><Eye className="h-4 w-4 text-emerald-700" /><p className="text-sm font-semibold text-slate-950">{card.title}</p></div><p className="text-sm leading-6 text-slate-600">{card.body}</p></div>)}</div><div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white"><p className="text-sm font-semibold">Monthly tenant snapshot</p><p className="mt-2 text-sm leading-6 text-white/70">“This campus maintains a structured green asset register with tracked water reuse, biodiversity-readiness, and internal green asset contribution estimates.”</p></div></Card>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
