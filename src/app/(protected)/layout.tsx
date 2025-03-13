import { signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 left-0 py-3 px-4 sm:px-16 border-b z-100 bg-white border-black/10 flex items-center justify-between">
        <Link
          href="/my-workspace"
          className="flex space-x-2 items-center text-lg font-extrabold tracking-tighter hover:cursor-pointer"
        >
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={0}
            height={0}
            className="h-10 w-10"
          />
          <span>TRECAREER</span>
        </Link>
        <Button
          onClick={signOut}
          variant="ghost"
          className="text-xs sm:text-sm"
        >
          SIGN OUT
        </Button>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}
