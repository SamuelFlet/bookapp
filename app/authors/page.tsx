import AuthWrapper from "@/app/ui/authors/cards";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Books",
};

export default async function Page() {
  return (
    <div className="flex items-center justify-center md:h-screen relative mx-auto  w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      <Suspense fallback={<CardSkeleton />}>
        <AuthWrapper />
      </Suspense>
      <div className="fixed bottom-4 right-4">
        <Link
          href={"authors/create"}
          className="btn rounded-full py-3 px-4 shadow-lg"
        >
          Add Author
        </Link>
      </div>
    </div>
  );
}
