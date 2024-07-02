"use server";

import { AuthError } from "next-auth";
import { db } from "@/utils/db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";
import { z } from "zod";

/**
 * Represents the state of a user, including potential errors and messages.
 * @typedef {Object} userState
 * @property {Object} errors - Object containing potential errors with specific fields.
 * @property {string[]} errors.email - Array of error messages related to the email field.
 * @property {string[]} errors.name - Array of error messages related to the name field.
 * @property {string[]} errors.password - Array of error messages related to the password field.
 * @property {string | null} message - A message related to the user state.
 */
export type userState = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

/**
 * Defines the shape of the author state object, which may contain errors and a message.
 * @typedef {Object} authorState
 * @property {Object} errors - Object containing error messages.
 * @property {string[]} errors.fullName - Array of error messages related to the full name.
 * @property {string | null} message - A message related to the author state.
 */
export type authorState = {
  errors?: {
    fullName?: string[];
  };
  message?: string | null;
};

/**
 * Represents the state of a book with optional error messages and a message string.
 * @typedef {Object} bookState
 * @property {Object} errors - Optional object containing error messages for author_id, img, title, and pub_year.
 * @property {string | null} message - Optional message string.
 */
export type bookState = {
  errors?: {
    authorId?: string[];
    img?: string[];
    title?: string[];
    pubYear?: string[];
  };
  message?: string | null;
};

/**
 * Defines a new user schema using the zod library.
 * @returns {z.ZodObject} A zod object schema for a new user with id, email, name, and password fields.
 */
const newUserSchema = z.object({
  id: z.number(),
  email: z.string({
    invalid_type_error: "Please enter a valid email",
  }),
  name: z.string({
    invalid_type_error: "Please enter a name",
  }),
  password: z.string({
    invalid_type_error: "Please enter a valid password",
  }),
});

const newBookSchema = z.object({
  id: z.number(),
  authorId: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  title: z.string({
    invalid_type_error: "Please enter a valid title",
  }),
  pubYear: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  img: z.string({
    invalid_type_error: "Please enter a valid image url",
  }),
});

/**
 * Defines a new author schema using the zod library.
 * @returns {z.ZodObject} A zod object schema for author with id as number and fullName as string.
 */
const newAuthorSchema = z.object({
  id: z.number(),
  fullName: z.string({
    invalid_type_error: "Please enter a string",
  }),
});

const CreateUser = newUserSchema.omit({ id: true });
const CreateAuthor = newAuthorSchema.omit({ id: true });
const CreateBook = newBookSchema.omit({ id: true });

export async function createBook(prevState: bookState, formData: FormData) {
  const validatedFields = CreateBook.safeParse({
    authorId: Number(formData.get("authorId")),
    title: formData.get("title"),
    pubYear: Number(formData.get("pubYear")),
    img: formData.get("img"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Book",
    };
  }

  const { authorId, title, pubYear, img } = validatedFields.data;

  try {
    await db
      .insertInto("book")
      .values([
        {
          authorId: authorId,
          title: title,
          pubYear: pubYear,
          img: img,
        },
      ])
      .execute();
  } catch (error) {
    console.log(authorId,title,pubYear,img)
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Book.",
    };
  }
  revalidatePath("/books");
  redirect("/books");
}

/**
 * Creates a new user with the provided form data.
 * @param {userState} prevState - The previous state of the user.
 * @param {FormData} formData - The form data containing user information.
 * @returns An object with errors and a message if user creation fails, otherwise redirects to the login page.
 */
export async function createUser(prevState: userState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await hash(password, 10);

  try {
    await db
      .insertInto("users")
      .values([
        {
          email: email,
          name: name,
          password: hashedPassword,
        },
      ])
      .execute();
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create User.",
    };
  }
  revalidatePath("/login");
  redirect("/login");
}

/**
 * Creates a new author in the database using the provided form data.
 * @param {authorState} prevState - The previous state of the author.
 * @param {FormData} formData - The form data containing the author's full name.
 * @returns An object with errors and a message if creation fails, otherwise redirects to the authors page.
 */
export async function createAuthor(prevState: authorState, formData: FormData) {
  const validatedFields = CreateAuthor.safeParse({
    fullName: formData.get("fullName"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Author.",
    };
  }

  const { fullName } = validatedFields.data;

  try {
    await db
      .insertInto("author")
      .values([
        {
          fullName: fullName,
        },
      ])
      .execute();
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Author.",
    };
  }
  revalidatePath("/authors");
  redirect("/authors");
}

/**
 * Authenticates the user using the provided form data.
 * @param {string | undefined} prevState - The previous state of the authentication process.
 * @param {FormData} formData - The form data containing user credentials.
 * @returns {Promise<void>} A promise that resolves when the authentication is successful.
 * @throws {Error} If an error occurs during the authentication process.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  } finally {
    redirect("/books");
  }
}
