import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function Loading() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tableau de bord" />
      <div className="space-y-6">
        <ComponentCard>
          <div className="flex items-center justify-center py-12">
            <div
              className="h-12 w-12 animate-spin rounded-full border-4
                border-blue-500 border-t-transparent"
            />
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
