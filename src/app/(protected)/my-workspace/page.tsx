import CreateTrackerButton from "@/components/workspace/create-tracker.button";

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      <div className="flex space-x-5 items-baseline justify-between">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          My Workspace
        </h1>
        <CreateTrackerButton />
      </div>
    </div>
  );
}
