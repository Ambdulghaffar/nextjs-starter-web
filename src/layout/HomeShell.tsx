"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import Backdrop from "@/layout/Backdrop";
import HomeSidebar from "@/layout/HomeSidebar";
import { ProtectedRoute } from "@/lib/auth/components/protected-route";
import React from "react";

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";
  return (
    <div className="bg-background text-foreground min-h-screen xl:flex">
      {/* Accessible Page for authenticated users only */}
      <ProtectedRoute>
        <HomeSidebar />
        <Backdrop />
        <div
          className={`flex-1 px-0 transition-all duration-300 ease-in-out
            lg:px-5 ${mainContentMargin}`}
        >
          <AppHeader />
          <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
            {children}
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}
