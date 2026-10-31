"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpIcon, GroupIcon } from "@/icons";
import { usersQueryOptions } from "@/lib/users/api/queries/queries.client";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";

export const AdminMetrics = () => {
  const router = useRouter();
  const { data: users } = useQuery(
    usersQueryOptions({
      page: 1,
      size: 1,
    }),
  );

  const stats = [
    {
      title: "Utilisateurs",
      value: users?.totalElements ?? 0,
      description: "Utilisateurs inscrits",
      icon: GroupIcon,
      // Catégorie « Utilisateurs » = brand-1 partout dans l'application
      iconWrapper: "bg-brand-1/10 text-brand-1",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            onClick={() => {
              router.push(ROUTES.DASHBOARD_USERS);
            }}
            className="group border-border bg-card text-card-foreground
              hover:border-ring/50 relative overflow-hidden rounded-2xl border
              p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5
              hover:cursor-pointer hover:shadow-md md:p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div
                className={`flex size-12 items-center justify-center rounded-xl
                ${stat.iconWrapper} transition-transform duration-200
                group-hover:scale-105`}
              >
                <Icon className="size-6" aria-hidden />
              </div>

              <div
                className="border-border bg-muted text-foreground flex h-7
                  items-center gap-1 rounded-full border px-2.5 text-xs
                  font-medium"
              >
                <ArrowUpIcon className="size-3" aria-hidden />
                Total
              </div>
            </div>

            {/* Content */}
            <div className="mt-6">
              <p className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <h4
                  className="text-foreground text-3xl font-bold tracking-tight"
                >
                  {stat.value.toLocaleString("fr-FR")}
                </h4>
              </div>

              <p className="text-muted-foreground mt-2 text-xs">
                {stat.description}
              </p>
            </div>

            {/* Bottom accent */}
            <div
              aria-hidden
              className="bg-border pointer-events-none absolute right-5 bottom-0
                left-5 h-px"
            />
          </div>
        );
      })}
    </div>
  );
};
