import BookWrapper from "@/app/ui/books/cards";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Books",
};

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
        <BookWrapper />
      </Suspense>
      <div className="fixed bottom-4 right-4">
        <Link href={"books/create"} className="btn rounded-full py-3 px-4 shadow-lg">
          Add Book
        </Link>
      </div>
    </div>
  );
}
