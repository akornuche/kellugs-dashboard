"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const expenseData = [
  { name: "Marketing", value: 820 },
  { name: "Import duty", value: 620 },
  { name: "Vehicle", value: 310 },
  { name: "Rework", value: 240 },
  { name: "Utilities", value: 180 },
  { name: "Security", value: 95 },
];

export default function AdminView({
  onToast,
}: {
  onToast: (msg: string) => void;
}) {
  const handleClosePeriod = () => {
    onToast("Closing accounting period...");
  };

  const handleExport = () => {
    onToast("Exporting admin data...");
  };

  return (
    <div className="max-w-7xl pb-20">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin</h1>
          <p className="text-[var(--text-mute)] text-sm">
            Accounts, HR administration and facilities · Ikeja & Lekki
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--bg)] text-sm font-medium transition"
          >
            Export <span>↗</span>
          </button>
          <button
            onClick={handleClosePeriod}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-900 text-white text-sm font-medium transition"
          >
            Close period <span>✓</span>
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-6">
        <div className="text-blue-600 font-bold text-xl">📋</div>
        <div>
          <div className="text-sm font-bold text-blue-900">
            Financial and HR records here are{" "}
            <span className="underline">sample data</span>.
          </div>
          <div className="text-xs text-blue-800">
            The expense lines are the ones the guides separate out by name —
            import duty, rework and waste, area-boy and security payments — because
            those are the ones that otherwise disappear into &quot;miscellaneous&quot;.{" "}
            <a href="#" className="underline font-bold">
              More on this
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            lbl: "Reconciliation",
            val: "Up to date",
            sub: "Last run 2026–09–09",
            icon: "✓",
            color: "green",
          },
          {
            lbl: "Outstanding receivables",
            val: "₦1.4m",
            sub: "across 4 customers",
            icon: "⇄",
            chip: { t: "Overdue", color: "pink" },
          },
          {
            lbl: "Compliance closed",
            val: "4/5",
            sub: "Fire, CCTV, first-aid, exit signage",
            icon: "✓",
            color: "green",
          },
          {
            lbl: "Open HR items",
            val: "2",
            sub: "Hiring, onboarding and staff records",
            icon: "👥",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-xs text-[var(--text-mute)] font-medium">
                {stat.lbl}
              </div>
            </div>
            <div className="text-3xl font-bold mb-1 flex items-center gap-2">
              {stat.val}
              {stat.chip && (
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-100 text-pink-700">
                  {stat.chip.t}
                </span>
              )}
            </div>
            <div className="text-xs text-[var(--text-mute)]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Expense Lines Chart */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2">Expense lines</h3>
          <p className="text-xs text-[var(--text-mute)] mb-4">
            This period, in thousands — the separated lines the guides ask for
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: "var(--text-mute)", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "var(--text-mute)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--text)" }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Facilities & Compliance */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2">Facilities & compliance</h3>
          <p className="text-xs text-[var(--text-mute)] mb-4">
            Safety items with a due date against each
          </p>
          <div className="space-y-2">
            {[
              {
                icon: "🔥",
                org: "LEKKI",
                name: "Fire alarm servicing — Lekki branch",
                status: "Overdue",
                date: "Due 2026–09–12",
                color: "red",
              },
              {
                icon: "📹",
                org: "IKEJA",
                name: "CCTV coverage — workshop yard",
                status: "Closed",
                date: "Due 2026–08–30",
                color: "green",
              },
              {
                icon: "🩹",
                org: "IKEJA",
                name: "First-aid stock replenishment",
                status: "Closed",
                date: "Due 2026–08–22",
                color: "green",
              },
              {
                icon: "🚪",
                org: "LEKKI",
                name: "Fire extinguisher certification",
                status: "Closed",
                date: "Due 2026–08–18",
                color: "green",
              },
              {
                icon: "🚨",
                org: "IKEJA",
                name: "Emergency exit signage",
                status: "Closed",
                date: "Due 2026–07–30",
                color: "green",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border-l-4 ${
                  item.color === "green"
                    ? "border-l-green-500 bg-green-50"
                    : "border-l-red-500 bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[var(--text-mute)] uppercase">
                      {item.org}
                    </div>
                    <div className="font-semibold text-sm mt-1">{item.name}</div>
                    <div className="text-xs text-[var(--text-mute)] mt-1">
                      {item.date}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                      item.color === "green"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Receivables */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2">Receivables</h3>
          <p className="text-xs text-[var(--text-mute)] mb-4">
            Oldest first. A credit-policy exception is flagged rather than quietly
            granted.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-2 font-semibold text-[var(--text-mute)]">
                    Customer
                  </th>
                  <th className="text-left p-2 font-semibold text-[var(--text-mute)]">
                    Amount
                  </th>
                  <th className="text-left p-2 font-semibold text-[var(--text-mute)]">
                    Due
                  </th>
                  <th className="text-left p-2 font-semibold text-[var(--text-mute)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    customer: "Chukwu Properties",
                    amount: "₦210k",
                    due: "2026–08–28",
                    status: "13 days overdue",
                    color: "red",
                  },
                  {
                    customer: "Lekki Gardens Phase 2",
                    amount: "₦420k",
                    due: "2026–09–03",
                    status: "7 days overdue",
                    color: "yellow",
                  },
                  {
                    customer: "Ade & Sons Ltd",
                    amount: "₦640k",
                    due: "2026–09–14",
                    status: "Within terms",
                    color: "green",
                  },
                  {
                    customer: "Hilltop Contractors",
                    amount: "₦130k",
                    due: "2026–09–20",
                    status: "Within terms",
                    color: "green",
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-[var(--border)]">
                    <td className="p-2 font-semibold text-sm">{item.customer}</td>
                    <td className="p-2">{item.amount}</td>
                    <td className="p-2 text-xs text-[var(--text-mute)]">
                      {item.due}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold inline-block ${
                          item.color === "green"
                            ? "bg-green-100 text-green-800"
                            : item.color === "yellow"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HR */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2">HR</h3>
          <p className="text-xs text-[var(--text-mute)] mb-4">
            Ad hoc installers get the same record as permanent staff
          </p>
          <div className="space-y-3">
            {[
              {
                tag: "ONBOARDING",
                icon: "📋",
                title: "New hire onboarding — Sales Head",
                status: "In progress",
                person: "Tunde Salami",
                color: "yellow",
              },
              {
                tag: "RECORDS",
                icon: "📄",
                title: "Installer engagement records — 4 ad hoc staff",
                status: "Open",
                person: "Tunde Salami",
                color: "red",
              },
              {
                tag: "REVIEW",
                icon: "✓",
                title: "Staff attendance review — August",
                status: "Complete",
                person: "Tunde Salami",
                color: "green",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border-l-4 ${
                  item.color === "green"
                    ? "border-l-green-500 bg-green-50"
                    : item.color === "yellow"
                    ? "border-l-yellow-500 bg-yellow-50"
                    : "border-l-red-500 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[var(--text-mute)] uppercase">
                      {item.tag}
                    </div>
                    <div className="font-semibold text-sm mt-1">{item.title}</div>
                    <div className="text-xs text-[var(--text-mute)] mt-1">
                      {item.person}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                      item.color === "green"
                        ? "bg-green-100 text-green-800"
                        : item.color === "yellow"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
