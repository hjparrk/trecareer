"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TrackerOptionButton from "./tracker-option.button";
import { formatDate } from "@/utils/format-date";
import { Database } from "@/types/database.types";
import { useRouter } from "next/navigation";

type TrackerData = Pick<
  Database["public"]["Tables"]["trackers"]["Row"],
  "id" | "title" | "description" | "created_at" | "updated_at"
>;

export default function TrackerItem({ tracker }: { tracker: TrackerData }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/tracker/${tracker.id}`)}
      className="relative min-w-2xs max-w-sm hover:cursor-pointer hover:shadow-lg  transition-all duration-300"
    >
      {/* Tracker Option Button */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2"
      >
        <TrackerOptionButton />
      </div>

      {/* Content */}
      <CardHeader>
        <CardTitle>{tracker.title}</CardTitle>
        <CardDescription>
          {tracker.description ? tracker.description : <p>&nbsp;</p>}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs">
        <p>Updated At {formatDate(tracker.created_at)}</p>
        <p>Created At {formatDate(tracker.created_at)}</p>
      </CardContent>
    </Card>
  );
}
