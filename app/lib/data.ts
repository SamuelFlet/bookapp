import { sql } from "@vercel/postgres";
import { BookAuthorName } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchBooks() {
  noStore();
  try {
    const data = await sql<BookAuthorName>`select
      author.name,
      book.title,
      book.publish_year,
      book.lang,
      book.id,
      book.img
      from
      author left join book on book.authorid = author.id
    `;
    const books = data.rows;
    return books;
  } catch (err) {
    console.error("Database error", err);
    throw new Error("Failed to fetch all books");
  }
}
