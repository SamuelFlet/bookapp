import Breadcrumbs from "@/app/ui/books/breadcrumbs";
import CreateAuthor from "@/app/ui/authors/create-author";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Authors", href: "/authors" },
          {
            label: "Add author",
            href: "/authors/create",
            active: true,
          },
        ]}
      />
      <CreateAuthor />
    </main>
  );
}
