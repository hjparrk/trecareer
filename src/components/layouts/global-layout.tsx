"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { signOut } from "@/actions/auth.action";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 left-0 py-3 px-4 sm:px-16 border-b z-1 bg-white border-black/10 flex items-center justify-between">
        <Link
          href={`${user ? "/my-workspace" : "/"}`}
          className="flex space-x-2 items-center text-lg font-extrabold tracking-tighter hover:cursor-pointer"
        >
          <Image
            src={"./logo.svg"}
            alt="logo"
            width={0}
            height={0}
            className="h-10 w-10"
          />
          <span>TRACAREER</span>
        </Link>
        <div>
          {user ? (
            <Button onClick={signOut}>SIGN OUT</Button>
          ) : (
            <Button asChild>
              <Link href="/sign-in">SIGN IN</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-grow ">{children}</main>

      {/* Footer */}
      <div className="py-2 bg-gray-100 text-center mt-auto">
        <h1>All rights reserved. © 2025 Harry Park </h1>
      </div>
    </div>
  );
}
