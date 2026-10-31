import {
  Bone,
  SkeletonColumn,
  TableSkeleton,
} from "@/lib/common/TableSkeleton";

/* ID, Nom, Email, Numéro, Rôle, Statut, Créé le, Actions */
const GRID =
  "grid min-w-225 grid-cols-[0.5fr_2fr_2.5fr_1.7fr_1fr_1.8fr_1fr_0.8fr] items-center gap-4 px-5";

const columns: SkeletonColumn[] = [
  { headerWidth: "w-5", cell: <Bone className="h-4 w-6" /> },
  {
    headerWidth: "w-10",
    align: "start",
    cell: (
      <div className="flex items-center gap-3">
        <Bone className="h-12 w-12 shrink-0 rounded-full" />
        <Bone className="h-4 w-24" />
      </div>
    ),
  },
  { headerWidth: "w-12", cell: <Bone className="h-4 w-44" /> },
  { headerWidth: "w-14", cell: <Bone className="h-4 w-32" /> },
  { headerWidth: "w-10", cell: <Bone className="h-5 w-14 rounded-full" /> },
  { headerWidth: "w-12", cell: <Bone className="h-5 w-24 rounded-full" /> },
  { headerWidth: "w-14", cell: <Bone className="h-4 w-14" /> },
  { headerWidth: "w-12", cell: <Bone className="h-8 w-8 rounded-full" /> },
];

export function UsersTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <TableSkeleton
      title="Liste des utilisateurs"
      subtitle="Gérez les utilisateurs et leurs rôles."
      addButtonWidth="sm:w-56"
      filterWidths={["w-28", "w-24", "w-24"]}
      gridClass={GRID}
      columns={columns}
      rows={rows}
      pages={4}
      label="Chargement des utilisateurs…"
    />
  );
}
