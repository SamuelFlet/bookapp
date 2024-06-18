import { Nav } from "@/app/ui/books/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {" "}
      <Nav />
      <div className="">{children}</div>
    </>
  );
}