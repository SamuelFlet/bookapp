import Link from "next/link";
import { fetchAuthors } from "@/app/lib/data";
import { lusitana } from "../fonts";

export default async function AuthWrapper() {
  const allAuthors = await fetchAuthors();

  return (
    <div className={`${lusitana.className} overflow-x-auto`}>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allAuthors.map((authors, i) => {
            return (
              <tr key={authors.id}>
                <th>{authors.id}</th>
                <td>
                  <Link href={`/authors/${authors.id}`}>
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
