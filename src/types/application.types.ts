export enum Remote {
  OnSite = "On Site",
  Hybrid = "Hybrid",
  Remote = "Remote",
}

export enum ApplicationStatus {
  NotStarted = "Not Started", // 아직 지원 준비를 시작하지 않은 상태
  InProgress = "In Progress", // 지원 준비가 진행 중인 상태
  Withdrawed = "Withdrawed", // 지원 철회 상태

  Applied = "Applied", // 지원서를 제출한 상태
  Screening = "Screening", // 서류 심사 중인 상태

  AwaitingInterview = "Awaiting Interview", // 면접 대기 중인 상태
  InterviewScheduled = "Interview Scheduled", // 면접 일정이 확정된 상태
  InterviewCompleted = "Interview Completed", // 면접이 완료된 상태

  Offered = "Offered", // 회사에서 제안을 받은 상태
  Accepted = "Accepted", // 제안을 수락한 상태
  Rejected = "Rejected", // 불합격 상태
  OnHold = "OnHold", // 보류 중인 상태
}

export type ApplicationStatusKey = keyof typeof ApplicationStatus;

export const ApplicationStatusColor: Record<ApplicationStatusKey, string> = {
  NotStarted: "bg-status-gray/70", // 아직 지원 준비를 시작하지 않은 상태
  InProgress: "bg-status-gray/70", // 지원 준비가 진행 중인 상태
  Withdrawed: "bg-status-gray/70", // 지원 철회 상태

  Applied: "bg-status-blue/70", // 지원서를 제출한 상태
  Screening: "bg-status-yellow/70", // 서류 심사 중인 상태

  AwaitingInterview: "bg-status-yellow/70", // 면접 대기 중인 상태
  InterviewScheduled: "bg-status-yellow/70", // 면접 일정이 확정된 상태
  InterviewCompleted: "bg-status-yellow/70", // 면접이 완료된 상태

  Rejected: "bg-status-rose/70", // 불합격 상태

  OnHold: "bg-status-orange/70", // 보류 중인 상태

  Offered: "bg-status-green/70", // 회사에서 제안을 받은 상태
  Accepted: "bg-status-darkgreen/70", // 제안을 수락한 상태
};

export type Application = {
  id: string;
  company: string;
  position: string;
  remote?: Remote;
  location?: string;
  status: ApplicationStatusKey;
  applied_at?: string;
  interview_at?: string;
  expected_salary?: number;
  resume_version?: string;
  hiring_manager?: string;
  contact?: string;
  link?: string;
  tracker_id: string;
};
