import CreateTrackerButton from "./create-tracker.button";

export default function Header() {
  return (
    <div className="flex items-baseline justify-between">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
        My Workspace
      </h1>
      <CreateTrackerButton />
    </div>
  );
}
