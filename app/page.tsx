import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center px-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl">
          Welcome to Samuel's BookApp, the place to log your library and
          favourite quotes from all the fantastic literature out there!
        </h1>
        <div className="my-5">
          <Link href="/books" className="btn mr-6">
            See All Books
          </Link>
          <Link href="https://github.com/SamuelFlet/bookapp" className="btn">
            See The Code
          </Link>
        </div>
      </div>
    </main>
  );
}
