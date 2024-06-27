import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { Nav } from "@/app/ui/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Bookapp",
    default: "Bookapp",
  },
  description: "Samuel's Bookapp to log books, quotes and authors",
  metadataBase: new URL("https://github.com/SamuelFlet"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header>
          <Nav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
