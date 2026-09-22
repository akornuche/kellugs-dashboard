"use client";

import { useState } from "react";
import { INV } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Role {
  title: string;
  writes: string[];
}

export default function InventoryView({
  role,
  onToast,
}: {
  role: Role;
  onToast: (msg: string) => void;
}) {
  const canEdit = role.writes.includes("inventory");
  const [filterStock, setFilterStock] = useState("all");

  const filters = ["all", "Below reorder", "Out of stock", "90+ days idle", "Imported", "Workshop"];

  const chartData = INV.classes.map((item) => ({
    name: item.l,
    value: item.v,
  }));

  const filtered = INV.table.filter((item) => {
    if (filterStock === "all") return true;
    if (filterStock === "Below reorder") return item[9] === "Below reorder";
    if (filterStock === "Out of stock") return item[9] === "Out of stock";
    if (filterStock === "90+ days idle") return item[9] === "Slow moving";
    if (filterStock === "Imported") return item[2] === "Imported";
    if (filterStock === "Workshop") return item[2] === "Finished good";
    return true;
  });

  return (
    <div className="max-w-7xl pb-20">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold mb-2">Inventory</h1>
          <p className="text-[var(--text-mute)] text-sm">
            96-catalogue products & 10 workshop materials · Ikeja & Lekki
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onToast("Exporting inventory…")}
            className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--gray-100)] transition"
          >
            Export
          </button>
          <button
            disabled={!canEdit}
            className={`px-4 py-3 rounded-lg font-bold transition ${
              canEdit
                ? "bg-[var(--ink)] text-white hover:bg-[var(--ink-soft)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Record movement
          </button>
        </div>
      </div>

      {/* Read-only Banner */}
      {!canEdit && (
        <div className="mb-4 p-4 rounded-lg border border-purple-200 bg-purple-50 text-purple-900 text-sm flex gap-3">
          <span>🔒</span>
          <span>
            <strong>Read-only.</strong> {role.title} has read access to this module.
          </span>
        </div>
      )}

      {/* Info Banners */}
      <div className="mb-6 p-4 rounded-lg border border-blue-200 bg-blue-50 text-blue-900 text-sm flex gap-3">
        <span>📖</span>
        <span>
          Product names, prices and in/out-of-stock flags are <strong>real</strong> from kellughsc.com. Quantity on-hand, reorder point, supplier and lead time are <strong>modelled</strong> — the public storefront does not publish them.
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {INV.stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
          >
            <div className="text-xs text-[var(--text-mute)] mb-2 font-medium">
              {stat.lbl}
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

      {/* Reorder Alerts and Stock by Class */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-1">Reorder alerts</h3>
          <p className="text-sm text-[var(--text-mute)] mb-4">
            Below reorder quantity at the reorder point — sorted by how far under, then by lead time
          </p>

          <div className="space-y-2">
            {INV.reorder.map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded hover:bg-[var(--gray-100)] border border-[var(--border)]">
                <div className="text-xl flex-shrink-0">📦</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-[var(--purple)]">{item[0]}</div>
                  <div className="font-semibold text-sm">{item[1]}</div>
                  <div className="text-xs text-[var(--text-mute)]">{item[2]}</div>
                </div>
              </div>
            ))}
            <button
              onClick={() => onToast("Showing 16 items in the reorder list")}
              className="w-full text-center text-sm text-[var(--text-mute)] py-2"
            >
              16 more in this table below
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Stock by Class */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Stock by class</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12, fill: "var(--text-mute)" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-mute)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--text)" }}
                />
                <Bar dataKey="value" fill="#6C4CF5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Import Exposure */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Import exposure</h3>
            <div className="text-xs text-[var(--text-mute)] mb-4">
              Value of stock on order — goods-in-transit and beyond — one cannot cancel
            </div>

            <div className="space-y-2">
              {INV.exposure.map((item, i) => (
                <div key={i} className="flex justify-between text-sm pb-2 border-b border-[var(--border)]">
                  <span className="text-[var(--text-mute)]">{item[0]}</span>
                  <span className="font-bold">{item[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterStock(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filterStock === filter
                  ? "bg-[var(--ink)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--text)] hover:bg-[var(--border)]"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Item</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Class</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">On-hand</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Reorder pt</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Cover</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Lead time</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Value</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--gray-100)]">
                  <td className="p-3">
                    <div className="font-semibold">{item[0]}</div>
                    <div className="text-xs text-[var(--text-mute)]">{item[1]}</div>
                  </td>
                  <td className="p-3 text-sm">{item[2]}</td>
                  <td className="p-3 font-bold">{item[3]}</td>
                  <td className="p-3">{item[4]}</td>
                  <td className="p-3">{item[5]}</td>
                  <td className="p-3">{item[6]}</td>
                  <td className="p-3 font-semibold">{item[8]}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold inline-block ${
                        item[10] === "green"
                          ? "bg-green-100 text-green-800"
                          : item[10] === "amber"
                          ? "bg-yellow-100 text-yellow-800"
                          : item[10] === "blue"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item[9]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
          <div className="text-sm text-[var(--text-mute)]">
            Showing 1–{filtered.length} of {INV.table.length} items
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded bg-[var(--ink)] text-white text-sm font-bold">
              1
            </button>
            <button className="w-8 h-8 rounded border border-[var(--border)] text-sm font-bold hover:bg-[var(--gray-100)]">
              2
            </button>
            <button className="w-8 h-8 rounded border border-[var(--border)] text-sm font-bold hover:bg-[var(--gray-100)]">
              8
            </button>
            <button className="w-8 h-8 rounded border border-[var(--border)] text-sm font-bold hover:bg-[var(--gray-100)]">
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
