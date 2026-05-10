import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
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
  TrendingUp,
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
  PERIODS,
  ROLES,
  authenticateDemoUser,
  buildAiPayload,
  dashboardCopy,
  demoCredentials,
  filterInvestments,
  filterTickets,
  filterZones,
  getAiActions,
  getBoardDecisionMemo,
  getBoardNarrative,
  getCarbonMetrics,
  getDecisionStrip,
  getDataQualityView,
  getESGReadiness,
  getFilteredSnapshot,
  getIFMExecutive,
  getInvestmentScenarios,
  getPortfolioIntelligence,
  getLeapExecutiveView,
  getMetricCards,
  getPMExecutive,
  getRoleMetrics,
  getSnapshot,
  roleViews,
  DEFAULT_FILTERS,
} from "./domain/engine.js";
import { openAssetIntelligenceSummary, openBoardPack, openInvestmentScenarioPack } from "./export/boardReport.js";
import { openClaimSafetyRegister, openDataQualityExceptionReport, openEsgEvidencePack } from "./export/esgReport.js";
import { openQbrPack, openVendorPerformanceScorecard, openWeeklyExceptionReport } from "./export/qbrReport.js";
import { openDailyActionSheet, openOpenTicketTracker, openZoneInspectionList } from "./export/dailyActionSheet.js";

