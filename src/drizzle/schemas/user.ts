import { varchar, pgTable} from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { not, relations } from 'drizzle-orm';
import { userNotificationSettingsTable } from './userNotificationSettings';
import { userResumeTable } from './userResume';
import { organizationUserSettingsTable } from './organizationUserSettings';

export const userTable = pgTable( 'users', {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    imgUrl: varchar().notNull(),
    createdAt,
    updatedAt,
    });

export const userRelations = relations(userTable, ({ one, many }) => ({
    notificationSettings: one(userNotificationSettingsTable),
    resume: one(userResumeTable),
    organizationUserSettings: many(organizationUserSettingsTable),}))
