import AuthWrapper from "../ui/authors/cards";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
};

export default async function Page() {
  return (
    <main>
      <Suspense fallback={<CardSkeleton />}>
        <AuthWrapper />
      </Suspense>
    </main>
  );
}
