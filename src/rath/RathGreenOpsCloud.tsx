import React, { useMemo, useState } from "react";
import {
  AlertTriangle, ArrowRight, BadgeCheck, Building2, ChevronRight, CircleDollarSign,
  Database, Download, Droplets, FileCheck2, Gauge, Leaf, MapPin, Recycle,
  ShieldCheck, Sparkles, Target, Trees, TriangleAlert, WalletCards, Waves
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Funnel,
  FunnelChart, LabelList, PolarAngleAxis, PolarGrid, Radar, RadarChart,
  ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis
} from "recharts";
import {
  METHOD_VERSION, assets, demoSnapshot, executiveNarrative, investmentActions
} from "./domain/engine";

type TabKey = "overview" | "risk" | "nature" | "water" | "evidence";

const navItems: Array<{ key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", label: "Overview", icon: Gauge },
  { key: "risk", label: "Risk Map", icon: MapPin },
  { key: "nature", label: "Nature", icon: Leaf },
  { key: "water", label: "Water", icon: Droplets },
  { key: "evidence", label: "Evidence + Investment", icon: FileCheck2 },
];

const trend = [
  { month: "Jan", nature: 48, water: 52, risk: 71 },
  { month: "Feb", nature: 55, water: 60, risk: 66 },
  { month: "Mar", nature: 61, water: 67, risk: 58 },
  { month: "Apr", nature: 68, water: 73, risk: 51 },
  { month: "May", nature: 76, water: 81, risk: 43 },
];

const natureRadar = Object.entries(demoSnapshot.details.nature.components).map(([key, value]) => ({
  metric: key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()),
  value: Math.round(value as number),
}));

const riskRows = demoSnapshot.details.risk.map((z: any) => ({
  zone: z.name,
  health: Math.round(z.healthRisk),
  water: Math.round(z.waterRisk),
  heat: Math.round(z.heatRisk),
  nature: Math.round(z.natureRisk),
  data: Math.round(z.dataGapRisk),
  score: Math.round(z.priorityScore),
  status: z.status,
  action: z.recommendedAction,
  visible: z.tenantVisible ? "High" : z.highFootfall ? "Medium" : "Low",
}));

const waterRows = demoSnapshot.details.water.map((w: any) => ({
  zone: w.zoneName,
  health: Math.round(w.health),
  index: Math.round(w.score100),
  intensity: Math.round(w.intensity),
  recycled: Math.round(w.recycledShare * 100),
  status: w.status,
}));

const bubbleData = demoSnapshot.details.investments.actions.map((a: any) => ({
  name: a.name,
  cost: Math.round(a.avgCost / 100000),
  impact: Math.round(a.score100),
  visibility: a.tenantImpact === "High" ? 90 : a.tenantImpact === "Medium" ? 55 : 25,
  priority: a.priority,
}));

const funnelData = demoSnapshot.details.funnel.map((f: any) => ({
  name: f.name,
  value: f.count,
  percent: Math.round(f.percent),
}));

function cx(...x: Array<string | false | undefined | null>) {
  return x.filter(Boolean).join(" ");
}
function fmt(n?: number, d = 1) {
  if (!Number.isFinite(n as number)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d }).format(n as number);
}
function int(n?: number) {
  if (!Number.isFinite(n as number)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n as number);
}
function money(n?: number) {
  if (!Number.isFinite(n as number)) return "₹0";
  if ((n as number) >= 100000) return `₹${fmt((n as number) / 100000, 1)}L`;
  return `₹${int(n)}`;
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "green" | "blue" | "amber" | "red" | "purple" | "dark" | "white" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    purple: "bg-purple-50 text-purple-700 ring-purple-200",
    dark: "bg-slate-950 text-white ring-slate-800",
    white: "bg-white/10 text-white ring-white/15",
  };
  return <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tones[tone])}>{children}</span>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("rounded-[28px] border border-slate-200 bg-white shadow-enterprise", className)}>{children}</div>;
}

function Header({ eyebrow, title, desc, action }: { eyebrow: string; title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>
        <h2 className="mt-2 max-w-5xl text-2xl font-semibold tracking-tight text-slate-950 lg:text-3xl">{title}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{desc}</p>
      </div>
      {action}
    </div>
  );
}

