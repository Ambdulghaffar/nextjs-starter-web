"use client";

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserSummary } from "@/lib/users/api/types";

interface CellActionsProps {
  user: UserSummary;
  onView: (user: UserSummary) => void;
  onEdit: (user: UserSummary) => void;
  onDelete: (user: UserSummary) => void;
}

export function CellActions({
  user,
  onView,
  onEdit,
  onDelete,
}: CellActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => e.preventDefault()}
          className="bg-brand-1 text-brand-1-foreground hover:bg-brand-1/80
            hover:text-brand-1-foreground size-10 rounded-full px-5"
          aria-label={`Actions pour ${user.firstName} ${user.lastName}`}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onView(user)}>
          <Eye className="mr-2 size-4" />
          <span>Voir</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(user)}>
          <Pencil className="mr-2 size-4" />
          <span>Modifier</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(user)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
