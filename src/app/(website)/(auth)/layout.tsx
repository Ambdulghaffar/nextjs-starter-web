import AuthBranding from "@/components/auth/AuthBranding";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProtectedRoute } from "@/lib/auth/components/protected-route";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute guestOnly={true}>
      <ThemeProvider>
        <div
          className="bg-background relative flex min-h-dvh w-full flex-col
            lg:h-dvh lg:flex-row"
        >
          <div
            className="fixed top-4 right-4 z-50 lg:top-6 lg:right-auto
              lg:left-1/2 lg:-translate-x-1/2"
          >
            <ThemeTogglerTwo />
          </div>

          <div
            className="no-scrollbar flex w-full flex-1 px-6 py-8 sm:px-10
              lg:w-1/2 lg:flex-none lg:overflow-y-auto lg:px-16 lg:py-2.5"
          >
            {children}
          </div>

          <AuthBranding />
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
