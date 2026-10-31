import ProfileAvatarCard from "@/components/account/profile/ProfileAvatarCard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6
        dark:border-gray-800 dark:bg-white/3"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">{children}</div>

        <div>
          <div
            className="md:sticky md:top-24 md:h-fit md:max-h-[calc(100vh-2rem)]
              md:overflow-y-auto"
          >
            <ProfileAvatarCard />
          </div>
        </div>
      </div>
    </div>
  );
}
