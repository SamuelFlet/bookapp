"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/utils/db";

/**
 * Defines the shape of the user state object, which includes optional error messages
 * for email, name, and password fields, as well as an optional message string.
 */
export type userState = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type bookState = {
  errors?: {
    author_id?: string[];
    img?: string[];
    title?: string[];
    pub_year?: string[];
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

const CreateUser = newUserSchema.omit({ id: true });

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
