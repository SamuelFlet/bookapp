import { signIn } from "@/auth";

export default function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/books" });
      }}
    >
      <button className="btn" type="submit">
        Signin with GitHub
      </button>
    </form>
  );
}
