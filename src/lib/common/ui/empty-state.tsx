"use client";

import { type LucideIcon, Inbox, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  fullWidth?: boolean;
};

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
  fullWidth = true,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        `border-border bg-muted/50 text-foreground rounded-3xl border
        border-dashed px-6 py-14 text-center`,
        fullWidth && "col-span-full",
        className,
      )}
    >
      {/* Icône */}
      <div
        className="bg-primary/10 text-primary mx-auto mb-6 flex size-14
          items-center justify-center rounded-2xl"
        aria-hidden="true"
      >
        <Icon className="size-7" strokeWidth={2} />
      </div>

      {/* Contenu */}
      <h3
        className="font-display text-xl font-semibold tracking-tight
          sm:text-2xl"
      >
        {title}
      </h3>

      {description && (
        <p
          className="text-muted-foreground mx-auto mt-3 max-w-md text-base
            leading-relaxed text-pretty"
        >
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div className="mt-7 flex justify-center">
          <Button
            type="button"
            size="form-sm"
            startIcon={<Plus size={16} />}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
