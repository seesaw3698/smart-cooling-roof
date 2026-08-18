import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home, Activity, Cpu, SlidersHorizontal, Droplet, BarChart3, Bell, Wrench,
  FileText, Settings as SettingsIcon, ShieldCheck, Sun, Moon, Menu, X, LogOut,
  Thermometer, Wind, CloudRain, Battery, Zap, Gauge, Users, Building2,
  AlertTriangle, CheckCircle2, Mail, Phone, Chrome, Play, Square, Power,
  Droplets, Waves, TrendingUp, TrendingDown, Leaf, DollarSign, Calendar,
  ChevronRight, Download, Mic, MessageCircle, QrCode, MapPin, Globe,
  RefreshCw, ShieldAlert, Server, ClipboardList, ArrowUpRight, ArrowDownRight,
  Radio, WifiOff, Wifi, Lock, User, Eye, EyeOff, Building
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend
} from "recharts";

/* ======================================================================
   GLOBAL STYLES / DESIGN TOKENS
   Subject: rainwater-mist roof cooling + AI/IoT. Palette pulls from sky,
   mist and heat: deep slate-navy nights, cyan/teal mist, amber sun-warning.
   ====================================================================== */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

    .scr-root {
      --bg: #0A1420;
      --bg-alt: #0F1D2E;
      --bg-elevated: #132538;
      --surface: rgba(255,255,255,0.045);
      --surface-strong: rgba(255,255,255,0.075);
      --border: rgba(255,255,255,0.09);
      --text: #E7EEF3;
      --text-dim: #8CA2B5;
      --text-faint: #5B7086;
      --cyan: #2DD9E8;
      --cyan-dim: rgba(45,217,232,0.15);
      --teal: #34D9B4;
      --amber: #FDB25C;
      --amber-dim: rgba(253,178,92,0.15);
      --coral: #FF7A6B;
      --coral-dim: rgba(255,122,107,0.15);
      --success: #3FDB8F;
      --success-dim: rgba(63,219,143,0.15);
      --warn: #F7C948;
      --warn-dim: rgba(247,201,72,0.15);
      --danger: #FF5C6C;
      --danger-dim: rgba(255,92,108,0.15);
      --purple: #A98CFF;
      --font-display: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius: 20px;
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }
    .scr-root.light {
      --bg: #EEF4F6;
      --bg-alt: #F7FBFC;
      --bg-elevated: #FFFFFF;
      --surface: rgba(15,45,60,0.04);
      --surface-strong: rgba(15,45,60,0.07);
      --border: rgba(15,45,60,0.10);
      --text: #0E2433;
      --text-dim: #4B6577;
      --text-faint: #7C93A2;
      --cyan-dim: rgba(20,170,190,0.12);
      --amber-dim: rgba(220,140,30,0.14);
      --coral-dim: rgba(230,90,75,0.12);
      --success-dim: rgba(20,160,100,0.13);
      --warn-dim: rgba(200,150,20,0.14);
      --danger-dim: rgba(220,60,70,0.13);
    }
    .scr-root * { box-sizing: border-box; }
    .scr-bg-orbs {
      position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
    }
    .scr-orb {
      position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35;
    }
    .scr-root.light .scr-orb { opacity: 0.25; }

    .scr-glass {
      background: linear-gradient(180deg, var(--surface-strong), var(--surface));
      border: 1px solid var(--border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    .scr-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
    .scr-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

    .scr-fade-in { animation: scrFadeIn .5s ease both; }
    @keyframes scrFadeIn { from { opacity: 0; transform: translateY(8px);} to {opacity:1; transform:none;} }
    @media (prefers-reduced-motion: reduce) {
      .scr-fade-in, .scr-pulse, .scr-drop, .scr-spin { animation: none !important; }
    }
    .scr-pulse { animation: scrPulse 2.2s ease-in-out infinite; }
    @keyframes scrPulse { 0%,100%{opacity:1} 50%{opacity:.45} }
    .scr-spin { animation: scrSpin 1s linear infinite; }
    @keyframes scrSpin { to { transform: rotate(360deg);} }

    /* Roof signature animation */
    .scr-roof-wrap { position: relative; }
    .scr-drop {
      position: absolute; top: 38%; width: 3px; height: 12px; border-radius: 3px;
      background: linear-gradient(180deg, var(--cyan), transparent);
      animation: scrFall 1.4s linear infinite;
      opacity: 0;
    }
    @keyframes scrFall {
      0% { transform: translateY(0); opacity: 0; }
      10% { opacity: .9; }
      90% { opacity: .5; }
      100% { transform: translateY(60px); opacity: 0; }
    }

    button { font-family: inherit; cursor: pointer; }
    input, select { font-family: inherit; }

    .scr-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border-radius: 14px; border: 1px solid var(--border); padding: 11px 18px;
      font-weight: 600; font-size: 14px; transition: all .15s ease; color: var(--text);
      background: var(--surface);
    }
    .scr-btn:hover { background: var(--surface-strong); transform: translateY(-1px); }
    .scr-btn:active { transform: translateY(0); }
    .scr-btn-primary {
      background: linear-gradient(135deg, var(--cyan), var(--teal));
      color: #06222A; border: none; box-shadow: 0 8px 24px -8px rgba(45,217,232,0.55);
    }
    .scr-btn-primary:hover { filter: brightness(1.06); }
    .scr-btn-danger { background: linear-gradient(135deg, var(--coral), var(--danger)); color: #2B0508; border:none; box-shadow: 0 8px 24px -8px rgba(255,92,108,0.5);}
    .scr-btn-ghost { background: transparent; border: 1px solid var(--border); }

    .scr-nav-item {
      display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 14px;
      color: var(--text-dim); font-weight: 500; font-size: 14px; transition: all .15s ease;
      border: 1px solid transparent; white-space: nowrap;
    }
    .scr-nav-item:hover { background: var(--surface); color: var(--text); }
    .scr-nav-item.active {
      background: linear-gradient(135deg, var(--cyan-dim), transparent);
      border-color: var(--border); color: var(--cyan); font-weight: 600;
    }

    .scr-badge { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700; letter-spacing:.03em; padding: 4px 10px; border-radius:999px; text-transform: uppercase; }
    .scr-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }

    .scr-input {
      width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border);
      background: var(--surface); color: var(--text); font-size: 14px; outline: none; transition: border .15s ease;
    }
    .scr-input:focus { border-color: var(--cyan); }
    .scr-input::placeholder { color: var(--text-faint); }

    .scr-tab { padding: 9px 16px; border-radius: 11px; font-size: 13px; font-weight: 600; color: var(--text-dim); border: 1px solid transparent; }
    .scr-tab.active { background: var(--surface-strong); color: var(--text); border-color: var(--border); }

    .scr-slider {
      -webkit-appearance: none; width: 100%; height: 6px; border-radius: 6px;
      background: var(--surface-strong); outline: none;
    }
    .scr-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
      background: var(--cyan); cursor: pointer; border: 3px solid var(--bg-elevated); box-shadow: 0 0 0 1px var(--cyan);
    }
    .scr-toggle { width: 46px; height: 26px; border-radius: 999px; position: relative; transition: background .2s ease; border: 1px solid var(--border); flex-shrink:0; }
    .scr-toggle-knob { position:absolute; top:2px; left:2px; width:20px; height:20px; border-radius:50%; background:#fff; transition: transform .2s ease; box-shadow: 0 2px 4px rgba(0,0,0,.3);}

    ::selection { background: var(--cyan-dim); }

    .scr-focus:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }

    @media (max-width: 767px) {
      .scr-hide-mobile { display: none !important; }
    }
    @media (min-width: 768px) {
      .scr-hide-desktop { display: none !important; }
    }
  `}</style>
);

/* ======================================================================
   MOCK DATA HELPERS
   ====================================================================== */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => Math.random() * (max - min) + min;
const fmt1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const tankHealth = (level) => (level >= 40 ? "Good" : level >= 15 ? "Fair" : "Low");
const WATER_RATE_L_PER_MIN = 3.3; // simulated mist consumption rate per tank
const fmtMinutes = (mins) => {
  if (mins <= 0) return "0 min";
  const h = Math.floor(mins / 60), m = Math.round(mins % 60);
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
};

function genSeries(n, base, amp, noise = 1) {
  return Array.from({ length: n }, (_, i) => {
    const v = base + Math.sin((i / n) * Math.PI * 2) * amp + rand(-noise, noise);
    return Math.round(v * 10) / 10;
  });
}

const hourly24 = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const tempSeries = genSeries(24, 34, 9, 1.2).map((v, i) => ({
  time: hourly24[i], roof: clamp(v + 6, 20, 58), indoor: clamp(v - 6, 18, 34), outdoor: clamp(v, 18, 46),
}));
const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const waterUsage = weekly.map((d) => ({ day: d, used: Math.round(rand(60, 180)), collected: Math.round(rand(40, 220)) }));
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const energySaved = months.map((m, i) => ({ month: m, saved: Math.round(220 + Math.sin(i / 2) * 90 + rand(-15, 15)) }));
const coolingFreq = weekly.map((d) => ({ day: d, cycles: Math.round(rand(2, 9)) }));
const carbonData = months.slice(0, 8).map((m, i) => ({ month: m, kg: Math.round(30 + i * 6 + rand(-4, 4)) }));
const pieData = [
  { name: "Cooling System", value: 46, color: "var(--cyan)" },
  { name: "Water Pumping", value: 18, color: "var(--teal)" },
  { name: "Sensors/AI", value: 12, color: "var(--amber)" },
  { name: "Standby", value: 24, color: "var(--text-faint)" },
];

const initialSensors = [
  { id: "roof_temp", label: "Roof Temperature", icon: Thermometer, value: 42.3, unit: "°C", status: "warning", healthy: true, updated: "now" },
  { id: "indoor_temp", label: "Indoor Temperature", icon: Thermometer, value: 27.1, unit: "°C", status: "normal", healthy: true, updated: "now" },
  { id: "outdoor_temp", label: "Outdoor Temperature", icon: Sun, value: 36.8, unit: "°C", status: "normal", healthy: true, updated: "now" },
  { id: "humidity", label: "Humidity", icon: CloudRain, value: 58, unit: "%", status: "normal", healthy: true, updated: "now" },
  { id: "water_level", label: "Water Level", icon: Droplet, value: 72, unit: "%", status: "normal", healthy: true, updated: "now" },
  { id: "rain", label: "Rain Detection", icon: CloudRain, value: 0, unit: "mm/h", status: "normal", healthy: true, updated: "now" },
  { id: "wind", label: "Wind Speed", icon: Wind, value: 14, unit: "km/h", status: "normal", healthy: true, updated: "now" },
  { id: "pump", label: "Water Pump", icon: Gauge, value: 1, unit: "", status: "normal", healthy: true, updated: "now", isBinary: true, labelOn: "Running", labelOff: "Idle" },
  { id: "nozzle", label: "Mist Nozzles", icon: Droplets, value: 1, unit: "", status: "normal", healthy: true, updated: "now", isBinary: true, labelOn: "Spraying", labelOff: "Closed" },
];

const initialNotifications = [
  { id: 1, type: "danger", title: "Low Water Level Detected", body: "Primary Tank at 12%. Estimated remaining time: 18 minutes. Recommended action: switch to secondary water tank.", time: "1 min ago", channel: "Push" },
  { id: 2, type: "danger", title: "High Roof Temperature", body: "Roof sensor reads 42.3°C — above safe threshold.", time: "2 min ago", channel: "Push" },
  { id: 3, type: "success", title: "Cooling Started", body: "Automatic mist cooling activated on Zone A roof.", time: "3 min ago", channel: "Push" },
  { id: 4, type: "warning", title: "AI Water Prediction Warning", body: "Current cooling session may require ~180 L. Only 60 L available on the active tank — refill or switch to backup.", time: "6 min ago", channel: "Technician Alert" },
  { id: 5, type: "warning", title: "Tank Switched", body: "Active supply automatically moved from Tank 1 (Primary) to Tank 2 (Secondary) to avoid interrupting cooling.", time: "18 min ago", channel: "In-App" },
  { id: 6, type: "success", title: "Cooling Completed", body: "Roof temperature stabilized at 33.1°C.", time: "1 hr ago", channel: "Push" },
  { id: 7, type: "danger", title: "Sensor Offline", body: "Outdoor wind sensor (Building 2) not responding.", time: "3 hr ago", channel: "SMS" },
  { id: 8, type: "warning", title: "AI Heat Warning", body: "Heat wave probability rising for tomorrow, 2–5 PM.", time: "5 hr ago", channel: "Email" },
];

const maintenanceHistory = [
  { id: 1, task: "Mist Nozzle Cleaning", tech: "R. Nair", date: "2026-07-18", status: "Completed" },
  { id: 2, task: "Pump Motor Inspection", tech: "S. Kumar", date: "2026-07-05", status: "Completed" },
  { id: 3, task: "Sensor Calibration — Roof", tech: "R. Nair", date: "2026-06-21", status: "Completed" },
  { id: 4, task: "Filter Replacement", tech: "Unassigned", date: "2026-08-10", status: "Scheduled" },
];

const buildings = [
  { id: 1, name: "Residence — Coimbatore", roofTemp: 42.3, tank: 72, status: "Cooling Active", health: 98 },
  { id: 2, name: "Villa — ECR Chennai", roofTemp: 38.9, tank: 54, status: "Standby", health: 91 },
  { id: 3, name: "Farmhouse — Coonoor", roofTemp: 29.4, tank: 88, status: "Standby", health: 100 },
];

const users = [
  { id: 1, name: "Aarav Menon", role: "Home Owner", email: "aarav@example.com", status: "Active" },
  { id: 2, name: "R. Nair", role: "Technician", email: "nair.tech@example.com", status: "Active" },
  { id: 3, name: "S. Kumar", role: "Technician", email: "kumar.tech@example.com", status: "Active" },
  { id: 4, name: "Priya Admin", role: "Administrator", email: "priya@scr.io", status: "Active" },
  { id: 5, name: "Guest Viewer", role: "Home Owner", email: "guest@example.com", status: "Invited" },
];

/* ======================================================================
   SMALL PRIMITIVES
   ====================================================================== */
const statusColor = { normal: "success", warning: "warn", critical: "danger" };

function StatusBadge({ status, children }) {
  const key = statusColor[status] || "success";
  return (
    <span className="scr-badge" style={{ background: `var(--${key}-dim)`, color: `var(--${key})` }}>
      <span className="scr-dot" style={{ background: `var(--${key})` }} />
      {children}
    </span>
  );
}

function Toggle({ on, onChange, disabled }) {
  return (
    <button
      className="scr-toggle scr-focus"
      onClick={() => !disabled && onChange(!on)}
      style={{ background: on ? "var(--cyan)" : "var(--surface-strong)", opacity: disabled ? 0.5 : 1 }}
      aria-pressed={on}
    >
      <span className="scr-toggle-knob" style={{ transform: on ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );
}

function Card({ children, style, className = "" }) {
  return <div className={`scr-glass ${className}`} style={{ padding: 20, ...style }}>{children}</div>;
}

function SectionTitle({ icon: Icon, title, subtitle, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {Icon && (
          <div style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", background: "var(--cyan-dim)", color: "var(--cyan)", flexShrink: 0 }}>
            <Icon size={19} />
          </div>
        )}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, margin: 0 }}>{title}</h2>
          {subtitle && <p style={{ color: "var(--text-dim)", fontSize: 13, margin: "2px 0 0" }}>{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, trend, trendLabel, accent = "cyan" }) {
  return (
    <Card style={{ padding: 18 }} className="scr-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", background: `var(--${accent}-dim)`, color: `var(--${accent})` }}>
          <Icon size={18} />
        </div>
        {trend != null && (
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: trend >= 0 ? "var(--success)" : "var(--coral)" }}>
            {trend >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
        {value}<span style={{ fontSize: 14, color: "var(--text-dim)", marginLeft: 3, fontFamily: "var(--font-body)" }}>{unit}</span>
      </div>
      <div style={{ color: "var(--text-dim)", fontSize: 12.5, marginTop: 3 }}>{label}</div>
      {trendLabel && <div style={{ color: "var(--text-faint)", fontSize: 11, marginTop: 6 }}>{trendLabel}</div>}
    </Card>
  );
}

function AlertBanner({ level = "info", icon: Icon = ShieldAlert, title, children, style, action }) {
  const c = { info: "cyan", warning: "warn", danger: "danger", success: "success" }[level] || "cyan";
  return (
    <Card style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 16, borderColor: `var(--${c})`, background: `var(--${c}-dim)`, ...style }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "var(--bg-elevated)", color: `var(--${c})`, display: "grid", placeItems: "center" }}>
        <Icon size={17} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: `var(--${c})` }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginTop: 3, lineHeight: 1.5 }}>{children}</div>
      </div>
      {action}
    </Card>
  );
}

function ConfirmModal({ modal, onConfirm, onCancel }) {
  if (!modal) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center", background: "rgba(4,10,16,0.6)", backdropFilter: "blur(4px)", padding: 20 }}
      onClick={onCancel}>
      <div className="scr-glass scr-fade-in" style={{ padding: 26, maxWidth: 380, width: "100%", background: "var(--bg-elevated)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 46, height: 46, borderRadius: 13, display: "grid", placeItems: "center", background: modal.danger ? "var(--danger-dim)" : "var(--cyan-dim)", color: modal.danger ? "var(--danger)" : "var(--cyan)", marginBottom: 14 }}>
          {modal.danger ? <AlertTriangle size={22} /> : <CheckCircle2 size={22} />}
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, margin: "0 0 8px" }}>{modal.title}</h3>
        <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.5, margin: "0 0 22px" }}>{modal.message}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="scr-btn scr-btn-ghost scr-focus" style={{ flex: 1 }} onClick={onCancel}>Cancel</button>
          <button className={`scr-btn scr-focus ${modal.danger ? "scr-btn-danger" : "scr-btn-primary"}`} style={{ flex: 1 }} onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="scr-fade-in" style={{
      position: "fixed", bottom: 88, left: "50%", transform: "translateX(-50%)", zIndex: 200,
      background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 18px",
      display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.4)", maxWidth: "92vw"
    }}>
      <CheckCircle2 size={17} color="var(--success)" />
      <span style={{ fontSize: 13.5, fontWeight: 500 }}>{toast}</span>
    </div>
  );
}

/* ======================================================================
   ROOF SIGNATURE VISUAL
   ====================================================================== */
function RoofVisual({ cooling, roofTemp }) {
  const drops = [15, 30, 45, 60, 75, 90];
  const tempPct = clamp((roofTemp - 20) / 40, 0, 1);
  const roofColor = tempPct > 0.7 ? "var(--coral)" : tempPct > 0.45 ? "var(--amber)" : "var(--cyan)";
  return (
    <div className="scr-roof-wrap" style={{ position: "relative", height: 150, borderRadius: 16, overflow: "hidden", background: "linear-gradient(180deg, transparent, var(--surface))" }}>
      <svg viewBox="0 0 400 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={roofColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={roofColor} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <polygon points="20,60 200,15 380,60 380,72 20,72" fill="url(#roofGrad)" />
        <rect x="20" y="72" width="360" height="8" fill="var(--border)" />
        {drops.map((x, i) => (
          <circle key={i} cx={x * 4 - 20} cy="66" r="2.6" fill={cooling ? "var(--cyan)" : "var(--text-faint)"} />
        ))}
        <rect x="30" y="105" width="340" height="30" rx="6" fill="var(--surface-strong)" />
        <rect x="30" y="105" width={340 * (1 - tempPct * 0.15)} height="30" rx="6" fill="none" stroke="var(--border)" />
      </svg>
      {cooling && drops.map((x, i) => (
        <span key={i} className="scr-drop" style={{ left: `${(x / 100) * 92 + 3}%`, animationDelay: `${i * 0.22}s` }} />
      ))}
      <div style={{ position: "absolute", top: 10, right: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <span className="scr-dot scr-pulse" style={{ background: cooling ? "var(--cyan)" : "var(--text-faint)" }} />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: cooling ? "var(--cyan)" : "var(--text-faint)", textTransform: "uppercase", letterSpacing: ".04em" }}>
          {cooling ? "Mist Active" : "Idle"}
        </span>
      </div>
    </div>
  );
}

/* ======================================================================
   LOGIN VIEW
   ====================================================================== */
function LoginView({ onLogin }) {
  const [method, setMethod] = useState("email");
  const [role, setRole] = useState("Home Owner");
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState("form");

  const submit = (e) => {
    e.preventDefault();
    if (method === "otp" && step === "form") { setStep("otp"); return; }
    onLogin(role);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 20, position: "relative", zIndex: 1 }}>
      <div className="scr-fade-in" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 26 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, var(--cyan), var(--teal))", display: "grid", placeItems: "center" }}>
            <Droplets size={24} color="#06222A" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, lineHeight: 1 }}>Smart Cooling Roof</div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)", letterSpacing: ".03em" }}>AI + IOT SUSTAINABLE ENERGY SYSTEM</div>
          </div>
        </div>

        <Card style={{ padding: 26 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 21, margin: "0 0 4px" }}>Welcome back</h1>
          <p style={{ color: "var(--text-dim)", fontSize: 13.5, margin: "0 0 20px" }}>Sign in to monitor and control your roof cooling system.</p>

          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {["Home Owner", "Technician", "Administrator"].map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`scr-tab ${role === r ? "active" : ""} scr-focus`} style={{ flex: 1 }}>{r}</button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 18, background: "var(--surface)", padding: 4, borderRadius: 13 }}>
            <button onClick={() => { setMethod("email"); setStep("form"); }} className="scr-focus" style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: method === "email" ? "var(--bg-elevated)" : "transparent", color: method === "email" ? "var(--text)" : "var(--text-dim)", fontWeight: 600, fontSize: 12.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Mail size={14} /> Email
            </button>
            <button onClick={() => { setMethod("otp"); setStep("form"); }} className="scr-focus" style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: method === "otp" ? "var(--bg-elevated)" : "transparent", color: method === "otp" ? "var(--text)" : "var(--text-dim)", fontWeight: 600, fontSize: 12.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Phone size={14} /> Mobile OTP
            </button>
            <button onClick={() => onLogin(role)} className="scr-focus" style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "transparent", color: "var(--text-dim)", fontWeight: 600, fontSize: 12.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Chrome size={14} /> Google
            </button>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {method === "email" && (
              <>
                <input className="scr-input scr-focus" placeholder="Email address" type="email" required />
                <div style={{ position: "relative" }}>
                  <input className="scr-input scr-focus" placeholder="Password" type={showPw ? "text" : "password"} required style={{ paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-dim)" }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </>
            )}
            {method === "otp" && step === "form" && (
              <input className="scr-input scr-focus" placeholder="Mobile number" type="tel" required />
            )}
            {method === "otp" && step === "otp" && (
              <>
                <p style={{ fontSize: 13, color: "var(--text-dim)", margin: 0 }}>Enter the 6-digit code we sent to your phone.</p>
                <input className="scr-input scr-focus" placeholder="000000" style={{ letterSpacing: "0.4em", textAlign: "center", fontFamily: "var(--font-mono)" }} maxLength={6} required />
              </>
            )}
            <button type="submit" className="scr-btn scr-btn-primary scr-focus" style={{ marginTop: 4 }}>
              <Lock size={15} /> {method === "otp" && step === "form" ? "Send OTP" : "Sign in"}
            </button>
          </form>
        </Card>
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-faint)", marginTop: 16 }}>
          Protected by JWT auth, role-based access & HTTPS encryption.
        </p>
      </div>
    </div>
  );
}

/* ======================================================================
   DASHBOARD VIEW
   ====================================================================== */
function DashboardView({ sensors, cooling, setConfirm, aiPrediction, tanks, activeTank, config }) {
  const roof = sensors.find((s) => s.id === "roof_temp");
  const indoor = sensors.find((s) => s.id === "indoor_temp");
  const outdoor = sensors.find((s) => s.id === "outdoor_temp");
  const humidity = sensors.find((s) => s.id === "humidity");
  const water = sensors.find((s) => s.id === "water_level");
  const heatIndex = fmt1(Number(roof.value) * 0.4 + Number(humidity.value) * 0.3 + 12);
  const active = tanks[activeTank];
  const activeLabel = activeTank === "tank1" ? "Tank 1 (Primary)" : "Tank 2 (Secondary)";
  const lowWater = active.level <= config.minWater;

  return (
    <div className="scr-fade-in">
      <SectionTitle
        icon={Home}
        title="Overview"
        subtitle="Live status across roof, water, energy and AI systems"
        right={<StatusBadge status={cooling ? "normal" : "warning"}>{cooling ? "Cooling Active" : "System Idle"}</StatusBadge>}
      />

      {lowWater && (
        <AlertBanner level={active.level <= 8 ? "danger" : "warning"} icon={ShieldAlert} title={active.level <= 8 ? "Primary Water Tank Nearly Empty" : "Low Water Level Detected"} style={{ marginBottom: 16 }}>
          {activeLabel} is at <strong style={{ color: "var(--text)" }}>{fmt1(active.level)}%</strong>. Estimated remaining cooling time: <strong style={{ color: "var(--text)" }}>{fmtMinutes((active.level / 100 * active.capacity) / WATER_RATE_L_PER_MIN)}</strong>. See the Water tab to switch tanks.
        </AlertBanner>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard icon={Thermometer} label="Roof Temperature" value={fmt1(roof.value)} unit="°C" accent="coral" trend={-2.1} trendLabel="vs last hour" />
        <StatCard icon={Home} label="Indoor Temperature" value={fmt1(indoor.value)} unit="°C" accent="cyan" trend={-4.6} trendLabel="since cooling" />
        <StatCard icon={Sun} label="Outdoor Temperature" value={fmt1(outdoor.value)} unit="°C" accent="amber" trend={1.2} />
        <StatCard icon={CloudRain} label="Humidity" value={fmt1(humidity.value)} unit="%" accent="teal" trend={0.4} />
        <StatCard icon={Gauge} label="Heat Index" value={heatIndex} unit="°C" accent="coral" />
        <StatCard icon={Droplet} label="Water Tank" value={fmt1(water.value)} unit="%" accent={lowWater ? "coral" : "cyan"} trendLabel={activeLabel + " active"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }} className="scr-dash-grid">
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Cooling Roof — Live View</div>
              <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>Zone A · Rainwater mist nozzles</div>
            </div>
          </div>
          <RoofVisual cooling={cooling} roofTemp={roof.value} />
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button className="scr-btn scr-btn-primary scr-focus" onClick={() => setConfirm({ title: "Start Cooling", message: "Activate mist cooling on the roof now?", action: "start" })}>
              <Play size={15} /> Start Cooling
            </button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => setConfirm({ title: "Stop Cooling", message: "Stop the active mist cooling cycle?", action: "stop" })}>
              <Square size={15} /> Stop Cooling
            </button>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--purple, var(--cyan-dim))", background: "rgba(169,140,255,0.15)", color: "var(--purple)", display: "grid", placeItems: "center" }}>
              <Cpu size={16} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>AI Prediction</div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginBottom: 4 }}>Heat Wave Probability</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 700, color: "var(--amber)" }}>{aiPrediction.probability}%</span>
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>confidence</span>
          </div>
          <div style={{ height: 8, borderRadius: 6, background: "var(--surface-strong)", overflow: "hidden", marginBottom: 16 }}>
            <div style={{ width: `${aiPrediction.probability}%`, height: "100%", background: "linear-gradient(90deg, var(--amber), var(--coral))" }} />
          </div>
          <div style={{ background: "var(--surface)", borderRadius: 12, padding: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <ShieldAlert size={16} color="var(--amber)" style={{ marginTop: 1, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>Recommended Action</div>
              <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>{aiPrediction.action}</div>
            </div>
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>Elec. Saved Today</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--success)" }}>4.8 kWh</div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>Water Used Today</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--cyan)" }}>128 L</div>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 16 }}>
        <StatCard icon={DollarSign} label="Est. Monthly Savings" value="₹2,140" unit="" accent="success" />
        <StatCard icon={Battery} label="Battery Level" value="86" unit="%" accent="teal" />
        <StatCard icon={Zap} label="Solar Power Status" value="Generating" unit="" accent="amber" />
        <StatCard icon={Leaf} label="Carbon Reduced (mo.)" value="61" unit="kg CO₂" accent="success" />
      </div>
    </div>
  );
}

/* ======================================================================
   LIVE SENSORS VIEW
   ====================================================================== */
function SensorsView({ sensors }) {
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={Activity} title="Live Sensor Monitoring" subtitle="Real-time readings across all connected devices" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
        {sensors.map((s) => (
          <Card key={s.id} style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `var(--${statusColor[s.status]}-dim)`, color: `var(--${statusColor[s.status]})`, display: "grid", placeItems: "center" }}>
                <s.icon size={17} />
              </div>
              <StatusBadge status={s.status}>{s.status}</StatusBadge>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 600 }}>
              {s.isBinary ? (s.value ? s.labelOn : s.labelOff) : `${fmt1(s.value)}${s.unit}`}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>{s.label}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: 11.5, color: "var(--text-faint)" }}>Updated {s.updated}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: s.healthy ? "var(--success)" : "var(--danger)" }}>
                {s.healthy ? <Wifi size={12} /> : <WifiOff size={12} />} {s.healthy ? "Online" : "Offline"}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ======================================================================
   AI PREDICTION VIEW
   ====================================================================== */
function AIView({ aiPrediction }) {
  const forecast = tempSeries.slice(0, 12);
  const metrics = [
    { label: "Roof Overheating Risk", value: 78, color: "coral" },
    { label: "Cooling Requirement", value: 64, color: "cyan" },
    { label: "Water Consumption Forecast", value: 41, color: "teal" },
    { label: "Electricity Savings Potential", value: 55, color: "success" },
  ];
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={Cpu} title="AI Prediction Engine" subtitle="Forecasts generated from live sensor fusion + weather models" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="scr-dash-grid">
        <Card>
          <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginBottom: 6 }}>Heat Wave Probability — Next 24h</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 44, fontWeight: 700, color: "var(--amber)" }}>{aiPrediction.probability}%</span>
            <span className="scr-badge" style={{ background: "var(--amber-dim)", color: "var(--amber)" }}>High Confidence</span>
          </div>
          <div style={{ height: 10, borderRadius: 6, background: "var(--surface-strong)", overflow: "hidden", margin: "14px 0" }}>
            <div style={{ width: `${aiPrediction.probability}%`, height: "100%", background: "linear-gradient(90deg, var(--amber), var(--coral))" }} />
          </div>
          <div style={{ background: "var(--surface)", borderRadius: 12, padding: 14, display: "flex", gap: 10 }}>
            <ShieldAlert size={18} color="var(--amber)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Recommended Action</div>
              <div style={{ fontSize: 13, color: "var(--text-dim)" }}>{aiPrediction.action}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Temperature Forecast (12h)</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={forecast}>
              <defs>
                <linearGradient id="fc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} width={28} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="roof" stroke="var(--cyan)" fill="url(#fc)" strokeWidth={2} name="Roof °C" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Prediction Metrics</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {metrics.map((m) => (
            <div key={m.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}>
                <span style={{ color: "var(--text-dim)" }}>{m.label}</span>
                <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>{m.value}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 6, background: "var(--surface-strong)", overflow: "hidden" }}>
                <div style={{ width: `${m.value}%`, height: "100%", background: `var(--${m.color})` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ======================================================================
   CONTROLS VIEW (automation + manual)
   ====================================================================== */
function ControlsView({ cooling, setConfirm, mode, setMode, config, setConfig }) {
  const modes = [
    { id: "automatic", label: "Automatic", icon: Cpu },
    { id: "manual", label: "Manual", icon: SlidersHorizontal },
    { id: "scheduled", label: "Scheduled", icon: Calendar },
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
  ];
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={SlidersHorizontal} title="Automation & Controls" subtitle="Configure automatic cooling logic and issue manual commands" />

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Operating Mode</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          {modes.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)} className="scr-focus"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 10px",
                borderRadius: 14, border: `1px solid ${mode === m.id ? "var(--cyan)" : "var(--border)"}`,
                background: mode === m.id ? "var(--cyan-dim)" : "var(--surface)",
                color: mode === m.id ? "var(--cyan)" : "var(--text-dim)", fontWeight: 600, fontSize: 12.5,
              }}>
              <m.icon size={18} />
              {m.label}
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="scr-dash-grid">
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Cooling Thresholds</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                <span>Maximum Roof Temperature</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--coral)" }}>{config.maxTemp}°C</span>
              </div>
              <input type="range" min={30} max={60} value={config.maxTemp} className="scr-slider" onChange={(e) => setConfig({ ...config, maxTemp: +e.target.value })} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                <span>Minimum Water Level</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>{config.minWater}%</span>
              </div>
              <input type="range" min={5} max={50} value={config.minWater} className="scr-slider" onChange={(e) => setConfig({ ...config, minWater: +e.target.value })} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                <span>Cooling Duration</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{config.duration} min</span>
              </div>
              <input type="range" min={5} max={60} value={config.duration} className="scr-slider" onChange={(e) => setConfig({ ...config, duration: +e.target.value })} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                <span>Mist Interval</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{config.interval} min</span>
              </div>
              <input type="range" min={1} max={30} value={config.interval} className="scr-slider" onChange={(e) => setConfig({ ...config, interval: +e.target.value })} />
            </div>
            <div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>Cooling Schedule</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="time" defaultValue="13:00" className="scr-input scr-focus" style={{ flex: 1 }} />
                <input type="time" defaultValue="17:30" className="scr-input scr-focus" style={{ flex: 1 }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Manual Controls</div>
          <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginBottom: 16 }}>Every action requires confirmation before it runs.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button className="scr-btn scr-btn-primary scr-focus" onClick={() => setConfirm({ title: "Start Cooling", message: "Activate mist cooling now?", action: "start" })}><Play size={15} /> Start Cooling</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => setConfirm({ title: "Stop Cooling", message: "Stop the active cooling cycle?", action: "stop" })}><Square size={15} /> Stop Cooling</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => setConfirm({ title: "Pump ON", message: "Turn the water pump on?", action: "pumpOn" })}><Power size={15} /> Pump ON</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => setConfirm({ title: "Pump OFF", message: "Turn the water pump off?", action: "pumpOff" })}><Power size={15} /> Pump OFF</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => setConfirm({ title: "Mist ON", message: "Open mist nozzles?", action: "mistOn" })}><Droplets size={15} /> Mist ON</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => setConfirm({ title: "Mist OFF", message: "Close mist nozzles?", action: "mistOff" })}><Droplets size={15} /> Mist OFF</button>
          </div>
          <button className="scr-btn scr-btn-danger scr-focus" style={{ width: "100%", marginTop: 10 }}
            onClick={() => setConfirm({ title: "Emergency Stop", message: "This immediately halts all cooling, pump and mist activity. Continue?", action: "emergency", danger: true })}>
            <AlertTriangle size={15} /> Emergency Stop
          </button>
          <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "var(--surface)", fontSize: 12.5, color: "var(--text-dim)", display: "flex", gap: 8 }}>
            <Radio size={14} style={{ marginTop: 1, flexShrink: 0 }} color={cooling ? "var(--success)" : "var(--text-faint)"} />
            System is currently <strong style={{ color: "var(--text)" }}>&nbsp;{cooling ? "cooling" : "idle"}&nbsp;</strong> in <strong style={{ color: "var(--text)" }}>&nbsp;{mode}&nbsp;</strong> mode.
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ======================================================================
   WATER MANAGEMENT VIEW
   ====================================================================== */
function TankGauge({ level, size = 130 }) {
  const h = size * (220 / 140); // keep 140x220 proportions
  return (
    <div style={{ position: "relative", width: size, height: h }}>
      <svg viewBox="0 0 140 220" width={size} height={h}>
        <rect x="10" y="10" width="120" height="200" rx="18" fill="none" stroke="var(--border)" strokeWidth="4" />
        <clipPath id={`tankClip-${size}`}><rect x="14" y="14" width="112" height="192" rx="14" /></clipPath>
        <g clipPath={`url(#tankClip-${size})`}>
          <rect x="14" y={14 + 192 * (1 - level / 100)} width="112" height={192 * (level / 100)} fill={level <= 15 ? "var(--coral)" : "var(--cyan)"} opacity="0.55">
            <animate attributeName="y" values={`${14 + 192 * (1 - level / 100) - 3};${14 + 192 * (1 - level / 100) + 3};${14 + 192 * (1 - level / 100) - 3}`} dur="3s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: size > 100 ? 22 : 16, fontWeight: 700 }}>{fmt1(level)}%</div>
      </div>
    </div>
  );
}

