"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Camera, LoaderIcon, Trash2 } from "lucide-react";
import type { ProfileUpdateRequest } from "@/lib/account/api/types";
import { updateMyProfileMutation } from "@/lib/account/api/mutations";
import Alert from "@/components/ui/alert/Alert";
import { uploadMediaMutation } from "@/lib/media/api/mutations";
import ImagesPicker, {
  type ImageItem,
} from "@/lib/media/components/images-picker";
import { Button } from "@/components/ui/button";
import { getUserAvatarUrl } from "@/lib/users/api/types";

const MAX_PROFILE_IMAGES = 3;

export default function ProfileAvatarCard() {
  const { data: session, update } = useSession();
  const avatarUrl = session?.user ? getUserAvatarUrl(session.user) : null;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageItem[]>(() =>
    (session?.user?.images ?? []).map((image) => ({
      key: `media-${image.id}`,
      kind: "existing" as const,
      id: image.id,
      url: image.url,
    })),
  );

  useEffect(() => {
    if (!session?.user || images.length > 0) return;

    // Session data can arrive after the first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImages(
      session.user.images.map((image) => ({
        key: `media-${image.id}`,
        kind: "existing" as const,
        id: image.id,
        url: image.url,
      })),
    );
  }, [images.length, session?.user]);

  const updateMutation = useMutation(updateMyProfileMutation);
  const uploadMutation = useMutation(uploadMediaMutation);
  const isSaving = updateMutation.isPending || uploadMutation.isPending;

  const save = async (values: ProfileUpdateRequest, successMessage: string) => {
    setSubmitError(null);

    try {
      let payload = values;
      const imageIds = await Promise.all(
        images.map(async (image) =>
          image.kind === "existing"
            ? image.id
            : (
                await uploadMutation.mutateAsync({
                  file: image.file,
                  context: "PRIVATE",
                })
              ).id,
        ),
      );
      payload = { ...values, imageIds };

      const data = await updateMutation.mutateAsync(payload);
      await update({ user: data });
      setImages(
        data.images.map((image) => ({
          key: `media-${image.id}`,
          kind: "existing" as const,
          id: image.id,
          url: image.url,
        })),
      );
      toast.success(successMessage);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 401
      ) {
        toast.error("Votre session a expiré, veuillez vous reconnecter.");
        return;
      }
      const message =
        error instanceof Error
          ? error.message
          : "Échec de la mise à jour de la photo.";
      setSubmitError(message);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      {submitError && (
        <div role="alert">
          <Alert
            variant="error"
            title="Échec de l'enregistrement"
            message={submitError}
            showLink={false}
          />
        </div>
      )}

      <section
        className="border-border bg-card text-card-foreground relative isolate
          overflow-hidden rounded-3xl border p-7 shadow-sm sm:p-8"
      >
        {/* Cercles décoratifs de l'en-tête (4) */}
        <div
          aria-hidden
          className="bg-primary/10 absolute -top-16 -right-12 -z-10 size-48
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/20 absolute top-6 right-40 -z-10 size-20
            rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary/15 absolute top-3 right-1/2 -z-10 size-6
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/15 absolute -top-8 -left-8 -z-10 size-28
            rounded-full border-2"
        />

        <div className="flex items-start gap-4">
          <span
            className="bg-primary/10 text-primary ring-primary/20 flex size-12
              shrink-0 items-center justify-center rounded-xl ring-1 ring-inset"
          >
            <Camera className="size-6" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Photo de profil
            </h2>
            <p className="text-muted-foreground mt-1">
              Choisis l&apos;image qui te représente.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <ImagesPicker
            items={images}
            onChange={setImages}
            maxItems={MAX_PROFILE_IMAGES}
            firstLabel="Avatar"
            disabled={isSaving}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            disabled={images.length === 0 || isSaving}
            onClick={() =>
              void save({}, "Photos de profil mises à jour avec succès")
            }
            className="flex-[1_1_240px] justify-center gap-2"
          >
            Mettre à jour la photo
            {isSaving && <LoaderIcon className="size-4 animate-spin" />}
          </Button>
          {(avatarUrl || images.length > 0) && (
            <Button
              type="button"
              variant="destructive"
              disabled={images.length === 0 || isSaving}
              onClick={() =>
                void save({ imageIds: [] }, "Photo de profil supprimée")
              }
              className="flex-[1_1_240px] justify-center gap-2"
            >
              <Trash2 className="size-4" aria-hidden />
              Supprimer ma photo
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
