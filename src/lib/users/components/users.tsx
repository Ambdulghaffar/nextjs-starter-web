"use client";

import { useDeferredValue, useState } from "react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Download } from "lucide-react";

import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { EmptyState } from "@/lib/common/ui/empty-state";

import { cn, exportToCSV } from "@/lib/utils";
import { usersQueryOptions } from "../api/queries/queries.client";
import {
  hardDeleteUserMutation,
  softDeleteUserMutation,
} from "../api/mutations";
import { Filters } from "./ui/users-table/filters";
import { Columns } from "./ui/users-table/columns";
import { Row } from "./ui/users-table/row";
import { Modals } from "./ui/users-table/modals";
import { usePageQuery } from "@/lib/use-page-query";
import type { UserSummary } from "../api/types";
import { useUserFilters } from "./ui/users-table/use-filters";
import environment from "@/config/environment.config";
import { DataPagination } from "@/components/ui/paginations";

const {
  pagination: { page, size },
  export: { maxSize: MAX_EXPORT_SIZE },
} = environment;

export function Users() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);

  const { currentPage, itemsPerPage, handlePageChange, handleSizeChange } =
    usePageQuery({
      pageParam: "page",
      sizeParam: "size",
      defaultPage: page,
      defaultSize: size,
    });

  const {
    filters,
    searchQuery,
    roleFilter,
    statusFilter,
    handleSearch,
    handleRoleChange,
    handleStatusChange,
  } = useUserFilters({
    currentPage,
    itemsPerPage,
    onPageReset: () => handlePageChange(1),
  });

  const deferredFilters = useDeferredValue(filters);
  const { data } = useSuspenseQuery(usersQueryOptions(deferredFilters));
  const isStale = deferredFilters !== filters;

  const viewModal = useModal();
  const editModal = useModal();
  const createModal = useModal();
  const deleteModal = useModal();

  const openWith =
    (modal: ReturnType<typeof useModal>) => (item: UserSummary) => {
      setSelectedUser(item);
      modal.openModal();
    };

  const softDeleteMutation = useMutation(softDeleteUserMutation);
  const hardDeleteMutation = useMutation(hardDeleteUserMutation);

  const handleDelete = (permanent: boolean) => {
    if (!selectedUser) return;

    const mutation = permanent ? hardDeleteMutation : softDeleteMutation;

    mutation.mutate(selectedUser.id, {
      onSuccess: () => {
        toast.success(
          permanent
            ? "Utilisateur supprimé définitivement."
            : "Utilisateur supprimé avec succès.",
        );

        deleteModal.closeModal();
        setSelectedUser(null);
      },
      onError: (error) => {
        if (error.status === 401) {
          toast.error("Votre session a expiré, veuillez vous reconnecter.");
          return;
        }

        toast.error(error.message);
      },
    });
  };

  const isDeleting =
    softDeleteMutation.isPending || hardDeleteMutation.isPending;

  const exportUsers = async () => {
    const result = await queryClient.fetchQuery(
      usersQueryOptions({ size: MAX_EXPORT_SIZE }),
    );
    const rows = result.content;

    const dataToExport = rows.map((user) => ({
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      telephone: user.phoneNumber || "-",
      role: user.role,
      status: user.status,
    }));

    const columnsConfig = [
      { key: "fullName", label: "Nom Complet" },
      { key: "email", label: "Email" },
      { key: "telephone", label: "Téléphone" },
      { key: "role", label: "Rôle" },
      { key: "status", label: "Statut" },
    ] as const;

    exportToCSV(dataToExport, columnsConfig, "users.csv");
  };

  const users = data.content;
  return (
    <div className="space-y-4">
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center
          sm:justify-between"
      >
        <div>
          <h2 className="text-foreground text-xl font-semibold">
            Liste des utilisateurs
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Gérez les utilisateurs et leurs rôles.
          </p>
        </div>

        <div
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row
            sm:items-center sm:gap-3"
        >
          <Button
            onClick={exportUsers}
            className="bg-secondary text-secondary-foreground
              hover:bg-secondary/80 w-full justify-center sm:w-auto"
          >
            Exporter
            <Download size={16} />
          </Button>

          <Button
            onClick={() => createModal.openModal()}
            className="bg-primary text-primary-foreground hover:bg-primary/90
              w-full justify-center gap-2 sm:w-auto"
          >
            Ajouter un utilisateur
          </Button>
        </div>
      </div>

      <Filters
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        roleFilter={roleFilter}
        onRoleChange={handleRoleChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        itemsPerPage={itemsPerPage}
        onLimitChange={handleSizeChange}
      />
      <div id="address-table-top" className="text-muted-foreground text-sm">
        Affichage de {users.length ? (data.page - 1) * data.size + 1 : 0} à{" "}
        {users.length ? (data.page - 1) * data.size + users.length : 0} sur{" "}
        {data.totalElements} utilisateurs
      </div>

      <div
        className={cn(
          `border-border bg-card text-card-foreground overflow-hidden rounded-xl
          border`,
          isStale && "opacity-50",
        )}
      >
        <div className="max-w-full overflow-x-auto">
          {users.length > 0 ? (
            <Table>
              <TableHeader
                className="bg-primary text-primary-foreground border-border
                  border-b text-start"
              >
                <Columns />
              </TableHeader>
              <TableBody className="divide-border divide-y">
                {users.map((user) => (
                  <Row
                    key={user.id}
                    user={user}
                    onView={openWith(viewModal)}
                    onEdit={openWith(editModal)}
                    onDelete={openWith(deleteModal)}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title="Aucun utilisateur"
              description="Aucun utilisateur ne correspond à ces critères pour le moment."
              fullWidth={false}
              className="border-0 bg-transparent"
            />
          )}
        </div>
      </div>

      <DataPagination
        mode="server"
        currentPage={data.page}
        totalPages={data.totalPages}
        totalItems={data.totalElements}
        itemsPerPage={data.size}
        onPageChange={handlePageChange}
        variant="both"
      />

      <Modals
        selectedUser={selectedUser}
        modals={{
          view: { isOpen: viewModal.isOpen, close: viewModal.closeModal },
          edit: { isOpen: editModal.isOpen, close: editModal.closeModal },
          create: { isOpen: createModal.isOpen, close: createModal.closeModal },
          delete: { isOpen: deleteModal.isOpen, close: deleteModal.closeModal },
        }}
        onConfirmDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
