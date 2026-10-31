import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { UsersTableSkeleton } from "@/lib/users/components/users-skeleton";

export default function Loading() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateurs" />
      <div className="space-y-6">
        <ComponentCard>
          <UsersTableSkeleton />
        </ComponentCard>
      </div>
    </div>
  );
}
