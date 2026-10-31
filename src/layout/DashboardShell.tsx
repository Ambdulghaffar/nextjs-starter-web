"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { ProtectedRoute } from "@/lib/auth/components/protected-route";
import { UserRole } from "@/lib/users/api/types";
import React from "react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="bg-background text-foreground min-h-screen xl:flex">
      <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
        {/* Sidebar and Backdrop */}
        <div className="dark contents">
          <AppSidebar />
        </div>
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 bg-gray-50 px-0 transition-all duration-300
            ease-in-out lg:px-0 dark:bg-gray-950 ${mainContentMargin}`}
        >
          <div className="dark contents">
            <AppHeader />
          </div>
          {/* Page Content */}
          <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
            {children}
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}
