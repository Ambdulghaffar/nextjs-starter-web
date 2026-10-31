import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { DetailSkeleton } from "@/lib/common/ui/detail-skeleton";

export default function Loading() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateur" />
      <div className="space-y-6">
        <ComponentCard>
          <DetailSkeleton />
        </ComponentCard>
      </div>
    </div>
  );
}
