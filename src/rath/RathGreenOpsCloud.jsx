import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Cloud,
  Database,
  Download,
  Droplets,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Gauge,
  Layers,
  Leaf,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Recycle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Wallet,
  Waves,
  X,
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
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  METHOD_VERSION,
  authenticateDemoUser,
  buildAiPayload,
  dashboardCopy,
  demoCredentials,
  getBoardNarrative,
  getRoleMetrics,
  roleViews,
  snapshot,
} from "./domain/engine.js";

const iconByView = {
  value: Gauge,
  risk: MapPin,
  natureWater: Leaf,
  carbonResource: Recycle,
  investment: Wallet,
  boardPack: FileText,
  evidence: FileCheck2,
  leap: Layers,
  dataQuality: Database,
  claimSafety: ShieldCheck,
  methodology: ClipboardCheck,
  exports: Download,
  control: Activity,
  zoneHealth: Leaf,
  tickets: ClipboardList,
  waterStress: Droplets,
  recurring: AlertTriangle,
  serviceReport: FileText,
};

const periods = ["Current Snapshot", "30-Day Pilot"];

function cx(...items) {
  return items.filter(Boolean).join(" ");
}

function formatNumber(value, decimals = 0) {
  if (value === undefined || !Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

function formatCurrency(value) {
  if (!value || !Number.isFinite(value)) return "₹0";
  if (value >= 100000) return `₹${formatNumber(value / 100000, 1)}L`;
  return `₹${formatNumber(value, 0)}`;
}

function Badge({ children, tone = "slate" }) {
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

  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 sm:text-xs", tones[tone])}>
      {children}
    </span>
  );
}

function Button({ children, onClick, variant = "dark", className = "", disabled }) {
  const styles = {
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    light: "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx("inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60", styles[variant], className)}
    >
      {children}
    </button>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={cx("rounded-[24px] border border-slate-200/80 bg-white/95 shadow-enterprise backdrop-blur sm:rounded-[30px]", className)}>
      {children}
    </div>
  );
}

function MetricCard({ label, value, sub, tone = "green", icon: Icon, detail }) {
  const [open, setOpen] = useState(false);
  const toneClasses = {
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-50 text-red-700",
    dark: "bg-slate-950 text-white",
  };

  return (
    <Panel className="relative overflow-visible">
      <button type="button" onClick={() => setOpen(!open)} className="block w-full p-4 text-left sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{value}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{sub}</p>
            {detail && <p className="mt-2 text-[11px] font-semibold text-emerald-700">Click for method and action</p>}
          </div>
          <div className={cx("rounded-2xl p-2.5 sm:p-3", toneClasses[tone])}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
      </button>
      {open && detail && (
        <div className="absolute left-4 right-4 top-[calc(100%-8px)] z-30 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-600 shadow-2xl">
          <div className="grid gap-2">
            <p><span className="font-semibold text-slate-950">Definition:</span> {detail.definition}</p>
            <p><span className="font-semibold text-slate-950">Formula:</span> {detail.formula}</p>
            <p><span className="font-semibold text-slate-950">Source:</span> {detail.source}</p>
            <p><span className="font-semibold text-slate-950">Evidence:</span> {detail.evidence}</p>
            <p><span className="font-semibold text-slate-950">Action:</span> {detail.action}</p>
          </div>
        </div>
      )}
    </Panel>
  );
}

function Progress({ value, tone = "green" }) {
  const fill = {
    green: "bg-emerald-600",
    blue: "bg-blue-600",
    amber: "bg-amber-500",
    purple: "bg-purple-600",
    red: "bg-red-500",
    slate: "bg-slate-700",
    dark: "bg-slate-950",
  };

  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={cx("h-full rounded-full", fill[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-xs">{eyebrow}</p>
        <h2 className="mt-2 max-w-5xl text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

function LoginPortal({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");

  function login() {
    const user = authenticateDemoUser(email, pin);
    if (!user) {
      setError("Invalid pilot access. Please check the email and PIN shared for this workspace.");
      return;
    }
    onLogin(user);
  }

  return (
    <div className="min-h-screen bg-[#07130f] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-48 -right-44 h-[36rem] w-[36rem] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-emerald-300 text-emerald-950 shadow-2xl">
                <Leaf className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight">RATH Green Infrastructure Intelligence</p>
                <p className="text-sm text-emerald-50/60">Resource & Asset Traceability Hub</p>
              </div>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Enterprise green asset intelligence</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
              A board-grade system for living infrastructure.
            </h1>
            <p className="mt-5 text-base leading-7 text-emerald-50/70">
              CEO, ESG, and property operations teams get different intelligence from the same governed green asset layer.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {demoCredentials.map((item) => (
                <button
                  key={item.displayName}
                  onClick={() => {
                    setEmail("");
                    setPin("");
                    setError("");
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-left backdrop-blur transition hover:border-emerald-300/50 hover:bg-white/[0.1]"
                >
                  <p className="text-sm font-semibold">{item.displayName}</p>
                  <p className="mt-3 text-xs leading-5 text-emerald-50/55">{item.summary}</p>
                </button>
              ))}
            </div>
          </div>

          <Panel className="bg-white/[0.08] p-5 text-white shadow-glass ring-1 ring-white/10 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">Sign in to workspace</p>
                <p className="mt-1 text-sm text-emerald-50/60">Role-based green asset intelligence for the approved pilot workspace</p>
              </div>
              <Lock className="h-5 w-5 text-emerald-200" />
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-emerald-50/70">Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none" />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-emerald-50/70">PIN</span>
                <div className="relative mt-1">
                  <input type={showPin ? "text" : "password"} value={pin} onChange={(e) => setPin(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none" />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/70">
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              {error && <div className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-100 ring-1 ring-red-400/20">{error}</div>}

              <Button onClick={login} variant="green" className="w-full">
                Enter Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 rounded-3xl bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">AI-powered executive insights</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                Role-specific summaries generated from governed green asset data for review before external use.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function AiPanel({ role, view }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const response = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, view, provider: "auto", payload: buildAiPayload(role, view) }),
      });
      const data = await response.json();
      setSummary(data.summary || "No executive summary generated.");
      setOpen(true);
    } catch {
      setSummary("Executive summary unavailable. Use the board pack, risk map, carbon/resource impact, and claim boundary sections for manual review.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Panel className="overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-950 p-4 text-white sm:p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-300/15 p-2 text-emerald-200">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Insight Layer</p>
              <p className="text-xs text-slate-300">Role-specific summary · claim-safe · human review required</p>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <Button onClick={generate} disabled={loading} variant="green" className="w-full">
            <Sparkles className="h-4 w-4" /> {loading ? "Generating..." : "Generate Executive Summary"}
          </Button>
          <div className="mt-4 rounded-3xl bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              Generate a role-specific summary covering what matters, concern areas, what not to claim, and next action.
            </p>
          </div>
          <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-900 ring-1 ring-amber-100">
            AI drafts explanations. Final client-facing claims must follow the methodology and claim boundary.
          </div>
        </div>
      </Panel>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-slate-950/30 p-4 backdrop-blur-sm sm:p-6">
          <Panel className="max-h-[90vh] w-full max-w-2xl overflow-auto p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-950">Executive Summary</p>
                <p className="mt-1 text-sm text-slate-500">Claim-safe draft for internal review.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-2xl bg-slate-100 p-2 text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 whitespace-pre-line rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{summary}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="light" onClick={() => navigator.clipboard?.writeText(summary)}>Copy summary</Button>
              <Button variant="dark" onClick={() => window.print()}><Download className="h-4 w-4" /> Add to Board Pack</Button>
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}

function ValueOverview({ role, view, period }) {
  const metrics = getRoleMetrics(role);
  const icons = [Gauge, Leaf, Droplets, AlertTriangle, Users, Wallet];

  return (
    <div>
      <SectionHeader
        eyebrow={dashboardCopy[role].productName}
        title={dashboardCopy[role].hero}
        description={`This is the ${dashboardCopy[role].purpose.toLowerCase()} view. It avoids operational clutter and shows only decision-grade signals.`}
        action={<Badge tone="dark">{period} view</Badge>}
      />

      <div className={cx("grid gap-4", role === "CEO" ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4")}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            sub={metric.sub}
            tone={metric.tone}
            icon={icons[index] || Gauge}
            detail={{
              definition: "Role-level decision signal for the current pilot snapshot.",
              formula: "Composite score from mapped inventory, zone health, risk, water, data quality, and action priority.",
              source: "Pilot inventory, zone risk table, water ledger, tickets, and evidence records.",
              evidence: `${snapshot.evidenceLevel} internal model`,
              action: "Click into the relevant module to see risk, evidence, and recommended action."
            }}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <Panel className="p-4 sm:p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-base font-semibold text-slate-950">Green infrastructure value trajectory</p>
              <p className="mt-1 text-sm text-slate-500">Value, nature, water, tenant readiness, and risk movement.</p>
            </div>
            <Badge tone="green">Board-grade</Badge>
          </div>
          <div className="h-[270px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={snapshot.trends} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Area dataKey="value" name="Value score" type="monotone" fill="url(#valueFill)" stroke="#059669" strokeWidth={2} />
                <Bar dataKey="water" name="Water-to-health" fill="#2563eb" radius={[5, 5, 0, 0]} />
                <Line dataKey="risk" name="Risk score" type="monotone" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <AiPanel role={role} view={view} />
      </div>
    </div>
  );
}

function RiskPill({ value }) {
  return <Badge tone={value >= 70 ? "red" : value >= 45 ? "amber" : "green"}>{value}</Badge>;
}

function RiskMapView() {
  const [selectedZoneId, setSelectedZoneId] = useState(snapshot.zones.find((z) => z.status === "Intervention")?.id || snapshot.zones[0]?.id);
  const selectedZone = snapshot.zones.find((z) => z.id === selectedZoneId) || snapshot.zones[0];

  return (
    <div>
      <SectionHeader
        eyebrow="Green Asset Risk Map"
        title="High-risk zones across health, water stress, heat, nature weakness, and data gaps."
        description="Every intervention count is clickable and tied to a zone, reason, evidence, priority, and recommended action."
        action={<button onClick={() => setSelectedZoneId(selectedZone.id)} className="rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">{snapshot.summary.highRiskGreenZones} intervention zone</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="overflow-hidden">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <p className="text-base font-semibold text-slate-950">Zone risk table</p>
            <p className="mt-1 text-sm text-slate-500">Click a zone to see why it is intervention, watch, or stable.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[780px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Health</th>
                  <th className="px-4 py-3">Water</th>
                  <th className="px-4 py-3">Heat</th>
                  <th className="px-4 py-3">Nature</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Risk Score</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.zones.map((zone) => (
                  <tr key={zone.id} onClick={() => setSelectedZoneId(zone.id)} className={cx("cursor-pointer border-b border-slate-100 transition hover:bg-slate-50", selectedZoneId === zone.id && "bg-emerald-50/70")}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-950">{zone.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{zone.tenantVisibility} tenant visibility</p>
                    </td>
                    {[zone.healthRisk, zone.waterStressRisk, zone.heatExposureRisk, zone.natureWeaknessRisk, zone.dataGapRisk].map((v, i) => (
                      <td key={i} className="px-4 py-4"><RiskPill value={v} /></td>
                    ))}
                    <td className="px-4 py-4"><Badge tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"}>{zone.riskScore}/100</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-semibold text-slate-950">{selectedZone.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedZone.reason}</p>
              </div>
              <Badge tone={selectedZone.status === "Intervention" ? "red" : selectedZone.status === "Watch" ? "amber" : "green"}>{selectedZone.status}</Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Risk Score</p><p className="text-lg font-semibold text-slate-950">{selectedZone.riskScore}/100</p></div>
              <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Priority</p><p className="text-lg font-semibold text-slate-950">{selectedZone.priority}</p></div>
              <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Cost Range</p><p className="text-lg font-semibold text-slate-950">{selectedZone.costRange}</p></div>
              <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Evidence</p><p className="text-sm font-semibold text-slate-950">{selectedZone.evidence}</p></div>
            </div>
            <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950 ring-1 ring-emerald-100">
              <span className="font-semibold">Recommended action:</span> {selectedZone.recommendedAction}
            </div>
          </Panel>
          {snapshot.zones.map((zone) => (
            <button key={zone.id} onClick={() => setSelectedZoneId(zone.id)} className="block w-full rounded-[24px] border border-slate-200/80 bg-white/95 p-4 text-left shadow-enterprise transition hover:-translate-y-0.5 hover:shadow-lift sm:rounded-[30px] sm:p-5">
              <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-950">{zone.name}</p><Badge tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"}>{zone.riskScore}/100</Badge></div>
              <div className="mt-3"><Progress value={zone.riskScore} tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"} /></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NatureWaterView() {
  const radarData = snapshot.nature.components.map((item) => ({
    metric: item.label,
    value: item.value,
  }));

  return (
    <div>
      <SectionHeader
        eyebrow="Nature + Water Intelligence"
        title={`Nature-Readiness Score: ${snapshot.summary.natureReadinessScore}/100`}
        description="Internal pilot score based on species diversity, native/adaptive share, canopy layering, pollinator support, habitat potential, water resilience, health stability, and risk control. Not certified biodiversity."
        action={<div className="rounded-3xl bg-emerald-50 px-5 py-3 text-right ring-1 ring-emerald-200"><p className="text-xs font-semibold text-emerald-700">Nature-Readiness Score</p><p className="text-2xl font-semibold text-emerald-900">{snapshot.summary.natureReadinessScore}/100</p></div>}
      />

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Nature-readiness radar</p>
          <p className="mt-1 text-sm text-slate-500">Internal score only; not certified biodiversity.</p>
          <div className="mt-5 h-[330px] sm:h-[470px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#475569" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Radar name="Score" dataKey="value" stroke="#059669" fill="#059669" fillOpacity={0.22} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2">
          {snapshot.nature.components.map((item) => (
            <Panel key={item.key} className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <Badge tone="slate">Weight {item.max}%</Badge>
              </div>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(item.value, 1)}<span className="text-base text-slate-400">/{item.max}</span></p>
              <div className="mt-3">
                <Progress value={(item.value / item.max) * 100} tone={item.value / item.max > 0.7 ? "green" : item.value / item.max > 0.4 ? "amber" : "red"} />
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">{item.concern}</p>
            </Panel>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Water-to-health by zone</p>
          <p className="mt-1 text-sm text-slate-500">Water is valuable only when it produces healthy landscape outcome.</p>
          <div className="mt-4 h-[280px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={snapshot.water} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="zone" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="index" name="Water-to-health" fill="#2563eb" radius={[5, 5, 0, 0]} />
                <Bar dataKey="health" name="Zone health" fill="#059669" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <MetricCard label="Reused Water" value={`${formatNumber(snapshot.summary.waterReusedLitres)} L`} sub="STP / HVAC / recycled source tracking" icon={Recycle} tone="blue" />
          <MetricCard label="Freshwater Avoided" value={`${formatNumber(snapshot.summary.freshwaterAvoidedLitres)} L`} sub="Baseline vs internal estimate" icon={Waves} tone="green" />
        </div>
      </div>
    </div>
  );
}

function CarbonResourceView() {
  const s = snapshot.summary;
  const totalWater = s.waterReusedLitres + s.freshwaterAvoidedLitres;
  const carbonCards = [
    {
      label: "Annual Green Asset Contribution Estimate",
      value: `${s.eligibleInternalContributionTco2e} tCO₂e`,
      sub: "Internal annual contribution estimate",
      tone: "green",
      icon: Leaf,
      detail: {
        definition: "Conservative annual CO₂e contribution from mapped green assets for internal planning.",
        formula: "Eligible contribution = mapped annual proxy × eligibility and evidence-control factor.",
        source: "Tree/plant inventory, species group, size class, health condition, and evidence level.",
        evidence: `${snapshot.evidenceLevel} internal model; not certified sequestration`,
        action: "Upgrade DBH/girth, height, canopy and health measurements to move from E0 to E1."
      }
    },
    {
      label: "Carbon Stock Proxy",
      value: `${s.carbonStockProxyTco2e} tCO₂e`,
      sub: "Existing outdoor biomass stock proxy",
      tone: "slate",
      icon: Cloud,
      detail: {
        definition: "Estimated carbon currently stored in existing woody biomass.",
        formula: "Stock proxy = species/size-class biomass factor × mapped asset count × condition factor.",
        source: "Mapped trees, palms, shrubs and outdoor biomass inventory.",
        evidence: `${snapshot.evidenceLevel} internal model`,
        action: "Capture DBH/girth and canopy spread for each tree to strengthen confidence."
      }
    },
    {
      label: "Water Reuse + Freshwater Avoidance",
      value: `${formatNumber(totalWater)} L`,
      sub: "Reused water plus freshwater avoided ledger",
      tone: "blue",
      icon: Droplets,
      detail: {
        definition: "Water use linked to landscape health and freshwater avoidance.",
        formula: "Total ledger = reused water + estimated freshwater avoided against baseline.",
        source: "STP/HVAC/recycled water logs, irrigation observations and zone health data.",
        evidence: "Measured where logged; otherwise internal estimate",
        action: "Add meter or irrigation-log linkage for weak zones."
      }
    },
    {
      label: "Cost Leakage Watch",
      value: formatCurrency(s.costLeakageEstimateInr),
      sub: "Replacement, SLA, water and corrective work leakage",
      tone: "amber",
      icon: Wallet,
      detail: {
        definition: "Preventable cost leakage from repeated issues, replacements, SLA misses and corrective work.",
        formula: "Leakage = repeat issue count × estimated correction cost + replacement/SLA risk.",
        source: "Tickets, recurring issues, replacement logs and service reports.",
        evidence: "Internal operating estimate",
        action: "Prioritize P1 intervention zones and recurring issue root causes."
      }
    },
  ];

  const trajectory = snapshot.trends.map((item, index) => ({
    ...item,
    contribution: Number((0.09 + index * 0.018).toFixed(3)),
    leakage: item.risk,
    readiness: item.quality,
  }));

  return (
    <div>
      <SectionHeader
        eyebrow="Carbon + Resource Impact"
        title="Carbon, water, and leakage intelligence without overclaiming."
        description="This is a planning and internal-supporting-estimate view. It does not create carbon credits, offsets, or certified sequestration claims."
        action={<Badge tone="amber">Claim-controlled</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {carbonCards.map((card) => <MetricCard key={card.label} {...card} />)}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-4 sm:p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-base font-semibold text-slate-950">Performance trajectory</p>
              <p className="mt-1 text-sm text-slate-500">Contribution, readiness, and leakage movement.</p>
            </div>
            <Badge tone="green">Snapshot feed</Badge>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trajectory} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Line dataKey="readiness" name="Readiness" type="monotone" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="leakage" name="Leakage risk" type="monotone" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="contribution" name="Eligible tCO₂e" type="monotone" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-semibold text-slate-950">Credit dependency planning</p>
              <Badge tone="amber">Careful use</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Planning view only. This does not claim credits are generated or reduced.</p>
            <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Planning equation</p>
              <p className="mt-4 text-lg font-semibold">1,000.0 − {s.eligibleInternalContributionTco2e} = <span className="text-emerald-300">{formatNumber(1000 - s.eligibleInternalContributionTco2e, 1)}</span> tCO₂e</p>
            </div>
          </Panel>
          <Panel className="p-4 sm:p-5">
            <p className="text-base font-semibold text-slate-950">Claim boundary</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Carbon values are internal supporting estimates and do not constitute carbon credits, offsets, or certified sequestration unless upgraded through third-party review.</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function InvestmentView() {
  const bubble = snapshot.investments.map((item) => ({
    name: item.action,
    cost: Math.round((item.costLow + item.costHigh) / 2 / 100000),
    impact: item.score,
    size: item.priority === "P1" ? 90 : 60,
    priority: item.priority,
  }));

  return (
    <div>
      <SectionHeader
        eyebrow="Green Infrastructure Investment Planner"
        title="Where capital should go, and why."
        description="This converts green zones into cost, impact, tenant visibility, and risk-reduction decisions."
        action={<Badge tone="amber">{snapshot.summary.recommendedInvestmentActions} recommended actions</Badge>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Risk-adjusted action priority</p>
          <p className="mt-1 text-sm text-slate-500">X-axis = cost band in lakhs. Y-axis = impact score.</p>
          <div className="mt-4 h-[300px] sm:h-[390px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 12, right: 12, bottom: 10, left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="cost" name="Cost" unit="L" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis dataKey="impact" name="Impact" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <ZAxis dataKey="size" range={[120, 620]} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Scatter data={bubble}>
                  {bubble.map((entry, index) => (
                    <Cell key={index} fill={entry.priority === "P1" ? "#059669" : "#f59e0b"} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <p className="text-base font-semibold text-slate-950">Investment action list</p>
            <p className="mt-1 text-sm text-slate-500">Designed for a fund or asset-owner decision.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {snapshot.investments.map((item) => (
              <div key={item.action} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.action}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">ESG {item.esg} · Tenant {item.tenant} · Water {item.water} · Risk {item.risk}</p>
                  </div>
                  <Badge tone={item.priority === "P1" ? "green" : "amber"}>{item.priority}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-500">Cost</p>
                    <p className="text-sm font-semibold text-slate-950">{formatCurrency(item.costLow)}–{formatCurrency(item.costHigh)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-500">Priority score</p>
                    <p className="text-sm font-semibold text-slate-950">{item.score}/100</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function BoardPackView({ role, view }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Board Evidence Pack"
        title="A forwardable asset-level summary for internal use."
        description="A controlled narrative with evidence level, claim boundaries, and investment actions."
        action={<Badge tone="amber">Evidence controlled</Badge>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Board narrative</p>
          <div className="mt-4 space-y-3">
            {getBoardNarrative().map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</div>
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </Panel>
        <AiPanel role={role} view={view} />
      </div>
    </div>
  );
}

function EvidenceFunnel() {
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">Evidence maturity funnel</p>
      <p className="mt-1 text-sm text-slate-500">Shows what is ready and what is not.</p>
      <div className="mt-4 space-y-3">
        {snapshot.evidenceFunnel.map((stage) => (
          <div key={stage.stage} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{stage.stage}</p>
                <p className="text-xs text-slate-500">{stage.percent}% of green zones</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950 ring-1 ring-slate-200">{stage.count}</span>
            </div>
            <div className="mt-3">
              <Progress value={stage.percent} tone={stage.percent >= 80 ? "green" : stage.percent >= 50 ? "amber" : "red"} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DataQualityTable() {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-base font-semibold text-slate-950">Green Asset Data Quality Score</p>
        <p className="mt-1 text-sm text-slate-500">Completeness and missing evidence by category.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Gap</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.dataQuality.map((item) => (
              <tr key={item.area} className="border-b border-slate-100">
                <td className="px-4 py-4 font-semibold text-slate-950">{item.area}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 text-sm font-semibold">{item.score}</span>
                    <div className="w-28">
                      <Progress value={item.score} tone={item.score >= 80 ? "green" : item.score >= 65 ? "amber" : "red"} />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><Badge tone={item.status === "Complete" ? "green" : item.status === "Usable" ? "amber" : "red"}>{item.status}</Badge></td>
                <td className="px-4 py-4 text-slate-600">{item.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function EvidenceOverview() {
  return (
    <div>
      <SectionHeader
        eyebrow="Evidence & Nature-Readiness Studio"
        title="Evidence maturity, data quality, and claim safety."
        description="This ESG workspace separates raw data, internal estimates, defensible evidence, and claims."
        action={<Badge tone="purple">{snapshot.summary.dataQualityScore}/100 data quality</Badge>}
      />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <EvidenceFunnel />
        <DataQualityTable />
      </div>
    </div>
  );
}

function LeapMapping() {
  return (
    <div>
      <SectionHeader
        eyebrow="LEAP-Aligned Nature Baseline"
        title="Locate, Evaluate, Assess, Prepare — adapted for living green assets."
        description="Internal alignment support, not formal TNFD compliance."
        action={<Badge tone="blue">Nature baseline</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.leap.map((item) => (
          <Panel key={item.stage} className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-slate-500">{item.stage}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{item.score}/100</p>
            <div className="mt-3">
              <Progress value={item.score} tone={item.score >= 80 ? "green" : item.score >= 60 ? "amber" : "red"} />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">{item.output}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function ClaimSafety() {
  return (
    <div>
      <SectionHeader
        eyebrow="Claim Safety Review"
        title="What can be said, and what must be blocked."
        description="This protects the client from ESG overclaiming."
        action={<Badge tone="amber">Restricted</Badge>}
      />
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Allowed</th>
                <th className="px-4 py-3">Blocked</th>
                <th className="px-4 py-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.claims.map((item) => (
                <tr key={item.topic} className="border-b border-slate-100">
                  <td className="px-4 py-4 font-semibold text-slate-950">{item.topic}</td>
                  <td className="px-4 py-4 text-slate-700">{item.allowed}</td>
                  <td className="px-4 py-4 text-red-700">{item.blocked}</td>
                  <td className="px-4 py-4"><Badge tone={item.risk.startsWith("High") ? "red" : "amber"}>{item.risk}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function Methodology() {
  return (
    <div>
      <SectionHeader
        eyebrow="Methodology Library"
        title="Assumptions, boundaries, and evidence levels."
        description="This is where ESG and auditors understand the calculation boundary."
        action={<Badge tone="dark">{METHOD_VERSION}</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.methodology.map((item) => (
          <Panel key={item.module} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-950">{item.module}</p>
                <p className="mt-1 text-sm text-slate-500">{item.boundary}</p>
              </div>
              <Badge tone="amber">{item.confidence}</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">{item.note}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function Exports() {
  return (
    <div>
      <SectionHeader
        eyebrow="Export Studio"
        title="Generate outputs for existing ESG and FM workflows."
        description="The product should reduce work, not create another isolated reporting system."
        action={<Badge tone="green">Export ready</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Board Evidence Pack", "PDF", "CEO-forwardable summary with claim boundary."],
          ["ESG Evidence Register", "Excel / CSV", "Data quality, evidence funnel, and methodology notes."],
          ["FM Service Report", "PDF", "Tickets, SLA, actions, and closure proof."],
        ].map(([title, type, body]) => (
          <Panel key={title} className="p-4 sm:p-5">
            <Download className="h-5 w-5 text-emerald-700" />
            <p className="mt-4 text-base font-semibold text-slate-950">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{type}</p>
            <p className="mt-4 text-sm leading-6 text-slate-700">{body}</p>
            <Button variant="light" className="mt-4 w-full">
              Preview export
            </Button>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function TicketBoard() {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-base font-semibold text-slate-950">Tickets + SLA board</p>
        <p className="mt-1 text-sm text-slate-500">Every issue gets status, owner, and proof.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Ticket</th>
              <th className="px-4 py-3">Zone</th>
              <th className="px-4 py-3">Issue</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">SLA</th>
              <th className="px-4 py-3">Proof</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-slate-100">
                <td className="px-4 py-4 font-semibold text-slate-950">{ticket.id}</td>
                <td className="px-4 py-4 text-slate-700">{ticket.zone}</td>
                <td className="px-4 py-4 text-slate-700">{ticket.issue}</td>
                <td className="px-4 py-4"><Badge tone={ticket.status === "Closed" ? "green" : "amber"}>{ticket.status}</Badge></td>
                <td className="px-4 py-4"><Badge tone={ticket.sla === "Breached" ? "red" : "green"}>{ticket.sla}</Badge></td>
                <td className="px-4 py-4 text-slate-700">{ticket.proof}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function OperationsControl({ role, view }) {
  return (
    <div>
      <SectionHeader
        eyebrow="GreenOps Control Center"
        title="Execution, SLA, proof, and leakage control."
        description="This is where IFM and property teams get operating clarity without board-level ESG language."
        action={<Badge tone="blue">Operations</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {getRoleMetrics(role).map((item, index) => (
          <MetricCard key={item.label} label={item.label} value={item.value} sub={item.sub} tone={item.tone} icon={[ClipboardList, ShieldCheck, AlertTriangle, Wallet][index] || Activity} />
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <TicketBoard />
        <AiPanel role={role} view={view} />
      </div>
    </div>
  );
}

function RecurringIssues() {
  return (
    <div>
      <SectionHeader
        eyebrow="Recurring Issue Intelligence"
        title="Root-cause leakage instead of repeated patchwork."
        description="This converts repeated site problems into objective operating intelligence."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Recurring issue Pareto</p>
          <div className="mt-4 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={snapshot.recurringIssues} layout="vertical" margin={{ top: 10, right: 18, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis type="category" dataKey="rootCause" width={120} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="count" fill="#059669" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Leakage estimate</p>
          <div className="mt-4 space-y-3">
            {snapshot.recurringIssues.map((item) => (
              <div key={item.rootCause} className="rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{item.rootCause}</p>
                  <Badge tone="amber">{formatCurrency(item.leakageInr)}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{item.count} repeat event(s)</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ServiceReport() {
  return (
    <div>
      <SectionHeader
        eyebrow="Weekly Service Report"
        title="Simple export for FM meetings."
        description="This is operational, direct, and non-ESG-heavy."
        action={<Button variant="dark"><Download className="h-4 w-4" /> Export report</Button>}
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <TicketBoard />
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Vendor performance</p>
          <div className="mt-4 space-y-4">
            {snapshot.vendorPerformance.map((vendor) => (
              <div key={vendor.vendor} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950">{vendor.vendor}</p>
                  <Badge tone={vendor.sla >= 85 ? "green" : "amber"}>{vendor.sla}% SLA</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Closure</p>
                    <Progress value={vendor.closure} tone="green" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Reopen risk</p>
                    <Progress value={vendor.reopen * 5} tone="amber" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default function RathGreenOpsCloud() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("value");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [period, setPeriod] = useState("30D");
  const [query, setQuery] = useState("");

  if (!user) {
    return <LoginPortal onLogin={(selected) => { setUser(selected); setActiveView(selected.defaultView); }} />;
  }

  const role = user.role;
  const views = roleViews[role] || roleViews["CEO"];

  function renderView() {
    switch (activeView) {
      case "value":
        return <ValueOverview role={role} view={activeView} period={period} />;
      case "risk":
      case "zoneHealth":
        return <RiskMapView />;
      case "natureWater":
        return <NatureWaterView />;
      case "carbonResource":
        return <CarbonResourceView />;
      case "investment":
        return <InvestmentView />;
      case "boardPack":
        return <BoardPackView role={role} view={activeView} />;
      case "evidence":
      case "dataQuality":
        return <EvidenceOverview />;
      case "leap":
        return <LeapMapping />;
      case "claimSafety":
        return <ClaimSafety />;
      case "methodology":
        return <Methodology />;
      case "exports":
        return <Exports />;
      case "control":
      case "tickets":
        return <OperationsControl role={role} view={activeView} />;
      case "waterStress":
        return <NatureWaterView />;
      case "recurring":
        return <RecurringIssues />;
      case "serviceReport":
        return <ServiceReport />;
      default:
        return <ValueOverview role={role} view="value" period={period} />;
    }
  }

  return (
    <div className="min-h-screen text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-2xl bg-slate-100 p-2 text-slate-700 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950 sm:text-base">RATH Green Infrastructure Intelligence</p>
              <p className="truncate text-xs text-slate-500">{dashboardCopy[role].productName} · {user.workspace}</p>
            </div>
          </div>

          <div className="hidden flex-1 justify-center px-8 lg:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search zones, evidence, tickets..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Badge tone="green">AI-powered</Badge>
            <Badge tone="amber">Claim-controlled</Badge>
          </div>
          <Button onClick={() => setUser(null)} variant="light" className="hidden sm:inline-flex">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden">
          <div className="h-full w-[84vw] max-w-sm bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-slate-950">{role}</p>
              <button onClick={() => setMobileOpen(false)} className="rounded-2xl bg-slate-100 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-2">
              {views.map((item) => {
                const Icon = iconByView[item.key] || Gauge;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveView(item.key);
                      setMobileOpen(false);
                    }}
                    className={cx("flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold", activeView === item.key ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700")}
                  >
                    <Icon className="h-4 w-4" /> {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <main className="mx-auto grid max-w-[1540px] gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[86px] rounded-[30px] border border-slate-200 bg-white/95 p-3 shadow-enterprise backdrop-blur">
            <div className="px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Role workspace</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{role}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{dashboardCopy[role].hero}</p>
            </div>

            <div className="mt-2 space-y-1">
              {views.map((item) => {
                const Icon = iconByView[item.key] || Gauge;
                const active = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveView(item.key)}
                    className={cx("flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition", active ? "bg-slate-950 text-white shadow-lift" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950")}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>
                        <span className="block">{item.label}</span>
                        <span className={cx("block text-[11px] font-normal", active ? "text-slate-300" : "text-slate-400")}>{item.description}</span>
                      </span>
                    </span>
                    {active && <ChevronRight className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-3xl bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Claim boundary</p>
              <p className="mt-2 text-xs leading-5 text-emerald-900">
                RATH does not issue carbon credits. Carbon values are internal supporting estimates unless upgraded through review.
              </p>
              <p className="mt-2 text-[11px] text-emerald-800/70">Methodology: {METHOD_VERSION} · Evidence Level: {snapshot.evidenceLevel}</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:hidden">
            <div className="rounded-2xl bg-white p-1 shadow-sm">
              <select value={activeView} onChange={(e) => setActiveView(e.target.value)} className="w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold outline-none">
                {views.map((item) => (
                  <option key={item.key} value={item.key}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-1 rounded-2xl bg-slate-100 p-1">
              {periods.map((item) => (
                <button key={item} onClick={() => setPeriod(item)} className={cx("rounded-xl px-3 py-2 text-xs font-semibold", period === item ? "bg-white text-slate-950 shadow-sm" : "text-slate-500")}>{item}</button>
              ))}
            </div>
          </div>

          <div className="mb-5 hidden items-center justify-between gap-4 lg:flex">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{dashboardCopy[role].purpose}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-slate-950">{dashboardCopy[role].productName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 rounded-2xl bg-slate-100 p-1">
                {periods.map((item) => (
                  <button key={item} onClick={() => setPeriod(item)} className={cx("rounded-xl px-3 py-2 text-xs font-semibold", period === item ? "bg-white text-slate-950 shadow-sm" : "text-slate-500")}>{item}</button>
                ))}
              </div>
              <Button variant="light" disabled><SlidersHorizontal className="h-4 w-4" /> Filters coming soon</Button>
              <Button variant="dark" onClick={() => window.print()}><Download className="h-4 w-4" /> Export Board Pack</Button>
            </div>
          </div>

          {renderView()}
        </section>
      </main>
    </div>
  );
}
