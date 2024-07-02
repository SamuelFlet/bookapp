import { db } from "@/utils/db";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchBooks() {
  noStore();
  try {
    const books = await db
      .selectFrom("book")
      .innerJoin("author", "author.id", "book.authorId")
      .select([
        "author.fullName",
        "book.img",
        "book.id",
        "book.authorId",
        "book.title",
      ])
      .execute();
    return books;
  } catch (err) {
    console.log("Database Error:", err);
    throw new Error("Failed to fetch all books");
  }
}

export async function fetchAuthorByIdWithBooks(id: number) {
  noStore();
  try {
    const data = await db
      .selectFrom("author")
      .innerJoin("book", "book.authorId", "author.id")
      .selectAll()
      .where("author.id", "=", id)
      .execute();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch author.");
  }
}

export async function fetchAuthorById(id: number) {
  noStore();
  try {
    const data = await db
      .selectFrom("author")
      .selectAll()
      .where("author.id", "=", id)
      .executeTakeFirst();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch author.");
  }
}

export async function fetchAuthors() {
  noStore();
  try {
    const data = await db.selectFrom("author").selectAll().execute();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch authors.");
  }
}
