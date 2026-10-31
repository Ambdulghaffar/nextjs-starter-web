"use client";

import { KeyRound, AlertCircle, Trash2 } from "lucide-react";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import DeleteAccountModal from "./modals/DeleteAccountModal";
import { useModal } from "@/hooks/useModal";

export default function AccountSettingsCard() {
  const updatePasswordModal = useModal();
  const deleteAccountModal = useModal();

  return (
    <div className="space-y-6">
      <section
        className="border-border bg-card text-card-foreground relative isolate
          overflow-hidden rounded-3xl border p-7 shadow-sm sm:p-8"
      >
        {/* Cercles décoratifs (4) */}
        <div
          aria-hidden
          className="bg-primary/10 absolute -top-16 -right-12 -z-10 size-48
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/20 absolute top-8 right-44 -z-10 size-20
            rounded-full border-2"
        />
        <div
          aria-hidden
          className="border-primary/15 absolute -bottom-14 -left-10 -z-10
            size-36 rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary/15 absolute right-24 bottom-4 -z-10 size-8
            rounded-full"
        />

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex min-w-0 items-start gap-5">
            <span
              className="bg-primary/10 text-primary ring-primary/20 flex size-12
                shrink-0 items-center justify-center rounded-xl ring-1
                ring-inset"
            >
              <KeyRound className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold">
                Mot de passe
              </h2>
              <p className="text-muted-foreground mt-1 max-w-xl leading-relaxed">
                Utilise un mot de passe long et aléatoire pour renforcer la
                sécurité de ton compte.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={updatePasswordModal.openModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90
              focus-visible:ring-ring/50 rounded-full px-5 py-2.5 text-sm
              font-semibold shadow-md transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            Modifier
          </button>
        </div>
      </section>

      <section
        id="danger-zone"
        className="border-destructive/30 bg-destructive/5 text-card-foreground
          relative isolate overflow-hidden rounded-3xl border p-7 sm:p-8"
      >
        {/* Cercles neutres (3) : destructive est réservé au sens « danger », pas au décor */}
        <div
          aria-hidden
          className="bg-foreground/5 absolute -top-14 -right-10 -z-10 size-44
            rounded-full"
        />
        <div
          aria-hidden
          className="border-foreground/10 absolute top-10 right-40 -z-10 size-16
            rounded-full border-2"
        />
        <div
          aria-hidden
          className="border-foreground/10 absolute -bottom-12 -left-10 -z-10
            size-32 rounded-full border-2"
        />

        <div className="flex items-start gap-5">
          <span
            className="bg-destructive/10 text-destructive ring-destructive/20
              flex size-12 shrink-0 items-center justify-center rounded-xl
              ring-1 ring-inset"
          >
            <AlertCircle className="size-6" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">
              Zone sensible
            </h2>
            <p className="text-muted-foreground mt-1 max-w-xl leading-relaxed">
              La suppression de ton compte est définitive et ne peut pas être
              annulée. Assure-toi de vouloir continuer.
            </p>
          </div>
        </div>

        <div
          className="border-destructive/30 mt-6 flex justify-end border-t pt-6"
        >
          <button
            type="button"
            onClick={deleteAccountModal.openModal}
            className="bg-card border-destructive/30 text-destructive
              hover:bg-destructive hover:text-destructive-foreground
              focus-visible:ring-destructive/30 inline-flex items-center gap-2
              rounded-full border px-5 py-2.5 text-sm font-semibold
              transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            <Trash2 className="size-4" aria-hidden />
            Supprimer le compte
          </button>
        </div>
      </section>

      <ChangePasswordModal
        isOpen={updatePasswordModal.isOpen}
        onClose={updatePasswordModal.closeModal}
      />
      <DeleteAccountModal
        isOpen={deleteAccountModal.isOpen}
        onClose={deleteAccountModal.closeModal}
      />
    </div>
  );
}
