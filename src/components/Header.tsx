"use client";

import { UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";
import { HeartIcon } from "@/components/icons/heart";
import { SearchIcon } from "@/components/icons/search";
import { SmileyIcon } from "@/components/icons/smiley";

export default function Header() {
  const user = useUser();
  return (
    <header className="sticky top-0 left-0 w-full py-3 bg-white">
      <div className="flex w-full px-6 items-center justify-between">
        <Link href="/" className="font-logo">
          Recipes
        </Link>
        <nav className="flex gap-4 items-center">
          <button type="button" className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
            <SearchIcon/>
            Search
          </button>
          {user ? (
            <>
              <Link href="/profile" className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <HeartIcon/>
                My Recipes
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/handler/sign-up" className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <HeartIcon/>
                My Recipes
              </Link>
              <Link href="/handler/sign-in" className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <SmileyIcon/>
                Log In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
