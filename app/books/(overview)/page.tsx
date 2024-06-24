import BookWrapper from "@/app/ui/books/cards";
import { CardSkeleton } from "@/app/ui/skeletons";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
};

export default async function Page() {
  return (
    <main>
      <Suspense fallback={<CardSkeleton />}>
        <BookWrapper />
      </Suspense>
    </main>
  );
}
