import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// =========================================================
// Types
// =========================================================

type PaginationVariant = "text" | "icon" | "both";

interface BasePaginationProps {
  variant?: PaginationVariant;
  onPageChange?: (page: number) => void;

  /**
   * Permet d'activer/désactiver la modification de l'URL.
   *
   * Par défaut :
   * - mode client  => true
   * - mode server  => false
   */
  updateUrl?: boolean;

  /**
   * Nom du paramètre utilisé dans l'URL.
   *
   * Exemple :
   * page
   * addressPage
   */
  urlParam?: string;
}

interface ClientPaginationProps extends BasePaginationProps {
  mode: "client";
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: never;
  totalPages?: never;
}

interface ServerPaginationProps extends BasePaginationProps {
  mode: "server";
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
}

type DataPaginationProps = ClientPaginationProps | ServerPaginationProps;

// =========================================================
// Classes partagées (compactes sur mobile)
// =========================================================

const BORDER = "border border-gray-300";
const HOVER = "hover:bg-gray-50 dark:hover:bg-gray-800";
const DISABLED = "pointer-events-none opacity-50";

// Boutons Précédent / Suivant
const ARROW_CLASS = "h-9 px-2 sm:h-10 sm:px-4";

// Boutons numérotés
const PAGE_CLASS = "size-auto h-9 min-w-9 px-2 sm:h-10 sm:min-w-10 sm:px-3";

// =========================================================
// Pagination Controls
// =========================================================

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <DataPagination
      mode="server"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      variant="both"
      updateUrl={false}
    />
  );
}

// =========================================================
// Unified Pagination
// =========================================================

export function DataPagination(props: DataPaginationProps) {
  const {
    mode,
    variant = "both",
    onPageChange,
    itemsPerPage = 10,

    // Par défaut :
    // client => URL activée
    // server => URL désactivée
    updateUrl: shouldUpdateUrl = mode === "client",

    urlParam = "page",
  } = props;

  // =========================================================
  // State
  // =========================================================

  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  // Nombre de pages affichées de chaque côté de la page courante :
  // 1 sur mobile (< 640px), 2 à partir de sm
  const [delta, setDelta] = useState(2);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");

    const update = () => setDelta(mql.matches ? 1 : 2);

    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, []);

  // =========================================================
  // Pagination mode
  // =========================================================

  const isClient = mode === "client";

  const totalPages = isClient
    ? Math.ceil(props.totalItems / itemsPerPage)
    : props.totalPages;

  const currentPage = isClient ? localCurrentPage : props.currentPage;

  const totalItems = props.totalItems;

  // =========================================================
  // Client : récupération de la page depuis l'URL
  // =========================================================

  useEffect(() => {
    if (!isClient) return;

    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get(urlParam);

    if (pageParam) {
      const page = parseInt(pageParam, 10);

      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalCurrentPage(page);
      }
    }
  }, [isClient, totalPages, urlParam]);

  // =========================================================
  // Mise à jour de l'URL
  // =========================================================

  const updateUrl = (page: number) => {
    const url = new URL(window.location.href);

    url.searchParams.set(urlParam, page.toString());

    window.history.pushState({}, "", url.toString());
  };

  // =========================================================
  // Changement de page
  // =========================================================

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }

    // Mode client : la pagination est contrôlée localement
    if (isClient) {
      setLocalCurrentPage(page);
    }

    // Modification de l'URL uniquement si autorisée
    if (shouldUpdateUrl) {
      updateUrl(page);
    }

    // Toujours notifier le parent
    onPageChange?.(page);
  };

  // =========================================================
  // Génération des numéros de page
  // =========================================================

  const getPageNumbers = () => {
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    let lastPage: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((page) => {
      if (lastPage !== undefined) {
        if (page - lastPage === 2) {
          rangeWithDots.push(lastPage + 1);
        } else if (page - lastPage !== 1) {
          rangeWithDots.push("...");
        }
      }

      rangeWithDots.push(page);
      lastPage = page;
    });

    return rangeWithDots;
  };

  // =========================================================
  // Rien à paginer
  // =========================================================

  if (totalPages <= 1) {
    return null;
  }

  const showIcon = variant === "icon" || variant === "both";
  const showText = variant === "text" || variant === "both";

  // =========================================================
  // Rendu
  // =========================================================

  return (
    <div
      className="flex w-full flex-col items-center justify-between gap-4
        sm:flex-row"
    >
      {/* Information */}
      <div
        className="text-center text-sm text-gray-500 sm:shrink-0 sm:text-left
          sm:whitespace-nowrap dark:text-gray-400"
      >
        {totalItems !== undefined ? (
          <>
            Affichage de{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} à{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems}{" "}
            éléments
          </>
        ) : (
          <>
            Page {currentPage} sur {totalPages}
          </>
        )}
      </div>

      {/* Pagination */}
      <Pagination className="mx-0 w-full sm:w-auto">
        <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-2">
          {/* Précédent */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              showIcon={showIcon}
              showText={showText}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={cn(
                BORDER,
                ARROW_CLASS,
                currentPage === 1 ? DISABLED : HOVER,
              )}
            />
          </PaginationItem>

          {/* Numéros de page */}
          {getPageNumbers().map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  aria-label={`Aller à la page ${page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                  isActive={currentPage === page}
                  className={cn(
                    BORDER,
                    PAGE_CLASS,
                    currentPage === page
                      ? `bg-primary/90 hover:bg-primary text-white
                        hover:text-white`
                      : HOVER,
                  )}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Suivant */}
          <PaginationItem>
            <PaginationNext
              href="#"
              showIcon={showIcon}
              showText={showText}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={cn(
                BORDER,
                ARROW_CLASS,
                currentPage === totalPages ? DISABLED : HOVER,
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
