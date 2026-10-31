"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { userByIdQueryOptions } from "../api/queries/queries.client";
import { UserForm } from "./ui/user-form";

type TUserViewPageProps = {
  userId: string;
  onClose?: () => void;
};

export default function UserFormView({ userId, onClose }: TUserViewPageProps) {
  if (userId === "new") {
    return <UserForm initialData={null} onClose={onClose} />;
  }

  const numericId = Number(userId);
  if (Number.isNaN(numericId)) {
    notFound();
    return null;
  }

  return <EditUserView userId={Number(userId)} onClose={onClose} />;
}

function EditUserView({
  userId,
  onClose,
}: {
  userId: number;
  onClose?: () => void;
}) {
  const { data } = useSuspenseQuery(userByIdQueryOptions(userId));

  return <UserForm initialData={data} onClose={onClose} />;
}
