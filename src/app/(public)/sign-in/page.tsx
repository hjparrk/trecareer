import { signInWithGithub } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-pink-50">
      <Button>Sign in with Google</Button>
      <Button onClick={signInWithGithub}>Sign in with Github</Button>
    </div>
  );
}
