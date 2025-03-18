"use client";

import { useState, useTransition } from "react";
import { createApplication } from "@/actions/tracker.action";
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
import { Application, ApplicationStatusKey } from "@/types/application.types";

export function AddApplicationButton({
  trackerId,
  onAddApplication,
}: {
  trackerId: string;
  onAddApplication: (newApplications: Application[]) => void;
}) {
  const [formData, setFormData] = useState<{
    trackerId: string;
    company: string;
    position: string;
    status: ApplicationStatusKey;
  }>({
    trackerId,
    company: "",
    position: "",
    status: "InProgress",
  });

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false); // 상태로 Sheet 열림/닫힘 관리

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: "status", value: ApplicationStatusKey) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        // 서버에 데이터 추가 요청
        const newApplication = await createApplication(formData);

        // 상위 컴포넌트로 새 데이터 전달
        onAddApplication(newApplication);

        // 폼 데이터 초기화
        setFormData({
          trackerId,
          company: "",
          position: "",
          status: "NotStarted",
        });

        // 창 닫기
        setIsOpen(false);
      } catch (error) {
        console.error("Error adding application:", error);
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
            {/* Company */}
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
                value={formData.company}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {/* Position */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-left relative">
                <h1>Position</h1>
                <span className="absolute -top-2 right-3 text-red-800">•</span>
              </Label>
              <Input
                id="position"
                placeholder="SWE"
                required
                value={formData.position}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="" className="text-left relative">
                <h1>Status</h1>
                <span className="absolute -top-2 right-5.5 text-red-800">
                  •
                </span>
              </Label>
              <div className="col-span-3">
                <Select
                  required
                  onValueChange={(value) =>
                    handleSelectChange("status", value as ApplicationStatusKey)
                  }
                >
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
          </div>
          <SheetFooter className="p-4">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending} // 로딩 중일 때 버튼 비활성화
            >
              {isPending ? "Adding..." : "Add Application"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
