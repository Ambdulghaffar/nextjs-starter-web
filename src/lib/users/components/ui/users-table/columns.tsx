"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { cn, ColumnConfig, hiddenOnMobile, MOBILE_HIDDEN } from "@/lib/utils";

export const USER_COLUMNS = [
  { key: "id", label: "ID", hideOnMobile: true },
  { key: "name", label: "Nom" },
  { key: "email", label: "Email", hideOnMobile: true },
  { key: "phone", label: "Numero", hideOnMobile: true },
  { key: "role", label: "Role", hideOnMobile: true },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Crée le", hideOnMobile: true },
  { key: "actions", label: "Actions" },
] as const satisfies readonly ColumnConfig[];

export type UserColumnKey = (typeof USER_COLUMNS)[number]["key"];

export const colClass = (key: UserColumnKey) =>
  hiddenOnMobile(USER_COLUMNS, key);

export function Columns() {
  return (
    <TableRow className="border-border border-b hover:bg-transparent">
      {USER_COLUMNS.map((col: ColumnConfig) => (
        <TableCell
          key={col.key}
          isHeader
          className={cn(
            "px-3 py-3 text-center text-xs font-medium",
            "bg-primary text-primary-foreground",
            col.hideOnMobile && MOBILE_HIDDEN,
            col.key === "actions" &&
              "border-brand-1 bg-brand-1 text-brand-1-foreground size-6 px-5",
          )}
        >
          {col.label}
        </TableCell>
      ))}
    </TableRow>
  );
}
