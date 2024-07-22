import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";

import { GeistSans } from "geist/font/sans";
import TopNav from "./_components/topnav";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export const metadata = {
  title: "VapeLore",
  description: "Vape Stuff info",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="ru" className={`${GeistSans.variable}`}>
      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body className="bg-gray-950 text-white">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
