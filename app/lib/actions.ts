// "use server";

// import { z } from "zod";
// import { sql } from "@vercel/postgres";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export type State = {
//   errors?: {
//     authorId?: string[];
//     title?: string[];
//     pubYear?: string[];
//     lang?: string[];
//     img?: string[];
//   };
//   message?: string | null;
// };

// const FormSchema = z.object({
//   id: z.string(),
//   authorId: z.string({ invalid_type_error: "Please select an author" }),
//   title: z.string(),
//   pubYear: z.string({ invalid_type_error: "Please select a year" }),
//   lang: z.string({ invalid_type_error: "enter a valid language" }),
//   img: z.string({ invalid_type_error: "enter valid url" }),
// });

// const CreateBook = FormSchema.omit({ id: true });

// export async function createBook(prevState: State, formData: FormData) {
//   const validatedFields = CreateBook.safeParse({
//     authorId: formData.get("authorId"),
//     title: formData.get("title"),
//     pubYear: formData.get("pubYear"),
//     lang: formData.get("lang"),
//     img: formData.get("img"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }

//   const { authorId, title, pubYear, lang, img } = validatedFields.data;

//   try {
//     await sql`
//     INSERT INTO book (authorid, title, publish_year, lang, img)
//     VALUES (${authorId}, ${title}, ${pubYear}, ${lang}, ${img})
//     `;
//   } catch (error) {
//     return {
//       message: "Database error: failed to create book",
//     };
//   }

//   revalidatePath("/books");
//   redirect("/books");
// }
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "../db/schema";
import { db } from "../db";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createUserProfile(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  const names = formData.get("name") as string;
  await db.insert(UserProfile).values({
    user_id: user.id,
    fullName: names
  });
  redirect("/");
}