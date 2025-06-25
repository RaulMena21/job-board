import { db } from "@/drizzle/db"
import { jobListingApplicationTable } from "@/drizzle/schema"
import { revalidateJobListingApplicationCache } from "./cache/jobListingApplications"
import { and, eq } from "drizzle-orm"

export async function insertJobListingApplication(
  application: typeof jobListingApplicationTable.$inferInsert
) {
  await db.insert(jobListingApplicationTable).values(application)

  revalidateJobListingApplicationCache(application)
}

export async function updateJobListingApplication(
  {
    jobListingId,
    userId,
  }: {
    jobListingId: string
    userId: string
  },
  data: Partial<typeof jobListingApplicationTable.$inferInsert>
) {
  await db
    .update(jobListingApplicationTable)
    .set(data)
    .where(
      and(
        eq(jobListingApplicationTable.jobListingId, jobListingId),
        eq(jobListingApplicationTable.userId, userId)
      )
    )

  revalidateJobListingApplicationCache({ jobListingId, userId })
}