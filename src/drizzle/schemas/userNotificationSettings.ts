import { uuid, varchar, integer, boolean, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";;
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const UserNotificationSettingsTable = pgTable("organization_user_settings", {
    userId: varchar().notNull().references(() => userTable.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    aiPrompt: varchar(),
    createdAt,
    updatedAt,
},
)

export const userNotificaionSettingsRelations = relations(UserNotificationSettingsTable, ({ one }) => ({
    user: one(userTable, {
        fields: [UserNotificationSettingsTable.userId],
        references: [userTable.id],
    }),}))