import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";

import { GeistSans } from "geist/font/sans";
import TopNav from "./_components/topnav";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "~/components/ui/sonner";
import { Suspense } from "react";
import Metrika from "~/components/metrika";

export const metadata = {
  title: "VapeLore",
  description: "Vape Stuff info",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="ru" className={`${GeistSans.variable} dark`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body className="bg-gray-950 text-white">
          <div className="grid h-screen grid-rows-[auto,1fr]">
            <TopNav />
            <main className="overflow-y-auto">{children}</main>
          </div>
          {modal}
          <div id="modal-root" />
          <Toaster />
          <Suspense>
            <Metrika />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
