"use client";

import { useState } from "react";

interface Role {
  id: string;
  initials: string;
  color: string;
  name: string;
  title: string;
}

const NAV = [
  {
    section: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "grid" },
      { id: "sales", label: "Sales", icon: "trending-up" },
    ],
  },
  {
    section: "Operations",
    items: [
      { id: "inventory", label: "Inventory", icon: "box" },
      { id: "logistics", label: "Logistics", icon: "truck" },
    ],
  },
  {
    section: "Company",
    items: [{ id: "admin", label: "Admin", icon: "settings" }],
  },
];

export default function Sidebar({
  currentPage,
  onPageChange,
  role,
  onLogout,
  isOpen = true,
  onClose,
}: {
  currentPage: string;
  onPageChange: (page: string) => void;
  role: Role;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onPageChange(page);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      <div className={`w-[230px] bg-[var(--ink)] text-gray-200 flex flex-col h-screen sticky top-0 rounded-r-3xl m-4 p-6 transition-transform lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:static left-0 top-0 z-50 lg:z-auto lg:rounded-r-3xl lg:m-4 lg:sticky`}>
      {/* Brand */}
      <div className="flex items-center gap-2 mb-6 font-bold text-lg">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: role.color }}
        >
          {role.initials[0]}
        </div>
        <span className="text-white">Kellugs</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {NAV.map((section) => (
          <div key={section.section} className="mb-4">
            <div className="text-xs uppercase tracking-wider text-gray-500 px-2 py-3 font-bold">
              {section.section}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                      currentPage === item.id
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                    }`}
                  >
                    <span className="w-4 h-4">
                      {getIcon(item.icon)}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-4">
        <div className="text-xs text-gray-400 mb-4">
          <div className="font-bold text-gray-200">{role.name}</div>
          <div className="text-xs text-gray-500">{role.title}</div>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-900 transition"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: role.color }}
            >
              {role.initials[0]}
            </div>
            <span className="flex-1 text-left truncate">{role.name}</span>
            <span>▼</span>
          </button>

          {dropdownOpen && (
            <div className="absolute bottom-12 left-0 right-0 bg-gray-900 rounded-lg border border-gray-700 shadow-lg z-50">
              <button
                onClick={() => {
                  onLogout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-lg"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function getIcon(name: string): JSX.Element {
  const icons: { [key: string]: JSX.Element } = {
    grid: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    "trending-up": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    box: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    truck: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="1" y="6" width="14" height="11" />
        <path d="M15 9h4l3 3v5h-7z" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="17.5" cy="19" r="2" />
      </svg>
    ),
    settings: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-15.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
      </svg>
    ),
  };
  return icons[name] || <span>→</span>;
}
