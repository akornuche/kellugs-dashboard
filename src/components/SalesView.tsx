"use client";

import { useState } from "react";
import { SALES } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

export default function SalesView({
  role,
  onToast,
}: {
  role: Role;
  onToast: (msg: string) => void;
}) {
  const canEdit = role.writes.includes("sales");
  const [filterStage, setFilterStage] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stages = ["all", "New", "Quoted", "Negotiation", "Won", "Lost"];

  const filtered = SALES.leads.filter((lead) => {
    const stageOk = filterStage === "all" || lead[5] === filterStage;
    const searchOk =
      !searchTerm ||
      lead[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead[2].toLowerCase().includes(searchTerm.toLowerCase());
    return stageOk && searchOk;
  });

  // Prepare chart data
  const chartData = SALES.pipeline.map((item) => ({
    name: item.l,
    value: item.v,
  }));

  return (
    <div className="max-w-7xl pb-20">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold mb-2">Sales</h1>
          <p className="text-[var(--text-mute)] text-sm">
            Field, Digital, Institutional and Showroom — one lead record
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onToast("Preparing export…")}
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
            Close period ✓
          </button>
        </div>
      </div>

      {/* Read-only Banner */}
      {!canEdit && (
        <div className="mb-4 p-4 rounded-lg border border-purple-200 bg-purple-50 text-purple-900 text-sm flex gap-3">
          <span>🔒</span>
          <span>
            <strong>Read-only.</strong> {role.title} has read access to this
            module. Changes here belong to {OWNER_OF.sales}.
          </span>
        </div>
      )}

      {/* Info Banner */}
      <div className="mb-6 p-4 rounded-lg border border-blue-200 bg-blue-50 text-blue-900 text-sm flex gap-3">
        <span>📖</span>
        <span>
          Leads here are <strong>sample records</strong>. The point they make is not: the four sales units share one lead record, so an enquiry is followed up once rather than lost between them.
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {SALES.stats.map((stat, i) => (
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

      {/* Pipeline and Channels */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-1">Pipeline by stage</h3>
          <p className="text-sm text-[var(--text-mute)] mb-4">
            Value of open leads at each stage, ₦ millions
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              />
              <Bar dataKey="value" fill="#6C4CF5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Channels</h3>
          <div className="space-y-4">
            {SALES.channels.map((channel, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-3 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-sm">{channel[0]}</div>
                  <div className="font-bold">{channel[1]}</div>
                </div>
                <div className="text-xs text-[var(--text-mute)]">{channel[2]}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-mute)] mt-4 pt-4 border-t border-[var(--border)]">
            Cost per lead, by channel. Field reps cost the most per lead but bring the largest orders — which is why the pipeline value sits beside the count.
          </p>
        </div>
      </div>

      {/* Lost Leads */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold mb-1">Why leads were lost</h3>
        <p className="text-sm text-[var(--text-mute)] mb-4">
          The reason is a required field — anecdote becomes a pattern you can act on
        </p>
        <div className="space-y-3">
          {SALES.lost.map((lead, i) => (
            <div key={i} className="flex gap-3 p-3 rounded hover:bg-[var(--gray-100)]">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-[var(--purple)]">{lead[0]}</div>
                <div className="font-semibold text-sm">{lead[1]}</div>
                <div className="text-xs text-[var(--text-mute)]">{lead[2]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leads Table with Filters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        {/* Filter Chips */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filterStage === stage
                  ? "bg-[var(--ink)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--text)] hover:bg-[var(--border)]"
              }`}
            >
              {stage === "all" ? "All" : stage}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search customer, source or interest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-auto px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--gray-100)] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Customer</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Source</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Value</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Stage</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Owner</th>
                <th className="text-left p-3 font-semibold text-[var(--text-mute)]">Raised</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr
                  key={i}
                  className={`border-b border-[var(--border)] hover:bg-[var(--gray-100)] ${
                    lead[5] === "Lost" ? "bg-red-50" : ""
                  }`}
                >
                  <td className="p-3">
                    <div className="font-semibold">{lead[0]}</div>
                    <div className="text-xs text-[var(--text-mute)]">{lead[1]}</div>
                  </td>
                  <td className="p-3 text-sm">{lead[2]}</td>
                  <td className="p-3 font-semibold">{lead[4]}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold inline-block ${
                        lead[6] === "green"
                          ? "bg-green-100 text-green-800"
                          : lead[6] === "amber"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead[6] === "blue"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {lead[5]}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{lead[7]}</td>
                  <td className="p-3 text-sm text-[var(--text-mute)]">{lead[8]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
          <div className="text-sm text-[var(--text-mute)]">
            Showing 1–{filtered.length} of {SALES.leads.length} leads
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded bg-[var(--ink)] text-white text-sm font-bold">
              1
            </button>
            <button className="w-8 h-8 rounded border border-[var(--border)] text-sm font-bold hover:bg-[var(--gray-100)]">
              2
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
