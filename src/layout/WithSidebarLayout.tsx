import type { ReactNode } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import SidebarWidgetRight from "@/layout/SidebarWidgetRight";

export default function WithSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <ComponentCard>{children}</ComponentCard>
      </div>

      <div className="hidden xl:col-span-1 xl:block">
        <div
          className="sticky top-24 h-fit max-h-[calc(100vh-2rem)]
            overflow-y-auto"
        >
          <SidebarWidgetRight />
        </div>
      </div>
    </div>
  );
}
