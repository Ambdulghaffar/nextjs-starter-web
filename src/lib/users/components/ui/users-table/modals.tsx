import { Pencil, Trash2, UserPlus, UserRound, UserX } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import type { UserSummary } from "@/lib/users/api/types";
import UserDetails from "../../user-details";
import UserFormView from "../../user-form-view";
import { DeleteConfirmation } from "@/lib/common/ui/delete-confirmation";
import { Suspense } from "react";
import { UserFormSkeleton } from "../user-form-skeleton";
import { UserDetailsSkeleton } from "../../user-details-skeleton";
import { FullscreenModal } from "@/components/ui/modal/fullscreen-modal";

interface ModalState {
  isOpen: boolean;
  close: () => void;
}

interface UserModalsProps {
  selectedUser: UserSummary | null;
  modals: {
    view: ModalState;
    edit: ModalState;
    create: ModalState;
    delete: ModalState;
  };
  onConfirmDelete: (permanent: boolean) => void;
  isDeleting: boolean;
}

export function Modals({
  selectedUser,
  modals,
  onConfirmDelete,
  isDeleting,
}: UserModalsProps) {
  const getFullName = (user: UserSummary | null) =>
    user ? `${user.firstName} ${user.lastName}` : "";

  const fullName = getFullName(selectedUser);
  const isAlreadyDeleted = selectedUser?.status === "DELETED";

  return (
    <>
      {/* Modal View */}
      <FullscreenModal
        isOpen={modals.view.isOpen}
        onClose={modals.view.close}
        badge="Utilisateurs"
        badgeIcon={UserRound}
        title="Détails de l'utilisateur"
        description="Consultez les informations de ce compte."
        width="lg"
      >
        <Suspense fallback={<UserDetailsSkeleton />}>
          {selectedUser && (
            <UserDetails userId={selectedUser.id} onClose={modals.view.close} />
          )}
        </Suspense>
      </FullscreenModal>

      {/* Modal Create */}
      <Modal
        isOpen={modals.create.isOpen}
        onClose={modals.create.close}
        title="Ajouter un utilisateur"
        description="Renseignez les informations du nouveau compte."
        icon={UserPlus}
        className="max-w-4xl"
      >
        <Suspense fallback={<UserFormSkeleton />}>
          <UserFormView userId="new" onClose={modals.create.close} />
        </Suspense>
      </Modal>

      {/* Modal Edit */}
      <Modal
        isOpen={modals.edit.isOpen}
        onClose={modals.edit.close}
        title={fullName ? `Modifier ${fullName}` : "Modifier l'utilisateur"}
        description="Mettez à jour les informations de ce compte."
        icon={Pencil}
        className="max-w-4xl"
      >
        <Suspense fallback={<UserFormSkeleton />}>
          {selectedUser && (
            <UserFormView
              userId={String(selectedUser.id)}
              onClose={modals.edit.close}
            />
          )}
        </Suspense>
      </Modal>

      {/* Modal Delete */}
      <Modal
        isOpen={modals.delete.isOpen}
        onClose={modals.delete.close}
        size="sm"
        title={
          isAlreadyDeleted
            ? "Supprimer définitivement cet utilisateur ?"
            : `Désactiver ${fullName} ?`
        }
        description={
          isAlreadyDeleted
            ? "Vous êtes sur le point de supprimer définitivement cet utilisateur."
            : "Vous pourrez supprimer définitivement ce compte ultérieurement."
        }
        icon={isAlreadyDeleted ? Trash2 : UserX}
        iconClassName={
          isAlreadyDeleted
            ? "bg-destructive/10 text-destructive ring-destructive/20"
            : undefined
        }
        className="max-w-xl"
      >
        <DeleteConfirmation
          alertTitle={
            isAlreadyDeleted
              ? "Suppression définitive"
              : "Désactivation du compte"
          }
          alertMessage={
            isAlreadyDeleted
              ? "Cette action est irréversible. Les données associées seront supprimées définitivement."
              : "Le compte sera désactivé, mais ses données seront conservées."
          }
          alertVariant={isAlreadyDeleted ? "error" : "warning"}
          confirmLabel={
            isAlreadyDeleted
              ? "Supprimer définitivement"
              : "Désactiver le compte"
          }
          isDeleting={isDeleting}
          disabled={!selectedUser}
          onCancel={modals.delete.close}
          onConfirm={() => onConfirmDelete(!!isAlreadyDeleted)}
        />
      </Modal>
    </>
  );
}
