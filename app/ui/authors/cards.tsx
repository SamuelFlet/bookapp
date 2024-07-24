import Link from "next/link";
import { fetchAuthors } from "@/app/lib/data";
import { lusitana } from "../fonts";

export default async function AuthWrapper() {
  const allAuthors = await fetchAuthors();

  return (
    <div className={`${lusitana.className} overflow-x-auto`}>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {allAuthors.map((authors, i) => {
            return (
              <tr key={authors.id}>
                <th>{i+1}</th>
                <td>
                  <Link href={`/authors/${authors.id}`} className="hover:underline">
                    {authors.fullName}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
