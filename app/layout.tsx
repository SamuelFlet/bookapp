import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { Nav } from "@/app/ui/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Bookapp Dashboard",
    default: "Bookapp Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
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
