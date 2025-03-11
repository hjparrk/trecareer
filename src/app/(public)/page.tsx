import { signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return (
    <div>
      <h1>Home</h1>
      {user && <Button onClick={signOut}>Sign Out</Button>}
    </div>
  );
}
