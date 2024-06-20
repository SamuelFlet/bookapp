import { signOut, auth } from "@/auth";
import Link from "next/link";

export async function SignIn() {
  const session = await auth();
  if (session?.user)
    return (
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Signout</button>
      </form>
    );
  return <Link href="/login">Log In</Link>;
}
