import Form from "@/app/ui/books/create-form";
import Breadcrumbs from "@/app/ui/books/breadcrumbs";
import { fetchAuthors } from "@/app/lib/data";

export default async function Page() {
  const authors = await fetchAuthors();

  return (
    <div>
      <div className="p-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: "All Books", href: "/books" },
            {
              label: "Add book",
              href: "/books/create",
              active: true,
            },
          ]}
        />
      </div>
      <div className="flex flex-col items-center">
        <Form authors={authors} />
      </div>
    </div>
  );
}
