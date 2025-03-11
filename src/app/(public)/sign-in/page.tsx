import { signInWithGithub } from "@/actions/auth.action";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="h-full flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold tracking-tighter">
          Welcome back! Please sign in.
        </h1>

        <div className="flex flex-col gap-4">
          <button className="flex gap-2 items-center border border-gray-800/20 bg-white rounded-3xl p-2 hover:cursor-pointer">
            <Image
              src={"/google-mark.svg"}
              alt="google"
              width={0}
              height={0}
              className="h-8 w-8"
            />
            <span className="text-lg font-medium">Sign in with Google</span>
          </button>
          <button
            onClick={signInWithGithub}
            className="flex gap-2 items-center border border-gray-800 bg-gray-800 text-white rounded-3xl p-2 hover:cursor-pointer"
          >
            <Image
              src={"/github-mark.svg"}
              alt="github"
              width={0}
              height={0}
              className="h-8 w-8"
            />
            <span className="text-lg font-medium">Sign in with Github</span>
          </button>
        </div>
      </div>
    </div>
  );
}
