import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";

import { GeistSans } from "geist/font/sans";
import TopNav from "./_components/topnav";

export const metadata = {
  title: "VapeLore",
  description: "Vape Stuff info",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="ru" className={`${GeistSans.variable}`}>
        <body className="bg-gray-950 text-white">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
