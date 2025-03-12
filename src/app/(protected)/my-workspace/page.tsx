import Header from "@/components/workspace/header";
import TrackerList from "@/components/workspace/tracker-list";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 md:p-16 lg:p-20">
      {/* Header */}
      <Header />

      {/* Content */}
      <Suspense>
        <TrackerList />
      </Suspense>
    </div>
  );
}
