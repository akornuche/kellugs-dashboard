"use client";

import { DASH } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Role {
  title: string;
  writes: string[];
}

const OWNER_OF: { [key: string]: string } = {
  dashboard: "the CEO",
  sales: "the Sales Head",
  inventory: "the Operations Manager",
  logistics: "the Logistics & Delivery Lead",
  admin: "the Admin & Accounts Head",
};

export default function DashboardView({
  role,
  onToast,
}: {
  role: Role;
  onToast: (msg: string) => void;
}) {
  const canEdit = role.writes.includes("dashboard");

  // Prepare line chart data
  const lineData = DASH.line.months.map((month, i) => ({
    month,
    value: DASH.line.points[i],
  }));

  // Prepare readiness bars data
  const readinessData = DASH.readinessBars;

  // Donut data
  const donutData = [
    { name: "Completed", value: 49 },
    { name: "Remaining", value: 51 },
  ];

  return (
    <div className="pb-20">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-3 sm:gap-6 mb-6 flex-wrap px-4 sm:px-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Company overview</h1>
          <p className="text-[var(--text-mute)] text-xs sm:text-sm">
            1 – 30 September 2026 · Ikeja & Lekki
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <button className="px-3 sm:px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)] text-sm font-medium hover:bg-[var(--gray-100)] transition">
            This month ▼
          </button>
          <button
            disabled={!canEdit}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 whitespace-nowrap ${
              canEdit
                ? "bg-[var(--ink)] text-white hover:bg-[var(--ink-soft)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Close period <span>✓</span>
          </button>
        </div>
      </div>

      {/* Read-only Banner */}
      {!canEdit && (
        <div className="mb-4 mx-6 p-4 rounded-lg border border-purple-200 bg-purple-50 text-purple-900 text-sm flex gap-3">
          <span>🔒</span>
          <span>
            <strong>Read-only.</strong> {role.title} has read access to this module. Changes here belong to {OWNER_OF.dashboard}.
          </span>
        </div>
      )}

      {/* Info Banners */}
      <div className="mb-6 mx-4 sm:mx-6 space-y-3">
        <div className="p-3 sm:p-4 rounded-lg border border-blue-200 bg-blue-50 text-blue-900 text-xs sm:text-sm flex gap-3">
          <span className="flex-shrink-0">🔒</span>
          <span>
            <strong>Read-only.</strong> Admin & Accounts Head has read access to this module. Changes here belong to the CEO.
          </span>
        </div>
        
        <div className="p-3 sm:p-4 rounded-lg border border-blue-200 bg-blue-50 text-blue-900 text-xs sm:text-sm flex gap-3">
          <span className="flex-shrink-0">📖</span>
          <span>
            The <strong>96-product catalogue</strong> is read from kellughsc.com — real names, prices and stock flags. Stock levels and every operating record below are <strong>modelled</strong> from the 2026 coaching engagement so each module has something to show. What it real and what is not.
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 px-4 sm:px-6">
        {DASH.stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                {stat.ic === "shield" && "🛡️"}
                {stat.ic === "naira" && "₦"}
                {stat.ic === "users" && "👥"}
                {stat.ic === "check" && "✓"}
              </span>
              <div className="text-xs text-[var(--text-mute)] font-medium">
                {stat.lbl}
              </div>
            </div>
            <div className="text-3xl font-bold mb-1 flex items-center gap-2">
              {stat.val}
              {stat.chip && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.chip.c === "green"
                      ? "bg-green-100 text-green-700"
                      : stat.chip.c === "blue"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {stat.chip.t}
                </span>
              )}
            </div>
            <div className="text-xs text-[var(--text-mute)]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main 2-column layout */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6">
        {/* Left: 2 columns - Main content */}
        <div className="sm:col-span-1 lg:col-span-2 space-y-6">
          {/* Revenue vs Target Chart */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6">
            <div className="flex justify-between items-start mb-4 gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Revenue vs target</h3>
                <p className="text-xs sm:text-sm text-[var(--text-mute)]">
                  Trailing 12 months · ₦ millions · September is month-to-date
                </p>
              </div>
              <button className="text-[var(--text-mute)] hover:text-[var(--text)] flex-shrink-0">↗</button>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--text)" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6C4CF5"
                  fill="#E9D5FF"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department Scorecards */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-1">Department scorecards</h3>
            <p className="text-xs sm:text-sm text-[var(--text-mute)] mb-4">
              Status is computed from one threshold rule applied to every metric — never set per department
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {DASH.scorecards.map((scorecard, i) => (
                <div
                  key={i}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 sm:p-4"
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="font-bold text-xs sm:text-sm">{scorecard.dept}</h4>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                        scorecard.color === "green"
                          ? "bg-green-100 text-green-700"
                          : scorecard.color === "amber"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {scorecard.status}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-mute)] mb-3">
                    {scorecard.owner}
                  </div>
                  <div className="space-y-2">
                    {scorecard.metrics.map((metric, j) => (
                      <div key={j}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{metric.l}</span>
                          <span className="font-bold">{metric.v}</span>
                        </div>
                        <div className="h-1.5 bg-[var(--gray-100)] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              metric.c === "green"
                                ? "bg-green-500"
                                : metric.c === "amber"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${metric.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Tracker */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6">
            <div className="flex justify-between items-start mb-4 gap-2 flex-wrap">
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Improvement tracker</h3>
                <p className="text-xs sm:text-sm text-[var(--text-mute)]">
                  The one list the CEO edits directly — everything else on this page is a rollup
                </p>
              </div>
              <button
                onClick={() => onToast("New item form would open here")}
                className="px-3 py-1 text-xs rounded border border-[var(--border)] hover:bg-[var(--gray-100)] transition whitespace-nowrap"
              >
                Add item
              </button>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left p-2 font-semibold text-xs sm:text-sm text-[var(--text-mute)]">Item</th>
                    <th className="text-left p-2 font-semibold text-xs sm:text-sm text-[var(--text-mute)] hidden sm:table-cell">Owner</th>
                    <th className="text-left p-2 font-semibold text-xs sm:text-sm text-[var(--text-mute)]">Due</th>
                    <th className="text-left p-2 font-semibold text-xs sm:text-sm text-[var(--text-mute)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {DASH.tracker.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--gray-100)]">
                      <td className="p-2 font-medium text-xs sm:text-sm">{item[0]}</td>
                      <td className="p-2 text-xs sm:text-sm hidden sm:table-cell">{item[1]}</td>
                      <td className="p-2 text-xs sm:text-sm">{item[2]}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold inline-block ${
                            item[4] === "green"
                              ? "bg-green-100 text-green-800"
                              : item[4] === "amber"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: 1 column - Sidebar */}
        <div className="space-y-6">
          {/* Readiness Index */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-1">Readiness index</h3>
            <p className="text-xs text-[var(--text-mute)] mb-4">Tick marks the 70% target</p>
            
            {/* Donut Chart */}
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    <Cell fill="#6C4CF5" />
                    <Cell fill="#E9D5FF" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center mb-4">
              <div className="text-3xl sm:text-4xl font-bold">49%</div>
              <div className="text-xs text-[var(--text-mute)]">of a 70% target</div>
            </div>

            {/* Mini Bars */}
            <div className="flex gap-1 sm:gap-2">
              {readinessData.map((item, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className="h-10 sm:h-12 bg-purple-300 rounded-t-sm mb-1 sm:mb-2 mx-0.5"
                    style={{ backgroundColor: `rgba(108, 76, 245, ${0.3 + (item.v / 50) * 0.7})` }}
                  />
                  <div className="text-xs font-semibold">{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decisions */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h3 className="text-base sm:text-lg font-bold">Decisions needed from you</h3>
              <span className="bg-[var(--ink)] text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                {DASH.decisions.length}
              </span>
            </div>
            <p className="text-xs text-[var(--text-mute)] mb-4">Cleared only by CEO action</p>

            <div className="space-y-3">
              {DASH.decisions.map((decision, i) => (
                <div key={i} className="flex gap-2 sm:gap-3 pb-3 border-b border-[var(--border)] last:border-0">
                  <div className="text-lg flex-shrink-0">📋</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs line-clamp-2">{decision[0]}</div>
                    <div className="text-xs text-[var(--text-mute)]">{decision[1]}</div>
                  </div>
                  <button
                    onClick={() => onToast("Review panel would open")}
                    className="px-2 py-1 text-xs rounded border border-[var(--border)] hover:bg-[var(--gray-100)] whitespace-nowrap transition flex-shrink-0"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold">Alerts</h3>
              <button className="px-3 py-1 text-xs rounded border border-[var(--border)] hover:bg-[var(--gray-100)] transition">
                All modules ▼
              </button>
            </div>
            <p className="text-xs text-[var(--text-mute)] mb-4">
              Assembled from the modules, not typed by hand
            </p>

            <div className="space-y-2">
              {DASH.alerts.map((alert, i) => (
                <div key={i} className="flex gap-2 p-2 rounded hover:bg-[var(--gray-100)] transition">
                  <div className="text-lg flex-shrink-0">
                    {alert[3] === "cube" && "📦"}
                    {alert[3] === "gear" && "⚙️"}
                    {alert[3] === "alert" && "⚠️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-[var(--purple)] uppercase">{alert[0]}</div>
                    <div className="font-semibold text-xs">{alert[1]}</div>
                    <div className="text-xs text-[var(--text-mute)] line-clamp-2">{alert[2]}</div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => onToast("Showing 6 more alerts")}
                className="w-full text-center text-xs text-purple-600 font-bold py-2 hover:bg-[var(--gray-100)] rounded transition"
              >
                Show 6 more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