function Metric({ label, value, sub, icon: Icon, tone = "green", badge }: {
  label: string; value: string; sub: string; icon: React.ComponentType<{ className?: string }>;
  tone?: "green" | "blue" | "amber" | "purple" | "slate" | "red"; badge?: string;
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <Panel className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-1 text-sm leading-5 text-slate-500">{sub}</p>
          </div>
          <div className={cx("rounded-2xl p-3", tones[tone])}><Icon className="h-5 w-5" /></div>
        </div>
      </div>
      {badge && <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-3"><span className="text-xs text-slate-500">Evidence controlled</span><Badge tone={tone}>{badge}</Badge></div>}
    </Panel>
  );
}

function Progress({ value, tone = "emerald" }: { value: number; tone?: "emerald" | "blue" | "amber" | "purple" | "red" | "slate" }) {
  const fill = { emerald: "bg-emerald-600", blue: "bg-blue-600", amber: "bg-amber-500", purple: "bg-purple-600", red: "bg-red-500", slate: "bg-slate-800" };
  return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={cx("h-full rounded-full", fill[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

function Heat({ value }: { value: number }) {
  const tone = value >= 70 ? "bg-red-100 text-red-800 ring-red-200" : value >= 45 ? "bg-amber-100 text-amber-800 ring-amber-200" : "bg-emerald-100 text-emerald-800 ring-emerald-200";
  return <span className={cx("inline-flex min-w-[54px] justify-center rounded-xl px-2.5 py-1 text-xs font-bold ring-1", tone)}>{value}</span>;
}

function HeroSignal({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200"><Icon className="h-5 w-5" /></div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-emerald-50/65">{body}</p>
    </div>
  );
}

export default function RathGreenOpsCloud() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [carbonGap, setCarbonGap] = useState(1000);
  const projectedExternalCredits = Math.max(carbonGap - demoSnapshot.eligibleContributionTco2e, 0);
  const narrative = executiveNarrative();
  const sortedRisk = useMemo(() => [...demoSnapshot.details.risk].sort((a: any, b: any) => b.priorityScore - a.priorityScore), []);
  const topAction = demoSnapshot.details.investments.actions[0];

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-slate-950">
      <div className="relative overflow-hidden bg-[#07130f]">
        <div className="absolute left-[-14rem] top-[-13rem] h-[36rem] w-[36rem] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[-16rem] top-16 h-[40rem] w-[40rem] rounded-full bg-lime-300/10 blur-3xl" />
        <div className="absolute bottom-[-20rem] left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <header className="relative mx-auto flex max-w-[1520px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-emerald-300 text-emerald-950 shadow-glass"><Leaf className="h-7 w-7" /></div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-white">RATH GreenOps Cloud</h1>
                <Badge tone="white">GTP Pilot Demo</Badge>
              </div>
              <p className="mt-1 text-sm text-emerald-50/60">Green Infrastructure Intelligence · Nature · Water · Risk · Evidence</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="white">{METHOD_VERSION}</Badge>
            <Badge tone="white">{demoSnapshot.evidenceLevel} Evidence</Badge>
            <Badge tone="white">Claim-control active</Badge>
          </div>
        </header>

        <section className="relative mx-auto grid max-w-[1520px] gap-5 px-5 pb-8 lg:grid-cols-[1.28fr_0.72fr]">
          <div className="rounded-[38px] border border-white/10 bg-white/[0.075] p-6 shadow-glass backdrop-blur-2xl lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge tone="white">Asset value protection</Badge>
              <Badge tone="white">Tenant retention narrative</Badge>
              <Badge tone="white">Investment intelligence</Badge>
            </div>
            <div className="mt-7 grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">From maintained landscape to measurable green infrastructure</p>
                <h2 className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">Convert owned greenery into asset intelligence.</h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/70">
                  RATH maps living green assets, scores nature-readiness, links water to landscape health, identifies high-risk zones, and produces claim-safe evidence plus investment recommendations.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between"><p className="text-sm font-semibold text-white">CEO readout</p><Badge tone="white">Live snapshot</Badge></div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white/8 p-4"><p className="text-xs text-emerald-50/60">Maturity</p><p className="mt-2 text-3xl font-semibold text-white">L{demoSnapshot.greenAssetMaturityLevel}</p><p className="text-xs text-emerald-200">of 6 pathway</p></div>
                  <div className="rounded-3xl bg-white/8 p-4"><p className="text-xs text-emerald-50/60">Nature</p><p className="mt-2 text-3xl font-semibold text-white">{fmt(demoSnapshot.natureReadinessScore10, 1)}</p><p className="text-xs text-emerald-200">/10 readiness</p></div>
                  <div className="rounded-3xl bg-white/8 p-4"><p className="text-xs text-emerald-50/60">Risk zones</p><p className="mt-2 text-3xl font-semibold text-white">{demoSnapshot.highRiskZoneCount}</p><p className="text-xs text-emerald-200">intervention zones</p></div>
                  <div className="rounded-3xl bg-white/8 p-4"><p className="text-xs text-emerald-50/60">P1 actions</p><p className="mt-2 text-3xl font-semibold text-white">{demoSnapshot.p1InvestmentActionCount}</p><p className="text-xs text-emerald-200">investment moves</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <HeroSignal icon={Building2} title="For asset owners" body="Convert landscape cost into decision-grade asset intelligence and tenant-facing value." />
            <HeroSignal icon={CircleDollarSign} title="For P&L owners" body="Expose replacement leakage, water inefficiency, recurring failures, and zone-level risk." />
            <HeroSignal icon={ShieldCheck} title="For ESG teams" body="Every output carries evidence level, reporting boundary, and claim-safe language." />
          </div>
        </section>
      </div>

      <main className="mx-auto grid max-w-[1520px] gap-5 px-5 py-5 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-5 rounded-[30px] border border-slate-200 bg-white p-3 shadow-enterprise">
            <div className="px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Product View</p>
              <p className="mt-2 text-base font-semibold text-slate-950">GTP Pilot Asset</p>
              <p className="mt-1 text-xs text-slate-500">Bengaluru · Demo data</p>
            </div>
            <div className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.key;
                return (
                  <button key={item.key} onClick={() => setActiveTab(item.key)} className={cx("flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition", active ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950")}>
                    <span className="flex items-center gap-3"><Icon className="h-4 w-4" />{item.label}</span>
                    {active && <ChevronRight className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 rounded-3xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-950">Demo boundary</p>
              <p className="mt-1 text-xs leading-5 text-emerald-800">Carbon is supporting evidence only. RATH does not issue carbon credits or offsets.</p>
            </div>
          </div>
        </aside>

        <section>
          <nav className="mb-5 flex gap-2 overflow-x-auto rounded-[26px] border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur-xl lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              return <button key={item.key} onClick={() => setActiveTab(item.key)} className={cx("flex min-w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition", activeTab === item.key ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100")}><Icon className="h-4 w-4" />{item.label}</button>;
            })}
          </nav>

          {activeTab === "overview" && (
            <div>
              <Header eyebrow="Executive Overview" title="One screen for asset value, nature-readiness, water performance, risk, evidence, and investment action." desc="This view is designed for the CEO conversation. It deliberately hides operational noise and surfaces business outcomes." action={<Badge tone="dark">GTP Green Infrastructure Intelligence Pilot</Badge>} />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <div className="xl:col-span-2"><Metric label="Green Asset Maturity" value={`Level ${demoSnapshot.greenAssetMaturityLevel}/6`} sub={demoSnapshot.details.maturity.levels[demoSnapshot.greenAssetMaturityLevel].label} icon={Target} tone="green" badge="Pathway" /></div>
                <div className="xl:col-span-2"><Metric label="Nature-Readiness" value={`${fmt(demoSnapshot.natureReadinessScore10, 1)}/10`} sub="Pilot-level nature score, not certified biodiversity" icon={Leaf} tone="green" badge="E0 model" /></div>
                <div className="xl:col-span-2"><Metric label="Water-to-Health" value={`${fmt(demoSnapshot.waterToHealthIndex100, 0)}/100`} sub="Water use linked to actual landscape condition" icon={Droplets} tone="blue" badge="Measured" /></div>
                <div className="xl:col-span-2"><Metric label="High-Risk Zones" value={`${demoSnapshot.highRiskZoneCount}`} sub="Zones needing intervention or investment" icon={TriangleAlert} tone="amber" badge="Risk map" /></div>
                <div className="xl:col-span-2"><Metric label="Data Quality" value={`${fmt(demoSnapshot.dataQualityScore100, 0)}/100`} sub="Inventory, species, photo, water, maintenance coverage" icon={Database} tone="purple" badge="Evidence" /></div>
                <div className="xl:col-span-2"><Metric label="Top Investment Actions" value={`${demoSnapshot.p1InvestmentActionCount} P1`} sub="Prioritized green infrastructure moves" icon={WalletCards} tone="amber" badge="CapEx/Opex" /></div>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <Panel className="p-5">
                  <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div><p className="text-base font-semibold text-slate-950">Green asset performance trajectory</p><p className="mt-1 text-sm text-slate-500">Maturity, nature-readiness, water performance, and risk movement.</p></div>
                    <Badge tone="green">Board-level summary</Badge>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={trend} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Area type="monotone" dataKey="nature" stroke="#059669" strokeWidth={3} fill="#059669" fillOpacity={0.12} name="Nature-readiness" />
                        <Bar dataKey="water" fill="#2563eb" radius={[8, 8, 0, 0]} name="Water-to-health" />
                        <Area type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={2} fill="#f59e0b" fillOpacity={0.03} name="Risk score" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <div className="space-y-5">
                  <Panel className="p-5">
                    <p className="text-base font-semibold text-slate-950">Executive narrative</p>
                    <div className="mt-4 space-y-3">
                      {narrative.slice(0, 4).map((line, index) => (
                        <div key={line} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</div>
                          <p className="text-sm leading-6 text-slate-700">{line}</p>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div><p className="text-base font-semibold text-slate-950">Top recommended action</p><p className="mt-1 text-sm leading-6 text-slate-600">{topAction.name}</p></div>
                      <Badge tone="amber">{topAction.priority}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Cost range</p><p className="mt-1 text-lg font-semibold text-slate-950">{money(topAction.costLow)}–{money(topAction.costHigh)}</p></div>
                      <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Priority score</p><p className="mt-1 text-lg font-semibold text-slate-950">{fmt(topAction.score100, 0)}/100</p></div>
                    </div>
                  </Panel>
                </div>
              </div>
            </div>
          )}

          {activeTab === "risk" && (
            <div>
              <Header eyebrow="Campus Green Asset Risk Map" title="Zone-level risk map for health, water stress, heat exposure, nature weakness, recurring failures, and data gaps." desc="This is the CEO hero visual. It turns landscape from visual maintenance into a risk-and-investment system." action={<Badge tone="amber">{demoSnapshot.highRiskZoneCount} intervention zones</Badge>} />
              <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <Panel className="p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-base font-semibold text-slate-950">Zone heatmap</p><p className="mt-1 text-sm text-slate-500">Green = stable · Amber = watch · Red = intervention.</p></div><Badge tone="dark">Risk score</Badge></div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead><tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500"><th className="px-3 py-3">Zone</th><th className="px-3 py-3">Health</th><th className="px-3 py-3">Water</th><th className="px-3 py-3">Heat</th><th className="px-3 py-3">Nature</th><th className="px-3 py-3">Data</th><th className="px-3 py-3">Priority</th></tr></thead>
                      <tbody>
                        {riskRows.map((row) => (
                          <tr key={row.zone} className="border-b border-slate-100">
                            <td className="px-3 py-4"><p className="font-semibold text-slate-950">{row.zone}</p><p className="mt-1 text-xs text-slate-500">{row.visible} tenant visibility</p></td>
                            <td className="px-3 py-4"><Heat value={row.health} /></td><td className="px-3 py-4"><Heat value={row.water} /></td><td className="px-3 py-4"><Heat value={row.heat} /></td><td className="px-3 py-4"><Heat value={row.nature} /></td><td className="px-3 py-4"><Heat value={row.data} /></td>
                            <td className="px-3 py-4"><Badge tone={row.status === "Intervention" ? "red" : row.status === "Watch" ? "amber" : "green"}>{row.score}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                <div className="space-y-5">
                  {sortedRisk.slice(0, 3).map((zone: any, index: number) => (
                    <Panel key={zone.id} className="p-5">
                      <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-slate-500">Priority #{index + 1}</p><p className="mt-1 text-lg font-semibold text-slate-950">{zone.name}</p><p className="mt-2 text-sm leading-6 text-slate-600">{zone.recommendedAction}</p></div><Badge tone={zone.status === "Intervention" ? "red" : "amber"}>{zone.status}</Badge></div>
                      <div className="mt-4"><Progress value={zone.priorityScore} tone={zone.status === "Intervention" ? "red" : "amber"} /></div>
                    </Panel>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "nature" && (
            <div>
              <Header eyebrow="Nature-Readiness" title="Pilot-level nature-readiness score without overclaiming certified biodiversity." desc="Scores the living asset layer using species diversity, native/adaptive mix, pollinator support, canopy/strata, habitat, water resilience, and health stability." action={<Badge tone="green">{fmt(demoSnapshot.natureReadinessScore10, 1)}/10 current score</Badge>} />
              <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                <Panel className="p-5">
                  <p className="text-base font-semibold text-slate-950">Nature-readiness radar</p>
                  <p className="mt-1 text-sm text-slate-500">Internal score only; not a certification claim.</p>
                  <div className="mt-5 h-[390px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={natureRadar}>
                        <PolarGrid stroke="#cbd5e1" />
                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#475569" }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Radar name="Score" dataKey="value" stroke="#059669" fill="#059669" fillOpacity={0.2} strokeWidth={3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(demoSnapshot.details.nature.components).map(([key, value]) => (
                    <Panel key={key} className="p-5">
                      <p className="text-sm font-medium text-slate-500">{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{fmt(value as number, 1)}</p>
                      <div className="mt-3"><Progress value={(value as number) * 5} tone="emerald" /></div>
                    </Panel>
                  ))}
                </div>
              </div>
              <Panel className="mt-5 p-5">
                <p className="text-base font-semibold text-slate-950">Nature flags</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {demoSnapshot.details.nature.flags.length ? demoSnapshot.details.nature.flags.map((flag: string) => <div key={flag} className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 ring-1 ring-amber-100">{flag}</div>) : <div className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900 ring-1 ring-emerald-100">No major nature-readiness flags.</div>}
                </div>
              </Panel>
            </div>
          )}

          {activeTab === "water" && (
            <div>
              <Header eyebrow="Water-to-Health" title="Most platforms track water consumption. RATH tracks whether water is producing healthy green assets." desc="Connects STP/reused water, baseline consumption, zone health, intensity, stress flags, and overwatering/underwatering signals." action={<Badge tone="blue">{fmt(demoSnapshot.waterToHealthIndex100, 0)}/100 index</Badge>} />
              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <Panel className="p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-base font-semibold text-slate-950">Water-to-health by zone</p><p className="mt-1 text-sm text-slate-500">Healthy landscape outcome per water input.</p></div><Badge tone="blue">{int(demoSnapshot.waterReusedLitres)} L reused</Badge></div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={waterRows} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="zone" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Bar dataKey="index" fill="#2563eb" name="Water-to-health index" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="health" fill="#059669" name="Zone health" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <div className="space-y-5">
                  <Metric label="Reused water" value={`${int(demoSnapshot.waterReusedLitres)} L`} sub="STP / HVAC / recycled source tracking" icon={Recycle} tone="blue" badge="Ledger" />
                  <Metric label="Freshwater avoided" value={`${int(demoSnapshot.freshwaterAvoidedLitres)} L`} sub="Baseline vs actual planning estimate" icon={Waves} tone="green" badge="Internal" />
                  <Metric label="Water leakage watch" value={money(demoSnapshot.details.costs.waterIneff)} sub="Inefficiency linked to zone health" icon={TriangleAlert} tone="amber" badge="P&L" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div>
              <Header eyebrow="Evidence + Investment" title="Evidence pack, claim-control, data quality, and green infrastructure investment recommendations." desc="This is where the platform becomes board-useful. It converts raw field data into forwardable evidence and prioritized investment action." action={<Badge tone="purple">{demoSnapshot.claimStatus} claim status</Badge>} />
              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <Panel className="p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-base font-semibold text-slate-950">Evidence maturity funnel</p><p className="mt-1 text-sm text-slate-500">Shows what is usable, missing, and E1-ready.</p></div><Badge tone="purple">{fmt(demoSnapshot.dataQualityScore100, 0)}/100 quality</Badge></div>
                  <div className="h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <FunnelChart>
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Funnel dataKey="value" data={funnelData} isAnimationActive fill="#059669">
                          <LabelList position="right" fill="#334155" stroke="none" dataKey="name" />
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <Panel className="p-5">
                  <p className="text-base font-semibold text-slate-950">Claim-control guardrails</p>
                  <div className="mt-4 space-y-3">
                    {demoSnapshot.details.claims.slice(0, 5).map((claim: any) => (
                      <div key={claim.kpi} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold capitalize text-slate-950">{claim.kpi.replaceAll("_", " ")}</p><Badge tone="amber">{claim.status}</Badge></div>
                        <p className="mt-2 text-xs leading-5 text-slate-600">Allowed: {claim.allowed}</p>
                        <p className="mt-1 text-xs leading-5 text-red-700">Blocked: {claim.blocked}</p>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <Panel className="p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-base font-semibold text-slate-950">Green Infrastructure Investment Planner</p><p className="mt-1 text-sm text-slate-500">Investment required vs strategic impact. Bubble size indicates tenant visibility.</p></div><Badge tone="amber">{demoSnapshot.p1InvestmentActionCount} P1 actions</Badge></div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 10, right: 18, bottom: 10, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="cost" name="Cost" unit="L" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <YAxis dataKey="impact" name="Impact" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <ZAxis dataKey="visibility" range={[120, 780]} />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Scatter name="Actions" data={bubbleData} fill="#059669">
                          {bubbleData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.priority === "P1" ? "#059669" : entry.priority === "P2" ? "#2563eb" : "#f59e0b"} />)}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <Panel className="overflow-hidden">
                  <div className="border-b border-slate-100 p-5"><p className="text-base font-semibold text-slate-950">Recommended actions</p><p className="mt-1 text-sm text-slate-500">Cost, impact, status, and priority.</p></div>
                  <div className="divide-y divide-slate-100">
                    {demoSnapshot.details.investments.actions.map((action: any) => (
                      <div key={action.id} className="p-5">
                        <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-950">{action.name}</p><p className="mt-1 text-xs leading-5 text-slate-500">Priority calculated from risk, water, nature, tenant, evidence uplift, and feasibility.</p></div><Badge tone={action.priority === "P1" ? "green" : action.priority === "P2" ? "blue" : "amber"}>{action.priority}</Badge></div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Cost</p><p className="text-sm font-semibold text-slate-950">{money(action.costLow)}–{money(action.costHigh)}</p></div>
                          <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Score</p><p className="text-sm font-semibold text-slate-950">{fmt(action.score100, 0)}</p></div>
                          <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Status</p><p className="text-sm font-semibold text-slate-950">{action.status}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <Panel className="mt-5 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div><p className="text-base font-semibold text-slate-950">Evidence pack output</p><p className="mt-1 text-sm leading-6 text-slate-600">Executive summary, methodology note, claim-safe language, missing-data flags, tenant-facing green summary, and investment action list.</p></div>
                  <div className="flex flex-wrap gap-2">
                    <button className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm"><Download className="h-4 w-4" /> Export pack</button>
                    <button className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm"><Sparkles className="h-4 w-4" /> Generate summary</button>
                  </div>
                </div>
              </Panel>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
