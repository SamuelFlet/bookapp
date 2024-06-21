import Form from "@/app/ui/books/create-form";
import Breadcrumbs from "@/app/ui/books/breadcrumbs";
import { fetchAuthors } from "@/app/lib/data";

export default async function Page() {
  const authors = await fetchAuthors();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: "/books" },
          {
            label: "Add book",
            href: "/books/create",
            active: true,
          },
        ]}
      />
      <Form authors={authors} />
    </main>
  );
}
