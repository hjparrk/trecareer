import { signInWithGithub } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-10">
      <header className="text-3xl sm:text-4xl font-semibold text-center">
        <h1>Welcome Back!</h1>
        <h1>Please Sign In.</h1>
      </header>
      <div className="flex flex-col gap-5">
        <Button>Sign in with Google</Button>
        <Button onClick={signInWithGithub} asChild className="py-6">
          <div>
            <Image
              src="/github-mark.svg"
              alt="github mark"
              width={0}
              height={0}
              className="w-8 h-8"
            />
            <h1 className="text-base">Sign in with Github</h1>
          </div>
        </Button>
      </div>
    </div>
  );
}
