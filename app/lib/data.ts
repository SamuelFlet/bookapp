import { db } from "@/utils/db";

export async function fetchBooks() {
  try {
    const books = await db
      .selectFrom("book")
      .innerJoin("author", "author.id", "book.authorId")
      .select([
        "author.fullName as full_name",
        "book.img",
        "book.id",
        "book.title",
      ])
      .execute();
    return books;
  } catch (err) {
    console.log("Database Error:", err);
    throw new Error("Failed to fetch all books");
  }
}
