import { signOut } from "@/actions/auth.action";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      {user ? (
        <Button onClick={signOut}>SIGN OUT</Button>
      ) : (
        <Button asChild>
          <Link href="/sign-in">SIGN IN</Link>
        </Button>
      )}
    </div>
  );
}
