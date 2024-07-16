import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-200"
      >
        VapeLore
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}

export default TopNav;