const iconByView = {
  portfolio: Layers,
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

const metricIcons = {
  greenInfrastructureValueScore: Gauge,
  natureReadinessScore: Leaf,
  waterToHealthScore: Droplets,
  highRiskGreenZones: AlertTriangle,
  tenantGreenEngagementReadiness: Users,
  recommendedInvestmentActions: Wallet,
  carbonContribution: Leaf,
  carbonStock: Waves,
  waterReuseAvoidance: Droplets,
  costLeakage: Wallet,
};

function cx(...items) {
  return items.filter(Boolean).join(" ");
}

const E1_SUPPORT_LINE = "E1 expert-review pathway initiated through the 30-day pilot engagement.";

const loginRoleCards = [
  {
    key: "ceo",
    title: "Regional CEO / Board",
    subtitle: dashboardCopy[ROLES.CEO].productName,
  },
  {
    key: "esg",
    title: "ESG & Sustainability Lead",
    subtitle: dashboardCopy[ROLES.ESG].productName,
  },
  {
    key: "ops",
    title: "Property Operations",
    subtitle: "GreenOps Control Center",
  },
];

function EvidencePathwayNote({ compact = false }) {
  return (
    <div className={cx("rounded-2xl bg-amber-50 text-amber-900 ring-1 ring-amber-100", compact ? "mt-3 px-3 py-2 text-xs" : "mb-5 px-4 py-3 text-sm")}>
      {E1_SUPPORT_LINE}
    </div>
  );
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

function Button({ children, onClick, variant = "dark", className = "", disabled, type = "button" }) {
  const styles = {
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    light: "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className
      )}
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

function MetricHoverCard({ metric, value, tone = "green" }) {
  const Icon = metricIcons[metric.key] || Gauge;
  const [anchor, setAnchor] = useState(null);
  const ref = useRef(null);

  function show() {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setAnchor(rect);
  }

  function hide() {
    setAnchor(null);
  }

  return (
    <>
      <Panel className="relative min-h-[172px] overflow-visible">
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{metric.sub}</p>
              {metric.delta && (
                <div className="mt-3">
                  <Badge tone={metric.delta.tone}>{metric.delta.label}</Badge>
                </div>
              )}
              <button
                ref={ref}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                className="mt-3 text-xs font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none"
              >
                Method & next action
              </button>
            </div>
            <div className={cx(
              "rounded-2xl p-2.5 sm:p-3",
              tone === "green" && "bg-emerald-50 text-emerald-700",
              tone === "blue" && "bg-blue-50 text-blue-700",
              tone === "amber" && "bg-amber-50 text-amber-700",
              tone === "purple" && "bg-purple-50 text-purple-700",
              tone === "slate" && "bg-slate-100 text-slate-700",
              tone === "red" && "bg-red-50 text-red-700"
            )}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </Panel>
      {anchor && <HoverPopover anchor={anchor} metric={metric} />}
    </>
  );
}

function HoverPopover({ anchor, metric }) {
  const width = 360;
  const left = Math.min(Math.max(16, anchor.left), window.innerWidth - width - 16);
  const prefersAbove = anchor.bottom + 240 > window.innerHeight;
  const top = prefersAbove ? Math.max(16, anchor.top - 230) : anchor.bottom + 12;

  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999] w-[360px] rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
      style={{ left, top }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-950">{metric.label}</p>
        <Badge tone="amber">{metric.evidence}</Badge>
      </div>
      <div className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
        <p><span className="font-semibold text-slate-950">Definition:</span> {metric.definition}</p>
        <p><span className="font-semibold text-slate-950">Formula:</span> {metric.formula}</p>
        <p><span className="font-semibold text-slate-950">Source:</span> {metric.source}</p>
        <p><span className="font-semibold text-slate-950">Next action:</span> {metric.action}</p>
      </div>
      {String(metric.evidence || "").includes("E0") && <EvidencePathwayNote compact />}
    </div>,
    document.body
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
      setError("Invalid credentials. Please check your email and PIN.");
      return;
    }
    onLogin(user);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      login();
    }
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
              Regional CEO, ESG, and property operations teams receive different intelligence from the same governed green-asset layer.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {loginRoleCards.map((item) => (
                <div
                  key={item.key}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-left backdrop-blur"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-3 text-xs leading-5 text-emerald-50/55">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <Panel className="flex bg-white/[0.08] p-5 text-white shadow-glass ring-1 ring-white/10 sm:p-7 lg:min-h-[540px]">
            <div className="flex w-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">Sign in to workspace</p>
                    <p className="mt-1 text-sm text-emerald-50/60">Role-specific access controls screens, KPIs, AI output, and language</p>
                  </div>
                  <Lock className="h-5 w-5 text-emerald-200" />
                </div>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-xs font-semibold text-emerald-50/70">Email</span>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="name@company.com"
                      autoComplete="username"
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-50/35"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-emerald-50/70">PIN</span>
                    <div className="relative mt-1">
                      <input
                        type={showPin ? "text" : "password"}
                        value={pin}
                        onChange={(e) => {
                          setPin(e.target.value);
                          setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter PIN"
                        autoComplete="current-password"
                        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none placeholder:text-emerald-50/35"
                      />
                      <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/70">
                        {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  {error && <div className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-100 ring-1 ring-red-400/20">{error}</div>}

                  <Button onClick={login} variant="green" className="w-full">
                    Enter role dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Role-based access active</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                  Each authorised role opens a distinct workspace with its own decision layer, evidence view, and operational controls.
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function PeriodTabs({ periodKey, setPeriodKey }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-2xl bg-slate-100 p-1">
      {PERIODS.map((period) => (
        <button
          key={period.key}
          onClick={() => setPeriodKey(period.key)}
          className={cx(
            "rounded-xl px-3 py-2 text-xs font-semibold transition sm:text-sm",
            periodKey === period.key ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

function FilterDrawer({ open, onClose, filters, setFilters, data, role }) {
  if (!open) return null;

  const isCeo = role === ROLES.CEO;
  const isEsg = role === ROLES.ESG;
  const isOps = role === ROLES.IFM || role === ROLES.PM;

  return createPortal(
    <div className="fixed inset-0 z-[10000]">
      <button className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm" onClick={onClose} aria-label="Close filters" />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Filters</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">Refine the dashboard</p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-slate-100 p-2 text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Zone scope</span>
            <select
              value={filters.zoneId}
              onChange={(e) => setFilters((current) => ({ ...current, zoneId: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
            >
              <option value="all">All Zones</option>
              {data.zones.map((zone) => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </label>

          {isCeo && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Investment priority</span>
              <select
                value={filters.priority}
                onChange={(e) => setFilters((current) => ({ ...current, priority: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="all">All priorities</option>
                <option value="P1">P1 only</option>
                <option value="P2">P2 only</option>
              </select>
            </label>
          )}

          {isEsg && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Evidence status</span>
              <select
                value={filters.evidenceStatus}
                onChange={(e) => setFilters((current) => ({ ...current, evidenceStatus: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="all">All evidence</option>
                <option value="Complete">Complete only</option>
                <option value="Usable">Usable only</option>
                <option value="Weak">Weak only</option>
              </select>
            </label>
          )}

          {isOps && (
            <>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Ticket status</span>
                <select
                  value={filters.ticketStatus}
                  onChange={(e) => setFilters((current) => ({ ...current, ticketStatus: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
                >
                  <option value="all">All tickets</option>
                  <option value="Open">Open only</option>
                  <option value="Closed">Closed only</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">SLA status</span>
                <select
                  value={filters.slaStatus}
                  onChange={(e) => setFilters((current) => ({ ...current, slaStatus: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
                >
                  <option value="all">All SLA states</option>
                  <option value="Within SLA">Within SLA</option>
                  <option value="Met">Met</option>
                  <option value="Breached">Breached</option>
                </select>
              </label>
            </>
          )}

          {(isCeo || isOps) && (
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">Intervention zones only</p>
                <p className="mt-1 text-xs text-slate-500">Show only high-risk zones requiring action</p>
              </div>
              <input
                type="checkbox"
                checked={filters.interventionOnly}
                onChange={(e) => setFilters((current) => ({ ...current, interventionOnly: e.target.checked }))}
                className="h-5 w-5 accent-emerald-600"
              />
            </label>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="light" className="flex-1" onClick={() => setFilters({ ...DEFAULT_FILTERS })}>
            Reset
          </Button>
          <Button variant="dark" className="flex-1" onClick={onClose}>
            Apply
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ActiveFilterBar({ data, filters, setFilters }) {
  const chips = [];
  if (filters.zoneId !== "all") chips.push(data.scopeLabel);
  if (filters.priority !== "all") chips.push(`${filters.priority} investments`);
  if (filters.evidenceStatus !== "all") chips.push(`${filters.evidenceStatus} evidence`);
  if (filters.ticketStatus !== "all") chips.push(`${filters.ticketStatus} tickets`);
  if (filters.slaStatus !== "all") chips.push(`${filters.slaStatus}`);
  if (filters.interventionOnly) chips.push("Intervention only");
  if (!chips.length) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-[22px] border border-emerald-100 bg-emerald-50/80 p-3">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Active scope</span>
      {chips.map((chip) => <Badge key={chip} tone="green">{chip}</Badge>)}
      <button onClick={() => setFilters({ ...DEFAULT_FILTERS })} className="ml-auto text-xs font-semibold text-emerald-800 underline-offset-4 hover:underline">
        Reset filters
      </button>
    </div>
  );
}

function getAiLabel(role) {
  if (role === ROLES.CEO) return "AI Board Advisor";
  if (role === ROLES.ESG) return "AI Evidence Advisor";
  if (role === ROLES.IFM) return "AI QBR Advisor";
  return "AI Site Advisor";
}

function AiLauncher({ onClick, role }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_24px_60px_rgba(2,6,23,0.28)] transition hover:bg-slate-800"
    >
      <Bot className="h-4 w-4 text-emerald-300" />
      {getAiLabel(role)}
    </button>
  );
}

function AiDrawer({ open, onClose, role, view, periodKey, filters }) {
  const [provider, setProvider] = useState("auto");
  const [summary, setSummary] = useState("");
  const [source, setSource] = useState("fallback");
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(getAiActions(role)[0]?.key || "");
  const actions = getAiActions(role);

  useEffect(() => {
    setTask(getAiActions(role)[0]?.key || "");
    setSummary("");
  }, [role]);

  async function generate(selectedTask = task) {
    setLoading(true);
    setTask(selectedTask);
    try {
      const response = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          view,
          provider,
          payload: buildAiPayload(role, view, periodKey, filters, selectedTask),
        }),
      });
      const json = await response.json();
      setSummary(json.summary || "No AI summary generated.");
      setSource(json.provider || "fallback");
    } catch {
      setSummary("Fallback summary: keep claims restricted, focus on the relevant risk, and take the next action shown in the role workspace.");
      setSource("fallback");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000]">
      <button className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm" onClick={onClose} aria-label="Close AI drawer" />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
        <div className="bg-slate-950 p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-300/15 p-2 text-emerald-200">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold">{getAiLabel(role)}</p>
                <p className="text-xs text-slate-300">Role-specific · claim-safe · dynamic</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-2xl bg-white/10 p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">
            <Badge tone="white">{source}</Badge>
          </div>
        </div>

        <div className="p-5">
          <div className="grid gap-2 sm:grid-cols-2">
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={() => generate(action.key)}
                className={cx(
                  "rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition",
                  task === action.key ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                )}
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <select value={provider} onChange={(e) => setProvider(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none">
              <option value="auto">Auto provider</option>
              <option value="anthropic">Claude</option>
              <option value="openai">OpenAI</option>
              <option value="fallback">Fallback only</option>
            </select>
            <Button onClick={() => generate(task)} variant="green" disabled={loading} className="flex-1">
              <Sparkles className="h-4 w-4" /> {loading ? "Generating..." : "Refresh output"}
            </Button>
          </div>

          <div className="mt-4 rounded-3xl bg-slate-50 p-4">
            <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
              {summary || "Choose an executive prompt above to generate a role-specific output."}
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-900 ring-1 ring-amber-100">
            AI drafts explanations. Final client-facing claims must follow the methodology and evidence boundary.
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


function DecisionStrip({ periodKey, filters }) {
  const decisions = getDecisionStrip(periodKey, filters);
  return (
    <Panel className="mb-5 overflow-hidden">
      <div className="grid gap-px bg-slate-200 lg:grid-cols-4">
        {decisions.map((item) => (
          <div key={item.label} className="bg-white p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{item.value}</p>
            <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ReportabilityReadinessStrip({ periodKey, filters }) {
  const esg = getESGReadiness(periodKey, filters);
  return (
    <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {esg.cards.map((item) => (
        <SimpleMetricCard key={item.label} metric={item} icon={FileCheck2} />
      ))}
    </div>
  );
}

function MissingDataActionQueue({ periodKey, filters }) {
  const esg = getESGReadiness(periodKey, filters);
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-base font-semibold text-slate-950">Missing data action queue</p>
        <p className="mt-1 text-sm text-slate-500">What is still blocking stronger evidence maturity.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Gap</th>
              <th className="px-4 py-3">Impact</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Required for</th>
            </tr>
          </thead>
          <tbody>
            {esg.missingDataQueue.map((item) => (
              <tr key={item.gap} className="border-b border-slate-100">
                <td className="px-4 py-4 font-semibold text-slate-950">{item.gap}</td>
                <td className="px-4 py-4 text-slate-700">{item.impact}</td>
                <td className="px-4 py-4 text-slate-700">{item.owner}</td>
                <td className="px-4 py-4 text-slate-700">{item.requiredFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ClaimUpgradePath({ periodKey, filters }) {
  const esg = getESGReadiness(periodKey, filters);
  return (
    <Panel className="mt-5 overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-base font-semibold text-slate-950">Claim upgrade path</p>
        <p className="mt-1 text-sm text-slate-500">What is required to move from internal estimate to stronger evidence.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[780px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Topic</th>
              <th className="px-4 py-3">Current</th>
              <th className="px-4 py-3">Upgrade requirement</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {esg.claimUpgradePath.map((item) => (
              <tr key={item.topic} className="border-b border-slate-100">
                <td className="px-4 py-4 font-semibold text-slate-950">{item.topic}</td>
                <td className="px-4 py-4 text-slate-700">{item.current}</td>
                <td className="px-4 py-4 text-slate-700">{item.upgrade}</td>
                <td className="px-4 py-4"><Badge tone={item.status.includes("Blocked") ? "red" : "amber"}>{item.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ClientEscalationWatch({ periodKey, filters }) {
  const ifm = getIFMExecutive(periodKey, filters);
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">Client escalation watch</p>
      <p className="mt-1 text-sm text-slate-500">Items that may become visible in the next QBR.</p>
      <div className="mt-4 space-y-3">
        {ifm.escalationWatch.map((item) => (
          <div key={item.zone} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">{item.zone}</p>
              <Badge tone="amber">{item.owner}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.trigger}</p>
            <p className="mt-1 text-xs text-slate-500">{item.nextAction}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function QbrReadinessPanel({ periodKey, filters }) {
  const ifm = getIFMExecutive(periodKey, filters);
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">QBR readiness</p>
      <p className="mt-1 text-sm text-slate-500">Executive talking points prepared for the account review.</p>
      <div className="mt-4 space-y-3">
        {ifm.qbrTalkingPoints.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">{index + 1}</div>
            <p className="text-sm leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DailyActionQueue({ periodKey, filters }) {
  const pm = getPMExecutive(periodKey, filters);
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">Daily action queue</p>
      <p className="mt-1 text-sm text-slate-500">What needs action today.</p>
      <div className="mt-4 space-y-3">
        {pm.dailyActionQueue.map((item) => (
          <div key={item.task} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">{item.task}</p>
              <Badge tone={item.priority === "P1" ? "red" : "amber"}>{item.priority}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.reason}</p>
            <p className="mt-1 text-xs text-slate-500">Owner: {item.owner}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ZoneVisitQueue({ periodKey, filters }) {
  const pm = getPMExecutive(periodKey, filters);
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">Zone visit queue</p>
      <p className="mt-1 text-sm text-slate-500">Where the next site round should go first.</p>
      <div className="mt-4 space-y-3">
        {pm.zoneVisitQueue.map((item) => (
          <div key={item.zone} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">{item.zone}</p>
            <p className="mt-2 text-sm text-slate-700">{item.reason}</p>
            <p className="mt-1 text-xs text-slate-500">Last proof: {item.lastProof}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PortfolioIntelligenceView() {
  const portfolio = getPortfolioIntelligence();
  const rankedAssets = [...portfolio.assets].sort((a, b) => b.greenInfrastructureValue - a.greenInfrastructureValue);

  return (
    <div>
      <SectionHeader
        eyebrow="Portfolio Intelligence"
        title="Portfolio-level green asset intelligence for capital allocation, not only one-campus reporting."
        description="RATH scales from one active pilot into a comparable portfolio view: green-infrastructure value, nature-readiness, primary risk, ESG readiness, and recommended capital action by asset."
        action={<Badge tone="dark">{portfolio.activePilotCount} active pilot</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Panel className="p-4 sm:p-5">
          <p className="text-sm font-medium text-slate-500">Portfolio Green Infrastructure Value</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{portfolio.aggregateGreenInfrastructureValue}/100</p>
          <p className="mt-1 text-sm text-slate-500">Average across ranked assets</p>
        </Panel>
        <Panel className="p-4 sm:p-5">
          <p className="text-sm font-medium text-slate-500">Portfolio Nature-Readiness</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{portfolio.aggregateNatureReadiness}/100</p>
          <p className="mt-1 text-sm text-slate-500">Internal readiness baseline</p>
        </Panel>
        <Panel className="p-4 sm:p-5">
          <p className="text-sm font-medium text-slate-500">Active Pilot</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">Global Technology Park</p>
          <p className="mt-1 text-sm text-slate-500">Bengaluru</p>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel className="overflow-hidden">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <p className="text-base font-semibold text-slate-950">Ranked portfolio table</p>
            <p className="mt-1 text-sm text-slate-500">Comparable asset intelligence across verified Mapletree names only.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[960px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">GIV</th>
                  <th className="px-4 py-3">Nature-readiness</th>
                  <th className="px-4 py-3">Primary risk</th>
                  <th className="px-4 py-3">ESG readiness</th>
                  <th className="px-4 py-3">Recommended capital action</th>
                </tr>
              </thead>
              <tbody>
                {rankedAssets.map((asset, index) => (
                  <tr key={asset.name} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-semibold text-slate-950">{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-2">
                        <div>
                          <p className="font-semibold text-slate-950">{asset.name}</p>
                          {asset.illustrative && <p className="mt-1 text-xs italic text-slate-500">{asset.note}</p>}
                        </div>
                        {asset.status === "Active Pilot" && <Badge tone="green">Active Pilot</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-950">{asset.greenInfrastructureValue}/100</td>
                    <td className="px-4 py-4 text-slate-700">{asset.natureReadiness}/100</td>
                    <td className="px-4 py-4 text-slate-700">{asset.primaryRisk}</td>
                    <td className="px-4 py-4"><Badge tone={asset.illustrative ? "slate" : asset.esgReadiness === "Pilot evidence active" ? "green" : "amber"}>{asset.esgReadiness}</Badge></td>
                    <td className="px-4 py-4 text-slate-700">{asset.recommendedCapitalAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Green Infrastructure Value by asset</p>
          <p className="mt-1 text-sm text-slate-500">The CEO-level message: one pilot can become a portfolio comparison layer.</p>
          <div className="mt-4 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankedAssets} layout="vertical" margin={{ top: 10, right: 10, bottom: 0, left: 18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis type="category" dataKey="name" width={170} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="greenInfrastructureValue" name="GIV score" fill="#059669" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ValueOverview({ data, role, periodKey, filters }) {
  const metrics = getMetricCards(periodKey, filters);

  return (
    <div>
      <SectionHeader
        eyebrow="Green Infrastructure Value Dashboard"
        title={dashboardCopy[role].hero}
        description="Executive decision view: current state, principal risk, recommended decision, and expected lift."
        action={<Badge tone="dark">{data.period}</Badge>}
      />

      <DecisionStrip periodKey={periodKey} filters={filters} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricHoverCard key={metric.key} metric={metric} value={metric.value} tone={metric.tone} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="p-4 sm:p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-base font-semibold text-slate-950">Green infrastructure value trajectory</p>
              <p className="mt-1 text-sm text-slate-500">Value, water, tenant readiness, and risk movement.</p>
            </div>
            <Badge tone="green">Board-grade</Badge>
          </div>
          <div className="h-[280px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.trends} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Area dataKey="value" name="Value score" type="monotone" fill="url(#valueFill)" stroke="#059669" strokeWidth={3} />
                <Bar dataKey="water" name="Water-to-health" fill="#2563eb" radius={[8, 8, 0, 0]} />
                <Line dataKey="risk" name="Risk score" type="monotone" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Board attention stack</p>
          <p className="mt-1 text-sm text-slate-500">What deserves senior attention now.</p>
          <div className="mt-4 space-y-3">
            {[
              ["Water resilience", "Critical", "Weakest nature-readiness component; direct link to capex prioritisation."],
              ["Tenant-facing story", "Watch", "Ready to activate only where evidence quality is sufficient."],
              ["Evidence maturity", "Watch", "E1 expert-review pathway initiated through the 30-day pilot engagement."],
            ].map(([title, status, body]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{title}</p>
                  <Badge tone={status === "Critical" ? "red" : "amber"}>{status}</Badge>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function RiskMapView({ data, filteredZones }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Green Asset Risk Map"
        title="High-risk zones across health, water stress, heat, nature weakness, and data gaps."
        description="This makes the living asset layer visible to leadership and actionable for site teams."
        action={<Badge tone="amber">{filteredZones.length} visible zone{filteredZones.length === 1 ? "" : "s"}</Badge>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="overflow-hidden">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <p className="text-base font-semibold text-slate-950">Zone risk table</p>
            <p className="mt-1 text-sm text-slate-500">Green = stable · Amber = watch · Red = intervention.</p>
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
                  <th className="px-4 py-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredZones.map((zone) => (
                  <tr key={zone.id} className="border-b border-slate-100">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-950">{zone.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{zone.tenantVisibility} tenant visibility</p>
                    </td>
                    {[zone.healthRisk, zone.waterStressRisk, zone.heatExposureRisk, zone.natureWeaknessRisk, zone.dataGapRisk].map((value, index) => (
                      <td key={index} className="px-4 py-4"><RiskPill value={value} /></td>
                    ))}
                    <td className="px-4 py-4">
                      <Badge tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"}>{zone.riskScore}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4">
          {filteredZones.map((zone) => (
            <Panel key={zone.id} className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950">{zone.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{zone.recommendedAction}</p>
                </div>
                <Badge tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"}>{zone.status}</Badge>
              </div>
              <div className="mt-4">
                <Progress value={zone.riskScore} tone={zone.status === "Intervention" ? "red" : zone.status === "Watch" ? "amber" : "green"} />
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskPill({ value }) {
  return <Badge tone={value >= 70 ? "red" : value >= 45 ? "amber" : "green"}>{value}</Badge>;
}

function NatureWaterView({ data }) {
  const radarData = data.nature.components.map((item) => ({
    metric: item.label,
    value: item.value,
  }));

  return (
    <div>
      <SectionHeader
        eyebrow="Nature + Water Intelligence"
        title="Nature-readiness radar plus water-to-health performance."
        description="This view turns greenery into structured nature and water intelligence without overstating certification."
        action={<Badge tone="green">{data.summary.natureReadinessScore}/100 nature</Badge>}
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
                <Radar name="Score" dataKey="value" stroke="#059669" fill="#059669" fillOpacity={0.22} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2">
          {data.nature.components.map((item) => (
            <Panel key={item.key} className="p-4 sm:p-5">
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(item.value, 1)}</p>
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
          <p className="mt-1 text-sm text-slate-500">Water is valuable only when it produces healthy landscape output.</p>
          <div className="mt-4 h-[280px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.water} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="zone" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="index" name="Water-to-health" fill="#2563eb" radius={[8, 8, 0, 0]} />
                <Bar dataKey="health" name="Zone health" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <Panel className="p-4 sm:p-5">
            <p className="text-sm font-medium text-slate-500">Reused Water</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(data.summary.waterReusedLitres)} L</p>
            <p className="mt-1 text-sm text-slate-500">STP / HVAC / recycled source tracking</p>
          </Panel>
          <Panel className="p-4 sm:p-5">
            <p className="text-sm font-medium text-slate-500">Freshwater Avoided</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(data.summary.freshwaterAvoidedLitres)} L</p>
            <p className="mt-1 text-sm text-slate-500">Baseline vs internal estimate</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function CarbonResourceView({ data, periodKey, filters }) {
  const metrics = getCarbonMetrics(periodKey, filters);
  return (
    <div>
      <SectionHeader
        eyebrow="Carbon + Resource Impact"
        title="Carbon, water, and leakage intelligence without overclaiming."
        description="This is a planning and internal-supporting-estimate view. It does not create carbon credits, offsets, or certified sequestration claims."
        action={<Badge tone="amber">Claim-controlled</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricHoverCard key={metric.key} metric={metric} value={metric.value} tone={metric.tone} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-950">Performance trajectory</p>
              <p className="mt-1 text-sm text-slate-500">Contribution, readiness, and leakage movement.</p>
            </div>
            <Badge tone="green">Snapshot feed</Badge>
          </div>
          <div className="h-[280px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.trends} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Line dataKey="quality" name="Evidence quality" stroke="#2563eb" strokeWidth={2.5} />
                <Line dataKey="risk" name="Risk" stroke="#f59e0b" strokeWidth={2.5} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-950">Credit dependency planning</p>
              <p className="mt-1 text-sm text-slate-500">Planning view only. This does not claim credits are generated or reduced.</p>
            </div>
            <Badge tone="amber">Careful use</Badge>
          </div>
          <div className="mt-5 rounded-[24px] bg-slate-950 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Planning equation</p>
            <p className="mt-3 text-xl font-semibold">
              1,000.0 − {data.summary.eligibleInternalContributionTco2e.toFixed(3)} ={" "}
              <span className="text-emerald-300">{(1000 - data.summary.eligibleInternalContributionTco2e).toFixed(1)} tCO₂e</span>
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Use this only to show how internally measured green assets can inform planning before total dependence on external instruments.
          </p>
        </Panel>
      </div>
    </div>
  );
}

function InvestmentPlannerView({ data, filteredInvestments }) {
  const memo = getBoardDecisionMemo(data.periodKey);
  const bubble = filteredInvestments.map((item) => ({
    name: item.action,
    cost: Math.round((item.costLow + item.costHigh) / 2 / 100000),
    impact: item.score,
    size: item.priority === "P1" ? 90 : 60,
    priority: item.priority,
  }));

  return (
    <div>
      <SectionHeader
        eyebrow="Investment Planner"
        title="Capital allocation logic for the boardroom, not a decorative project list."
        description="The question is not which plants to buy. The question is which capital actions improve asset value, tenant differentiation, resilience, and evidence maturity."
        action={<Badge tone="dark">Board decision support</Badge>}
      />

      <Panel className="mb-5 overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-slate-950 p-5 text-white sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Recommended pathway</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{memo.recommendation}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{memo.expectedOutcome}</p>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Capital ask", memo.capitalAsk],
              ["Decision required", "Approve pilot-to-scale pathway"],
              ["Risk of inaction", "Water leakage + weaker tenant story"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-3">
        {getInvestmentScenarios(data.periodKey).map((scenario) => (
          <Panel key={scenario.key} className={cx("p-4 sm:p-5", scenario.key === "optimize" && "ring-2 ring-emerald-500")}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-950">{scenario.name}</p>
                <p className="mt-1 text-xs text-slate-500">{scenario.recommendation}</p>
              </div>
              {scenario.key === "optimize" && <Badge tone="green">Recommended</Badge>}
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[11px] text-slate-500">Capital</p>
                <p className="text-base font-semibold text-slate-950">{scenario.capex}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Outcome</p>
                <p className="text-sm text-slate-700">{scenario.outcome}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Risk if chosen</p>
                <p className="text-sm text-slate-700">{scenario.riskIfChosen}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Capital priority map</p>
          <p className="mt-1 text-sm text-slate-500">X-axis = capex in lakhs. Y-axis = strategic impact score.</p>
          <div className="mt-4 h-[320px] sm:h-[390px]">
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
            <p className="text-base font-semibold text-slate-950">Board-level capital allocation matrix</p>
            <p className="mt-1 text-sm text-slate-500">Each action must earn its place through strategic logic.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Pillar</th>
                  <th className="px-4 py-3">Capex</th>
                  <th className="px-4 py-3">Expected lift</th>
                  <th className="px-4 py-3">Risk avoided</th>
                  <th className="px-4 py-3">Board logic</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestments.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-semibold text-slate-950">{item.action}</td>
                    <td className="px-4 py-4 text-slate-700">{item.category}</td>
                    <td className="px-4 py-4 text-slate-700">{formatCurrency(item.costLow)}–{formatCurrency(item.costHigh)}</td>
                    <td className="px-4 py-4 text-slate-700">{item.expectedLift}</td>
                    <td className="px-4 py-4 text-slate-700">{item.riskAvoided}</td>
                    <td className="px-4 py-4 text-slate-700">{item.boardLogic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function BoardPackView({ data, periodKey, filters }) {
  const memo = getBoardDecisionMemo(periodKey, filters);
  const narrative = getBoardNarrative(periodKey, filters);

  return (
    <div>
      <SectionHeader
        eyebrow="Board Evidence Pack"
        title="A one-page decision memo for a board that has limited time and high standards."
        description="The pack must make the decision, evidence boundary, capital ask, and risk of inaction obvious within one minute."
        action={<Badge tone="amber">Evidence controlled</Badge>}
      />

      <Panel className="mb-5 p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Portfolio context</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{memo.portfolioContext}</p>
      </Panel>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Decision ask", memo.decisionRequired],
          ["Capital envelope", memo.capitalAsk],
          ["Expected outcome", "Move asset toward 82/100"],
          ["Risk of inaction", "Water leakage + delayed evidence maturity"],
        ].map(([label, value]) => (
          <Panel key={label} className="p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-950">{value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Executive recommendation</p>
          <p className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{memo.recommendation}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{memo.expectedOutcome}</p>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Board narrative</p>
            <div className="mt-3 space-y-3">
              {narrative.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</div>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">What management should do next</p>
          <div className="mt-4 space-y-3">
            {memo.next90Days.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">{index + 1}</div>
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Capital scenarios</p>
            <div className="mt-3 space-y-3">
              {getInvestmentScenarios(periodKey).map((scenario) => (
                <div key={scenario.key} className="rounded-2xl bg-white p-3 ring-1 ring-slate-100">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-950">{scenario.name}</p>
                    <Badge tone={scenario.tone}>{scenario.capex}</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{scenario.outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Pilot outcome at completion</p>
            <p className="mt-2 text-sm leading-6 text-emerald-900">{memo.pilotOutcome}</p>
          </div>

          <div className="mt-5 rounded-3xl bg-amber-50 p-4 ring-1 ring-amber-100">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Claim boundary</p>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              RATH does not issue carbon credits. Carbon, nature, and financial outputs remain internal supporting estimates unless upgraded through expert or third-party review.
            </p>
            <EvidencePathwayNote compact />
          </div>

          <Button onClick={() => openBoardPack(periodKey, filters)} className="mt-5 w-full">
            <Download className="h-4 w-4" />
            Open print-ready board pack
          </Button>
        </Panel>
      </div>
    </div>
  );
}

function EvidenceOverview({ data, filters }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Evidence & Nature-Readiness Studio"
        title="Disclosure readiness, evidence maturity, and claim control."
        description={`Senior ESG view for ${data.scopeLabel}: what can be used today, what remains blocked, and what is required next.`}
        action={<Badge tone="purple">{data.summary.dataQualityScore}/100 data quality</Badge>}
      />

      <EvidencePathwayNote />

      <ReportabilityReadinessStrip periodKey={data.periodKey} filters={filters} />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <EvidenceFunnel data={data} />
        <MissingDataActionQueue periodKey={data.periodKey} filters={filters} />
      </div>
    </div>
  );
}

function EvidenceFunnel({ data }) {
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">Evidence maturity funnel</p>
      <p className="mt-1 text-sm text-slate-500">Shows what is ready, what is missing, and what can be claimed internally.</p>
      <div className="mt-4 space-y-3">
        {data.evidenceFunnel.map((stage) => (
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

function DataQualityView({ data, filters }) {
  const quality = getDataQualityView(data.periodKey, filters);
  return (
    <div>
      <SectionHeader
        eyebrow="Data Quality Control"
        title="Operational evidence quality, exception density, and closure priorities."
        description={`Distinct from evidence maturity: this view shows the completeness of underlying records for ${data.scopeLabel}.`}
        action={<Badge tone="purple">{data.summary.dataQualityScore}/100 score</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {quality.cards.map((item) => (
          <SimpleMetricCard key={item.label} metric={item} icon={Database} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DataQualityTable rows={quality.rows} />
        <DataQualityExceptionRegister exceptions={quality.exceptions} />
      </div>
    </div>
  );
}

function DataQualityTable({ rows }) {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-base font-semibold text-slate-950">Data quality matrix</p>
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
            {rows.map((item) => (
              <tr key={item.area} className="border-b border-slate-100">
                <td className="px-4 py-4 font-semibold text-slate-950">{item.area}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 text-sm font-semibold">{item.score}</span>
                    <div className="w-28"><Progress value={item.score} tone={item.score >= 80 ? "green" : item.score >= 65 ? "amber" : "red"} /></div>
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

function DataQualityExceptionRegister({ exceptions }) {
  return (
    <Panel className="p-4 sm:p-5">
      <p className="text-base font-semibold text-slate-950">Exception register</p>
      <p className="mt-1 text-sm text-slate-500">Rows still below a complete evidence state.</p>
      <div className="mt-4 space-y-3">
        {exceptions.length ? exceptions.map((item) => (
          <div key={item.area} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">{item.area}</p>
              <Badge tone={item.status === "Weak" ? "red" : "amber"}>{item.status}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.gap}</p>
            <p className="mt-1 text-xs text-slate-500">Score: {item.score}/100</p>
          </div>
        )) : (
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">No open quality exceptions in the selected scope.</div>
        )}
      </div>
    </Panel>
  );
}

function LeapMapping({ data, filters }) {
  const leap = getLeapExecutiveView(data.periodKey, filters);
  return (
    <div>
      <SectionHeader
        eyebrow="LEAP-Aligned Nature Baseline"
        title="Locate, Evaluate, Assess, Prepare — adapted for living green assets."
        description={`Internal alignment support for ${data.scopeLabel}; not formal TNFD compliance.`}
        action={<Badge tone="blue">Nature baseline</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {leap.stages.map((item) => (
          <Panel key={item.stage} className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-slate-500">{item.stage}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{item.score}/100</p>
            <div className="mt-3"><Progress value={item.score} tone={item.score >= 80 ? "green" : item.score >= 60 ? "amber" : "red"} /></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">{item.output}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel className="overflow-hidden">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <p className="text-base font-semibold text-slate-950">LEAP decision matrix</p>
            <p className="mt-1 text-sm text-slate-500">How each stage converts into management use.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Current evidence</th>
                  <th className="px-4 py-3">Management question</th>
                  <th className="px-4 py-3">Next action</th>
                  <th className="px-4 py-3">Use</th>
                </tr>
              </thead>
              <tbody>
                {leap.stages.map((item) => (
                  <tr key={item.stage} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-semibold text-slate-950">{item.stage}</td>
                    <td className="px-4 py-4 text-slate-700">{item.evidence}</td>
                    <td className="px-4 py-4 text-slate-700">{item.managementQuestion}</td>
                    <td className="px-4 py-4 text-slate-700">{item.nextAction}</td>
                    <td className="px-4 py-4"><Badge tone="blue">{item.reportingUse}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Material signals</p>
          <p className="mt-1 text-sm text-slate-500">What a senior ESG lead should take away.</p>
          <div className="mt-4 space-y-3">
            {leap.materialSignals.map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.title}</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ClaimSafety({ data }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Claim Safety Review"
        title="What can be said, and what must be blocked."
        description="This is the credibility shield. It protects the client from ESG overclaiming."
        action={<Badge tone="amber">Restricted</Badge>}
      />
      <EvidencePathwayNote />
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
              {data.claims.map((item) => (
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
      <ClaimUpgradePath periodKey={data.periodKey} filters={data.activeFilters} />
    </div>
  );
}

function Methodology({ data }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Methodology Library"
        title="Assumptions, boundaries, and evidence levels."
        description="This is where ESG and reviewers understand the calculation boundary."
        action={<Badge tone="dark">{METHOD_VERSION}</Badge>}
      />
      <EvidencePathwayNote />
      <div className="grid gap-4 md:grid-cols-2">
        {data.methodology.map((item) => (
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

function ExportsView({ periodKey, filters, role }) {
  const exportSets = {
    [ROLES.CEO]: [
      ["Board Decision Memo", "PDF-ready", "CEO-forwardable decision pack.", () => openBoardPack(periodKey, filters)],
      ["Investment Scenario Pack", "PDF-ready", "Scenario comparison for capital committee.", () => openInvestmentScenarioPack(periodKey, filters)],
      ["Asset Intelligence Summary", "PDF-ready", "Portfolio-level management summary.", () => openAssetIntelligenceSummary(periodKey, filters)],
    ],
    [ROLES.ESG]: [
      ["Monthly ESG Evidence Pack", "PDF-ready", "Evidence maturity, gaps, and claim boundaries.", () => openEsgEvidencePack(periodKey, filters)],
      ["Claim Safety Register", "PDF-ready", "Allowed, conditional, and blocked language.", () => openClaimSafetyRegister(periodKey, filters)],
      ["Data Quality Exception Report", "PDF-ready", "Gaps blocking E1 readiness.", () => openDataQualityExceptionReport(periodKey, filters)],
    ],
    [ROLES.IFM]: [
      ["QBR Service Pack", "PDF-ready", "SLA, root causes, closure proof, and escalation watch.", () => openQbrPack(periodKey, filters)],
      ["Vendor Performance Scorecard", "PDF-ready", "Vendor accountability and reopen risk.", () => openVendorPerformanceScorecard(periodKey, filters)],
      ["Weekly Exception Report", "PDF-ready", "Items requiring client attention.", () => openWeeklyExceptionReport(periodKey, filters)],
    ],
    [ROLES.PM]: [
      ["Daily Action Sheet", "PDF-ready", "Priority work for today.", () => openDailyActionSheet(periodKey, filters)],
      ["Zone Inspection List", "PDF-ready", "Site visit queue and reasons.", () => openZoneInspectionList(periodKey, filters)],
      ["Open Ticket Tracker", "PDF-ready", "Outstanding tasks and SLA status.", () => openOpenTicketTracker(periodKey, filters)],
    ],
  };
  const items = exportSets[role] || exportSets[ROLES.ESG];

  return (
    <div>
      <SectionHeader
        eyebrow="Export Studio"
        title="Outputs built for the document each role actually sends upward."
        description="Every export is role-specific, not a generic dashboard print."
        action={<Badge tone="green">Export ready</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(([title, type, body, action]) => (
          <Panel key={title} className="p-4 sm:p-5">
            <Download className="h-5 w-5 text-emerald-700" />
            <p className="mt-4 text-base font-semibold text-slate-950">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{type}</p>
            <p className="mt-4 text-sm leading-6 text-slate-700">{body}</p>
            <Button variant="light" className="mt-4 w-full" onClick={action}>
              Open report
            </Button>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function OperationsControl({ data, role, filters }) {
  const metrics = getRoleMetrics(role, data.periodKey, filters);
  const isIFM = role === ROLES.IFM;

  return (
    <div>
      <SectionHeader
        eyebrow="GreenOps Control Center"
        title={isIFM ? "Account control, QBR readiness, and client-risk visibility." : "Daily operating control for the property team."}
        description={isIFM ? "IFM view: service proof, escalation watch, and executive account narrative." : "Property-manager view: actions due today, visit queue, and visible exceptions."}
        action={<Badge tone="blue">{isIFM ? "QBR view" : "Daily control"}</Badge>}
      />

      <div className={cx("grid gap-4 md:grid-cols-2", isIFM ? "xl:grid-cols-3" : "xl:grid-cols-4")}>
        {metrics.map((item, index) => {
          const Icon = [ClipboardList, ShieldCheck, AlertTriangle, Wallet, CheckCircle2, FileText][index] || Activity;
          return <SimpleMetricCard key={item.label} metric={item} icon={Icon} />;
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        {isIFM ? <ClientEscalationWatch periodKey={data.periodKey} filters={filters} /> : <DailyActionQueue periodKey={data.periodKey} filters={filters} />}
        {isIFM ? <QbrReadinessPanel periodKey={data.periodKey} filters={filters} /> : <ZoneVisitQueue periodKey={data.periodKey} filters={filters} />}
      </div>

      <div className="mt-5">
        <TicketBoard data={data} />
      </div>
    </div>
  );
}

function SimpleMetricCard({ metric, icon: Icon }) {
  return (
    <Panel className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{metric.value}</p>
          <p className="mt-1 text-sm text-slate-500">{metric.sub}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Panel>
  );
}

function TicketBoard({ data, tickets = data.tickets }) {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-base font-semibold text-slate-950">Tickets + SLA board</p>
        <p className="mt-1 text-sm text-slate-500">Every issue has status, owner, and proof.</p>
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
            {tickets.map((ticket) => (
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

function RecurringIssues({ data }) {
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
              <BarChart data={data.recurringIssues} layout="vertical" margin={{ top: 10, right: 18, bottom: 0, left: 20 }}>
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
            {data.recurringIssues.map((item) => (
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

function ServiceReport({ data, role }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Weekly Service Report"
        title="Simple export for FM meetings."
        description="Operational, direct, and non-ESG-heavy."
        action={<Button variant="dark" onClick={() => role === ROLES.PM ? openDailyActionSheet(data.periodKey) : openQbrPack(data.periodKey)}><Download className="h-4 w-4" /> Export {role === ROLES.PM ? "daily sheet" : "QBR pack"}</Button>}
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <TicketBoard data={data} />
        <Panel className="p-4 sm:p-5">
          <p className="text-base font-semibold text-slate-950">Vendor performance</p>
          <div className="mt-4 space-y-4">
            {data.vendorPerformance.map((vendor) => (
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
  const [periodKey, setPeriodKey] = useState("30d");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [filterOpen, setFilterOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const role = user?.role || ROLES.CEO;
  const views = user ? roleViews[user.role] : roleViews[ROLES.CEO];
  const rawData = useMemo(() => getSnapshot(periodKey), [periodKey]);
  const data = useMemo(() => getFilteredSnapshot(periodKey, filters), [periodKey, filters]);
  const filteredZones = useMemo(
    () => filterZones(data, { ...filters, query }),
    [data, filters, query]
  );
  const filteredInvestments = useMemo(
    () => filterInvestments(data, filters),
    [data, filters]
  );
  const filteredTickets = useMemo(
    () => filterTickets(data, { query, ...filters }),
    [data, query, filters]
  );

  function login(selectedUser) {
    setUser(selectedUser);
    setActiveView(selectedUser.defaultView);
  }

  if (!user) return <LoginPortal onLogin={login} />;

  function renderView() {
    switch (activeView) {
      case "portfolio":
        return <PortfolioIntelligenceView />;
      case "value":
        return <ValueOverview data={data} role={role} periodKey={periodKey} filters={filters} />;
      case "risk":
      case "zoneHealth":
        return <RiskMapView data={data} filteredZones={filteredZones} />;
      case "natureWater":
        return <NatureWaterView data={data} />;
      case "carbonResource":
        return <CarbonResourceView data={data} periodKey={periodKey} filters={filters} />;
      case "investment":
        return <InvestmentPlannerView data={data} filteredInvestments={filteredInvestments} />;
      case "boardPack":
        return <BoardPackView data={data} periodKey={periodKey} filters={filters} />;
      case "evidence":
        return <EvidenceOverview data={data} filters={filters} />;
      case "dataQuality":
        return <DataQualityView data={data} filters={filters} />;
      case "leap":
        return <LeapMapping data={data} filters={filters} />;
      case "claimSafety":
        return <ClaimSafety data={data} />;
      case "methodology":
        return <Methodology data={data} />;
      case "exports":
        return <ExportsView periodKey={periodKey} filters={filters} role={role} />;
      case "control":
        return <OperationsControl data={data} role={role} filters={filters} />;
      case "tickets":
        return (
          <div>
            <SectionHeader
              eyebrow="Tickets + SLA"
              title="Open work, closure proof, and SLA discipline."
              description="This is the operating proof layer."
            />
            <TicketBoard data={data} tickets={filteredTickets} />
          </div>
        );
      case "waterStress":
        return <NatureWaterView data={data} />;
      case "recurring":
        return <RecurringIssues data={data} />;
      case "serviceReport":
        return <ServiceReport data={data} role={role} />;
      default:
        return <ValueOverview data={data} role={role} periodKey={periodKey} filters={filters} />;
    }
  }

  return (
    <div className="min-h-screen text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
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

          {(role === ROLES.IFM || role === ROLES.PM) && (
            <div className="hidden flex-1 justify-center px-8 lg:flex">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search zones or tickets..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          )}

          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => setAiOpen(true)}><Badge tone="green">AI-powered</Badge></button>
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
          <div className="sticky top-[86px] rounded-[30px] border border-slate-200 bg-white/94 p-3 shadow-enterprise backdrop-blur">
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
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 lg:hidden">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-2xl bg-white p-1 shadow-sm">
                <select value={activeView} onChange={(e) => setActiveView(e.target.value)} className="w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold outline-none">
                  {views.map((item) => (
                    <option key={item.key} value={item.key}>{item.label}</option>
                  ))}
                </select>
              </div>
              <PeriodTabs periodKey={periodKey} setPeriodKey={setPeriodKey} />
            </div>
            <Button variant="light" onClick={() => setFilterOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          <div className="mb-5 hidden items-center justify-between gap-4 lg:flex">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{dashboardCopy[role].purpose}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-slate-950">{dashboardCopy[role].productName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <PeriodTabs periodKey={periodKey} setPeriodKey={setPeriodKey} />
              <Button variant="light" onClick={() => setFilterOpen(true)}>
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
              {role === ROLES.CEO && (
                <Button variant="dark" onClick={() => openBoardPack(periodKey, filters)}>
                  <Download className="h-4 w-4" /> Export Board Pack
                </Button>
              )}
            </div>
          </div>

          <ActiveFilterBar data={data} filters={filters} setFilters={setFilters} />
          {renderView()}
        </section>
      </main>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} data={rawData} role={role} />
      <AiLauncher onClick={() => setAiOpen(true)} role={role} />
      <AiDrawer open={aiOpen} onClose={() => setAiOpen(false)} role={role} view={activeView} periodKey={periodKey} filters={filters} />
    </div>
  );
}
