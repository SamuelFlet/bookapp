// import { sql } from "@vercel/postgres";
import { BookAuthorName, AuthorField } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../db";
import { currentUser } from "@clerk/nextjs/server";
import { authors } from "../db/schema";

export async function fetchBooks() {
  noStore();
  try {
    const data = await db.query.books.findMany({with:{author:true}})
    return data;
  } catch (err) {
    console.error("Database error", err);
    throw new Error("Failed to fetch all books");
  }
}

export async function fetchProfile(){
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  return(
    db.query.UserProfile.findFirst({where: (messages, { eq }) => eq(messages.user_id, user.id),})
  )
}

// export async function fetchAuthors() {
//   try {
//     const data = await sql<AuthorField>`
//       SELECT
//         id,
//         name
//       FROM author
//       ORDER BY name ASC
//     `;

//     const authors = data.rows;
//     return authors;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all authors.');
//   }
// }