"use client";

import DashboardView from "./DashboardView";
import SalesView from "./SalesView";
import InventoryView from "./InventoryView";
import LogisticsView from "./LogisticsView";
import AdminView from "./AdminView";

interface Role {
  title: string;
  writes: string[];
}

export default function MainContent({
  currentPage,
  role,
  onToast,
}: {
  currentPage: string;
  role: Role;
  onToast: (msg: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      {currentPage === "dashboard" && (
        <DashboardView role={role} onToast={onToast} />
      )}
      {currentPage === "sales" && <SalesView role={role} onToast={onToast} />}
      {currentPage === "inventory" && (
        <InventoryView role={role} onToast={onToast} />
      )}
      {currentPage === "logistics" && (
        <LogisticsView onToast={onToast} />
      )}
      {currentPage === "admin" && (
        <AdminView onToast={onToast} />
      )}
    </div>
  );
}
