import { ApplicationStatus } from "@/drizzle/schema"

export function formatJobListingApplicationStage(stage: ApplicationStatus) {
  switch (stage) {
    case "applied":
      return "Applied"
    case "interested":
      return "Interested"
    case "rejected":
      return "Rejected"
    case "interviewing":
      return "Interviewing"
    case "hired":
      return "Hired"
    default:
      throw new Error(`Unknown application stage: ${stage satisfies never}`)
  }
}