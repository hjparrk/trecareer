"use server";

import { APIResponse } from "@/types/api.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllTrackers() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("trackers")
    .select("id, title, description, created_at, updated_at");

  return data;
}

export async function createTracker({
  title,
  description,
}: {
  title: string;
  description?: string;
}): Promise<APIResponse<null>> {
  const supabase = await createClient();
  const { error } = await supabase.from("trackers").insert({
    title: title,
    description: description,
  });

  if (error) {
    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }

  revalidatePath("/my-workspace");
  return {
    success: true,
  };
}
