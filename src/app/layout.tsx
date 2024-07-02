import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata = {
  title: "VapeLore",
  description: "Vape Stuff info",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-200"
      >
        VapeLore
      </Link>
    </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-gray-950 text-white">
        <TopNav />
        {children}</body>
    </html>
  );
}
