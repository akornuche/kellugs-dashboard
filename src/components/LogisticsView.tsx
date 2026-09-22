"use client";

import { useState } from "react";
import { LOG } from "@/lib/data";

export default function LogisticsView({
  onToast,
}: {
  onToast: (msg: string) => void;
}) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = [
    "All",
    "Not yet delivered",
    "Delayed",
    "Out of state",
  ];

  const filteredDeliveries = LOG.deliveries.filter((item) => {
    const status = item[5];
    const order = item[0];
    const location = item[1];

    const statusMatch =
      filterStatus === "All" ||
      (filterStatus === "Not yet delivered" && status === "Scheduled") ||
      (filterStatus === "Delayed" && status === "Delayed") ||
      (filterStatus === "Out of state" && status === "Out of state");

    const searchMatch =
      searchTerm === "" ||
      order.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleExport = () => {
    onToast("Exporting deliveries data...");
  };

  const handleSchedule = () => {
    onToast("Opening delivery scheduler...");
  };

  return (
    <div className="max-w-7xl pb-20">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold mb-2">Logistics</h1>
          <p className="text-[var(--text-mute)] text-sm">
            Scheduling, proof of delivery and vehicle records
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
            onClick={handleSchedule}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
          >
            Schedule delivery <span>+</span>
          </button>
        </div>
      </div>

      {/* Info Banners */}
      <div className="space-y-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <div className="text-blue-600 font-bold text-xl">🔒</div>
          <div>
            <div className="text-sm font-bold text-blue-900">
              Read-only. Admin & Accounts Head has read access to this module.
            </div>
            <div className="text-xs text-blue-800">
              Changes here belong to the Logistics & Delivery Lead.
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <div className="text-blue-600 font-bold text-xl">📋</div>
          <div>
            <div className="text-sm font-bold text-blue-900">
              Deliveries shown here are{" "}
              <span className="underline">sample records</span> illustrating the
              Logistics guide&apos;s workflow.
            </div>
            <div className="text-xs text-blue-800">
              A delivery note travels with every job, and proof of delivery is
              captured at handover so damage is not on the spot rather than
              argued about later.{" "}
              <a href="#" className="underline font-bold">
                More on this
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {LOG.stats.map((stat: any, i: number) => (
          <div
            key={i}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-2xl">
                {stat.ic === "check" && "✓"}
                {stat.ic === "truck" && "🚚"}
                {stat.ic === "shield" && "🛡"}
                {stat.ic === "naira" && "₦"}
              </div>
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

      {/* Filters & Search */}
      <div className="mb-6 flex gap-3 items-center flex-wrap">
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--border)] text-[var(--text-mute)] hover:bg-[var(--bg)]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="ml-auto flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search order or destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-mute)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Deliveries Table */}
        <div className="col-span-2">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Deliveries</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left p-3 font-semibold text-[var(--text-mute)]">
                      Order{" "}
                      <span className="text-xs font-normal">↕</span>
                    </th>
                    <th className="text-left p-3 font-semibold text-[var(--text-mute)]">
                      Dispatch <span className="text-xs font-normal">↕</span>
                    </th>
                    <th className="text-left p-3 font-semibold text-[var(--text-mute)]">
                      Vehicle <span className="text-xs font-normal">↕</span>
                    </th>
                    <th className="text-left p-3 font-semibold text-[var(--text-mute)]">
                      Status <span className="text-xs font-normal">↕</span>
                    </th>
                    <th className="text-left p-3 font-semibold text-[var(--text-mute)]">
                      Proof of delivery{" "}
                      <span className="text-xs font-normal">↕</span>
                    </th>
                    <th className="text-left p-3 font-semibold text-[var(--text-mute)]">
                      Fee <span className="text-xs font-normal">↕</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeliveries.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg)] transition">
                      <td className="p-3">
                        <div className="font-semibold text-sm">{item[0]}</div>
                        <div className="text-xs text-[var(--text-mute)]">
                          {item[1]}
                        </div>
                      </td>
                      <td className="p-3 text-sm">{item[2]}</td>
                      <td className="p-3 text-sm">{item[3]}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold inline-block ${
                            item[5] === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : item[5] === "Dispatched"
                              ? "bg-blue-100 text-blue-800"
                              : item[5] === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : item[5] === "Delayed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item[5]}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold inline-block ${
                            item[7] === "Captured"
                              ? "bg-green-100 text-green-800"
                              : "text-[var(--text-mute)]"
                          }`}
                        >
                          {item[7] || "—"}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{item[8] || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-[var(--text-mute)] mt-4">
              Showing 1–7 of {LOG.deliveries.length} deliveries
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Delivery-fee reference */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">Delivery-fee reference</h3>
            <p className="text-xs text-[var(--text-mute)] mb-4">
              Drawn from Logistics&apos; own cost data. The diagnostics recorded lost
              sales where a fee was quoted late or guessed.
            </p>
            <div className="space-y-2">
              {[
                {
                  name: "Lagos — Ikeja & Lekki",
                  status: "Included",
                  fee: "",
                },
                { name: "Ogun", status: "", fee: "₦98,000" },
                { name: "Oyo", status: "", fee: "₦145,000" },
              ].map((item, i) => (
                <div key={i} className="border-t border-[var(--border)] pt-2">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-[var(--text-mute)]">
                    {item.status || `1 run on record`}
                  </div>
                  {item.fee && (
                    <div className="text-sm font-bold text-blue-600 mt-1">
                      {item.fee}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-mute)] mt-4 pt-4 border-t border-[var(--border)]">
              Averages of journeys actually run. A new destination still needs a
              quote from Logistics — but Sales can now see the basis instead of
              inventing one.
            </p>
          </div>

          {/* Vehicles */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Vehicles</h3>
            <p className="text-xs text-[var(--text-mute)] mb-4">
              Each van carries its own service record
            </p>
            <div className="space-y-3">
              {[
                {
                  plate: "LAG-441-XA",
                  driver: "Sunday A.",
                  time: "3 runs this period",
                  color: "green",
                },
                {
                  plate: "LAG-207-KJ",
                  driver: "Emeka O.",
                  time: "2 runs this period",
                  color: "green",
                },
                {
                  plate: "Hired 3–ton",
                  driver: "Contract",
                  time: "2 runs this period · 1 delayed",
                  color: "yellow",
                },
              ].map((vehicle, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    vehicle.color === "green"
                      ? "border-l-green-500 bg-green-50"
                      : "border-l-yellow-500 bg-yellow-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        vehicle.color === "green"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="font-semibold text-sm">{vehicle.plate}</div>
                  </div>
                  <div className="text-xs text-[var(--text-mute)] ml-4">
                    {vehicle.driver}
                  </div>
                  <div className="text-xs text-[var(--text-mute)] ml-4">
                    {vehicle.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
