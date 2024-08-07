import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { lusitana } from "@/app/ui/fonts";
import { signOut, auth } from "@/auth";
import { PowerIcon, UserIcon } from "@heroicons/react/24/outline";

export async function Nav() {
  const session = await auth();
  function AuthButtons() {
    if (session?.user) {
      return (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex items-center">
            <PowerIcon className="w-5 mr-2" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      );
    } else {
      return (
        <div>
          <UserIcon className="w-5" />
          <Link href="/login" className="">
            Sign In
          </Link>
        </div>
      );
    }
  }

  return (
    <div className={`${lusitana.className} drawer`}>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className={`${lusitana.className} flex-1 px-2 mx-2`}>
            <Link href={"/"}>
              <div className="flex flex-row items-center">
                <BookOpenIcon className="h-12 w-12" />
                <p className="text-3xl">BookApp</p>
              </div>
            </Link>
          </div>

          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}

              <li>
                <AuthButtons />
              </li>
              <li>
                <Link href="/books">View Books</Link>
              </li>
              <li>
                <Link href="/authors">View Authors</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
                <AuthButtons />
              </li>
              <li>
                <Link href="/books">View Books</Link>
              </li>
              <li>
                <Link href="/authors">View Authors</Link>
              </li>
        </ul>
      </div>
    </div>
  );
}