function TankCard({ name, tag, tank, active, isPrimary }) {
  const availableL = Math.round((tank.level / 100) * tank.capacity);
  const health = tankHealth(tank.level);
  return (
    <Card style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{name}</div>
          <div style={{ fontSize: 11.5, color: "var(--text-faint)" }}>{isPrimary ? "Primary supply" : "Secondary / backup supply"}</div>
        </div>
        <StatusBadge status={active ? "normal" : health === "Low" ? "critical" : health === "Fair" ? "warning" : "normal"}>
          {active ? "Active" : "Standby"}
        </StatusBadge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 6 }}>
        <TankGauge level={tank.level} size={96} />
        <div style={{ fontSize: 12.5, color: "var(--text-dim)", lineHeight: 2 }}>
          Capacity: <strong style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{tank.capacity} L</strong><br />
          Available: <strong style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{availableL} L</strong><br />
          Health: <span className="scr-badge" style={{ background: `var(--${health === "Good" ? "success" : health === "Fair" ? "warn" : "danger"}-dim)`, color: `var(--${health === "Good" ? "success" : health === "Fair" ? "warn" : "danger"})` }}>{health}</span><br />
          Last refill: <strong style={{ color: "var(--text)" }}>{tank.lastRefill}</strong>
        </div>
      </div>
    </Card>
  );
}

