import { varchar, pgTable} from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { relations } from "drizzle-orm";
import { jobListingTable } from "./jobListing"; 
import { organizationUserSettingsTable } from "./organizationUserSettings"; 

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
