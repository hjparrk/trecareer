import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AddApplicationButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Application</Button>
      </SheetTrigger>
      <SheetContent side="right" className="min-w-[375px]">
        <div className="max-w-2xl mx-auto">
          <SheetHeader className="p-4">
            <SheetTitle>New Application</SheetTitle>
            <SheetDescription>
              Fill details of your new application. Click add when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 p-4 max-h-3/5 overflow-auto">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-left relative">
                <h1>Company</h1>
                <span className="absolute -top-2 right-0.5 text-red-800">
                  •
                </span>
              </Label>
              <Input
                id="company"
                placeholder="Company name"
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-left relative">
                <h1>Position</h1>
                <span className="absolute -top-2 right-3 text-red-800">•</span>
              </Label>
              <Input
                id="position"
                placeholder="SWE"
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="" className="text-left">
                Remote
              </Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="OnSite">On Site</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-left">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Surry Hills, NSW"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="" className="text-left relative">
                <h1>Status</h1>
                <span className="absolute -top-2 right-5.5 text-red-800">
                  •
                </span>
              </Label>
              <div className="col-span-3">
                <Select required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select application status" />
                  </SelectTrigger>
                  <SelectContent className="max-h-52">
                    <SelectGroup>
                      <SelectItem value="NotStarted">Not Started</SelectItem>
                      <SelectItem value="InProgress">In Progress</SelectItem>
                      <SelectItem value="Withdrawed">Withdrawed</SelectItem>
                      <SelectSeparator />
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Screening">Screening</SelectItem>
                      <SelectSeparator />
                      <SelectItem value="AwaitingInterview">
                        Awaiting Interview
                      </SelectItem>
                      <SelectItem value="InterviewScheduled">
                        Interview Scheduled
                      </SelectItem>
                      <SelectItem value="InterviewCompleted">
                        Interview Completed
                      </SelectItem>
                      <SelectSeparator />
                      <SelectItem value="Offered">Offered</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="OnHold">On Hold</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="applied_at" className="text-left">
                Application Date
              </Label>
              <Input id="applied_at" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="interview_at" className="text-left">
                Interview Date
              </Label>
              <Input
                id="interview_at"
                type="datetime-local"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expected_salary" className="text-left">
                Exp. Salary
              </Label>
              <Input
                id="expected_salary"
                type="number"
                min={0}
                placeholder="80000"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume_version" className="text-left">
                Resume Version
              </Label>
              <Input
                id="resume_version"
                placeholder="your-resume-v1.pdf"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hiring_manager" className="text-left">
                Hiring Manager
              </Label>
              <Input
                id="hiring_manager"
                placeholder="John Stravakakis"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-left">
                Contact
              </Label>
              <Input
                id="contact"
                placeholder="email / mobile"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-left">
                Link
              </Label>
              <Input
                id="link"
                placeholder="www.your-job-link.com"
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter className="p-4">
            <SheetClose asChild>
              <Button type="submit">Add application</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
