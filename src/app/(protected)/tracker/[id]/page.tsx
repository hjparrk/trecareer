import { getAllApplications } from "@/actions/tracker.action";
import TrackingTable from "@/components/tracker/tracking-table";
import { Application } from "@/types/application.types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: trackerId } = await params;
  const applications = (await getAllApplications(trackerId)) as Application[];

  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Applications
        </h1>
      </div>
      <TrackingTable data={applications} />
    </div>
  );
}
