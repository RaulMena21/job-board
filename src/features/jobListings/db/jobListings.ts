import { db } from "@/drizzle/db"
import { jobListingTable } from "@/drizzle/schema"
import { revalidateJobListingCache } from "./cache/jobListings"
import { eq } from "drizzle-orm"

export async function insertJobListing(
  jobListing: typeof jobListingTable.$inferInsert
) {
  const [newListing] = await db
    .insert(jobListingTable)
    .values(jobListing)
    .returning({
      id: jobListingTable.id,
      organizationId: jobListingTable.organizationId,
    })

  revalidateJobListingCache(newListing)

  return newListing
}

export async function updateJobListing(
  id: string,
  jobListing: Partial<typeof jobListingTable.$inferInsert>
) {
  const [updatedListing] = await db
    .update(jobListingTable)
    .set(jobListing)
    .where(eq(jobListingTable.id, id))
    .returning({
      id: jobListingTable.id,
      organizationId: jobListingTable.organizationId,
    })

  revalidateJobListingCache(updatedListing)

  return updatedListing
}

export async function deleteJobListing(id: string) {
  const [deletedJobListing] = await db
    .delete(jobListingTable)
    .where(eq(jobListingTable.id, id))
    .returning({
      id: jobListingTable.id,
      organizationId: jobListingTable.organizationId,
    })

  revalidateJobListingCache(deletedJobListing)

  return deletedJobListing
}