import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { Nav } from "./ui/navigation";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
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
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <Nav />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
