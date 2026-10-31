"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { CheckCircle2, Clock, CircleAlert } from "lucide-react";

import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { usersQueryOptions } from "@/lib/users/api/queries/queries.client";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";

// Le sens du statut passe par l'icône et le libellé (cf. DESIGN.md, « Messages d'état »)
const STATUS_CONFIG = {
  ACTIVE: { label: "Actif", icon: CheckCircle2, color: "light" },
  PENDING_VERIFICATION: { label: "En attente", icon: Clock, color: "light" },
} as const;

const headCell =
  "text-theme-xs text-muted-foreground py-3 text-start font-medium";

export default function RecentUsers() {
  const { data: users, isLoading } = useQuery(
    usersQueryOptions({
      page: 1,
      size: 5,
    }),
  );

  const recentUsers = users?.content ?? [];

  return (
    <div
      className="border-border bg-card text-card-foreground overflow-hidden
        rounded-2xl border px-4 pt-4 pb-3 sm:px-6"
    >
      {/* Header */}
      <div
        className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center
          sm:justify-between"
      >
        <div>
          <h3 className="text-foreground text-lg font-semibold">
            Utilisateurs récents
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Les derniers utilisateurs inscrits
          </p>
        </div>

        <Link
          aria-label="Voir tous les utilisateurs"
          type="button"
          href={ROUTES.DASHBOARD_USERS}
          className="border-border bg-card text-foreground text-theme-sm
            hover:bg-accent hover:text-accent-foreground
            focus-visible:ring-ring/50 inline-flex items-center justify-center
            rounded-lg border px-4 py-2.5 font-medium shadow-xs
            transition-colors focus-visible:ring-[3px]
            focus-visible:outline-none"
        >
          Voir tout
        </Link>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-border border-y">
            <TableRow>
              <TableCell isHeader className={headCell}>
                Utilisateur
              </TableCell>
              <TableCell isHeader className={headCell}>
                Email
              </TableCell>
              <TableCell isHeader className={headCell}>
                Rôle
              </TableCell>
              <TableCell isHeader className={headCell}>
                Statut
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-border divide-y">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-muted size-11 animate-pulse rounded-full"
                      />
                      <div className="space-y-2">
                        <div className="bg-muted h-4 w-28 animate-pulse rounded" />
                        <div className="bg-muted h-3 w-20 animate-pulse rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="bg-muted h-4 w-40 animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className="bg-muted h-6 w-16 animate-pulse rounded-full"
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className="bg-muted h-6 w-20 animate-pulse rounded-full"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : recentUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground py-10 text-center text-sm"
                >
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            ) : (
              recentUsers.map((user) => {
                const status = STATUS_CONFIG[
                  user.status as keyof typeof STATUS_CONFIG
                ] ?? {
                  label: user.status,
                  icon: CircleAlert,
                  color: "error",
                };
                const StatusIcon = status.icon;

                return (
                  <TableRow key={user.id}>
                    {/* User */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-muted size-11 shrink-0 overflow-hidden
                            rounded-full"
                        >
                          {user.images[0]?.url ? (
                            <Image
                              width={44}
                              height={44}
                              src={user.images[0].url}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div
                              className="text-muted-foreground flex size-full
                                items-center justify-center text-sm
                                font-semibold"
                            >
                              {user.firstName?.charAt(0).toUpperCase()}
                              {user.lastName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="text-foreground text-theme-sm truncate
                              font-medium"
                          >
                            {user.firstName} {user.lastName}
                          </p>
                          <span className="text-muted-foreground text-theme-xs">
                            @{user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell
                      className="text-muted-foreground text-theme-sm py-3"
                    >
                      {user.email}
                    </TableCell>

                    {/* Role */}
                    <TableCell className="text-theme-sm py-3">
                      <Badge size="sm" color="primary">
                        {user.role}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-theme-sm py-3">
                      <Badge
                        size="sm"
                        color={status.color}
                        startIcon={
                          <StatusIcon className="size-3.5" aria-hidden />
                        }
                      >
                        {status.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
