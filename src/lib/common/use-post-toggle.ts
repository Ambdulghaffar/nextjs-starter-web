"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { ApiError } from "@/lib/common/api-error";

type PostRelationInput = { postId: number };

type UsePostToggleOptions<TEntity> = {
  postId: number;
  /** Identifiant du like / favori existant, `null` s'il n'y en a pas. */
  activeId: number | null;
  create: UseMutationOptions<TEntity, ApiError, PostRelationInput, unknown>;
  /** La variable est l'identifiant de la relation, pas celui du post. */
  remove: UseMutationOptions<void, ApiError, number, unknown>;
  messages: { added: string; removed: string };
};

/**
 * Logique commune aux relations « utilisateur ↔ post » (likes, favoris) :
 * crée la relation si elle n'existe pas, la supprime sinon.
 *
 * L'invalidation du cache React Query est faite par les mutations elles-mêmes
 * (`onSettled`). `router.refresh()` ne sert qu'aux listes rendues côté serveur.
 */
export function usePostToggle<TEntity>({
  postId,
  activeId,
  create,
  remove,
  messages,
}: UsePostToggleOptions<TEntity>) {
  const router = useRouter();

  const createMutation = useMutation(create);
  const removeMutation = useMutation(remove);

  const pending = createMutation.isPending || removeMutation.isPending;

  const toggle = () => {
    if (pending) return;

    const callbacks = (message: string) => ({
      onSuccess: () => {
        toast.success(message);
        router.refresh();
      },
      onError: (error: ApiError) => toast.error(error.message),
    });

    if (activeId != null) {
      removeMutation.mutate(activeId, callbacks(messages.removed));
      return;
    }

    createMutation.mutate({ postId }, callbacks(messages.added));
  };

  return { active: activeId != null, pending, toggle };
}
