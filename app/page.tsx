import Image from "next/image";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col p-6 md:p-2">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg  px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl  md:text-3xl md:leading-normal`}
          >
            Welcome to Samuel's BookApp, the place to log your library and
            favourite quotes from all the fantastic literature out there!
          </p>
          <Link href="/books" className="btn">
            See All Books
          </Link>
          <Link href="https://github.com/SamuelFlet/bookapp" className="btn">
            See The Code
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/ScreenshotDesktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project desktop version"
          />
        </div>
      </div>
    </div>
  );
}
