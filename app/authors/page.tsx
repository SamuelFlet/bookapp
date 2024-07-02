import AuthWrapper from "@/app/ui/authors/cards";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Books",
};

export default async function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense fallback={<CardSkeleton />}>
          <AuthWrapper />
        </Suspense>
      </div>
    </main>
  );
}