function WaterView({ tanks, activeTank, autoSwitch, setAutoSwitch, setConfirm, config }) {
  const active = tanks[activeTank];
  const other = activeTank === "tank1" ? "tank2" : "tank1";
  const availableActiveL = Math.round((active.level / 100) * active.capacity);
  const combinedL = Math.round((tanks.tank1.level / 100) * tanks.tank1.capacity + (tanks.tank2.level / 100) * tanks.tank2.capacity);
  const remainingMinutes = availableActiveL / WATER_RATE_L_PER_MIN;
  // AI forecast: estimated water required for the current/forecasted cooling session
  const estRequiredL = Math.round(config.duration * 9);
  const forecastExceeds = estRequiredL > availableActiveL;
  const isCritical = active.level <= 8;
  const isLow = active.level <= config.minWater;

  return (
    <div className="scr-fade-in">
      <SectionTitle icon={Droplet} title="Intelligent Water Level Prediction & Tank Switching" subtitle="AI-forecasted consumption with automatic primary → secondary failover" />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {isCritical && (
          <AlertBanner level="danger" icon={AlertTriangle} title="Primary Water Tank Empty">
            Cooling may stop soon. Please change the water tank immediately, or enable auto-switch to fail over to the secondary tank automatically.
          </AlertBanner>
        )}
        {!isCritical && isLow && (
          <AlertBanner level="warning" icon={ShieldAlert} title="Low Water Level Detected">
            {activeTank === "tank1" ? "Primary" : "Secondary"} Tank: <strong style={{ color: "var(--text)" }}>{fmt1(active.level)}%</strong> · Estimated remaining time: <strong style={{ color: "var(--text)" }}>{fmtMinutes(remainingMinutes)}</strong>. Recommended action: switch to the {activeTank === "tank1" ? "secondary" : "primary"} water tank.
          </AlertBanner>
        )}
        {forecastExceeds && (
          <AlertBanner level="info" icon={Cpu} title="AI Prediction — Session May Exceed Available Water">
            Estimated water required: <strong style={{ color: "var(--text)" }}>{estRequiredL} L</strong> · Currently available on active tank: <strong style={{ color: "var(--text)" }}>{availableActiveL} L</strong>. Recommended action: refill the tank or switch to the backup tank.
          </AlertBanner>
        )}
        {!isLow && !forecastExceeds && (
          <AlertBanner level="success" icon={CheckCircle2} title="Water Supply Healthy">
            {activeTank === "tank1" ? "Tank 1 (Primary)" : "Tank 2 (Secondary)"} is supplying cooling normally with no interruption predicted.
          </AlertBanner>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }} className="scr-dash-grid">
        <TankCard name="Tank 1" tank={tanks.tank1} active={activeTank === "tank1"} isPrimary />
        <TankCard name="Tank 2" tank={tanks.tank2} active={activeTank === "tank2"} isPrimary={false} />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(169,140,255,0.15)", color: "var(--purple)", display: "grid", placeItems: "center" }}>
            <Cpu size={16} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>AI Water Management</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>Active Tank</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{activeTank === "tank1" ? "Tank 1 (Primary)" : "Tank 2 (Secondary)"}</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>Estimated Remaining Cooling</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2, fontFamily: "var(--font-mono)" }}>{fmtMinutes(remainingMinutes)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>AI Forecast — Water Needed</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2, fontFamily: "var(--font-mono)", color: forecastExceeds ? "var(--coral)" : "var(--text)" }}>{estRequiredL} L</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>Combined Available Water</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2, fontFamily: "var(--font-mono)" }}>{combinedL} L</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid var(--border)", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>Automatic Tank Switching</div>
            <div style={{ fontSize: 11.5, color: "var(--text-dim)" }}>Fail over to the secondary tank automatically when the primary hits the minimum threshold.</div>
          </div>
          <Toggle on={autoSwitch} onChange={setAutoSwitch} />
        </div>

        <button
          className="scr-btn scr-btn-primary scr-focus"
          style={{ marginTop: 12 }}
          onClick={() => setConfirm({
            title: `Switch to ${other === "tank1" ? "Tank 1 (Primary)" : "Tank 2 (Secondary)"}`,
            message: `This will make ${other === "tank1" ? "Tank 1" : "Tank 2"} the active water supply for roof cooling. Continue?`,
            action: "switchTank",
          })}
        >
          <RefreshCw size={15} /> Switch to {other === "tank1" ? "Primary" : "Secondary"} Tank
        </button>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard icon={Waves} label="Daily Usage" value="128" unit="L" accent="amber" />
        <StatCard icon={Calendar} label="Weekly Usage" value="896" unit="L" accent="cyan" />
        <StatCard icon={CloudRain} label="Rainwater Collected" value="410" unit="L / wk" accent="success" />
        <StatCard icon={RefreshCw} label="Refill Prediction" value="6" unit="days" accent="warn" />
      </div>

      <Card>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Weekly Usage vs Collection</div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={waterUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="used" fill="var(--coral)" name="Used (L)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="collected" fill="var(--cyan)" name="Collected (L)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ======================================================================
   ANALYTICS VIEW
   ====================================================================== */
function AnalyticsView() {
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={BarChart3} title="AI Analytics" subtitle="Trends across temperature, water, energy and emissions" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="scr-dash-grid">
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Temperature vs Time (24h)</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={tempSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "var(--text-faint)" }} interval={3} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="roof" stroke="var(--coral)" strokeWidth={2} dot={false} name="Roof" />
              <Line type="monotone" dataKey="indoor" stroke="var(--cyan)" strokeWidth={2} dot={false} name="Indoor" />
              <Line type="monotone" dataKey="outdoor" stroke="var(--amber)" strokeWidth={2} dot={false} name="Outdoor" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Monthly Energy Saved</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={energySaved}>
              <defs>
                <linearGradient id="es" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--success)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="saved" stroke="var(--success)" fill="url(#es)" strokeWidth={2} name="kWh" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Cooling Frequency (this week)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coolingFreq}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} width={24} />
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="cycles" fill="var(--cyan)" radius={[6, 6, 0, 0]} name="Cycles" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Energy Allocation</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Carbon Reduction Trend</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={carbonData}>
            <defs>
              <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-faint)" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="kg" stroke="var(--teal)" fill="url(#cb)" strokeWidth={2} name="kg CO₂" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ======================================================================
   NOTIFICATIONS VIEW
   ====================================================================== */
function NotificationsView({ notifications }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={Bell} title="Notification Center" subtitle="Push, SMS and email alerts from your cooling system" />
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "danger", "warning", "success"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`scr-tab ${filter === f ? "active" : ""} scr-focus`}>
            {f === "all" ? "All" : f === "danger" ? "Critical" : f === "warning" ? "Warnings" : "Info"}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((n) => (
          <Card key={n.id} style={{ padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `var(--${n.type === "danger" ? "danger" : n.type === "warning" ? "warn" : "success"}-dim)`, color: `var(--${n.type === "danger" ? "danger" : n.type === "warning" ? "warn" : "success"})`, display: "grid", placeItems: "center" }}>
              {n.type === "danger" ? <AlertTriangle size={16} /> : n.type === "warning" ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{n.title}</div>
                <span style={{ fontSize: 11.5, color: "var(--text-faint)" }}>{n.time}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>{n.body}</div>
              <span className="scr-badge" style={{ marginTop: 8, background: "var(--surface-strong)", color: "var(--text-dim)" }}>{n.channel}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ======================================================================
   MAINTENANCE VIEW
   ====================================================================== */
function MaintenanceView() {
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={Wrench} title="Maintenance" subtitle="Service schedule, history and technician notes" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard icon={Calendar} label="Next Service Date" value="Aug 10" unit="" accent="amber" />
        <StatCard icon={Droplets} label="Filter Cleaning" value="Due" unit="in 7d" accent="warn" />
        <StatCard icon={Gauge} label="Pump Maintenance" value="OK" unit="" accent="success" />
        <StatCard icon={Activity} label="Sensor Calibration" value="OK" unit="" accent="success" />
      </div>
      <Card>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Maintenance History</div>
        <div className="scr-scroll" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
            <thead>
              <tr style={{ textAlign: "left", fontSize: 12, color: "var(--text-dim)" }}>
                <th style={{ padding: "8px 10px" }}>Task</th>
                <th style={{ padding: "8px 10px" }}>Technician</th>
                <th style={{ padding: "8px 10px" }}>Date</th>
                <th style={{ padding: "8px 10px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map((m) => (
                <tr key={m.id} style={{ borderTop: "1px solid var(--border)", fontSize: 13.5 }}>
                  <td style={{ padding: "12px 10px", fontWeight: 600 }}>{m.task}</td>
                  <td style={{ padding: "12px 10px", color: "var(--text-dim)" }}>{m.tech}</td>
                  <td style={{ padding: "12px 10px", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: 12.5 }}>{m.date}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <StatusBadge status={m.status === "Completed" ? "normal" : "warning"}>{m.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Technician Notes</div>
        <textarea className="scr-input scr-focus" rows={4} placeholder="Add notes for the next service visit…" style={{ resize: "vertical" }} />
        <button className="scr-btn scr-btn-primary scr-focus" style={{ marginTop: 10 }}>Save Note</button>
      </Card>
    </div>
  );
}

/* ======================================================================
   REPORTS VIEW
   ====================================================================== */
function ReportsView({ toast }) {
  const [range, setRange] = useState("Monthly");
  const reports = [
    { name: "Energy Savings Report", icon: Zap },
    { name: "Water Usage Report", icon: Droplet },
    { name: "Maintenance Report", icon: Wrench },
    { name: "Full System Report", icon: FileText },
  ];
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={FileText} title="Reports" subtitle="Generate and download reports in PDF, Excel or CSV" />
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Daily", "Weekly", "Monthly", "Yearly"].map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`scr-tab ${range === r ? "active" : ""} scr-focus`}>{r}</button>
          ))}
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {reports.map((r) => (
          <Card key={r.name} style={{ padding: 18 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--cyan-dim)", color: "var(--cyan)", display: "grid", placeItems: "center", marginBottom: 12 }}>
              <r.icon size={18} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-dim)", margin: "4px 0 14px" }}>{range} summary, ready to export.</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["PDF", "Excel", "CSV"].map((fmt) => (
                <button key={fmt} className="scr-btn scr-btn-ghost scr-focus" style={{ flex: 1, padding: "9px 6px", fontSize: 12 }} onClick={() => toast(`${r.name} (${fmt}) exported`)}>
                  <Download size={13} /> {fmt}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ======================================================================
   SETTINGS VIEW
   ====================================================================== */
function SettingsView({ theme, setTheme, units, setUnits, toast }) {
  const [notifPrefs, setNotifPrefs] = useState({ push: true, sms: false, email: true });
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={SettingsIcon} title="Settings" subtitle="Personalize thresholds, appearance, language and access" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="scr-dash-grid">
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Appearance</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13.5 }}>Theme</div>
            <div style={{ display: "flex", gap: 6, background: "var(--surface)", padding: 4, borderRadius: 12 }}>
              <button onClick={() => setTheme("light")} className="scr-focus" style={{ padding: "6px 12px", borderRadius: 9, border: "none", background: theme === "light" ? "var(--bg-elevated)" : "transparent", display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: theme === "light" ? "var(--text)" : "var(--text-dim)" }}><Sun size={13} /> Light</button>
              <button onClick={() => setTheme("dark")} className="scr-focus" style={{ padding: "6px 12px", borderRadius: 9, border: "none", background: theme === "dark" ? "var(--bg-elevated)" : "transparent", display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: theme === "dark" ? "var(--text)" : "var(--text-dim)" }}><Moon size={13} /> Dark</button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13.5 }}>Units</div>
            <div style={{ display: "flex", gap: 6, background: "var(--surface)", padding: 4, borderRadius: 12 }}>
              <button onClick={() => setUnits("metric")} className="scr-focus" style={{ padding: "6px 12px", borderRadius: 9, border: "none", background: units === "metric" ? "var(--bg-elevated)" : "transparent", fontSize: 12.5, fontWeight: 600, color: units === "metric" ? "var(--text)" : "var(--text-dim)" }}>°C / L</button>
              <button onClick={() => setUnits("imperial")} className="scr-focus" style={{ padding: "6px 12px", borderRadius: 9, border: "none", background: units === "imperial" ? "var(--bg-elevated)" : "transparent", fontSize: 12.5, fontWeight: 600, color: units === "imperial" ? "var(--text)" : "var(--text-dim)" }}>°F / gal</button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13.5 }}>Language</div>
            <select className="scr-input scr-focus" style={{ width: 150 }} defaultValue="English">
              <option>English</option><option>தமிழ்</option><option>हिन्दी</option><option>Español</option>
            </select>
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Notification Preferences</div>
          {[["push", "Push Notifications"], ["sms", "SMS Alerts"], ["email", "Email Alerts"]].map(([k, label]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 13.5 }}>{label}</span>
              <Toggle on={notifPrefs[k]} onChange={(v) => setNotifPrefs({ ...notifPrefs, [k]: v })} />
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13.5, marginBottom: 8 }}>Temperature Alert Threshold</div>
            <input type="range" min={30} max={55} defaultValue={40} className="scr-slider" />
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Account</div>
          <input className="scr-input scr-focus" placeholder="Current password" type="password" style={{ marginBottom: 10 }} />
          <input className="scr-input scr-focus" placeholder="New password" type="password" style={{ marginBottom: 10 }} />
          <button className="scr-btn scr-btn-primary scr-focus" onClick={() => toast("Password updated")}>Change Password</button>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Backup & Data</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => toast("Backup created")}><Server size={15} /> Backup Now</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => toast("Data restored")}><RefreshCw size={15} /> Restore</button>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, margin: "20px 0 10px" }}>Extra Features</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => toast("Listening…")}><Mic size={15} /> Voice Commands</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => toast("AI Assistant opened")}><MessageCircle size={15} /> AI Chat Assistant</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => toast("Scan a device QR code to pair")}><QrCode size={15} /> QR Device Pairing</button>
            <button className="scr-btn scr-btn-ghost scr-focus" onClick={() => toast("Device location updated")}><MapPin size={15} /> Device Location</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ======================================================================
   ADMIN VIEW
   ====================================================================== */
