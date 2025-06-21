import { uuid, varchar, integer, pgTable, primaryKey, text, pgEnum} from "drizzle-orm/pg-core";
import { use } from "react";
import { createdAt, updatedAt} from "../schemaHelpers";
import { jobListingTable } from "./jobListing"; 
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const applicationStatuses = ["applied", "interviewing", "interested", "rejected", "hired"] as const;
export type ApplicationStatus = (typeof applicationStatuses)[number];
export const applicationStatusEnum = pgEnum("job_listing_application_status", applicationStatuses);

export const jobListingApplicationTable = pgTable("jobListingApplications", {
    jobListingId: uuid("job_listing_id").references(() => jobListingTable.id, { onDelete: "cascade" }).notNull(),
    userId: varchar().references(() => userTable.id, { onDelete: "cascade" }).notNull(),
    coverLetter: text(),
    rating: integer(),
    stage: applicationStatusEnum().notNull().default("applied"),
    createdAt,
    updatedAt,},
    table => [primaryKey({columns: [table.jobListingId, table.userId]} )] )


    export const jobListingApplicationRelations = relations(jobListingApplicationTable, ({ one }) => ({
    jobListing: one(jobListingTable, {
        fields: [jobListingApplicationTable.jobListingId],
        references: [jobListingTable.id],
    }),
    user: one(userTable, {
        fields: [jobListingApplicationTable.userId],
        references: [userTable.id],
    }),}))
