import { BookOpenIcon } from "@heroicons/react/24/solid";
import { lusitana } from "@/app/ui/fonts";

export default function BookappLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none flex-1 px-2 mx-2`}
    >
      <BookOpenIcon className="h-12 w-12" />
      <p className="text-3xl">BookApp</p>
    </div>
  );
}
