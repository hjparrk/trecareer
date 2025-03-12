import { getAllTrackers } from "@/actions/workspace.action";
import TrackerItem from "./tracker-item";
import { redirect } from "next/dist/server/api-utils";

export default async function TrackerList() {
  const trackers = await getAllTrackers();

  const isTrackersExisting = trackers?.length !== 0;
  return isTrackersExisting ? (
    <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
      {trackers?.map((tracker) => (
        <TrackerItem key={`tracker-${tracker.id}`} tracker={tracker} />
      ))}
    </div>
  ) : (
    <div className="mt-6 sm:mt-10 text-base sm:text-xl">
      <p>Your workspace is empty, please create a new tracker.</p>
    </div>
  );
}
