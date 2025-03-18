import { getAllApplications } from "@/actions/tracker.action";
import TrackingTable from "@/components/tracker/tracking-table";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: trackerId } = await params;
  const { data, totalRows } = await getAllApplications(trackerId);

  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Applications
        </h1>
      </div>
      <TrackingTable
        trackerId={trackerId}
        initialData={data}
        initalTotalRows={totalRows}
      />
    </div>
  );
}
