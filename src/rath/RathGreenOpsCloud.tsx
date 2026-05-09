import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Cloud,
  Database,
  Download,
  Droplets,
  Eye,
  EyeOff,
  FileCheck2,
  Gauge,
  Leaf,
  Lock,
  MapPin,
  Menu,
  Recycle,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Trees,
  TrendingUp,
  AlertTriangle,
  Users,
  WalletCards,
  Waves,
  X,
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
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  METHOD_VERSION,
  demoSnapshot,
  selectCeoDashboard,
  selectExecutiveNarrative,
} from "./domain/engine";

type TabKey = "overview" | "risk" | "nature" | "water" | "evidence";
type RoleKey = "CEO" | "Property Manager" | "ESG Team" | "IFM Partner";
type PeriodKey = "30D" | "QTD" | "YTD";
type SiteMode = "Pilot Asset" | "Mapletree GTP";

const navItems: Array<{ key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", label: "Overview", icon: Gauge },
  { key: "risk", label: "Risk Map", icon: MapPin },
  { key: "nature", label: "Nature", icon: Leaf },
  { key: "water", label: "Water", icon: Droplets },
  { key: "evidence", label: "Evidence", icon: FileCheck2 },
];

const roles: RoleKey[] = ["CEO", "Property Manager", "ESG Team", "IFM Partner"];
const periods: PeriodKey[] = ["30D", "QTD", "YTD"];

const roleLens: Record<RoleKey, string> = {
  CEO: "Shows asset value, risk, tenant story, investment priorities, and board-safe evidence.",
  "Property Manager": "Shows zones needing action, water inefficiency, vendor issues, and maintenance risk.",
  "ESG Team": "Shows evidence quality, claim boundaries, methodology status, and report-ready data.",
  "IFM Partner": "Shows service differentiation, QBR material, SLA proof, and retention value.",
};

const monthlyTrend = [
  { month: "Jan", nature: 48, water: 52, risk: 71, quality: 45 },
  { month: "Feb", nature: 55, water: 60, risk: 66, quality: 54 },
  { month: "Mar", nature: 61, water: 67, risk: 58, quality: 63 },
  { month: "Apr", nature: 68, water: 73, risk: 51, quality: 74 },
  { month: "May", nature: 76, water: 81, risk: 43, quality: 82 },
];

const compactTrend = monthlyTrend.slice(-4);

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

