"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllApplications(trackerId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .select(
      "id, company, position, remote, location, status, applied_at, interview_at, expected_salary, resume_version, hiring_manager, contact, link, tracker_id"
    )
    .eq("tracker_id", trackerId);

  if (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }

  return data;
}
