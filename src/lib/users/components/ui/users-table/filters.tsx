"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRole, UserStatus } from "@/lib/users/api/types";
import { FilterIcon } from "lucide-react";

export type RoleFilter = "All" | UserRole;
export type StatusFilter = "All" | UserStatus;

const LIMIT_OPTIONS = [5, 10, 20, 50];

const ROLE_OPTIONS = [
  { value: "All", label: "Tous les rôles" },
  { value: UserRole.ADMIN, label: "Administrateur" },
  { value: UserRole.USER, label: "Utilisateur" },
] as const;

const STATUS_OPTIONS = [
  { value: "All", label: "Tous les statuts" },
  { value: UserStatus.ACTIVE, label: "Actif" },
  { value: UserStatus.BLOCKED, label: "Bloqué" },
  {
    value: UserStatus.PENDING_VERIFICATION,
    label: "En attente de vérification",
  },
  { value: UserStatus.DELETED, label: "Supprimé" },
] as const;

interface TableFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: RoleFilter;
  onRoleChange: (filter: RoleFilter) => void;
  statusFilter: StatusFilter;
  onStatusChange: (filter: StatusFilter) => void;
  itemsPerPage: number;
  onLimitChange: (size: string) => void;
}

export function Filters({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
  itemsPerPage,
  onLimitChange,
}: TableFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  const selectedRole = ROLE_OPTIONS.find(
    (option) => option.value === roleFilter,
  )?.label;

  const selectedStatus = STATUS_OPTIONS.find(
    (option) => option.value === statusFilter,
  )?.label;

  const activeFiltersCount =
    Number(roleFilter !== "All") + Number(statusFilter !== "All");

  const resetFilters = () => {
    onRoleChange("All");
    onStatusChange("All");
  };

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center
        sm:justify-between"
    >
      {/* Search */}
      <div className="relative w-full sm:max-w-xs">
        <svg
          className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4
            -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <Input
          type="text"
          placeholder="Rechercher par nom ou e-mail..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Mobile filters */}
      <div className="sm:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-center gap-2">
              <FilterIcon />
              Filtres
              {activeFiltersCount > 0 && (
                <span
                  className="bg-primary text-primary-foreground rounded-full
                    px-1.5 py-0.5 text-xs"
                >
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="max-h-[85dvh] overflow-y-auto rounded-t-2xl px-5 pb-8"
          >
            <SheetHeader className="px-0 text-left">
              <SheetTitle>Filtres des utilisateurs</SheetTitle>
              <SheetDescription>
                Affinez la liste selon le rôle, le statut ou le nombre de
                résultats.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Role */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold">Rôle</h3>
                <div className="grid grid-cols-1 gap-2">
                  {ROLE_OPTIONS.map(({ value, label }) => (
                    <Button
                      key={value}
                      type="button"
                      variant={roleFilter === value ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => onRoleChange(value)}
                    >
                      {label}
                      {roleFilter === value && <span>✓</span>}
                    </Button>
                  ))}
                </div>
              </section>

              {/* Status */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold">Statut</h3>
                <div className="grid grid-cols-1 gap-2">
                  {STATUS_OPTIONS.map(({ value, label }) => (
                    <Button
                      key={value}
                      type="button"
                      variant={statusFilter === value ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => onStatusChange(value)}
                    >
                      {label}
                      {statusFilter === value && <span>✓</span>}
                    </Button>
                  ))}
                </div>
              </section>

              {/* Page size */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold">Éléments par page</h3>

                <div className="grid grid-cols-4 gap-2">
                  {LIMIT_OPTIONS.map((limit) => (
                    <Button
                      key={limit}
                      type="button"
                      variant={itemsPerPage === limit ? "default" : "outline"}
                      onClick={() => onLimitChange(String(limit))}
                    >
                      {limit}
                    </Button>
                  ))}
                </div>
              </section>

              <div className="flex gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Réinitialiser
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Afficher les résultats
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filters */}
      <div className="hidden justify-end sm:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FilterIcon />
              Filtres
              {activeFiltersCount > 0 && (
                <span
                  className="bg-primary text-primary-foreground rounded-full
                    px-1.5 py-0.5 text-xs"
                >
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Rôle</span>
                <span
                  className="text-muted-foreground ml-auto max-w-36 truncate
                    pl-3 text-xs"
                >
                  {selectedRole}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                {ROLE_OPTIONS.map(({ value, label }) => (
                  <DropdownMenuItem
                    key={value}
                    onSelect={() => onRoleChange(value)}
                  >
                    <span className="flex-1">{label}</span>
                    {roleFilter === value && <span>✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Statut</span>
                <span
                  className="text-muted-foreground ml-auto max-w-36 truncate
                    pl-3 text-xs"
                >
                  {selectedStatus}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-56">
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <DropdownMenuItem
                    key={value}
                    onSelect={() => onStatusChange(value)}
                  >
                    <span className="flex-1">{label}</span>
                    {statusFilter === value && <span>✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Éléments par page</span>
                <span className="text-muted-foreground ml-auto pl-3 text-xs">
                  {itemsPerPage}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-36">
                <DropdownMenuRadioGroup
                  value={String(itemsPerPage)}
                  onValueChange={onLimitChange}
                >
                  {LIMIT_OPTIONS.map((limit) => (
                    <DropdownMenuRadioItem key={limit} value={String(limit)}>
                      {limit}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {activeFiltersCount > 0 && (
              <>
                <div className="bg-border -mx-1 my-1 h-px" />
                <DropdownMenuItem
                  onSelect={resetFilters}
                  className="text-muted-foreground"
                >
                  Réinitialiser les filtres
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
