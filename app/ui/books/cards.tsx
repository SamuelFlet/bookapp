import { lusitana } from "@/app/ui/fonts";
import { fetchBooks } from "@/app/lib/data";
import { fetchFilteredBooks } from "@/app/lib/data";
import Link from "next/link";
import Search from "../search";
import clsx from "clsx";

export default async function BookWrapper({query}:{query:string}) {
  const allBooks = await fetchFilteredBooks(query)
  return (
    <div className="flex w-full flex-col md:col-span-4 p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        All Books
      </h1>
      <Search placeholder="Search customers..." />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {allBooks.map((book, i) => {
          return (
            <div key={book.id} className={" justify-between p-4 max-w-xl"}>
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="">
                  <img className="h-48" src={book.img!} alt={`${book.title} by ${book.fullName}, cover art`} />
                </figure>
                <div className="card-body">
                  <h2 className="line-clamp-1 card-title w-60">{book.title}</h2>
                  <Link className="" href={`/authors/${book.authorId}`}>
                    {book.fullName}
                  </Link>
                  <Link href="" className="btn btn-primary w-20">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