function formatNumber(value: number | undefined, decimals = 1) {
  if (value === undefined || !Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

function formatInt(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

function formatCurrency(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return "₹0";
  if (value >= 100000) return `₹${formatNumber(value / 100000, 1)}L`;
  return `₹${formatInt(value)}`;
}

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "green" | "blue" | "amber" | "red" | "purple" | "dark" | "white";
}) {
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
    <span className={classNames("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 sm:text-xs", tones[tone])}>
      {children}
    </span>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={classNames("rounded-[22px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:rounded-[28px]", className)}>{children}</div>;
}

function Button({
  children,
  onClick,
  variant = "dark",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "dark" | "light" | "green";
  className?: string;
}) {
  const styles = {
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    light: "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  return (
    <button
      onClick={onClick}
      className={classNames("inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition", styles[variant], className)}
    >
      {children}
    </button>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-4 sm:mb-5 lg:flex-row lg:items-end">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-xs">{eyebrow}</p>
        <h2 className="mt-2 max-w-5xl text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">{title}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  icon: Icon,
  tone = "green",
  badge,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "green" | "blue" | "amber" | "purple" | "slate" | "red";
  badge?: string;
}) {
  const toneMap = {
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <Panel className="overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{value}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{sub}</p>
          </div>
          <div className={classNames("rounded-2xl p-2.5 sm:p-3", toneMap[tone])}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
      </div>
      {badge && (
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-5">
          <span className="text-[11px] text-slate-500 sm:text-xs">Evidence controlled</span>
          <Badge tone={tone}>{badge}</Badge>
        </div>
      )}
    </Panel>
  );
}

function Progress({ value, tone = "emerald" }: { value: number; tone?: "emerald" | "blue" | "amber" | "purple" | "red" | "slate" }) {
  const fill = {
    emerald: "bg-emerald-600",
    blue: "bg-blue-600",
    amber: "bg-amber-500",
    purple: "bg-purple-600",
    red: "bg-red-500",
    slate: "bg-slate-800",
  };
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={classNames("h-full rounded-full", fill[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function SelectPill<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={classNames(
            "min-w-fit rounded-xl px-3 py-2 text-xs font-semibold transition sm:text-sm",
            value === option ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function HeatCell({ value }: { value: number }) {
  const tone = value >= 70 ? "bg-red-100 text-red-800 ring-red-200" : value >= 45 ? "bg-amber-100 text-amber-800 ring-amber-200" : "bg-emerald-100 text-emerald-800 ring-emerald-200";
  return <span className={classNames("inline-flex min-w-[48px] justify-center rounded-xl px-2 py-1 text-xs font-bold ring-1", tone)}>{value}</span>;
}

function LoginPortal({ onLogin }: { onLogin: (role: RoleKey, site: SiteMode) => void }) {
  const [role, setRole] = useState<RoleKey>("CEO");
  const [site, setSite] = useState<SiteMode>("Pilot Asset");
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="min-h-screen bg-[#07130f] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute left-[-10rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-lime-300/10 blur-3xl" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-emerald-300 text-emerald-950 shadow-2xl">
                <Leaf className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight">RATH GreenOps Cloud</p>
                <p className="text-sm text-emerald-50/60">Resource & Asset Traceability Hub</p>
              </div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Enterprise Green Infrastructure Intelligence</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
              One platform for nature, water, risk, and evidence.
            </h1>
            <p className="mt-5 text-base leading-7 text-emerald-50/70">
              Convert owned landscape and living green assets into board-readable intelligence, claim-safe evidence, and investment recommendations.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Nature", "Readiness scoring"],
                ["Water", "Health-linked usage"],
                ["Evidence", "Claim-controlled pack"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-emerald-50/60">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">Sign in to workspace</p>
                <p className="mt-1 text-sm text-emerald-50/60">Demo portal · no backend auth yet</p>
              </div>
              <Lock className="h-5 w-5 text-emerald-200" />
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-emerald-50/70">Workspace</span>
                <select value={site} onChange={(e) => setSite(e.target.value as SiteMode)} className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
                  <option className="text-slate-950">Pilot Asset</option>
                  <option className="text-slate-950">Mapletree GTP</option>
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-emerald-50/70">Role</span>
                <select value={role} onChange={(e) => setRole(e.target.value as RoleKey)} className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
                  {roles.map((r) => <option key={r} className="text-slate-950">{r}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-emerald-50/70">Email</span>
                <input value="demo@rathgreenops.cloud" readOnly className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none" />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-emerald-50/70">PIN</span>
                <div className="relative mt-1">
                  <input type={showPin ? "text" : "password"} value="123456" readOnly className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none" />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/70">
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <Button onClick={() => onLogin(role, site)} variant="green" className="w-full">
                Enter Command Center <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 rounded-3xl bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">AI layer</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                Phase 1 uses a zero-cost rules-based AI insight engine. Phase 2 can plug into OpenAI/Claude for richer narrative generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIInsightPanel({ role }: { role: RoleKey }) {
  const dashboard = selectCeoDashboard(demoSnapshot);
  const roleText: Record<RoleKey, string> = {
    CEO: `The asset is moving from decorative landscape to measurable green infrastructure. Focus the conversation on ${dashboard.highRiskZoneCount} risk zones, ${dashboard.p1InvestmentActionCount} P1 investments, and Level ${dashboard.greenAssetMaturityLevel}/6 maturity.`,
    "Property Manager": `Start with the risk map. The immediate operational point is water-to-health performance at ${formatNumber(dashboard.waterToHealthIndex100, 0)}/100 and zone-level interventions.`,
    "ESG Team": `The evidence pack is usable for internal planning, but claim language must remain restricted at ${dashboard.evidenceLevel}. Prioritize data quality upgrades before external claims.`,
    "IFM Partner": `Use this as a retention and QBR advantage: measurable landscape governance, P&L leakage visibility, and tenant-facing green communication.`,
  };

  const missing = demoSnapshot.details.dataQuality
    .flatMap((q) => q.missing.map((m) => `${q.zoneId.replace("zone_", "").replace("_", " ")}: ${m}`))
    .slice(0, 3);

  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-950 p-4 text-white sm:p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-300/15 p-2 text-emerald-200">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">AI Executive Explainer</p>
            <p className="text-xs text-slate-300">Zero-cost rules engine · no API spend</p>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-sm leading-6 text-slate-700">{roleText[role]}</p>
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
          <b>Plain English:</b> RATH does not say “we generated credits.” It says “your existing green assets are now measured, governed, and improving.”
        </div>
        {missing.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Data gaps to close</p>
            <div className="mt-2 space-y-2">
              {missing.map((item) => (
                <div key={item} className="rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-900 ring-1 ring-amber-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}

function EvidenceFunnelList() {
  return (
    <Panel className="p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-950">Evidence maturity funnel</p>
          <p className="mt-1 text-sm text-slate-500">Clean mobile-safe replacement for the broken funnel chart.</p>
        </div>
        <Badge tone="purple">{formatNumber(demoSnapshot.dataQualityScore100, 0)}/100 quality</Badge>
      </div>
      <div className="space-y-3">
        {demoSnapshot.details.evidenceFunnel.map((stage, index) => (
          <div key={stage.stage} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{stage.stage}</p>
                <p className="mt-1 text-xs text-slate-500">{formatNumber(stage.percentOfTotal, 0)}% of zones</p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950 ring-1 ring-slate-200">{stage.count}</span>
            </div>
            <div className="mt-3">
              <Progress value={stage.percentOfTotal} tone={index > 5 ? "emerald" : "purple"} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export default function RathGreenOpsCloud() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<RoleKey>("CEO");
  const [siteMode, setSiteMode] = useState<SiteMode>("Pilot Asset");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [period, setPeriod] = useState<PeriodKey>("30D");
  const [zoneFilter, setZoneFilter] = useState("All Zones");
  const [carbonGap, setCarbonGap] = useState(1000);

  const dashboard = selectCeoDashboard(demoSnapshot);
  const narrative = selectExecutiveNarrative(demoSnapshot);
  const displayTrend = period === "30D" ? compactTrend : monthlyTrend;
  const projectedExternalCredits = Math.max(carbonGap - dashboard.internalGreenAssetContributionTco2e, 0);
  const siteTitle = siteMode === "Mapletree GTP" ? "Mapletree GTP Pilot" : "Client Campus Pilot";

  const zoneOptions = ["All Zones", ...demoSnapshot.details.riskMap.map((z) => z.zoneName)];
  const filteredRisk = zoneFilter === "All Zones"
    ? demoSnapshot.details.riskMap
    : demoSnapshot.details.riskMap.filter((z) => z.zoneName === zoneFilter);

  const investmentBubbleData = demoSnapshot.details.investmentPlanner.actions.map((action) => ({
    name: action.actionName,
    cost: Math.round(action.avgCostInr / 100000),
    impact: Math.round(action.priorityScore100),
    visibility: action.tenantImpact === "High" ? 90 : action.tenantImpact === "Medium" ? 55 : 25,
    priority: action.priority,
  }));

  const waterFlowData = demoSnapshot.details.waterToHealth.map((item) => ({
    zone: item.zoneId.replace("zone_", "").replace("_", " "),
    health: Math.round(item.avgZoneHealthScore),
    index: Math.round(item.waterToHealthIndex100),
    intensity: Math.round(item.waterIntensityLitresPerSqm),
  }));

  if (!loggedIn) {
    return <LoginPortal onLogin={(r, s) => { setRole(r); setSiteMode(s); setLoggedIn(true); }} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setMobileMenu(true)} className="rounded-2xl bg-slate-100 p-2 text-slate-700 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950 sm:text-base">RATH GreenOps Cloud</p>
              <p className="truncate text-xs text-slate-500">{siteTitle} · {role}</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Badge tone="green">{METHOD_VERSION}</Badge>
            <Badge tone="amber">{dashboard.evidenceLevel} evidence</Badge>
            <Badge tone="purple">AI assisted</Badge>
          </div>
          <Button onClick={() => setLoggedIn(false)} variant="light" className="hidden sm:inline-flex">
            Logout
          </Button>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden">
          <div className="h-full w-[82vw] max-w-sm bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-slate-950">Navigation</p>
              <button onClick={() => setMobileMenu(false)} className="rounded-2xl bg-slate-100 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => { setActiveTab(item.key); setMobileMenu(false); }}
                    className={classNames(
                      "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold",
                      activeTab === item.key ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700"
                    )}
                  >
                    <Icon className="h-4 w-4" /> {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto grid max-w-[1520px] gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[84px] rounded-[30px] border border-slate-200 bg-white p-3 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
            <div className="px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Workspace</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{siteTitle}</p>
              <p className="mt-1 text-xs text-slate-500">{roleLens[role]}</p>
            </div>

            <div className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={classNames(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition",
                      active ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    {active && <ChevronRight className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-3">
              <SelectPill value={period} options={periods} onChange={setPeriod} />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Zone filter</span>
                <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none">
                  {zoneOptions.map((z) => <option key={z}>{z}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Role lens</span>
                <select value={role} onChange={(e) => setRole(e.target.value as RoleKey)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none">
                  {roles.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 grid gap-3 lg:hidden">
            <SelectPill value={period} options={periods} onChange={setPeriod} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none">
                {zoneOptions.map((z) => <option key={z}>{z}</option>)}
              </select>
              <select value={role} onChange={(e) => setRole(e.target.value as RoleKey)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none">
                {roles.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {activeTab === "overview" && (
            <div>
              <SectionHeader
                eyebrow="Executive Overview"
                title="Green infrastructure intelligence, simplified for every stakeholder."
                description="AI explains what the data means, filters change the output, and every metric remains evidence-controlled."
                action={<Badge tone="dark">{siteTitle}</Badge>}
              />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Metric label="Green Asset Maturity" value={`Level ${dashboard.greenAssetMaturityLevel}/6`} sub={demoSnapshot.details.maturityPathway.currentLabel} icon={Target} tone="green" badge="Pathway" />
                <Metric label="Nature-Readiness" value={`${formatNumber(dashboard.natureReadinessScore10, 1)}/10`} sub="Pilot-level nature score" icon={Leaf} tone="green" badge="E0 model" />
                <Metric label="Water-to-Health" value={`${formatNumber(dashboard.waterToHealthIndex100, 0)}/100`} sub="Water linked to landscape outcome" icon={Droplets} tone="blue" badge="Measured" />
                <Metric label="High-Risk Zones" value={`${dashboard.highRiskZoneCount}`} sub="Intervention zones" icon={AlertTriangle} tone="amber" badge="Risk map" />
                <Metric label="Data Quality" value={`${formatNumber(dashboard.dataQualityScore100, 0)}/100`} sub="Evidence quality score" icon={Database} tone="purple" badge="Evidence" />
                <Metric label="P1 Investments" value={`${dashboard.p1InvestmentActionCount}`} sub="Recommended action priorities" icon={WalletCards} tone="amber" badge="Planner" />
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
                <Panel className="p-4 sm:p-5">
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-base font-semibold text-slate-950">Green asset performance trajectory</p>
                      <p className="mt-1 text-sm text-slate-500">Filtered by {period}. Optimized for board-level readability.</p>
                    </div>
                    <Badge tone="green">Board-level summary</Badge>
                  </div>
                  <div className="h-[260px] sm:h-[330px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={displayTrend} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="natureFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#059669" stopOpacity={0.18} />
                            <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Area type="monotone" dataKey="nature" stroke="#059669" strokeWidth={3} fill="url(#natureFill)" name="Nature-readiness" />
                        <Bar dataKey="water" fill="#2563eb" radius={[8, 8, 0, 0]} name="Water-to-health" />
                        <Line type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} name="Risk score" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>

                <AIInsightPanel role={role} />
              </div>
            </div>
          )}

          {activeTab === "risk" && (
            <div>
              <SectionHeader
                eyebrow="Campus Green Asset Risk Map"
                title="Zone-level risk that property teams can act on."
                description="Filters allow leadership and property teams to focus on one zone, one period, and one stakeholder lens."
                action={<Badge tone="amber">{filteredRisk.length} visible zones</Badge>}
              />
              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <Panel className="overflow-hidden">
                  <div className="border-b border-slate-100 p-4 sm:p-5">
                    <p className="text-base font-semibold text-slate-950">Risk heatmap</p>
                    <p className="mt-1 text-sm text-slate-500">Green = stable · Amber = watch · Red = intervention.</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-[760px] text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-4 py-3">Zone</th>
                          <th className="px-4 py-3">Health</th>
                          <th className="px-4 py-3">Water</th>
                          <th className="px-4 py-3">Heat</th>
                          <th className="px-4 py-3">Nature</th>
                          <th className="px-4 py-3">Data</th>
                          <th className="px-4 py-3">Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRisk.map((zone) => (
                          <tr key={zone.zoneId} className="border-b border-slate-100">
                            <td className="px-4 py-4">
                              <p className="font-semibold text-slate-950">{zone.zoneName}</p>
                              <p className="mt-1 text-xs text-slate-500">{zone.tenantVisibility} tenant visibility</p>
                            </td>
                            <td className="px-4 py-4"><HeatCell value={Math.round(zone.healthRisk)} /></td>
                            <td className="px-4 py-4"><HeatCell value={Math.round(zone.waterStressRisk)} /></td>
                            <td className="px-4 py-4"><HeatCell value={Math.round(zone.heatExposureRisk)} /></td>
                            <td className="px-4 py-4"><HeatCell value={Math.round(zone.natureWeaknessRisk)} /></td>
                            <td className="px-4 py-4"><HeatCell value={Math.round(zone.dataGapRisk)} /></td>
                            <td className="px-4 py-4"><Badge tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"}>{Math.round(zone.strategicPriorityScore100)}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                <div className="space-y-4">
                  {filteredRisk.map((zone) => (
                    <Panel key={zone.zoneId} className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold text-slate-950">{zone.zoneName}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{zone.recommendedAction}</p>
                        </div>
                        <Badge tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"}>{zone.status}</Badge>
                      </div>
                      <div className="mt-4">
                        <Progress value={zone.strategicPriorityScore100} tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "emerald"} />
                      </div>
                    </Panel>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "nature" && (
            <div>
              <SectionHeader
                eyebrow="Nature-Readiness"
                title="Nature score without overclaiming biodiversity certification."
                description="The platform simplifies science-heavy metrics into an internal readiness score any stakeholder can understand."
                action={<Badge tone="green">{formatNumber(dashboard.natureReadinessScore10, 1)}/10</Badge>}
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Object.entries(demoSnapshot.details.nature.components).map(([key, value]) => (
                  <Panel key={key} className="p-4 sm:p-5">
                    <p className="text-sm font-medium text-slate-500">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(value, 1)}</p>
                    <div className="mt-3">
                      <Progress value={value * 5} tone="emerald" />
                    </div>
                  </Panel>
                ))}
              </div>
              <div className="mt-5">
                <AIInsightPanel role={role} />
              </div>
            </div>
          )}

          {activeTab === "water" && (
            <div>
              <SectionHeader
                eyebrow="Water-to-Health"
                title="Water consumption becomes useful only when linked to landscape outcome."
                description="This view connects reused water, freshwater avoided, health, water intensity, and stress flags."
                action={<Badge tone="blue">{formatNumber(dashboard.waterToHealthIndex100, 0)}/100</Badge>}
              />
              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <Panel className="p-4 sm:p-5">
                  <p className="text-base font-semibold text-slate-950">Water-to-health by zone</p>
                  <p className="mt-1 text-sm text-slate-500">Filtered by {period}.</p>
                  <div className="mt-4 h-[260px] sm:h-[330px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={waterFlowData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="zone" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Bar dataKey="index" fill="#2563eb" name="Water-to-health" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="health" fill="#059669" name="Zone health" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <Metric label="Reused water" value={`${formatInt(dashboard.waterReusedLitres)} L`} sub="STP / HVAC / recycled source tracking" icon={Recycle} tone="blue" badge="Ledger" />
                  <Metric label="Freshwater avoided" value={`${formatInt(dashboard.freshwaterAvoidedLitres)} L`} sub="Baseline vs actual estimate" icon={Waves} tone="green" badge="Internal" />
                  <Metric label="Water leakage watch" value={formatCurrency(demoSnapshot.details.costLeakage.waterInefficiencyLeakageInr)} sub="Inefficiency linked to zone health" icon={AlertTriangle} tone="amber" badge="P&L" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div>
              <SectionHeader
                eyebrow="Evidence + Investment"
                title="Replace manual ESG homework with claim-safe AI-assisted summaries."
                description="The AI layer explains, checks, and formats data for decision-makers while keeping final ESG sign-off with senior teams."
                action={<Badge tone="purple">{dashboard.claimStatus} claim status</Badge>}
              />
              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <EvidenceFunnelList />
                <Panel className="p-4 sm:p-5">
                  <p className="text-base font-semibold text-slate-950">Green Infrastructure Investment Planner</p>
                  <p className="mt-1 text-sm text-slate-500">Cost vs impact. Bubble size reflects tenant visibility.</p>
                  <div className="mt-4 h-[280px] sm:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 10, right: 12, bottom: 10, left: -15 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="cost" name="Cost" unit="L" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                        <YAxis dataKey="impact" name="Impact" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                        <ZAxis dataKey="visibility" range={[90, 540]} />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                        <Scatter name="Actions" data={investmentBubbleData} fill="#059669">
                          {investmentBubbleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.priority === "P1" ? "#059669" : entry.priority === "P2" ? "#2563eb" : "#f59e0b"} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                <Panel className="overflow-hidden">
                  <div className="border-b border-slate-100 p-4 sm:p-5">
                    <p className="text-base font-semibold text-slate-950">Recommended actions</p>
                    <p className="mt-1 text-sm text-slate-500">Priority, cost, and value narrative.</p>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {demoSnapshot.details.investmentPlanner.actions.map((action) => (
                      <div key={action.actionId} className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-950">{action.actionName}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">{action.valueNarrative}</p>
                          </div>
                          <Badge tone={action.priority === "P1" ? "green" : action.priority === "P2" ? "blue" : "amber"}>{action.priority}</Badge>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-2xl bg-slate-50 p-3">
                            <p className="text-[11px] text-slate-500">Cost</p>
                            <p className="text-sm font-semibold text-slate-950">{formatCurrency(action.costLowInr)}–{formatCurrency(action.costHighInr)}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-3">
                            <p className="text-[11px] text-slate-500">Score</p>
                            <p className="text-sm font-semibold text-slate-950">{formatNumber(action.priorityScore100, 0)}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-3">
                            <p className="text-[11px] text-slate-500">Status</p>
                            <p className="text-sm font-semibold text-slate-950">{action.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>

                <div className="space-y-5">
                  <AIInsightPanel role={role} />
                  <Panel className="p-4 sm:p-5">
                    <p className="text-base font-semibold text-slate-950">Credit dependency planning</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Planning view only. This does not claim credits are generated or reduced.</p>
                    <div className="mt-4">
                      <label className="block">
                        <span className="text-xs font-semibold text-slate-600">External credit plan / target gap</span>
                        <input
                          type="number"
                          value={carbonGap}
                          onChange={(e) => setCarbonGap(Number(e.target.value))}
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none"
                        />
                      </label>
                    </div>
                    <div className="mt-4 rounded-3xl bg-slate-950 p-4 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Planning equation</p>
                      <p className="mt-3 text-sm">{formatNumber(carbonGap, 1)} − {formatNumber(dashboard.internalGreenAssetContributionTco2e, 3)} = <span className="font-semibold text-emerald-300">{formatNumber(projectedExternalCredits, 1)}</span></p>
                    </div>
                  </Panel>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}