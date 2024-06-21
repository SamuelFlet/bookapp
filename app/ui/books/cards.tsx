import { lusitana } from "@/app/ui/fonts";
import { fetchBooks } from "@/app/lib/data";
import clsx from "clsx";

export default async function BookWrapper() {
  const allBooks = await fetchBooks();

  return (
    <div className="flex w-full flex-col md:col-span-4 p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        All Books
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {allBooks.map((book, i) => {
          return (
            <div key={book.id} className={" justify-between p-4 max-w-xl"}>
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="object-scale-down h-60"
                    src={book.img!}
                    alt="Album"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <p>{book.author.fullName}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Listen</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
