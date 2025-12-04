"use client";

import {
  ChefHatIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttons } from "@/styles/design-tokens";

export default function Header() {
  const user = useUser();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 w-full py-3 bg-white z-50">
      <div className="flex w-full px-6 items-center justify-between">
        <Link href="/" className="font-display text-3xl">
          bite sized
        </Link>
        
        <nav className="flex gap-4 items-center">
          <button type="button" className={buttons.textIcon}>
            <MagnifyingGlassIcon size={24} />
            Search
          </button>
          <Link href="/profile" className={buttons.textIcon}>
            {pathname === '/profile' ? <HeartIcon size={24} weight="fill" /> : <HeartIcon size={24} />}
            My Recipes
          </Link>
          <Link href="/" className={buttons.textIcon}>
            {pathname === '/' ? <ChefHatIcon size={24} weight="fill" /> : <ChefHatIcon size={24} />}
            All Recipes
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