function AdminView({ toast }) {
  const [tab, setTab] = useState("users");
  return (
    <div className="scr-fade-in">
      <SectionTitle icon={ShieldCheck} title="Admin Panel" subtitle="Manage users, devices, buildings and platform health" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard icon={Users} label="Total Users" value="248" unit="" accent="cyan" trend={6.2} />
        <StatCard icon={Building2} label="Buildings" value="63" unit="" accent="teal" trend={3.1} />
        <StatCard icon={DollarSign} label="Revenue (mo.)" value="₹4.2L" unit="" accent="success" trend={9.4} />
        <StatCard icon={Server} label="Device Uptime" value="99.4" unit="%" accent="amber" />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[["users", "Manage Users"], ["devices", "Device Health"], ["buildings", "Buildings"], ["logs", "Error Logs"], ["plans", "Subscription Plans"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`scr-tab ${tab === id ? "active" : ""} scr-focus`}>{label}</button>
        ))}
      </div>

      {tab === "users" && (
        <Card>
          <div className="scr-scroll" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ textAlign: "left", fontSize: 12, color: "var(--text-dim)" }}>
                  <th style={{ padding: "8px 10px" }}>Name</th><th style={{ padding: "8px 10px" }}>Role</th><th style={{ padding: "8px 10px" }}>Email</th><th style={{ padding: "8px 10px" }}>Status</th><th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderTop: "1px solid var(--border)", fontSize: 13.5 }}>
                    <td style={{ padding: "12px 10px", fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: "12px 10px", color: "var(--text-dim)" }}>{u.role}</td>
                    <td style={{ padding: "12px 10px", color: "var(--text-dim)" }}>{u.email}</td>
                    <td style={{ padding: "12px 10px" }}><StatusBadge status={u.status === "Active" ? "normal" : "warning"}>{u.status}</StatusBadge></td>
                    <td style={{ padding: "12px 10px" }}><button className="scr-btn scr-btn-ghost scr-focus" style={{ padding: "5px 10px", fontSize: 11.5 }} onClick={() => toast(`Managing ${u.name}`)}>Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "buildings" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {buildings.map((b) => (
            <Card key={b.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--cyan-dim)", color: "var(--cyan)", display: "grid", placeItems: "center" }}><Building2 size={17} /></div>
                <StatusBadge status="normal">{b.health}% health</StatusBadge>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 12 }}>{b.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginTop: 2 }}>{b.status}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 12.5 }}>
                <span>Roof: <strong style={{ fontFamily: "var(--font-mono)" }}>{b.roofTemp}°C</strong></span>
                <span>Tank: <strong style={{ fontFamily: "var(--font-mono)" }}>{b.tank}%</strong></span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "devices" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {["Roof Sensor A1", "Pump Controller", "Mist Valve B2", "Water Level Probe", "Wind Sensor C1", "Gateway Hub"].map((d, i) => (
            <Card key={d} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: i === 4 ? "var(--danger-dim)" : "var(--success-dim)", color: i === 4 ? "var(--danger)" : "var(--success)", display: "grid", placeItems: "center" }}>
                {i === 4 ? <WifiOff size={16} /> : <Wifi size={16} />}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{d}</div>
                <div style={{ fontSize: 11.5, color: i === 4 ? "var(--danger)" : "var(--text-dim)" }}>{i === 4 ? "Offline — check wiring" : "Online · healthy"}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "logs" && (
        <Card>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ color: "var(--danger)" }}>[ERR] 08:14:02 — Wind sensor C1 timeout (Building 2)</div>
            <div style={{ color: "var(--warn)" }}>[WARN] 07:52:41 — Water level probe returned stale reading</div>
            <div style={{ color: "var(--text-dim)" }}>[INFO] 07:30:00 — Scheduled cooling cycle executed successfully</div>
            <div style={{ color: "var(--warn)" }}>[WARN] 06:11:19 — Pump current draw above baseline</div>
            <div style={{ color: "var(--text-dim)" }}>[INFO] 05:00:00 — Nightly backup completed</div>
          </div>
        </Card>
      )}

      {tab === "plans" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {[["Starter", "₹499/mo", ["1 building", "Basic AI predictions", "Email alerts"]], ["Pro", "₹1,499/mo", ["Up to 5 buildings", "Advanced AI + forecasts", "SMS + Push alerts"]], ["Enterprise", "Custom", ["Unlimited buildings", "Dedicated support", "Full API access"]]].map(([name, price, feats]) => (
            <Card key={name}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--cyan)", margin: "6px 0 12px" }}>{price}</div>
              {feats.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--text-dim)", marginBottom: 6 }}>
                  <CheckCircle2 size={13} color="var(--success)" /> {f}
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================================
   APP SHELL
   ====================================================================== */
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "sensors", label: "Live Sensors", icon: Activity },
  { id: "ai", label: "AI Prediction", icon: Cpu },
  { id: "controls", label: "Controls", icon: SlidersHorizontal },
  { id: "water", label: "Water", icon: Droplet },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];
const MOBILE_TABS = ["dashboard", "sensors", "ai", "controls", "settings"];

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState("Home Owner");
  const [theme, setTheme] = useState("dark");
  const [units, setUnits] = useState("metric");
  const [tab, setTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cooling, setCooling] = useState(true);
  const [mode, setMode] = useState("automatic");
  const [confirm, setConfirm] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [sensors, setSensors] = useState(initialSensors);
  const [notifications] = useState(initialNotifications);
  const [config, setConfig] = useState({ maxTemp: 40, minWater: 15, duration: 20, interval: 5 });
  const [aiPrediction] = useState({ probability: 92, action: "Start roof cooling before 2 PM to stay ahead of peak heat." });
  const [tanks, setTanks] = useState({
    tank1: { level: 12, capacity: 500, lastRefill: "Aug 3 · 6:40 AM" },
    tank2: { level: 88, capacity: 500, lastRefill: "Jul 29 · 8:10 AM" },
  });
  const [activeTank, setActiveTank] = useState("tank1");
  const [autoSwitch, setAutoSwitch] = useState(true);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  }, []);

  // Simulate live sensor updates (water_level is driven by the tank system below)
  useEffect(() => {
    const t = setInterval(() => {
      setSensors((prev) => prev.map((s) => {
        if (s.isBinary || s.id === "water_level") return s;
        const delta = rand(-0.6, 0.6);
        let v = clamp(s.value + delta, 0, s.id.includes("temp") ? 60 : 100);
        let status = "normal";
        if (s.id === "roof_temp") status = v > 45 ? "critical" : v > 38 ? "warning" : "normal";
        return { ...s, value: v, status, updated: "just now" };
      }));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Drain the active water tank while cooling is running
  useEffect(() => {
    const t = setInterval(() => {
      if (!cooling) return;
      setTanks((prev) => ({
        ...prev,
        [activeTank]: { ...prev[activeTank], level: clamp(prev[activeTank].level - rand(0.4, 1.1), 0, 100) },
      }));
    }, 4000);
    return () => clearInterval(t);
  }, [cooling, activeTank]);

  // AI-driven automatic tank switching: fail over to the other tank when the
  // active tank crosses the configured minimum water threshold.
  useEffect(() => {
    const level = tanks[activeTank].level;
    const other = activeTank === "tank1" ? "tank2" : "tank1";
    if (autoSwitch && level <= config.minWater && tanks[other].level > 10) {
      setActiveTank(other);
      showToast(`Low water on ${activeTank === "tank1" ? "Tank 1" : "Tank 2"} — auto-switched to ${other === "tank1" ? "Tank 1" : "Tank 2"}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tanks, activeTank, autoSwitch, config.minWater]);

  // Keep the "Water Level" sensor tile in sync with whichever tank is active
  useEffect(() => {
    const level = tanks[activeTank].level;
    setSensors((prev) => prev.map((s) => (s.id === "water_level"
      ? { ...s, value: level, status: level <= 8 ? "critical" : level <= config.minWater ? "warning" : "normal", updated: "just now" }
      : s)));
  }, [tanks, activeTank, config.minWater]);

  const handleLogin = (r) => { setRole(r); setAuthed(true); };

  const handleConfirm = () => {
    if (!confirm) return;
    const { action } = confirm;
    if (action === "start") { setCooling(true); showToast("Cooling started"); }
    if (action === "stop") { setCooling(false); showToast("Cooling stopped"); }
    if (action === "emergency") { setCooling(false); setMode("emergency"); showToast("Emergency stop engaged"); }
    if (action === "pumpOn") { setSensors((p) => p.map((s) => s.id === "pump" ? { ...s, value: 1 } : s)); showToast("Pump turned on"); }
    if (action === "pumpOff") { setSensors((p) => p.map((s) => s.id === "pump" ? { ...s, value: 0 } : s)); showToast("Pump turned off"); }
    if (action === "mistOn") { setSensors((p) => p.map((s) => s.id === "nozzle" ? { ...s, value: 1 } : s)); showToast("Mist nozzles opened"); }
    if (action === "mistOff") { setSensors((p) => p.map((s) => s.id === "nozzle" ? { ...s, value: 0 } : s)); showToast("Mist nozzles closed"); }
    if (action === "switchTank") {
      const other = activeTank === "tank1" ? "tank2" : "tank1";
      setActiveTank(other);
      showToast(`Switched to ${other === "tank1" ? "Tank 1 (Primary)" : "Tank 2 (Secondary)"}`);
    }
    setConfirm(null);
  };

  const roof = sensors.find((s) => s.id === "roof_temp");

  if (!authed) {
    return (
      <div className={`scr-root ${theme}`}>
        <GlobalStyles />
        <BgOrbs />
        <LoginView onLogin={handleLogin} />
      </div>
    );
  }

  const activeNav = NAV.find((n) => n.id === tab);

  return (
    <div className={`scr-root ${theme}`}>
      <GlobalStyles />
      <BgOrbs />
      <ConfirmModal modal={confirm} onConfirm={handleConfirm} onCancel={() => setConfirm(null)} />
      <Toast toast={toastMsg} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="scr-hide-desktop" style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(4,10,16,0.6)" }} onClick={() => setSidebarOpen(false)} />
      )}

      <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
        {/* Sidebar */}
        <aside className="scr-scroll" style={{
          width: 250, flexShrink: 0, borderRight: "1px solid var(--border)", padding: 20,
          position: "fixed", top: 0, bottom: 0, left: sidebarOpen ? 0 : -270, zIndex: 70,
          background: "var(--bg-alt)", transition: "left .2s ease", overflowY: "auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--cyan), var(--teal))", display: "grid", placeItems: "center" }}>
                <Droplets size={18} color="#06222A" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14.5, lineHeight: 1.1 }}>Smart Cooling Roof</div>
                <div style={{ fontSize: 10, color: "var(--text-faint)" }}>AI + IoT ENERGY SYSTEM</div>
              </div>
            </div>
            <button className="scr-hide-desktop scr-focus" style={{ background: "none", border: "none", color: "var(--text-dim)" }} onClick={() => setSidebarOpen(false)}><X size={20} /></button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map((n) => (
              <button key={n.id} className={`scr-nav-item scr-focus ${tab === n.id ? "active" : ""}`} style={{ border: "1px solid transparent", background: tab === n.id ? undefined : "transparent", textAlign: "left" }}
                onClick={() => { setTab(n.id); setSidebarOpen(false); }}>
                <n.icon size={17} /> {n.label}
              </button>
            ))}
            {role === "Administrator" && (
              <button className={`scr-nav-item scr-focus ${tab === "admin" ? "active" : ""}`} onClick={() => { setTab("admin"); setSidebarOpen(false); }}>
                <ShieldCheck size={17} /> Admin Panel
              </button>
            )}
          </nav>

          <div style={{ marginTop: 24, padding: 14, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--text-dim)", marginBottom: 6 }}>
              <span>Roof Temp</span><span style={{ fontFamily: "var(--font-mono)", color: "var(--coral)" }}>{fmt1(roof.value)}°C</span>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: "var(--surface-strong)", overflow: "hidden" }}>
              <div style={{ width: `${clamp(((roof.value - 20) / 40) * 100, 0, 100)}%`, height: "100%", background: "linear-gradient(90deg, var(--cyan), var(--coral))" }} />
            </div>
          </div>

          <button className="scr-nav-item scr-focus" style={{ width: "100%", marginTop: 20, border: "1px solid var(--border)" }} onClick={() => setAuthed(false)}>
            <LogOut size={17} /> Sign Out
          </button>
        </aside>

        {/* Main column */}
        <div style={{ flex: 1, minWidth: 0 }} className="scr-main">
          {/* Top bar */}
          <header className="scr-glass" style={{ position: "sticky", top: 0, zIndex: 40, borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <button className="scr-hide-desktop scr-focus" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, width: 36, height: 36, display: "grid", placeItems: "center", color: "var(--text)" }} onClick={() => setSidebarOpen(true)}>
                <Menu size={18} />
              </button>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeNav?.label || "Admin Panel"}</div>
                <div className="scr-hide-mobile" style={{ fontSize: 11.5, color: "var(--text-faint)" }}>Residence — Coimbatore · Zone A</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="scr-hide-mobile scr-focus" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, width: 36, height: 36, display: "grid", placeItems: "center", color: "var(--text-dim)" }} onClick={() => setTab("notifications")}>
                <Bell size={16} />
              </button>
              <button className="scr-focus" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, width: 36, height: 36, display: "grid", placeItems: "center", color: "var(--text-dim)" }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="scr-hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 10, borderLeft: "1px solid var(--border)" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--cyan), var(--purple))", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12, color: "#06222A" }}>
                  {role[0]}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{role}</div>
                  <div style={{ fontSize: 10.5, color: "var(--text-faint)" }}>Online</div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="scr-scroll" style={{ padding: 20, paddingBottom: 96, maxWidth: 1280, margin: "0 auto" }}>
            {tab === "dashboard" && <DashboardView sensors={sensors} cooling={cooling} setConfirm={setConfirm} aiPrediction={aiPrediction} tanks={tanks} activeTank={activeTank} config={config} />}
            {tab === "sensors" && <SensorsView sensors={sensors} />}
            {tab === "ai" && <AIView aiPrediction={aiPrediction} />}
            {tab === "controls" && <ControlsView cooling={cooling} setConfirm={setConfirm} mode={mode} setMode={setMode} config={config} setConfig={setConfig} />}
            {tab === "water" && <WaterView tanks={tanks} activeTank={activeTank} autoSwitch={autoSwitch} setAutoSwitch={setAutoSwitch} setConfirm={setConfirm} config={config} />}
            {tab === "analytics" && <AnalyticsView />}
            {tab === "notifications" && <NotificationsView notifications={notifications} />}
            {tab === "maintenance" && <MaintenanceView />}
            {tab === "reports" && <ReportsView toast={showToast} />}
            {tab === "settings" && <SettingsView theme={theme} setTheme={setTheme} units={units} setUnits={setUnits} toast={showToast} />}
            {tab === "admin" && role === "Administrator" && <AdminView toast={showToast} />}
          </main>
        </div>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="scr-hide-desktop scr-glass" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, borderRadius: 0, borderLeft: "none", borderRight: "none", borderBottom: "none", padding: "8px 6px", display: "flex", justifyContent: "space-around" }}>
        {MOBILE_TABS.map((id) => {
          const n = NAV.find((x) => x.id === id);
          const active = tab === id;
          return (
            <button key={id} className="scr-focus" onClick={() => setTab(id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: active ? "var(--cyan)" : "var(--text-faint)", padding: "4px 8px", flex: 1 }}>
              <n.icon size={19} />
              <span style={{ fontSize: 9.5, fontWeight: 600 }}>{n.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .scr-main { margin-left: 0; width: 100%; transition: margin-left .2s ease; }
        @media (min-width: 900px) {
          .scr-main { margin-left: 250px !important; width: calc(100% - 250px); }
          aside { left: 0 !important; }
        }
        @media (max-width: 899px) {
          main { padding-bottom: 90px !important; }
        }
        @media (max-width: 767px) {
          .scr-dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function BgOrbs() {
  return (
    <div className="scr-bg-orbs">
      <div className="scr-orb" style={{ width: 480, height: 480, top: -160, right: -140, background: "var(--cyan)" }} />
      <div className="scr-orb" style={{ width: 420, height: 420, bottom: -180, left: -120, background: "var(--amber)" }} />
      <div className="scr-orb" style={{ width: 300, height: 300, top: "40%", left: "50%", background: "var(--teal)", opacity: 0.15 }} />
    </div>
  );
}
