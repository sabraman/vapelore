"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import Logo from "./logo";
import { User } from "lucide-react";
function TopNav() {
  const router = useRouter();
  return (
    <nav className="max-h-26 flex w-full items-center justify-between p-4">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-200"
      >
        <Logo />
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div className="flex items-center justify-end gap-4">
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => router.refresh()}
          />
          <Link href="/myPosts">
            <User />
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
