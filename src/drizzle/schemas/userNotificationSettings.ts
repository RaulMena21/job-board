import { uuid, varchar, integer, boolean, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";;
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const userNotificationSettingsTable = pgTable("userNotificationSettings", {
    userId: varchar().notNull().references(() => userTable.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    aiPrompt: varchar(),
    createdAt,
    updatedAt,
},
)

export const userNotificaionSettingsRelations = relations(userNotificationSettingsTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userNotificationSettingsTable.userId],
        references: [userTable.id],
    }),}))