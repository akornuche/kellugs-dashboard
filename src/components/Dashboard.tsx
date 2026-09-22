"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Topbar from "./Topbar";
import Toast from "./Toast";

interface Role {
  id: string;
  initials: string;
  color: string;
  name: string;
  title: string;
  writes: string[];
  readsAll: boolean;
}

const ROLES: Role[] = [
  {
    id: "ceo",
    initials: "KU",
    color: "#6C4CF5",
    name: "Kelechi Ugwu",
    title: "Chief Executive Officer",
    writes: ["dashboard"],
    readsAll: true,
  },
  {
    id: "gm",
    initials: "CO",
    color: "#3B82F6",
    name: "Chidera Obi",
    title: "General Manager",
    writes: ["dashboard"],
    readsAll: true,
  },
  {
    id: "admin",
    initials: "TS",
    color: "#7C3AED",
    name: "Tunde Salami",
    title: "Admin & Accounts Head",
    writes: ["admin"],
    readsAll: false,
  },
];

export default function Dashboard() {
  const [role, setRole] = useState<Role>(ROLES[2]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("kellugs_role");
    const savedLogin = localStorage.getItem("kellugs_loggedin");

    if (savedRole) {
      const found = ROLES.find((r) => r.id === savedRole);
      if (found) setRole(found);
    }

    if (savedLogin === "1") setLoggedIn(true);
  }, []);

  const handleRoleSwitch = (roleId: string) => {
    const found = ROLES.find((r) => r.id === roleId);
    if (found) {
      setRole(found);
      localStorage.setItem("kellugs_role", roleId);
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("kellugs_loggedin", "1");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("kellugs_loggedin");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  if (!loggedIn) {
    return (
      <LoginPage
        roles={ROLES}
        selectedRole={role}
        onRoleSelect={handleRoleSwitch}
        onLogin={handleLogin}
        showPassword={showPassword}
        onPasswordToggle={() => setShowPassword(!showPassword)}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        role={role}
        onLogout={handleLogout}
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        <Topbar role={role} currentPage={currentPage} onLogout={handleLogout} onToast={showToast} />
        <MainContent
          currentPage={currentPage}
          role={role}
          onToast={showToast}
        />
      </div>
      <Toast message={toastMessage} />
    </div>
  );
}

function LoginPage({
  roles,
  selectedRole,
  onRoleSelect,
  onLogin,
  showPassword,
  onPasswordToggle,
}: {
  roles: Role[];
  selectedRole: Role;
  onRoleSelect: (id: string) => void;
  onLogin: () => void;
  showPassword: boolean;
  onPasswordToggle: () => void;
}) {
  const roleDetails: { [key: string]: { title: string; description: string; writes: string | string[]; icon: string; tag?: string } } = {
    ceo: {
      title: "Chief Executive Officer",
      description: "Direction, delegation and the decisions queue",
      writes: "READS EVERYTHING",
      icon: "KU",
    },
    gm: {
      title: "General Manager",
      description: "Coordination across the four departments",
      writes: "READS EVERYTHING",
      icon: "CO",
      tag: "TRANSITION 2",
    },
    ops: {
      title: "Operations Manager",
      description: "Everything between a confirmed order and a delivered quality product",
      writes: ["Inventory", "Production", "Logistics"],
      icon: "IN",
      tag: "+2 read-only",
    },
    sales: {
      title: "Sales Head",
      description: "Field, Digital, Institutional and Showroom sales units",
      writes: ["Sales", "Catalogue"],
      icon: "AB",
      tag: "+4 read-only",
    },
    support: {
      title: "Customer Service Head",
      description: "Everything that happens after a sale closes",
      writes: ["Support"],
      icon: "NE",
      tag: "+3 read-only",
    },
    logistics: {
      title: "Logistics & Delivery Lead",
      description: "Scheduling, proof of delivery and vehicle upkeep",
      writes: ["Logistics"],
      icon: "EO",
      tag: "+2 read-only",
    },
    prod: {
      title: "Site Officer & QC",
      description: "Client-site measurement and the sign-off before cutting",
      writes: ["Production"],
      icon: "BA",
    },
    admin: {
      title: "Admin & Accounts Head",
      description: "Accounts, HR administration, facilities and compliance",
      writes: ["Admin"],
      icon: "TS",
      tag: "+4 read-only",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#0a0a1a] to-black">
      {/* Background gradient accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 md:p-12 flex gap-8 items-center">
            <div className="flex-1">
              <div className="text-xs font-bold text-cyan-400 mb-4 tracking-widest">
                KELLUGS HOME CONCEPTS · LAGOS, SINCE 2011
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                One system for the whole company.
              </h1>
              <p className="text-gray-300 mb-8">
                Sales, the workshop, stock, delivery and customers in one place — so the business stops depending on who remembers what.
              </p>
              <div className="flex gap-8 text-sm">
                <div>
                  <div className="text-2xl font-bold text-white">96</div>
                  <div className="text-gray-400">Products live</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-gray-400">Lagos branches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-gray-400">Role dashboards</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <div className="bg-white rounded-2xl p-4 w-48 h-64 flex flex-col items-center justify-center text-center">
                <div className="w-full h-40 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-6xl">🚪</span>
                </div>
                <div className="text-xs font-semibold">4FT Single 8 Chromes Side Glass Door</div>
                <div className="text-xs text-gray-500 mt-1">₦1,250,000 · the highest-priced item in the live catalogue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Sign In Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: selectedRole.color }}
                  >
                    K
                  </div>
                  <span className="font-bold text-lg">Kellugs OS</span>
                </div>

                <h2 className="text-2xl font-bold mb-2">Sign in</h2>
                <p className="text-sm text-gray-600 mb-6">
                  One system across sales, operations, admin and support. What you see is scoped to your role.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-bold mb-2 text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="e.g. ops"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold mb-2 text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm"
                    />
                    <button
                      onClick={onPasswordToggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 hover:text-gray-900"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="mb-6 flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-xs text-gray-700">
                    Keep me signed in on this device
                  </label>
                </div>

                <button
                  onClick={onLogin}
                  className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-900 transition flex items-center justify-center gap-2"
                >
                  Sign in <span>→</span>
                </button>

                <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="text-xs text-red-800 mb-1">
                    <span className="font-bold">ℹ️ Prototype sign-in.</span> Credentials are held in js/data.js, which any visitor&apos;s browser can read. This chooses which dashboard you are shown — it is not access control. A real deployment moves it to Supabase auth with row-level security, where the server decides.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Role Cards */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-2">Or open a role directly</h3>
              <p className="text-gray-400 text-sm mb-8">
                Eight seats from the Kellugs Home job descriptions and the Transition 2 organisational plan. Each lands on its own dashboard.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const details = roleDetails[role.id as keyof typeof roleDetails] || roleDetails.admin;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        onRoleSelect(role.id);
                        onLogin();
                      }}
                      className="group text-left bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl p-5 transition hover:bg-gray-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: role.color }}
                          >
                            {role.initials.slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{role.title}</h4>
                            {details.tag && (
                              <span className="text-xs text-purple-400 font-bold">
                                {details.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-400 group-hover:translate-x-1 transition">→</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{role.title === "Chief Executive Officer" ? "Direction, delegation and the decisions queue" : "Reports to CEO"}</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(role.writes) ? (
                          role.writes.map((write) => (
                            <span key={write} className="text-xs font-bold px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                              {write}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">READS EVERYTHING</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 text-center text-gray-400 text-xs">
                Every account uses the password <strong>kellugs</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
