"use client";

import { useState } from "react";

interface Role {
  title: string;
  name?: string;
  initials?: string;
  color?: string;
}

const CRUMB_OF: { [key: string]: string } = {
  dashboard: "Dashboard",
  sales: "Sales",
  inventory: "Operations / Inventory",
  logistics: "Operations / Logistics",
  admin: "Admin",
};

export default function Topbar({
  role,
  currentPage,
  onLogout,
  onToast,
  onMenuClick,
}: {
  role: Role;
  currentPage: string;
  onLogout?: () => void;
  onToast?: (msg: string) => void;
  onMenuClick?: () => void;
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const roleName = role.name || "Admin";
  const initials = role.initials || "KU";
  const bgColor = role.color || "#6C4CF5";

  const handleLogout = () => {
    setUserMenuOpen(false);
    if (onLogout) onLogout();
  };

  const handleMenuClick = (action: string) => {
    setUserMenuOpen(false);
    if (onToast) {
      switch (action) {
        case "profile":
          onToast("Opening profile settings...");
          break;
        case "roles":
          onToast("Opening roles & access management...");
          break;
        case "settings":
          onToast("Opening settings...");
          break;
        case "close":
          onToast("Closing accounting period...");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-5 border-b border-[var(--border)] bg-[var(--card)]">
      {/* Left: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-sub)] hover:bg-[var(--gray-100)] transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="text-sm text-[var(--text-sub)] font-medium hidden sm:block">
          {CRUMB_OF[currentPage] || "Dashboard"}
        </div>
      </div>

      {/* Right: Search + Icons + User */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        <div className="hidden md:flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--text-mute)] max-w-xs">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none"
          />
          <kbd className="px-2 py-1 rounded text-xs bg-[var(--gray-100)] text-[var(--text-mute)]">
            ⌘K
          </kbd>
        </div>

        {/* Settings Icon */}
        <button
          onClick={() => handleMenuClick("settings")}
          className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-sub)] hover:bg-[var(--gray-100)] transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-15.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
          </svg>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="relative w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-sub)] hover:bg-[var(--gray-100)] transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="hidden sm:flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl px-3 py-2 hover:bg-[var(--gray-100)] transition"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: bgColor }}
            >
              {initials.slice(0, 2)}
            </div>
            <div className="flex flex-col text-sm text-left">
              <div className="font-bold text-[var(--text)]">{roleName}</div>
              <div className="text-xs text-[var(--text-mute)]">
                {role.title?.slice(0, 20)}
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-[var(--text-mute)] transition ${
                userMenuOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Mobile user icon */}
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: bgColor }}
          >
            {initials.slice(0, 2)}
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg z-50">
              {/* Header */}
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: bgColor }}
                  >
                    {initials.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{roleName}</div>
                    <div className="text-xs text-[var(--text-mute)]">
                      {role.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => handleMenuClick("profile")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--gray-100)] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </button>

                <button
                  onClick={() => handleMenuClick("roles")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--gray-100)] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Roles & access
                </button>

                <button
                  onClick={() => handleMenuClick("settings")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--gray-100)] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-15.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
                  </svg>
                  Settings
                </button>

                <button
                  onClick={() => handleMenuClick("close")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--gray-100)] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11H7.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-1.5M14 7h2.5a1.5 1.5 0 0 1 1.5 1.5v3M17 4h-3m3 0v3" />
                  </svg>
                  Close period
                </button>

                <div className="border-t border-[var(--border)] my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
