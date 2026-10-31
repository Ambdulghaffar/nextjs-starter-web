import { cn } from "@/lib/utils";
import React from "react";

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title = "",
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white
        dark:border-gray-800 dark:bg-white/3 ${className}`}
    >
      {/* Card Header */}
      {title && (
        <div className="px-6 py-5">
          <h3 className="text-sm font-medium text-gray-600 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
      )}

      {/* Card Body */}
      <div
        className={cn(
          "border-t p-4 sm:p-6 dark:border-white",
          title.trim() !== "" && "border-gray-300",
        )}
      >
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
