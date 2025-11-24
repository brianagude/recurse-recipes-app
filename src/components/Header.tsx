"use client";

import { UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";

export default function Header() {
  const user = useUser();
  return (
    <header className="sticky top-0 left-0 w-full py-3">
      <div className="flex w-full px-4 items-center justify-between">
        <Link href="/">Recipes</Link>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/profile">My Recipes</Link>
              <UserButton />
            </>
          ) : (
            <Link href="/handler/sign-up">Log In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
