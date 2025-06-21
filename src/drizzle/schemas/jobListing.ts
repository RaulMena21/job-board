import { id, createdAt, updatedAt } from "../schemaHelpers";
import { varchar, text, integer, pgTable, pgEnum, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { organizationTable } from "./organizations";
import { relations } from "drizzle-orm";
import { jobListingApplicationTable } from "./jobListingApplication";

export const wageIntervals = ["hourly", "monthly", "yearly"] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum("job_listing_wage_interval", wageIntervals);

export const locationRequirements = ["remote", "on-site", "hybrid"] as const;
export type LocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum("job_listing_location_requirement", locationRequirements);

export const experienceLevels = ["junior", "mid", "senior"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum("job_listing_experience_level", experienceLevels);

export const jobListingStatuses = ["published", "delisted", "draft"] as const;
export type JobListingStatus = (typeof jobListingStatuses)[number];
export const jobListingStatusEnum = pgEnum("job_listing_status", jobListingStatuses);

export const jobListingTypes = ["full-time", "part-time", "internship"] as const;
export type JobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("job_listing_type", jobListingTypes);



export const jobListingTable = pgTable("job_listings", {
    id,
    organizationId: varchar().references( () => organizationTable.id, 
    { onDelete: "cascade" }).notNull(),
    title: varchar().notNull(),
    description: text().notNull(),
        wage: integer(),
        wageInterval: wageIntervalEnum(),
        stateAbreviation: varchar(),
        city: varchar(),
        isFeatured: boolean().notNull().default(false),
        locationRequirement: locationRequirementEnum().notNull(),
        experienceLevel: experienceLevelEnum().notNull(),
        status: jobListingStatusEnum().notNull(),
        type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
},
table => [index().on(table.stateAbreviation)])



export const jobListingRelations = relations(
  jobListingTable,
  ({ one, many }) => ({
    organization: one(organizationTable, {
      fields: [jobListingTable.organizationId],
      references: [organizationTable.id],
    }),
    applications: many(jobListingApplicationTable),
  })
);