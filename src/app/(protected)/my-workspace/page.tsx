import CreateTrackerButton from "@/components/workspace/create-tracker.button";
import TrackerList from "@/components/workspace/tracker-list";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          My Workspace
        </h1>
        <CreateTrackerButton />
      </div>

      {/* Content */}
      <Suspense>
        <TrackerList />
      </Suspense>
    </div>
  );
}
