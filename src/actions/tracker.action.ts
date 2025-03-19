"use server";

import { Application, ApplicationStatusKey } from "@/types/application.types";
import { createClient } from "@/utils/supabase/server";

export async function getAllApplications(
  trackerId: string,
  pageIndex?: number
): Promise<{ data: Application[]; totalRows: number }> {
  const supabase = await createClient();

  const pageSize = 5;
  const from = pageIndex ? pageIndex * pageSize : 0;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("applications")
    .select(
      "id, company, position, remote, location, status, applied_at, interview_at, expected_salary, resume_version, hiring_manager, contact, link, tracker_id",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .eq("tracker_id", trackerId)
    .range(from, to);

  if (error) {
    console.error("Error fetching data:", error.message);
    return { data: [], totalRows: 0 };
  }

  return { data, totalRows: count || 0 } as {
    data: Application[];
    totalRows: number;
  };
}

export async function createApplication({
  trackerId,
  company,
  position,
  status,
}: {
  trackerId: string;
  company: string;
  position: string;
  status: ApplicationStatusKey;
}): Promise<Application[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .insert({
      tracker_id: trackerId,
      company: company,
      position: position,
      status: status,
    })
    .select(
      "id, company, position, remote, location, status, applied_at, interview_at, expected_salary, resume_version, hiring_manager, contact, link, tracker_id"
    );

  if (error) {
    console.log(error.message);
    return [];
  }

  return data as Application[];
}

export async function updateApplication({
  trackerId,
  rowId,
  columnId,
  value,
}: {
  trackerId: string;
  rowId: string;
  columnId: string;
  value: string | number | null;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("applications")
    .update({
      [columnId]: value,
    })
    .eq("id", rowId)
    .eq("tracker_id", trackerId);

  if (error) {
    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }

  return {
    success: true,
  };
}
