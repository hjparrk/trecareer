import { signInWithGithub } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

function ProviderButton({
  signIn,
  provider,
  src,
}: {
  signIn: () => Promise<void>;
  provider: string;
  src: string;
}) {
  return (
    <Button
      onClick={signIn}
      asChild
      className="py-6 hover:cursor-pointer px-2 rounded-4xl"
    >
      <div>
        <Image
          src={src}
          alt={provider}
          width={0}
          height={0}
          className="w-8 h-8"
        />
        <h1 className="text-base">Sign in with {provider}</h1>
      </div>
    </Button>
  );
}

export const metadata: Metadata = {
  title: "Sign in to Trecareer",
  description: "Sign in to trecareer.",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-10">
      <header className="text-3xl sm:text-4xl font-semibold text-center">
        <h1>Welcome Back!</h1>
        <h1>Please Sign In.</h1>
      </header>
      <div className="flex flex-col gap-5">
        <ProviderButton
          signIn={signInWithGithub}
          provider="Google"
          src="/google.svg"
        />
        <ProviderButton
          signIn={signInWithGithub}
          provider="Github"
          src="/github.svg"
        />
      </div>
    </div>
  );
}
