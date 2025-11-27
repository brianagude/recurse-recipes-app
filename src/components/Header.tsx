"use client";

import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";
import { buttons } from "@/styles/design-tokens";

export default function Header() {
  const user = useUser();
  return (
    <header className="sticky top-0 left-0 w-full py-3 bg-white">
      <div className="flex w-full px-6 items-center justify-between">
        <Link href="/" className="font-logo text-3xl">
          bite sized
        </Link>
        <nav className="flex gap-4 items-center">
          <button type="button" className={buttons.textIcon}>
            <MagnifyingGlassIcon size={24} />
            Search
          </button>
          <Link href="/profile" className={buttons.textIcon}>
            <HeartIcon size={24} />
            My Recipes
          </Link>
          {user ? (
            <UserButton />
          ) : (
            <Link href="/handler/sign-in" className={buttons.textIcon}>
              <UserCircleIcon size={24} />
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
