import { db } from "@/drizzle/db"
import { organizationUserSettingsTable } from "@/drizzle/schema"
import { revalidateOrganizationUserSettingsCache } from "./cache/organizationUserSettings"
import { and, eq } from "drizzle-orm"

export async function insertOrganizationUserSettings(
  settings: typeof organizationUserSettingsTable.$inferInsert
) {
  await db
    .insert(organizationUserSettingsTable)
    .values(settings)
    .onConflictDoNothing()

  revalidateOrganizationUserSettingsCache(settings)
}

export async function updateOrganizationUserSettings(
  {
    userId,
    organizationId,
  }: {
    userId: string
    organizationId: string
  },
  settings: Partial<
    Omit<
      typeof organizationUserSettingsTable.$inferInsert,
      "userId" | "organizationId"
    >
  >
) {
  await db
    .insert(organizationUserSettingsTable)
    .values({ ...settings, userId, organizationId })
    .onConflictDoUpdate({
      target: [
        organizationUserSettingsTable.userId,
        organizationUserSettingsTable.organizationId,
      ],
      set: settings,
    })

  revalidateOrganizationUserSettingsCache({ userId, organizationId })
}

export async function deleteOrganizationUserSettings({
  userId,
  organizationId,
}: {
  userId: string
  organizationId: string
}) {
  await db
    .delete(organizationUserSettingsTable)
    .where(
      and(
        eq(organizationUserSettingsTable.userId, userId),
        eq(organizationUserSettingsTable.organizationId, organizationId)
      )
    )

  revalidateOrganizationUserSettingsCache({ userId, organizationId })
}