import { signInWithGithub } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <Button onClick={signInWithGithub}>Sign in with Github</Button>
    </div>
  );
}
