import { varchar, pgTable} from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { relations } from "drizzle-orm";
import { jobListingTable } from "./jobListing"; // Adjust the path as needed
import { organizationUserSettingsTable } from "./organizationUserSettings"; // Adjust the path as needed

export const organizationTable = pgTable( 'organizations', {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imgUrl: varchar(),
    createdAt,
    updatedAt,
    });


export const organizationRelations = relations(organizationTable, ({ many }) => ({
    joblistings: many(jobListingTable),
    organizationUserSettings: many(organizationUserSettingsTable),}))
