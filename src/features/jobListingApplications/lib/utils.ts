import { ApplicationStatus } from "@/drizzle/schema"

export function sortApplicationsByStage(
  a: ApplicationStatus,
  b: ApplicationStatus
): number {
  return APPLICATION_STAGE_SORT_ORDER[a] - APPLICATION_STAGE_SORT_ORDER[b]
}

const APPLICATION_STAGE_SORT_ORDER: Record<ApplicationStatus, number> = {
  applied: 0,
  interested: 1,
  interviewing: 2,
  hired: 3,
  rejected: 4,
}