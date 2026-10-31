"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderIcon, PenIcon } from "lucide-react";

import {
  UserCreateFormValues,
  userCreateSchema,
  UserUpdateFormValues,
  userUpdateSchema,
} from "../../schemas/user";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { ChevronDownIcon, EnvelopeIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import Input from "@/components/form/input/InputField";
import { Button } from "@/components/ui/button";
import Alert from "@/components/ui/alert/Alert";
import type { ApiError } from "@/lib/common/api-error";
import { createUserMutation, updateUserMutation } from "../../api/mutations";
import {
  EditableUserStatus,
  User,
  UserRole,
  UserStatus,
} from "../../api/types";
import {
  userStatusMeta,
  userStatusOptions,
} from "../../constants/user-options";
import ComponentCard from "@/components/common/ComponentCard";
import { uploadMediaMutation } from "@/lib/media/api/mutations";
import ImagesPicker, {
  type ImageItem,
} from "@/lib/media/components/images-picker";

interface UserFormProps {
  initialData: User | null;
  pageTitle?: string;
  onClose?: () => void;
}

const roleOptions = [
  { value: UserRole.ADMIN, label: "Admin" },
  { value: UserRole.USER, label: "User" },
];

const countries = [
  { code: "KM", label: "+269" },
  { code: "MA", label: "+212" },
  { code: "US", label: "+1" },
  { code: "GB", label: "+44" },
  { code: "CA", label: "+1" },
  { code: "AU", label: "+61" },
];

// Statut d'un utilisateur créé depuis le dashboard.
const DEFAULT_CREATE_STATUS = UserStatus.PENDING_VERIFICATION;

export function UserForm({ initialData, pageTitle, onClose }: UserFormProps) {
  const isEdit = !!initialData;
  const formSchema = isEdit ? userUpdateSchema : userCreateSchema;
  const initialStatus = initialData?.status ?? DEFAULT_CREATE_STATUS;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateFormValues | UserUpdateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          email: initialData.email,
          phoneNumber: initialData.phoneNumber ?? "",
          role: initialData.role,
          status: initialData.status as EditableUserStatus,
          imageIds: initialData.images.map((image) => image.id),
          password: "",
          confirmPassword: "",
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          role: UserRole.USER,
          status: DEFAULT_CREATE_STATUS,
          imageIds: [],
          password: "",
          confirmPassword: "",
        },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const status = watch("status") ?? initialStatus;
  const statusMeta = userStatusMeta[status];

  const createMutation = useMutation(createUserMutation);
  const updateMutation = useMutation(updateUserMutation);
  const uploadMutation = useMutation(uploadMediaMutation);
  const [images, setImages] = useState<ImageItem[]>(() =>
    (initialData?.images ?? []).map((image) => ({
      key: `media-${image.id}`,
      kind: "existing" as const,
      id: image.id,
      url: image.url,
    })),
  );
  const [imagesTouched, setImagesTouched] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSuccess = (message: string) => {
    toast.success(message);
    onClose?.();
  };

  const handleError = (error: ApiError) => {
    if (error.status === 401) {
      toast.error("Votre session a expiré, veuillez vous reconnecter.");
      return;
    }
    setSubmitError(error.message);
    toast.error(error.message);
  };

  const onSubmit = async (
    values: UserCreateFormValues | UserUpdateFormValues,
  ) => {
    setSubmitError(null);

    let imageIds: number[] | undefined;
    if (!isEdit || imagesTouched) {
      try {
        setIsUploading(true);
        imageIds = await Promise.all(
          images.map(async (image) =>
            image.kind === "existing"
              ? image.id
              : (
                  await uploadMutation.mutateAsync({
                    file: image.file,
                    context: "CONTENT",
                  })
                ).id,
          ),
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Échec de l'envoi des photos.";
        setSubmitError(message);
        toast.error(message);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const payload = { ...values, ...(imageIds ? { imageIds } : {}) };
    if (isEdit) {
      updateMutation.mutate(
        { id: initialData.id, values: payload as UserUpdateFormValues },
        {
          onSuccess: () => handleSuccess("Action effectuée avec succès"),
          onError: handleError,
        },
      );
      return;
    }

    createMutation.mutate(payload as UserCreateFormValues, {
      onSuccess: () => handleSuccess("Action effectuée avec succès"),
      onError: handleError,
    });
  };

  const handleRoleChange = (value: string) => {
    setValue("role", value as UserRole, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value as EditableUserStatus, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const isSaving =
    isSubmitting ||
    createMutation.isPending ||
    updateMutation.isPending ||
    isUploading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-h-[90vh] flex-col px-1 sm:px-0"
    >
      {/* Header sticky */}
      {pageTitle && (
        <div
          className="sticky top-0 z-20 shrink-0 border-b border-gray-200
            bg-white px-4 py-3 sm:px-6 sm:py-4 dark:border-gray-700
            dark:bg-gray-900"
        >
          <h2
            className="text-base font-semibold text-gray-900 sm:text-xl
              dark:text-white"
          >
            {pageTitle}
          </h2>
        </div>
      )}

      {/* Content scrollable */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:p-6">
        {submitError && (
          <Alert
            variant="error"
            title="Failed to save user"
            message={submitError}
            showLink={false}
          />
        )}
        <ComponentCard className="mb-5" title="Photos (facultatif)">
          <ImagesPicker
            firstLabel="Couverture"
            items={images}
            disabled={isSaving}
            onChange={(next) => {
              setImages(next);
              setImagesTouched(true);
            }}
          />
        </ComponentCard>
        <div
          className="grid grid-cols-1 gap-4 space-y-5 md:grid-cols-2
            md:space-y-6"
        >
          <div>
            <Label required>Prénom</Label>

            <Input
              type="text"
              {...register("firstName")}
              placeholder="Entrez le prénom"
            />

            {errors.firstName && (
              <p className="text-error-500 mt-1 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label required>Nom</Label>

            <Input
              type="text"
              {...register("lastName")}
              placeholder="Entrez le nom"
            />

            {errors.lastName && (
              <p className="text-error-500 mt-1 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <Label required>Email</Label>

            <div className="relative">
              <Input
                type="email"
                {...register("email")}
                placeholder="Entrez l'email"
                className="pl-15.5"
              />

              <span
                className="absolute top-1/2 left-0 -translate-y-1/2 border-r
                  border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800
                  dark:text-gray-400"
              >
                <EnvelopeIcon />
              </span>
            </div>

            {errors.email && (
              <p className="text-error-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label required>Role</Label>

            <div className="relative">
              <Select
                options={roleOptions}
                placeholder="Sélectionnez un rôle"
                defaultValue={initialData?.role ?? UserRole.USER}
                onChange={handleRoleChange}
                className="dark:bg-dark-900"
              />

              <span
                className="pointer-events-none absolute top-1/2 right-3
                  -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <ChevronDownIcon />
              </span>
            </div>

            {errors.role && (
              <p className="text-error-500 mt-1 text-sm">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <Label required>Numéro de téléphone</Label>

            <PhoneInput
              {...register("phoneNumber")}
              selectPosition="start"
              countries={countries}
              placeholder="+1 (555) 000-0000"
              onChange={handlePhoneNumberChange}
              value={initialData?.phoneNumber ?? undefined}
            />

            {errors.phoneNumber && (
              <p className="text-error-500 mt-1 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label required>Statut du compte</Label>

            <div className="relative">
              <Select
                options={userStatusOptions}
                placeholder="Sélectionner un statut"
                defaultValue={initialStatus}
                onChange={handleStatusChange}
                className="dark:bg-dark-900"
              />

              <span
                className="pointer-events-none absolute top-1/2 right-3
                  -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <ChevronDownIcon />
              </span>
            </div>

            <p className={`mt-1.5 text-xs ${statusMeta.textClass}`}>
              {statusMeta.description}
            </p>

            {errors.status && (
              <p className="text-error-500 mt-1 text-sm">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <ComponentCard className="mt-2.5" title="Mot de passe (Facultatif)">
          {" "}
          <div
            className="grid grid-cols-1 gap-4 space-y-5 md:grid-cols-2
              md:space-y-6"
          >
            <div>
              <Label required={!isEdit}>Mot de passe</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Entrez votre mot de passe"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 z-30 -translate-y-1/2
                    cursor-pointer"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-error-500 mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label required={!isEdit}>Confirmer le mot de passe</Label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Entrez à nouveau votre mot de passe"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-4 z-30 -translate-y-1/2
                    cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-error-500 mt-1 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </ComponentCard>

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
            startIcon={isEdit && <PenIcon size={16} />}
            disabled={isSaving}
            className="w-full sm:w-auto sm:min-w-32"
          >
            {isSaving ? "En cours..." : isEdit ? "Modifier" : "Ajouter"}
            {isSaving && <LoaderIcon className="ml-2 animate-spin" />}
          </Button>
        </div>
      </div>
    </form>
  );
}
