import { fetchAuthorByIdWithBooks } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: number };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const [author] = await Promise.all([fetchAuthorByIdWithBooks(id)]);


  return {
    title: author[0].fullName,
  };
}
export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [author] = await Promise.all([fetchAuthorByIdWithBooks(id)]);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <h1>{author[0].fullName}</h1>
      {author.map((book, i) => {
          return (
            <div key={book.id} className={" justify-between p-4 max-w-xl"}>
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="object-contain h-48"
                    src={book.img!}
                    alt="Album"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <p>{book.fullName}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Listen</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
     </main>
  )
}
