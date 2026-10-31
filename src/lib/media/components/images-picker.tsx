"use client";
import { useCallback, useEffect, useRef } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { MAX_IMAGES } from "@/lib/common/schemas";

export type ImageItem =
  | { key: string; kind: "existing"; id: number; url: string }
  | { key: string; kind: "new"; file: File; previewUrl: string };

const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo

type Props = {
  items: ImageItem[];
  onChange: (items: ImageItem[]) => void;
  disabled?: boolean;
  maxItems?: number;
  /** Badge affiché sur la première image (ex. "Couverture", "Avatar") */
  firstLabel?: string;
};

export default function ImagesPicker({
  items,
  onChange,
  disabled,
  maxItems = MAX_IMAGES,
  firstLabel = "Première photo",
}: Props) {
  // Libère les aperçus à la fermeture du formulaire
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  useEffect(
    () => () => {
      itemsRef.current.forEach((item) => {
        if (item.kind === "new") URL.revokeObjectURL(item.previewUrl);
      });
    },
    [],
  );

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length > 0) {
        toast.error("Fichier refusé : PNG, JPG ou WebP, 10 Mo maximum.");
      }
      const free = Math.max(maxItems - items.length, 0);
      if (accepted.length > free) {
        toast.error(`Maximum ${maxItems} photo${maxItems > 1 ? "s" : ""}.`);
      }
      const added: ImageItem[] = accepted.slice(0, free).map((file) => ({
        key: crypto.randomUUID(),
        kind: "new",
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      if (added.length > 0) onChange([...items, ...added]);
    },
    [items, maxItems, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_SIZE,
    disabled,
    accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
  });

  const remove = (index: number) => {
    const item = items[index];
    if (item.kind === "new") URL.revokeObjectURL(item.previewUrl);
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`hover:border-brand-500 dark:hover:border-brand-500
          cursor-pointer rounded-xl border border-dashed p-6 text-center
          transition ${
            isDragActive
              ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
              : `border-gray-300 bg-gray-50 dark:border-gray-700
                dark:bg-gray-900`
          } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <input {...getInputProps()} />
        <UploadIcon className="mx-auto mb-2 text-gray-500" size={28} />
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {isDragActive ? "Déposez les photos ici" : "Glissez vos photos ici"}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          PNG, JPG ou WebP, jusqu&apos;à {maxItems} photo
          {maxItems > 1 ? "s" : ""}. La première est marquée « {firstLabel} ».
        </p>
        <span className="text-brand-500 text-sm font-medium underline">
          Parcourir
        </span>
      </div>

      {items.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.key}
              className="relative overflow-hidden rounded-lg border
                border-gray-200 dark:border-gray-700"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.kind === "new" ? item.previewUrl : item.url}
                alt={`Photo ${index + 1}`}
                className="aspect-4/3 w-full object-cover"
              />
              {index === 0 && (
                <span
                  className="bg-brand-500 absolute top-1 left-1 rounded px-1.5
                    py-0.5 text-xs text-white"
                >
                  {firstLabel}
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={disabled}
                aria-label="Retirer la photo"
                className="absolute top-1 right-1 rounded-full bg-black/60 p-1
                  text-white"
              >
                <XIcon size={14} />
              </button>
              <div
                className="absolute inset-x-0 bottom-0 flex justify-between
                  bg-black/40 px-1 py-0.5 text-white"
              >
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={disabled || index === 0}
                  aria-label="Déplacer à gauche"
                  className="disabled:opacity-30"
                >
                  <ArrowLeftIcon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={disabled || index === items.length - 1}
                  aria-label="Déplacer à droite"
                  className="disabled:opacity-30"
                >
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
