"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RoleFilter, StatusFilter } from "./filters";
import { buildUserFilters } from "@/lib/users/api/filters";

type UseUserFiltersProps = {
  currentPage: number;
  itemsPerPage: number;
  onPageReset: () => void;
};

export function useUserFilters({
  currentPage,
  itemsPerPage,
  onPageReset,
}: UseUserFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const lastSearch = useRef("");
  const onPageResetRef = useRef(onPageReset);

  // Garde toujours la dernière version de onPageReset sans relancer le debounce
  useEffect(() => {
    onPageResetRef.current = onPageReset;
  }, [onPageReset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = searchQuery.trim();
      setDebouncedSearch(trimmed);

      // Retour à la page 1 uniquement quand la recherche change vraiment
      if (trimmed !== lastSearch.current) {
        lastSearch.current = trimmed;
        onPageResetRef.current();
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const filters = useMemo(
    () =>
      buildUserFilters({
        page: currentPage,
        size: itemsPerPage,
        search: debouncedSearch,
        role: roleFilter !== "All" ? roleFilter : undefined,
        status: statusFilter !== "All" ? statusFilter : undefined,
      }),
    [currentPage, itemsPerPage, debouncedSearch, roleFilter, statusFilter],
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleRoleChange = (value: RoleFilter) => {
    setRoleFilter(value);
    onPageReset();
  };

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
    onPageReset();
  };

  return {
    filters,
    searchQuery,
    roleFilter,
    statusFilter,
    handleSearch,
    handleRoleChange,
    handleStatusChange,
  };
}
