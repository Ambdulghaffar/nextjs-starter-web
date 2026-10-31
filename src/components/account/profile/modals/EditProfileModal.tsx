"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { LoaderIcon, PenIcon, UserRound } from "lucide-react";
import {
  CurrentUserFormValues,
  CurrentUserSchema,
} from "@/lib/account/schemas/account";
import { updateMyProfileMutation } from "@/lib/account/api/mutations";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import Alert from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import { FullscreenModal } from "@/components/ui/modal/fullscreen-modal";

const countries = [
  { code: "KM", label: "+269" },
  { code: "MA", label: "+212" },
  { code: "US", label: "+1" },
  { code: "GB", label: "+44" },
  { code: "CA", label: "+1" },
  { code: "AU", label: "+61" },
];

// Formulaire partagé par UserMetaCard et UserInfoCard (il était dupliqué).
export default function EditProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: session, update } = useSession();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CurrentUserFormValues>({
    resolver: zodResolver(CurrentUserSchema),
    defaultValues: {
      firstName: session?.user?.firstName,
      lastName: session?.user?.lastName,
      email: session?.user?.email,
      phoneNumber: session?.user?.phoneNumber ?? "",
    },
  });

  const updateMutation = useMutation(updateMyProfileMutation);
  const pending = isSubmitting || updateMutation.isPending;

  const onSubmit = (values: CurrentUserFormValues) => {
    setSubmitError(null);
    updateMutation.mutate(values, {
      onSuccess: async (data) => {
        await update({ user: data });
        toast.success("Profil mis à jour avec succès");
        onClose();
      },
      onError: (error) => {
        if (error.status === 401) {
          toast.error("Votre session a expiré, veuillez vous reconnecter.");
          return;
        }
        setSubmitError(error.message);
        toast.error(error.message);
      },
    });
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      badge="Mon compte"
      badgeIcon={UserRound}
      title="Modifier mes informations"
      description="Mets à jour tes informations pour garder ton profil à jour."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {submitError && (
          <div role="alert" className="mb-6">
            <Alert
              variant="error"
              title="Échec de l'enregistrement"
              message={submitError}
              showLink={false}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
          <div>
            <Label required>Prénom</Label>
            <Input {...register("firstName")} type="text" />
          </div>
          <div>
            <Label required>Nom</Label>
            <Input {...register("lastName")} type="text" />
          </div>
          <div>
            <Label required>Adresse e-mail</Label>
            <Input {...register("email")} type="text" />
          </div>
          <div>
            <Label required>Téléphone</Label>
            <PhoneInput
              {...register("phoneNumber")}
              selectPosition="start"
              countries={countries}
              placeholder="+1 (555) 000-0000"
              onChange={handlePhoneNumberChange}
              value={session?.user?.phoneNumber ?? undefined}
            />
            {errors.phoneNumber && (
              <p role="alert" className="text-destructive mt-1 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="border-border mt-8 border-t pt-6">
          <p className="text-muted-foreground text-sm">
            Les champs marqués d&apos;un{" "}
            <span className="text-destructive" aria-hidden="true">
              *
            </span>{" "}
            sont obligatoires.
          </p>

          <div
            className="mt-6 flex flex-col-reverse gap-3 sm:flex-row
              sm:justify-start"
          >
            <Button
              type="button"
              size="form-sm"
              variant="secondary"
              onClick={onClose}
              className="w-full sm:w-auto sm:min-w-32"
            >
              Fermer
            </Button>
            <Button
              type="submit"
              size="form-sm"
              startIcon={<PenIcon size={16} />}
              disabled={pending}
              className="w-full sm:w-auto sm:min-w-32"
            >
              {pending ? "En cours..." : "Modifier"}
              {pending && <LoaderIcon className="ml-2 animate-spin" />}
            </Button>
          </div>
        </div>
      </form>
    </FullscreenModal>
  );
}
