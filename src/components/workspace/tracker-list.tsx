import { getAllTrackers } from "@/actions/workspace.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TrackerOptionButton from "./tracker-option.button";

export default async function TrackerList() {
  const trackers = await getAllTrackers();

  return trackers?.length !== 0 ? (
    <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
      {trackers?.map((tracker) => (
        <Card
          key={`tracker-${tracker.id}`}
          className="relative min-w-2xs max-w-sm hover:cursor-pointer hover:shadow-lg  transition-all duration-300"
        >
          <div className="absolute top-2 right-2">
            <TrackerOptionButton />
          </div>
          <CardHeader>
            <CardTitle>{tracker.title}</CardTitle>
            <CardDescription>
              {tracker.description ? tracker.description : <p>&nbsp;</p>}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs">
            <p>{tracker.created_at}</p>
            <p>{tracker.updated_at}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <div>NO TRACKERS YET</div>
  );
}
