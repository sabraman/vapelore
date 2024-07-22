"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import Logo from "./logo";

function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between p-4 max-h-26">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-200"
      >
        <Logo />
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UploadButton endpoint="imageUploader" onClientUploadComplete={() => router.refresh()} />
        <UserButton />
      </SignedIn>
    </nav>
  );
}

export default TopNav;
