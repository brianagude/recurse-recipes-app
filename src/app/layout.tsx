import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { Bagel_Fat_One, Figtree } from "next/font/google";
import { Suspense } from "react";
import Header from "@/components/Header";
import { stackClientApp } from "../stack/client";
import "./globals.css";

const bagelFat = Bagel_Fat_One({
  variable: "--font-bagel-fat-one",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const figtree = Figtree({
  variable: "--font-figtree",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bite Sized Recipe App",
  description: "A recipe blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bagelFat.variable} ${figtree.variable} antialiased`}
    >
      <body>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense>
              <Header />
              {children}
            </Suspense>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
