import { lusitana } from "@/app/ui/fonts";
import { fetchBooks } from "@/app/lib/data";
import clsx from "clsx";

export default async function BookWrapper() {
  const allBooks = await fetchBooks();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        All Books
      </h2>
      <div className="bg-white px-6">
        {allBooks.map((book, i) => {
          return (
            <div
              key={book.id}
              className={clsx(
                "flex flex-row items-center justify-between py-4",
                {
                  "border-t": i !== 0,
                }
              )}
            >
              <div className="flex flex-col items-center">
                <h1>{book.name}</h1>
                <h1>{book.title}</h1>
                <h1>{book.publish_year}</h1>
                <h1>{book.lang}</h1>
                <h1>{book.media_type}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
