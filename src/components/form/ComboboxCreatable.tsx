"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboOption = { value: string; label: string };

const MAX_RESULTS = 100;

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

type Props = {
  options: ComboOption[];
  value: string; // value d'une option, ou texte libre si allowCreate
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  allowCreate?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export default function ComboboxCreatable({
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
  searchPlaceholder = "Rechercher...",
  emptyText = "Aucun résultat",
  allowCreate = false,
  disabled = false,
  loading = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  const filtered = useMemo(() => {
    const q = norm(search);
    const list = q ? options.filter((o) => norm(o.label).includes(q)) : options;
    return list.slice(0, MAX_RESULTS);
  }, [options, search]);

  const typed = search.trim();
  const canCreate =
    allowCreate &&
    typed.length > 0 &&
    !options.some((o) => norm(o.label) === norm(typed));

  const select = (v: string) => {
    onChange(v);
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setSearch("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            `focus:border-brand-300 focus:ring-brand-500/10 flex h-11 w-full
            items-center justify-between rounded-lg border border-gray-300
            bg-transparent px-4 text-sm text-gray-800 focus:ring-3
            focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50
            dark:border-gray-700 dark:bg-gray-900 dark:text-white/90`,
          )}
        >
          <span className={cn("truncate", !value && "text-gray-400")}>
            {value ? selectedLabel : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>

      {/* z élevé : le formulaire s'ouvre dans une modale */}
      <PopoverContent
        align="start"
        className="z-[100000] w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList onWheel={(e) => e.stopPropagation()}>
            {loading && (
              <div
                className="flex items-center gap-2 px-3 py-2 text-sm
                  text-gray-500"
              >
                <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
              </div>
            )}
            {!loading && filtered.length === 0 && !canCreate && (
              <div className="py-6 text-center text-sm text-gray-500">
                {emptyText}
              </div>
            )}
            <CommandGroup>
              {filtered.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  onSelect={() => select(o.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === o.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {o.label}
                </CommandItem>
              ))}
              {canCreate && (
                <CommandItem
                  value={`__create__${typed}`}
                  onSelect={() => select(typed)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Utiliser « {typed} »
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
