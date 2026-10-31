import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

// =========================================================
// Pagination (conteneur)
// =========================================================

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// =========================================================
// Content : passe à la ligne si l'écran est trop étroit
// =========================================================

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center gap-0.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

// =========================================================
// Link
// =========================================================

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  );
}

// =========================================================
// Previous / Next
// =========================================================

interface PaginationArrowProps extends React.ComponentProps<
  typeof PaginationLink
> {
  text?: string;
  icon?: React.ReactNode;
  showText?: boolean;
  showIcon?: boolean;
}

function PaginationPrevious({
  className,
  text = "Précédent",
  icon = <ChevronLeftIcon className="h-4 w-4" />,
  showText = true,
  showIcon = true,
  ...props
}: PaginationArrowProps) {
  return (
    <PaginationLink
      aria-label="Aller à la page précédente"
      size="default"
      className={cn("gap-1", !showText && "px-2", className)}
      {...props}
    >
      {showIcon && icon}
      {showText && (
        // Si l'icône est affichée, le texte est masqué sur mobile.
        // Si l'icône est absente (variant="text"), on garde le texte
        // pour que le bouton ne soit jamais vide.
        <span className={cn(showIcon && "hidden sm:inline")}>{text}</span>
      )}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Suivant",
  icon = <ChevronRightIcon className="h-4 w-4" />,
  showText = true,
  showIcon = true,
  ...props
}: PaginationArrowProps) {
  return (
    <PaginationLink
      aria-label="Aller à la page suivante"
      size="default"
      className={cn("gap-1", !showText && "px-2", className)}
      {...props}
    >
      {showText && (
        <span className={cn(showIcon && "hidden sm:inline")}>{text}</span>
      )}
      {showIcon && icon}
    </PaginationLink>
  );
}

// =========================================================
// Ellipsis
// =========================================================

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        `flex size-6 items-center justify-center sm:size-8
        [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">Plus de pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
