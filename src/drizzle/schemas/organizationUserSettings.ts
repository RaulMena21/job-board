import { uuid, varchar, integer, boolean, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { organizationTable } from "./organizations";
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const organizationUserSettingsTable = pgTable("organizationUserSettings", {
    organizationId: varchar().notNull().references(() => organizationTable.id),
    userId: varchar().notNull().references(() => userTable.id),
    newApplicationEmailNotifications: boolean().notNull().default(false),
    minimumRating: integer().notNull().default(0),
    createdAt,
    updatedAt,
},
table => [primaryKey({ columns: [table.userId, table.organizationId] })]
)

export const organizationUserSettingsRelations = relations(organizationUserSettingsTable, ({ one }) => ({
    organization: one(organizationTable, {
        fields: [organizationUserSettingsTable.organizationId],
        references: [organizationTable.id],
    }),
    user: one(userTable, {
        fields: [organizationUserSettingsTable.userId],
        references: [userTable.id],
    }),
}));