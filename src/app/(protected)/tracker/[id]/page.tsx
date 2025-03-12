import { ApplicationsTable } from "@/components/tracker/applications-table";

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
        Applications
      </h1>
      <ApplicationsTable />
    </div>
  );
}
